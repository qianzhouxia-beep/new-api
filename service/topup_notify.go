package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting"
)

// StartTopupNotifyTask 启动充值通知任务（飞书推送）
func StartTopupNotifyTask() {
	if !setting.FeishuNotifyEnabled {
		common.SysLog("Feishu topup notify disabled, skip")
		return
	}
	common.SysLog("Starting topup notify task (Feishu)")
	go topupNotifyLoop()
}

type feishuTokenResp struct {
	Code            int    `json:"code"`
	Msg             string `json:"msg"`
	TenantAccessToken string `json:"tenant_access_token"`
	Expire          int    `json:"expire"`
}

type feishuMsgResp struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

type topupNotifyState struct {
	NotifiedTradeNos []string `json:"notified_trade_nos"`
}

var _feishuToken string
var _feishuTokenExpire int64

func getFeishuToken() (string, error) {
	if _feishuToken != "" && time.Now().Unix() < _feishuTokenExpire {
		return _feishuToken, nil
	}
	body, _ := json.Marshal(map[string]string{
		"app_id":     setting.FeishuAppId,
		"app_secret": setting.FeishuAppSecret,
	})
	resp, err := http.Post("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
		"application/json; charset=utf-8", strings.NewReader(string(body)))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	var r feishuTokenResp
	json.NewDecoder(resp.Body).Decode(&r)
	if r.Code != 0 {
		return "", fmt.Errorf("feishu token error: %s", r.Msg)
	}
	_feishuToken = r.TenantAccessToken
	_feishuTokenExpire = time.Now().Unix() + int64(r.Expire) - 300
	return _feishuToken, nil
}

func sendFeishuNotify(record *model.TopUp, username string) error {
	token, err := getFeishuToken()
	if err != nil {
		return err
	}

	payMethodMap := map[string]string{
		"paypal":      "PayPal",
		"nowpayments": "NOWPayments (USDT)",
		"stripe":      "Stripe",
		"creem":       "Creem",
		"balance":     "余额",
		"epay":        "易支付",
	}
	method := payMethodMap[record.PaymentMethod]
	if method == "" {
		method = record.PaymentMethod
	}
	if method == "" {
		method = "未知"
	}

	money := float64(record.Amount) / 500000
	timeStr := time.Unix(record.CompleteTime, 0).Format("2006-01-02 15:04:05")

	content := map[string]interface{}{
		"config":  map[string]bool{"wide_screen_mode": true},
		"header": map[string]interface{}{
			"title":    map[string]string{"tag": "plain_text", "content": "🎉 新充值到账！"},
			"template": "green",
		},
		"elements": []interface{}{
			map[string]interface{}{
				"tag": "div",
				"text": map[string]string{
					"tag":     "lark_md",
					"content": fmt.Sprintf("**用户：** %s\n**金额：** $%.2f USD\n**方式：** %s\n**时间：** %s\n**交易号：** `%s`",
						username, money, method, timeStr, record.TradeNo),
				},
			},
			map[string]interface{}{
				"tag": "action",
				"actions": []interface{}{
					map[string]interface{}{
						"tag":  "button",
						"text": map[string]string{"tag": "plain_text", "content": "前往后台查看"},
						"url":  common.ServerAddress + "/",
						"type": "primary",
					},
				},
			},
		},
	}
	contentBytes, _ := json.Marshal(content)

	msg := map[string]interface{}{
		"receive_id": setting.FeishuChatId,
		"msg_type":   "interactive",
		"content":    string(contentBytes),
	}
	msgBytes, _ := json.Marshal(msg)

	req, _ := http.NewRequest("POST",
		"https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id",
		strings.NewReader(string(msgBytes)))
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json; charset=utf-8")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	var r feishuMsgResp
	json.NewDecoder(resp.Body).Decode(&r)
	if r.Code != 0 {
		return fmt.Errorf("feishu send msg error: %s", r.Msg)
	}
	return nil
}

func topupNotifyLoop() {
	state := &topupNotifyState{}
	// 启动时加载最近已通知的记录（避免重启后重复通知）
	// 简单处理：只记录内存中的 trade_no，重启后会重新通知最近记录（可接受）

	interval := setting.FeishuNotifyInterval
	if interval <= 0 {
		interval = 300 // 默认 5 分钟
	}

	ticker := time.NewTicker(time.Duration(interval) * time.Second)
	defer ticker.Stop()

	common.SysLog(fmt.Sprintf("Topup notify loop started, interval: %ds", interval))

	for range ticker.C {
		checkNewTopups(state)
	}
}

func checkNewTopups(state *topupNotifyState) {
	// 查询最近 20 条充值记录（status=paid 或 success）
	// 直接用 DB 查询，不走 HTTP
	records, err := model.GetRecentTopUps(20)
	if err != nil {
		common.SysLog("topup notify: failed to get records: " + err.Error())
		return
	}

	userMap := make(map[int]string)
	var pageInfo common.PageInfo
	pageInfo.Page = 1
	pageInfo.PageSize = 200
	users, total, err := model.GetAllUsers(&pageInfo)
	if err == nil {
		count := int(total)
		if count > len(users) {
			count = len(users)
		}
		for i := 0; i < count; i++ {
			userMap[users[i].Id] = users[i].Username
		}
	}

	for _, r := range records {
		if r.Status != "paid" && r.Status != "success" {
			continue
		}
		alreadyNotified := false
		for _, tn := range state.NotifiedTradeNos {
			if tn == r.TradeNo {
				alreadyNotified = true
				break
			}
		}
		if alreadyNotified {
			continue
		}

		username := userMap[r.UserId]
		if username == "" {
			username = fmt.Sprintf("用户#%d", r.UserId)
		}

		common.SysLog(fmt.Sprintf("topup notify: sending for trade_no=%s, user=%s, amount=$%.2f",
			r.TradeNo, username, float64(r.Amount)/500000))
		err := sendFeishuNotify(&r, username)
		if err != nil {
			common.SysLog("topup notify: send failed: " + err.Error())
		} else {
			common.SysLog("topup notify: sent successfully for " + r.TradeNo)
			state.NotifiedTradeNos = append(state.NotifiedTradeNos, r.TradeNo)
			// 只保留最近 200 条
			if len(state.NotifiedTradeNos) > 200 {
				state.NotifiedTradeNos = state.NotifiedTradeNos[len(state.NotifiedTradeNos)-200:]
			}
		}
	}
}
