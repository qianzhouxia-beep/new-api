package setting

import (
	"os"
	"strconv"
)

var NowPaymentsApiKey = ""
var NowPaymentsIpnSecret = ""
var NowPaymentsEnabled = false
var NowPaymentsMinTopUp = 1

// InitFromEnv reads NOWPayments config from environment variables.
// Called both in init() and again after database options load to re-apply.
func InitNowPaymentsFromEnv() {
	if v := os.Getenv("NOWPAYMENTS_API_KEY"); v != "" {
		NowPaymentsApiKey = v
	}
	if v := os.Getenv("NOWPAYMENTS_IPN_SECRET"); v != "" {
		NowPaymentsIpnSecret = v
	}
	if v := os.Getenv("NOWPAYMENTS_ENABLED"); v != "" {
		NowPaymentsEnabled = v == "true"
	}
	if v := os.Getenv("NOWPAYMENTS_MIN_TOPUP"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			NowPaymentsMinTopUp = n
		}
	}
}

func init() {
	InitNowPaymentsFromEnv()
}
