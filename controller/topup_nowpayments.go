package controller

import (
	"bytes"
	"context"
	"crypto/hmac"
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/thanhpk/randstr"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/logger"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting"
	"github.com/QuantumNous/new-api/setting/system_setting"
)

const nowpaymentsBaseURL = "https://api.nowpayments.io/v1"

// NowPaymentsCreateRequest is sent from the frontend to create a payment.
type NowPaymentsCreateRequest struct {
	Amount int64 `json:"amount"`
}

// nowpaymentsCreateResponse is returned to the frontend.
type nowpaymentsCreateResponse struct {
	TradeNo       string `json:"trade_no"`
	PayAddress    string `json:"pay_address"`
	PayAmount     string `json:"pay_amount"`
	PayCurrency   string `json:"pay_currency"`
	PaymentID     string `json:"payment_id"`
	PaymentStatus string `json:"payment_status"`
}

// nowpaymentsAPIError represents an error from the NOWPayments API.
type nowpaymentsAPIError struct {
	Message string `json:"message"`
}

func isNowPaymentsEnabled() bool {
	return setting.NowPaymentsEnabled && setting.NowPaymentsApiKey != ""
}

func getNowPaymentsMinTopup() int64 {
	if setting.NowPaymentsMinTopUp <= 0 {
		return 1
	}
	return int64(setting.NowPaymentsMinTopUp)
}

// nowpaymentsMinAmountResponse is the response from GET /v1/min-amount
type nowpaymentsMinAmountResponse struct {
	MinAmount float64 `json:"min_amount"`
	CurrencyFrom string `json:"currency_from"`
	CurrencyTo string `json:"currency_to"`
}

// getNowPaymentsMinAmount calls GET /v1/min-amount to get the minimum payment amount
func getNowPaymentsMinAmount(ctx context.Context, currencyFrom string) (float64, error) {
	url := fmt.Sprintf("%s/min-amount?currency_from=%s", nowpaymentsBaseURL, currencyFrom)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return 0, err
	}
	req.Header.Set("x-api-key", setting.NowPaymentsApiKey)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var result nowpaymentsMinAmountResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return 0, fmt.Errorf("parse min-amount response: %w, body=%s", err, string(body))
	}
	return result.MinAmount, nil
}

// nowpaymentsEstimateResponse is the response from GET /v1/estimate
type nowpaymentsEstimateResponse struct {
	CurrencyFrom    string  `json:"currency_from"`
	AmountFrom      float64 `json:"amount_from"`
	CurrencyTo      string  `json:"currency_to"`
	EstimatedAmount float64 `json:"estimated_amount"`
	PayAmount       float64 `json:"pay_amount"`
}

// getNowPaymentsEstimate calls GET /v1/estimate to get the estimated crypto amount
func getNowPaymentsEstimate(ctx context.Context, currencyFrom, currencyTo string, amount float64) (*nowpaymentsEstimateResponse, error) {
	url := fmt.Sprintf("%s/estimate?currency_from=%s&currency_to=%s&amount=%.2f", nowpaymentsBaseURL, currencyFrom, currencyTo, amount)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("x-api-key", setting.NowPaymentsApiKey)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var result nowpaymentsEstimateResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("parse estimate response: %w, body=%s", err, string(body))
	}
	return &result, nil
}

