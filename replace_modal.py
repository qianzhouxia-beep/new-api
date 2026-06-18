import re

with open(r'D:\AI\new-api-source-clean\web\default\src\features\pricing\plans.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# ---- 1. Add PaygPaymentModal before main component ----
payg_modal = '''

function PaygPaymentModal({
  availableMethods,
  selectedMethod,
  setSelectedMethod,
  paying,
  error,
  topupAmount,
  customAmount,
  setTopupAmount,
  setCustomAmount,
  onPay,
  onClose,
  zh,
}: {
  availableMethods: { id: string; name: string }[]
  selectedMethod: string | null
  setSelectedMethod: (id: string) => void
  paying: string | null
  error: string | null
  topupAmount: number
  customAmount: string
  setTopupAmount: (n: number) => void
  setCustomAmount: (s: string) => void
  onPay: () => void
  onClose: () => void
  zh: boolean
}) {
  const presetAmounts = [5, 10, 25, 50, 100, 200]
  const finalAmount = customAmount ? (parseInt(customAmount) || 0) : topupAmount

  return (
    <div className='tmp-modal-overlay'>
      <div className='tmp-modal-box tmp-modal-box-lg'>
        <h3 className='tmp-modal-title'>{zh ? '按量付费' : 'Pay As You Go'}</h3>
        <p className='tmp-modal-desc'>{zh ? '充多少用多少，无需承诺' : 'Top up and use, no commitment'}</p>

        {/* Preset amounts */}
        <div className='tmp-modal-method-label'>{zh ? '选择金额' : 'Select Amount'}</div>
        <div className='tmp-payg-amounts'>
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => { setTopupAmount(amt); setCustomAmount('') }}
              className={`tmp-payg-amt-btn ${topupAmount === amt && !customAmount ? 'tmp-payg-amt-active' : ''}`}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className='tmp-payg-custom-row'>
          <span className='tmp-payg-dollar'>$</span>
          <input
            type='number'
            min={1}
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setTopupAmount(0) }}
            placeholder={zh ? '自定义金额' : 'Custom amount'}
            className='tmp-payg-custom-input'
          />
          <span className='tmp-payg-balance-label'>{zh ? '到账' : 'You get'}:</span>
          <span className='tmp-payg-balance-value'>${finalAmount}</span>
        </div>

        {error && (
          <div className='tmp-modal-error'>{error}</div>
        )}

        {/* Payment methods */}
        <div className='tmp-modal-method-label'>{zh ? '支付方式' : 'Payment Method'}</div>
        <div className='tmp-modal-methods'>
          {availableMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              disabled={paying !== null}
              className={`tmp-modal-method-btn ${selectedMethod === m.id ? 'tmp-modal-method-active' : ''} ${paying !== null ? 'tmp-modal-disabled' : ''}`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {selectedMethod === 'manual' && (
          <p className='tmp-modal-manual-note'>
            {zh
              ? <>{'请转账至公司银行账户，并将转账凭证发送至 '}<a href='mailto:support@tokenmaster.com'>support@tokenmaster.com</a>{'。客服确认后为您充值。'}</>
              : <>{'Please transfer to our company bank account and email the receipt to '}<a href='mailto:support@tokenmaster.com'>support@tokenmaster.com</a>{'. We will credit your account upon confirmation.'}</>}
          </p>
        )}

        <div className='tmp-modal-actions'>
          <button className='tmp-modal-btn-cancel' onClick={onClose} disabled={paying !== null}>
            {zh ? '取消' : 'Cancel'}
          </button>
          <button className='tmp-modal-btn-pay' onClick={onPay} disabled={paying !== null || !selectedMethod || finalAmount < 1}>
            {paying === 'stripe'
              ? (zh ? '跳转支付中...' : 'Redirecting...')
              : paying === 'paypal'
                ? (zh ? '跳转 PayPal...' : 'Redirecting to PayPal...')
                : (zh ? `支付 $${finalAmount}` : `Pay $${finalAmount}`)}
          </button>
        </div>
      </div>
    </div>
  )
}

'''

main_comment = '/* ====================================================================='
idx = content.find(main_comment)
if idx == -1:
    print("ERROR: Cannot find main component marker")
    exit(1)

content = content[:idx] + payg_modal + content[idx:]
print("Added PaygPaymentModal")

# ---- 2. Add modal CSS styles ----
modal_css = '''
        /* ── Modal (shared for Package & PAYG) ── */
        .tmp-modal-overlay { position: fixed; inset: 0; z-index: 9999; display: flex;
          align-items: center; justify-content: center; background: rgba(0,0,0,.45); padding: 16px; }
        .tmp-modal-box { width: 100%; max-width: 440px; background: #fff; border-radius: 16px;
          padding: 32px 28px 28px; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
        .tmp-modal-box-lg { max-width: 500px; }
        .tmp-modal-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px;
          font-weight: 700; color: #191c1d; margin-bottom: 6px; }
        .tmp-modal-desc { font-size: 14px; color: #5a4138; margin-bottom: 20px; line-height: 1.5; }
        .tmp-modal-price-row { display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; background: #f7f3f0; border-radius: 10px; margin-bottom: 8px; }
        .tmp-modal-price-label { font-size: 14px; color: #5a4138; }
        .tmp-modal-price-value { font-family: 'Space Grotesk', sans-serif; font-size: 22px;
          font-weight: 700; color: #191c1d; }
        .tmp-modal-balance-row { display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px; border-top: 1px solid #e6d9d2; }
        .tmp-modal-balance-label { font-size: 13px; color: #5a4138; }
        .tmp-modal-balance-value { font-size: 18px; font-weight: 600; color: #16a34a; }
        .tmp-modal-bonus { text-align: center; padding: 8px; margin: 8px 0 16px;
          background: rgba(22,163,74,.08); border-radius: 8px; font-size: 13px; font-weight: 600; color: #15803d; }
        .tmp-modal-error { border: 1px solid #fca5a5; background: #fef2f2; color: #b91c1c;
          padding: 12px 16px; border-radius: 10px; font-size: 14px; margin-bottom: 16px; }
        .tmp-modal-method-label { display: block; font-size: 12px; font-weight: 600;
          text-transform: uppercase; letter-spacing: .05em; color: #5a4138; margin-bottom: 10px; margin-top: 4px; }
        .tmp-modal-methods { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
        .tmp-modal-method-btn { padding: 10px 18px; border-radius: 8px; border: 1px solid #e6d9d2;
          background: #fff; cursor: pointer; font-size: 14px; font-weight: 500;
          transition: all .2s; font-family: inherit; }
        .tmp-modal-method-btn:hover { border-color: #a43700; }
        .tmp-modal-method-active { border-color: #191c1d; background: rgba(0,0,0,.04); }
        .tmp-modal-disabled { opacity: .5; cursor: not-allowed; }
        .tmp-modal-manual-note { font-size: 13px; color: #5a4138; margin-bottom: 16px; line-height: 1.5; }
        .tmp-modal-actions { display: flex; gap: 12px; }
        .tmp-modal-btn-cancel { flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #e6d9d2;
          background: #fff; cursor: pointer; font-size: 15px; font-weight: 600; color: #5a4138;
          transition: all .2s; font-family: inherit; }
        .tmp-modal-btn-cancel:hover { background: #f7f3f0; }
        .tmp-modal-btn-pay { flex: 1; padding: 12px; border-radius: 10px; border: none;
          background: #dc2626; color: #fff; cursor: pointer; font-size: 15px; font-weight: 700;
          transition: all .2s; font-family: inherit; }
        .tmp-modal-btn-pay:hover:not(:disabled) { background: #b91c1c; }
        .tmp-modal-btn-pay:disabled { opacity: .5; cursor: not-allowed; }

        /* ── PAYG Modal extras ── */
        .tmp-payg-amounts { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
        .tmp-payg-amt-btn { min-width: 64px; padding: 10px 14px; border-radius: 8px;
          border: 1px solid #e6d9d2; background: #fff; cursor: pointer; font-size: 15px;
          font-weight: 600; color: #191c1d; transition: all .2s; font-family: inherit; }
        .tmp-payg-amt-btn:hover { border-color: #a43700; }
        .tmp-payg-amt-active { border-color: #191c1d; background: rgba(0,0,0,.05); }
        .tmp-payg-custom-row { display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
          padding: 12px 14px; background: #f7f3f0; border-radius: 10px; flex-wrap: wrap; }
        .tmp-payg-dollar { font-size: 20px; font-weight: 700; color: #191c1d; }
        .tmp-payg-custom-input { flex: 1; min-width: 120px; height: 38px; border: 1px solid #e6d9d2;
          border-radius: 6px; padding: 0 10px; font-size: 17px; font-weight: 600; color: #191c1d;
          outline: none; font-family: inherit; }
        .tmp-payg-custom-input:focus { border-color: #a43700; }
        .tmp-payg-balance-label { font-size: 13px; color: #5a4138; margin-left: auto; }
        .tmp-payg-balance-value { font-size: 18px; font-weight: 700; color: #16a34a; }

'''

# Insert modal CSS before /* ── Responsive ──
responsive_marker = '/* ── Responsive ── */'
resp_idx = content.find(responsive_marker)
if resp_idx == -1:
    print("ERROR: Cannot find Responsive CSS marker")
    exit(1)

content = content[:resp_idx] + modal_css + '\n' + content[resp_idx:]
print("Added modal CSS")

# ---- 3. Change PAYG behavior: open modal instead of inline panel ----
# Replace setShowTopup(true) with setPackageToPay(paygPlan)
old_payg = """    if (plan.id === 'payg') {
      // PAYG → open topup panel
      setShowTopup(true)
      setPackageToPay(null)
      if (availableMethods.length > 0) {
        setSelectedMethod(availableMethods[0].id)
      }
    }"""

new_payg = """    if (plan.id === 'payg') {
      // PAYG → open PAYG modal
      setShowPaygModal(true)
      setPackageToPay(null)
      if (availableMethods.length > 0) {
        setSelectedMethod(availableMethods[0].id)
      }
    }"""

if old_payg in content:
    content = content.replace(old_payg, new_payg)
    print("Changed PAYG click handler")
else:
    print("WARNING: Could not find PAYG handler pattern")
    print("Searching for partial...")
    if 'setShowTopup(true)' in content:
        print("Found setShowTopup(true)")
    else:
        print("NOT found setShowTopup(true)")

# ---- 4. Replace inline TopupPanel render with PaygPaymentModal ----
old_render_topup = '{/* ═══════ Topup Panel (PAYG) ═══════ */}\n        {showTopup && <TopupPanel />}'
new_render_modal = '{/* ═══════ PAYG Payment Modal ═══════ */}\n        {showPaygModal && (\n          <PaygPaymentModal\n            availableMethods={availableMethods}\n            selectedMethod={selectedMethod}\n            setSelectedMethod={setSelectedMethod}\n            paying={paying}\n            error={error}\n            topupAmount={topupAmount}\n            customAmount={customAmount}\n            setTopupAmount={setTopupAmount}\n            setCustomAmount={setCustomAmount}\n            onPay={handlePaygPayment}\n            onClose={() => { setShowPaygModal(false); setError(null) }}\n            zh={zh}\n          />\n        )}'

if old_render_topup in content:
    content = content.replace(old_render_topup, new_render_modal)
    print("Replaced TopupPanel render with PaygPaymentModal")
else:
    print("WARNING: Could not find TopupPanel render pattern")

# ---- 5. Add showPaygModal state ----
old_state = 'const [showTopup, setShowTopup] = useState(false)'
new_state = 'const [showPaygModal, setShowPaygModal] = useState(false)'
if old_state in content:
    content = content.replace(old_state, new_state)
    print("Replaced showTopup state with showPaygModal")
else:
    print("WARNING: Could not find showTopup state")

with open(r'D:\AI\new-api-source-clean\web\default\src\features\pricing\plans.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("All replacements done!")
