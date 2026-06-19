package controller

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/logger"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting"

	"github.com/gin-gonic/gin"
	"github.com/thanhpk/randstr"
)

type PayPalAdaptor struct{}

var paypalAdaptor = &PayPalAdaptor{}

// PayPalPayRequest 鈥?mirrors StripePayRequest but for PayPal.
type PayPalPayRequest struct {
	Amount      int64  `json:"amount"`
	SuccessURL  string `json:"success_url,omitempty"`
	CancelURL   string `json:"cancel_url,omitempty"`
}

// 鈹€鈹€ API helpers 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

func paypalBaseURL() string {
	if setting.PayPalSandbox {
		return "https://api-m.sandbox.paypal.com"
	}
	return "https://api-m.paypal.com"
}

// paypalAccessToken fetches an OAuth2 access token from PayPal.
func paypalAccessToken(ctx context.Context) (string, error) {
	u := paypalBaseURL() + "/v1/oauth2/token"
	body := "grant_type=client_credentials"
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, u, bytes.NewBufferString(body))
	if err != nil {
		return "", fmt.Errorf("create token request: %w", err)
	}
	req.SetBasicAuth(setting.PayPalClientId, setting.PayPalClientSecret)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Accept", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("paypal token request: %w", err)
	}
	defer resp.Body.Close()

	var result struct {
		AccessToken string `json:"access_token"`
		TokenType   string `json:"token_type"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", fmt.Errorf("decode token response: %w", err)
	}
	if result.AccessToken == "" {
		return "", fmt.Errorf("empty access_token in PayPal response")
	}
	return result.TokenType + " " + result.AccessToken, nil
}

// paypalCreateOrder creates a PayPal Order and returns the approval URL.
func paypalCreateOrder(ctx context.Context, accessToken, referenceId string, amountUSD float64, returnURL, cancelURL string) (string, error) {
	u := paypalBaseURL() + "/v2/checkout/orders"
	amtStr := strconv.FormatFloat(amountUSD, 'f', 2, 64)

	payload := map[string]interface{}{
		"intent": "CAPTURE",
		"purchase_units": []map[string]interface{}{
			{
				"reference_id": referenceId,
				"description":  "TokenMaster prepaid credits",
				"amount": map[string]string{
					"currency_code": "USD",
					"value":         amtStr,
				},
			},
		},
		"payment_source": map[string]interface{}{
			"paypal": map[string]interface{}{
				"experience_context": map[string]string{
					"payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
					"landing_page":              "LOGIN",
					"user_action":               "PAY_NOW",
					"return_url":                returnURL,
					"cancel_url":                cancelURL,
				},
			},
		},
	}

	body, _ := json.Marshal(payload)
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, u, bytes.NewReader(body))
	if err != nil {
		return "", fmt.Errorf("create order request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", accessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("paypal create order: %w", err)
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	var order struct {
		Id     string `json:"id"`
		Status string `json:"status"`
		Links  []struct {
			Href   string `json:"href"`
			Rel    string `json:"rel"`
			Method string `json:"method"`
		} `json:"links"`
	}
	if err := json.Unmarshal(respBody, &order); err != nil {
		return "", fmt.Errorf("decode order response: %w", err)
	}
	if order.Status != "CREATED" && order.Status != "PAYER_ACTION_REQUIRED" {
		return "", fmt.Errorf("paypal order not created (status=%s body=%s)", order.Status, string(respBody))
	}

	// Find the "payer-action" link for redirect
	for _, link := range order.Links {
		if link.Rel == "payer-action" {
			return link.Href, nil
		}
	}
	return "", fmt.Errorf("no payer-action link in PayPal order response")
}

// paypalCaptureOrder completes a PayPal order after the buyer has approved.
func paypalCaptureOrder(ctx context.Context, accessToken, orderId string) (string, error) {
	u := paypalBaseURL() + "/v2/checkout/orders/" + orderId + "/capture"
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, u, bytes.NewReader([]byte("{}")))
	if err != nil {
		return "", fmt.Errorf("create capture request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", accessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("paypal capture order: %w", err)
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	var capture struct {
		Id     string `json:"id"`
		Status string `json:"status"`
	}
	if err := json.Unmarshal(respBody, &capture); err != nil {
		return "", fmt.Errorf("decode capture response: %w", err)
	}
	if capture.Status != "COMPLETED" {
		return "", fmt.Errorf("paypal capture not completed (status=%s body=%s)", capture.Status, string(respBody))
	}
	return capture.Id, nil
}

// paypalVerifyWebhookSignature verifies that a webhook payload is legit.
func paypalVerifyWebhookSignature(ctx context.Context, accessToken, webhookId, eventBody, authAlgo, certUrl, transmissionId, transmissionSig, transmissionTime string) (bool, error) {
	u := paypalBaseURL() + "/v1/notifications/verify-webhook-signature"
	payload := map[string]string{
		"auth_algo":         authAlgo,
		"cert_url":          certUrl,
		"transmission_id":   transmissionId,
		"transmission_sig":  transmissionSig,
		"transmission_time": transmissionTime,
		"webhook_id":        webhookId,
		"webhook_event":     eventBody,
	}
	body, _ := json.Marshal(payload)
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, u, bytes.NewReader(body))
	if err != nil {
		return false, fmt.Errorf("create verify request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", accessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return false, fmt.Errorf("verify webhook signature: %w", err)
	}
	defer resp.Body.Close()

	var result struct {
		VerificationStatus string `json:"verification_status"`
	}
	json.NewDecoder(resp.Body).Decode(&result)
	return result.VerificationStatus == "SUCCESS", nil
}

// 鈹€鈹€ Controllers 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

func isPayPalTopUpEnabled() bool {
	if !isPaymentComplianceConfirmed() {
		return false
	}
	return strings.TrimSpace(setting.PayPalClientId) != "" &&
		strings.TrimSpace(setting.PayPalClientSecret) != ""
}

func isPayPalWebhookConfigured() bool {
	return strings.TrimSpace(setting.PayPalWebhookId) != ""
}

func isPayPalWebhookEnabled() bool {
	return isPayPalTopUpEnabled() && isPayPalWebhookConfigured()
}

func getPayPalMinTopup() int64 {
	if setting.PayPalMinTopUp <= 0 {
		return 1
	}
	return int64(setting.PayPalMinTopUp)
}

func getPayPalUnitPrice() float64 {
	if setting.PayPalUnitPrice <= 0 {
		return 1.0
	}
	return setting.PayPalUnitPrice
}

// PayPalTopUpAmount 鈥?returns the USD charged for a given credit amount.
func PayPalTopUpAmount(credits float64, _ string) float64 {
	return credits * getPayPalUnitPrice()
}

// RequestPayPalAmount 鈥?calculates pay money for a given credit amount.
func RequestPayPalAmount(c *gin.Context) {
	var req PayPalPayRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "鍙傛暟閿欒"})
		return
	}
	if req.Amount < getPayPalMinTopup() {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": fmt.Sprintf("鍏呭€兼暟閲忎笉鑳藉皬浜?%d", getPayPalMinTopup())})
		return
	}
	id := c.GetInt("id")
	user, _ := model.GetUserById(id, false)
	charged := GetChargedAmount(float64(req.Amount), *user)
	c.JSON(http.StatusOK, gin.H{"message": "success", "data": strconv.FormatFloat(charged, 'f', 2, 64)})
}

// RequestPayPalPay 鈥?creates a PayPal Order and returns the approval URL.
func RequestPayPalPay(c *gin.Context) {
	var req PayPalPayRequest
	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "read query error"})
		return
	}
	c.Request.Body = io.NopCloser(bytes.NewReader(bodyBytes))

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "鍙傛暟閿欒"})
		return
	}

	if req.Amount < getPayPalMinTopup() {
		c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("鍏呭€兼暟閲忎笉鑳藉皬浜?%d", getPayPalMinTopup()), "data": 10})
		return
	}
	if req.Amount > 10000 {
		c.JSON(http.StatusOK, gin.H{"message": "鍏呭€兼暟閲忎笉鑳藉ぇ浜?10000", "data": 10})
		return
	}

	if req.SuccessURL != "" && common.ValidateRedirectURL(req.SuccessURL) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "鏀粯鎴愬姛閲嶅畾鍚慤RL涓嶅湪鍙俊浠诲煙鍚嶅垪琛ㄤ腑", "data": ""})
		return
	}
	if req.CancelURL != "" && common.ValidateRedirectURL(req.CancelURL) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "鏀粯鍙栨秷閲嶅畾鍚慤RL涓嶅湪鍙俊浠诲煙鍚嶅垪琛ㄤ腑", "data": ""})
		return
	}

	id := c.GetInt("id")
	user, _ := model.GetUserById(id, false)
	chargedMoney := GetChargedAmount(float64(req.Amount), *user)

	reference := fmt.Sprintf("paypal-ref-%d-%d-%s", user.Id, time.Now().UnixMilli(), randstr.String(4))
	referenceId := "ref_" + common.Sha1([]byte(reference))

	// Create a pending top-up record
	topUp := &model.TopUp{
		UserId:          id,
		Amount:          req.Amount,
		Money:           chargedMoney,
		TradeNo:         referenceId,
		PaymentMethod:   model.PaymentMethodPayPal,
		PaymentProvider: model.PaymentProviderPayPal,
		CreateTime:      time.Now().Unix(),
		Status:          common.TopUpStatusPending,
	}
	if err := topUp.Insert(); err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("PayPal 鍒涘缓鍏呭€艰鍗曞け璐?user_id=%d trade_no=%s amount=%d error=%q", id, referenceId, req.Amount, err.Error()))
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": fmt.Sprintf("创建订单失败: %s", err.Error())})
		return
	}

	// Get access token
	token, err := paypalAccessToken(c.Request.Context())
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("PayPal 鑾峰彇token澶辫触 user_id=%d error=%q", id, err.Error()))
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": fmt.Sprintf("获取支付token失败: %s", err.Error())})
		return
	}

	// Create PayPal order
	approvalUrl, err := paypalCreateOrder(
		c.Request.Context(), token, referenceId, chargedMoney,
		req.SuccessURL, req.CancelURL,
	)
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("PayPal 鍒涘缓Order澶辫触 user_id=%d trade_no=%s amount=%d error=%q", id, referenceId, req.Amount, err.Error()))
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": fmt.Sprintf("拉起支付失败: %s", err.Error())})
		return
	}

	logger.LogInfo(c.Request.Context(), fmt.Sprintf("PayPal 鍏呭€艰鍗曞垱寤烘垚鍔?user_id=%d trade_no=%s amount=%d money=%.2f", id, referenceId, req.Amount, chargedMoney))
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": gin.H{
			"pay_link": approvalUrl,
			"order_id": referenceId,
		},
	})
}

// PayPalCallback — client-side fallback: captures & credits when the user
// returns from PayPal with ?status=success&token=<paypal-order-id>.
// This removes hard-dependency on webhooks for sandbox / misconfigured setups.
func PayPalCallback(c *gin.Context) {
	ctx := c.Request.Context()
	paypalOrderId := c.Query("token")
	if paypalOrderId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "error", "data": "missing token parameter"})
		return
	}

	logger.LogInfo(ctx, fmt.Sprintf("PayPal callback received order_id=%s ip=%s", paypalOrderId, c.ClientIP()))

	// 1. Get PayPal access token
	token, err := paypalAccessToken(ctx)
	if err != nil {
		logger.LogError(ctx, fmt.Sprintf("PayPal callback get token error=%s", err.Error()))
		c.JSON(http.StatusInternalServerError, gin.H{"message": "error", "data": fmt.Sprintf("获取支付凭证失败: %s", err.Error())})
		return
	}

	// 2. Fetch order details to get reference_id and status
	orderDetailUrl := paypalBaseURL() + "/v2/checkout/orders/" + paypalOrderId
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, orderDetailUrl, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "error", "data": fmt.Sprintf("创建请求失败: %s", err.Error())})
		return
	}
	req.Header.Set("Authorization", token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "error", "data": fmt.Sprintf("查询订单失败: %s", err.Error())})
		return
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)

	var orderDetail struct {
		Id     string `json:"id"`
		Status string `json:"status"`
		PurchaseUnits []struct {
			ReferenceId string `json:"reference_id"`
			Amount      struct {
				Value string `json:"value"`
			} `json:"amount"`
		} `json:"purchase_units"`
	}
	if err := json.Unmarshal(respBody, &orderDetail); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "error", "data": fmt.Sprintf("解析订单数据失败: %s", err.Error())})
		return
	}

	// 3. Check if order is approved/completed
	if orderDetail.Status != "APPROVED" && orderDetail.Status != "COMPLETED" {
		c.JSON(http.StatusOK, gin.H{
			"message": "info",
			"data":   fmt.Sprintf("订单状态: %s（等待用户在 PayPal 完成支付）", orderDetail.Status),
		})
		return
	}

	// 4. Get reference_id
	referenceId := ""
	if len(orderDetail.PurchaseUnits) > 0 {
		referenceId = orderDetail.PurchaseUnits[0].ReferenceId
	}
	if referenceId == "" {
		c.JSON(http.StatusOK, gin.H{
			"message": "error",
			"data":   "无法获取订单关联信息，请联系客服",
		})
		return
	}

	// 5. Capture the order (skip if already COMPLETED)
	var captureId string
	if orderDetail.Status == "APPROVED" {
		captureId, err = paypalCaptureOrder(ctx, token, paypalOrderId)
		if err != nil {
			logger.LogError(ctx, fmt.Sprintf("PayPal callback capture failed trade_no=%s order_id=%s error=%s", referenceId, paypalOrderId, err.Error()))
			// Don't return error to user — webhook may still handle it
			c.JSON(http.StatusOK, gin.H{
				"message": "warning",
				"data":   fmt.Sprintf("支付已确认，入账处理中（可能需要几分钟）: %s", err.Error()),
			})
			return
		}
	} else {
		// Already captured — try to find capture ID from order detail (simplified: use orderId)
		captureId = paypalOrderId
	}

	// 6. Credit user balance via Recharge (idempotent: duplicate calls are safe)
	if err := model.Recharge(referenceId, captureId, c.ClientIP()); err != nil {
		// Recharge may fail if already credited (duplicate), that's OK
		logger.LogInfo(ctx, fmt.Sprintf("PayPal callback recharge result trade_no=%s order_id=%s error=%s", referenceId, paypalOrderId, err.Error()))
	}

	logger.LogInfo(ctx, fmt.Sprintf("PayPal callback completed trade_no=%s order_id=%s capture_id=%s", referenceId, paypalOrderId, captureId))
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":   gin.H{"trade_no": referenceId, "capture_id": captureId},
	})
}

// PayPalWebhook — handles incoming PayPal webhook events (CHECKOUT.ORDER.APPROVED).
func PayPalWebhook(c *gin.Context) {
	ctx := c.Request.Context()
	if !isPayPalWebhookEnabled() {
		logger.LogWarn(ctx, fmt.Sprintf("PayPal webhook rejected reason=disabled path=%q", c.Request.RequestURI))
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		logger.LogError(ctx, fmt.Sprintf("PayPal webhook read body error=%q", err.Error()))
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	body := string(bodyBytes)

	// --- Webhook verification ---
	token, err := paypalAccessToken(ctx)
	if err != nil {
		logger.LogError(ctx, fmt.Sprintf("PayPal webhook get token error=%q", err.Error()))
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	verified, err := paypalVerifyWebhookSignature(
		ctx, token,
		setting.PayPalWebhookId,
		body,
		c.GetHeader("PAYPAL-AUTH-ALGO"),
		c.GetHeader("PAYPAL-CERT-URL"),
		c.GetHeader("PAYPAL-TRANSMISSION-ID"),
		c.GetHeader("PAYPAL-TRANSMISSION-SIG"),
		c.GetHeader("PAYPAL-TRANSMISSION-TIME"),
	)
	if err != nil || !verified {
		logger.LogWarn(ctx, fmt.Sprintf("PayPal webhook signature verification failed ip=%s", c.ClientIP()))
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Parse event
	var event struct {
		Id      string `json:"id"`
		EventType string `json:"event_type"`
		Resource struct {
			Id             string `json:"id"`
			Status         string `json:"status"`
			PurchaseUnits []struct {
				ReferenceId string `json:"reference_id"`
				Amount      struct {
					Value string `json:"value"`
				} `json:"amount"`
			} `json:"purchase_units"`
		} `json:"resource"`
	}
	if err := json.Unmarshal(bodyBytes, &event); err != nil {
		logger.LogError(ctx, fmt.Sprintf("PayPal webhook parse event error=%q", err.Error()))
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	logger.LogInfo(ctx, fmt.Sprintf("PayPal webhook received event_type=%s order_id=%s", event.EventType, event.Resource.Id))

	if event.EventType == "CHECKOUT.ORDER.APPROVED" {
		orderId := event.Resource.Id
		referenceId := ""
		if len(event.Resource.PurchaseUnits) > 0 {
			referenceId = event.Resource.PurchaseUnits[0].ReferenceId
		}
		if referenceId == "" {
			logger.LogError(ctx, fmt.Sprintf("PayPal webhook missing reference_id order_id=%s", orderId))
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
			return
		}

		// Capture the order first
		capToken, err := paypalAccessToken(ctx)
		if err != nil {
			logger.LogError(ctx, fmt.Sprintf("PayPal webhook capture get token error=%q trade_no=%s order_id=%s", err.Error(), referenceId, orderId))
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		captureId, err := paypalCaptureOrder(ctx, capToken, orderId)
		if err != nil {
			logger.LogError(ctx, fmt.Sprintf("PayPal webhook capture failed trade_no=%s order_id=%s error=%q", referenceId, orderId, err.Error()))
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}

		// Credit the user's balance via shared Recharge logic (thread-safe, transactional)
		if err := model.Recharge(referenceId, captureId, c.ClientIP()); err != nil {
			logger.LogError(ctx, fmt.Sprintf("PayPal webhook recharge failed trade_no=%s order_id=%s capture_id=%s error=%q", referenceId, orderId, captureId, err.Error()))
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		logger.LogInfo(ctx, fmt.Sprintf("PayPal payment completed trade_no=%s order_id=%s capture_id=%s", referenceId, orderId, captureId))
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