// CreateNowPaymentsPayment creates a NOWPayments payment for the authenticated user.
func CreateNowPaymentsPayment(c *gin.Context) {
	if !isNowPaymentsEnabled() {
		c.JSON(http.StatusForbidden, gin.H{"message": "NOWPayments payment is not enabled"})
		return
	}
	userId := c.GetInt("id")
	username := c.GetString("username")

	var req NowPaymentsCreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request parameters"})
		return
	}
	if req.Amount < getNowPaymentsMinTopup() {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("Minimum top-up amount is %d", getNowPaymentsMinTopup()),
		})
		return
	}

	tradeNo := fmt.Sprintf("NP%s%d", randstr.Hex(16), time.Now().UnixNano())

	// Create pending topup record
	topUp := &model.TopUp{
		UserId:          userId,
		Amount:          req.Amount,
		Money:           float64(req.Amount),
		TradeNo:         tradeNo,
		PaymentMethod:   model.PaymentMethodNowPayments,
		PaymentProvider: model.PaymentProviderNowPayments,
		CreateTime:      time.Now().Unix(),
		Status:          common.TopUpStatusPending,
	}
	if err := topUp.Insert(); err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("failed to create NOWPayments topup record: %v", err))
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create payment record"})
		return
	}

	// Call NOWPayments API — first get min amount and estimate, then create payment
	minAmount, err := getNowPaymentsMinAmount(c.Request.Context(), "usd")
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("NOWPayments getMinAmount failed: %v", err))
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Payment service unavailable: cannot get min amount"})
		return
	}
	if float64(req.Amount) < minAmount {
		c.JSON(http.StatusBadRequest, gin.H{"message": fmt.Sprintf("Amount too low. Minimum is $%.2f", minAmount)})
		return
	}

	// Get estimate for USDT (TRC-20)
	estimate, err := getNowPaymentsEstimate(c.Request.Context(), "usd", "usdttrc20", float64(req.Amount))
	if err != nil {
		logger.LogInfo(c.Request.Context(), fmt.Sprintf("NOWPayments estimate failed (non-critical), using pay_currency=usdttrc20: %v", err))
	}

	payCurrency := "usdttrc20"
	if estimate != nil && estimate.PayAmount > 0 {
		payCurrency = "usdttrc20"
	}

	logger.LogInfo(c.Request.Context(), fmt.Sprintf("NOWPayments creating payment: amount=$%d pay_currency=%s", req.Amount, payCurrency))

	apiPayload := map[string]interface{}{
		"price_amount":      req.Amount,
		"price_currency":    "usd",
		"pay_currency":      payCurrency,
		"order_id":          tradeNo,
		"order_description": fmt.Sprintf("TokenMaster top-up for user %s (#%d)", username, userId),
		"ipn_callback_url":  system_setting.ServerAddress + "/api/nowpayments/notify",
		"is_fixed_rate":     true,
		"is_fee_paid_by_user": true,
	}

	body, _ := json.Marshal(apiPayload)

	// Log the request for debugging
	logger.LogInfo(c.Request.Context(), fmt.Sprintf("NOWPayments creating payment: url=%s/payment payload=%s", nowpaymentsBaseURL, string(body)))

	httpReq, err := http.NewRequestWithContext(c.Request.Context(), http.MethodPost, nowpaymentsBaseURL+"/payment", bytes.NewReader(body))
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("NOWPayments create payment request failed: %v", err))
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create payment"})
		return
	}
	httpReq.Header.Set("x-api-key", setting.NowPaymentsApiKey)
	httpReq.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(httpReq)
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("NOWPayments API call failed: %v", err))
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Payment service unavailable: " + err.Error()})
		return
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	logger.LogInfo(c.Request.Context(), fmt.Sprintf("NOWPayments API response status=%d body=%s", resp.StatusCode, string(respBody)))

	if resp.StatusCode >= 400 {
		logger.LogError(c.Request.Context(), fmt.Sprintf("NOWPayments API error status=%d body=%s", resp.StatusCode, string(respBody)))
		// Return the actual error from NOWPayments if available
		var npErr nowpaymentsAPIError
		if json.Unmarshal(respBody, &npErr) == nil && npErr.Message != "" {
			c.JSON(http.StatusInternalServerError, gin.H{"message": fmt.Sprintf("NOWPayments error: %s", npErr.Message)})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"message": fmt.Sprintf("Failed to create payment (HTTP %d)", resp.StatusCode)})
		}
		return
	}

	var paymentResp struct {
		PaymentID     string `json:"payment_id"`
		PaymentStatus string `json:"payment_status"`
		PayAddress    string `json:"pay_address"`
		PayAmount     json.Number `json:"pay_amount"`
		PayCurrency   string `json:"pay_currency"`
	}
	if err := json.Unmarshal(respBody, &paymentResp); err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("NOWPayments response parse error: %v body=%s", err, string(respBody)))
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to parse payment response"})
		return
	}

	logger.LogInfo(c.Request.Context(), fmt.Sprintf("NOWPayments payment created: tradeNo=%s paymentId=%s status=%s", tradeNo, paymentResp.PaymentID, paymentResp.PaymentStatus))

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": nowpaymentsCreateResponse{
			TradeNo:       tradeNo,
			PayAddress:    paymentResp.PayAddress,
			PayAmount:     paymentResp.PayAmount.String(),
			PayCurrency:   paymentResp.PayCurrency,
			PaymentID:     paymentResp.PaymentID,
			PaymentStatus: paymentResp.PaymentStatus,
		},
	})
}

// NowPaymentsIPN handles IPN (Instant Payment Notification) callbacks from NOWPayments.
func NowPaymentsIPN(c *gin.Context) {
	if !isNowPaymentsEnabled() {
		logger.LogWarn(c.Request.Context(), "NOWPayments IPN rejected: feature disabled")
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	// Read the raw body for HMAC verification
	payload, err := io.ReadAll(c.Request.Body)
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("NOWPayments IPN read body error: %v", err))
		c.AbortWithStatus(http.StatusServiceUnavailable)
		return
	}

	// Verify HMAC signature
	receivedSig := c.GetHeader("x-nowpayments-sig")
	if receivedSig == "" {
		logger.LogWarn(c.Request.Context(), "NOWPayments IPN: missing x-nowpayments-sig header")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	expectedSig := generateNowPaymentsHMAC(payload, setting.NowPaymentsIpnSecret)
	if receivedSig != expectedSig {
		logger.LogWarn(c.Request.Context(), fmt.Sprintf("NOWPayments IPN: signature mismatch expected=%s received=%s", expectedSig, receivedSig))
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var ipnData struct {
		PaymentID     string `json:"payment_id"`
		PaymentStatus string `json:"payment_status"`
		OrderID       string `json:"order_id"`
		PriceAmount   float64 `json:"price_amount"`
		PriceCurrency string `json:"price_currency"`
		PayCurrency   string `json:"pay_currency"`
	}
	if err := json.Unmarshal(payload, &ipnData); err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("NOWPayments IPN parse error: %v", err))
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	logger.LogInfo(c.Request.Context(), fmt.Sprintf("NOWPayments IPN received: tradeNo=%s status=%s amount=%.2f %s", ipnData.OrderID, ipnData.PaymentStatus, ipnData.PriceAmount, ipnData.PriceCurrency))

	// Only process completed/finished payments
	switch ipnData.PaymentStatus {
	case "finished", "confirmed", "complete":
		// Process the topup
		topUp := model.GetTopUpByTradeNo(ipnData.OrderID)
		if topUp == nil {
			logger.LogError(c.Request.Context(), fmt.Sprintf("NOWPayments IPN: topup not found for tradeNo=%s", ipnData.OrderID))
			c.AbortWithStatus(http.StatusNotFound)
			return
		}
		if topUp.Status == common.TopUpStatusSuccess {
			c.Status(http.StatusOK)
			return // Idempotent: already processed
		}

		rawJSON, _ := json.Marshal(ipnData)
		err := model.UpdatePendingTopUpStatus(ipnData.OrderID, model.PaymentProviderNowPayments, common.TopUpStatusSuccess)
		if err != nil {
			logger.LogError(c.Request.Context(), fmt.Sprintf("NOWPayments IPN: failed to complete topup tradeNo=%s: %v", ipnData.OrderID, err))
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		model.RecordTopupLog(topUp.UserId,
			fmt.Sprintf("NOWPayments crypto topup success, amount: %d, crypto: %s, payment_id: %s",
				topUp.Amount, ipnData.PayCurrency, ipnData.PaymentID),
			c.ClientIP(),
			model.PaymentMethodNowPayments,
			model.PaymentMethodNowPayments,
		)

		logger.LogInfo(c.Request.Context(), fmt.Sprintf("NOWPayments IPN processed successfully: tradeNo=%s paymentId=%s raw=%s", ipnData.OrderID, ipnData.PaymentID, string(rawJSON)))
	default:
		logger.LogInfo(c.Request.Context(), fmt.Sprintf("NOWPayments IPN ignored: status=%s tradeNo=%s", ipnData.PaymentStatus, ipnData.OrderID))
	}

	c.Status(http.StatusOK)
}

// generateNowPaymentsHMAC generates HMAC-SHA512 signature for IPN verification.
func generateNowPaymentsHMAC(payload []byte, secret string) string {
	if secret == "" {
		return ""
	}
	mac := hmac.New(sha512.New, []byte(secret))
	mac.Write(payload)
	return hex.EncodeToString(mac.Sum(nil))
}
