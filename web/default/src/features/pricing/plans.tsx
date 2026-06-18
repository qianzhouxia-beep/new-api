/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team - Recharge Packages Page (Kinetic Forge Light Design)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from '@tanstack/react-router'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth-store'
import { api } from '@/lib/api'

/* ── Types ── */
interface TopupInfo {
  enable_stripe_topup: boolean
  enable_online_topup: boolean
  enable_creem_topup: boolean
  enable_waffo_topup: boolean
  enable_waffo_pancake_topup: boolean
  enable_paypal_topup: boolean
  min_topup: number
  stripe_min_topup: number
  pay_methods: { name: string; type: string; min_topup?: string; icon?: string }[]
}

/* ── Constants ── */
const PRESET_AMOUNTS = [5, 10, 25, 50, 100, 200]

interface Plan {
  id: string
  nameZh: string
  nameEn: string
  priceZh: string
  priceEn: string
  descZh: string
  descEn: string
  featuresZh: string[]
  featuresEn: string[]
  highlight: boolean
  ctaZh: string
  ctaEn: string
  fixedAmount: number
  receiveAmount: number
  badgeZh?: string
  badgeEn?: string
}

const PACKAGES: Plan[] = [
  {
    id: 'trial',
    nameZh: '试玩包',
    nameEn: 'Trial',
    priceZh: '$9.9',
    priceEn: '$9.9',
    descZh: '适合轻度体验',
    descEn: 'For light users',
    featuresZh: ['支付 $9.9', '到账 $10.0', '适合个人开发者试用'],
    featuresEn: ['Pay $9.9', 'Get $10.0 balance', 'Great for trying out'],
    highlight: true,
    ctaZh: '立即购买',
    ctaEn: 'Buy Now',
    fixedAmount: 9.9,
    receiveAmount: 10.0,
    badgeZh: '多送 $0.1',
    badgeEn: 'Bonus $0.1',
  },
  {
    id: 'standard',
    nameZh: '标准包',
    nameEn: 'Standard',
    priceZh: '$29',
    priceEn: '$29',
    descZh: '适合个人开发者和团队',
    descEn: 'For individual devs and teams',
    featuresZh: ['支付 $29', '到账 $31.0', '所有模型可用'],
    featuresEn: ['Pay $29', 'Get $31.0 balance', 'Access all models'],
    highlight: false,
    ctaZh: '立即购买',
    ctaEn: 'Buy Now',
    fixedAmount: 29,
    receiveAmount: 31.0,
    badgeZh: '多送 $2',
    badgeEn: 'Bonus $2',
  },
  {
    id: 'value',
    nameZh: '超值包',
    nameEn: 'Value',
    priceZh: '$99',
    priceEn: '$99',
    descZh: '适合高频调用和商业项目',
    descEn: 'For high-frequency and business use',
    featuresZh: ['支付 $99', '到账 $110', '优先技术支持'],
    featuresEn: ['Pay $99', 'Get $110 balance', 'Priority support'],
    highlight: false,
    ctaZh: '立即购买',
    ctaEn: 'Buy Now',
    fixedAmount: 99,
    receiveAmount: 110,
    badgeZh: '多送 $11',
    badgeEn: 'Bonus $11',
  },
  {
    id: 'flagship',
    nameZh: '旗舰包',
    nameEn: 'Flagship',
    priceZh: '$299',
    priceEn: '$299',
    descZh: '企业级方案，最佳性价比',
    descEn: 'Enterprise-grade, best value',
    featuresZh: ['支付 $299', '到账 $350', '所有模型无限使用', '专属客户经理'],
    featuresEn: ['Pay $299', 'Get $350 balance', 'All models unlimited', 'Dedicated manager'],
    highlight: false,
    ctaZh: '立即购买',
    ctaEn: 'Buy Now',
    fixedAmount: 299,
    receiveAmount: 350,
    badgeZh: '多送 $51',
    badgeEn: 'Bonus $51',
  },
  {
    id: 'payg',
    nameZh: '按量付费',
    nameEn: 'Pay As You Go',
    priceZh: '最低 $1',
    priceEn: 'From $1',
    descZh: '充多少用多少，无需承诺',
    descEn: 'Top up and use, no commitment',
    featuresZh: ['随时充值，即时到账', '支持所有已配置模型', '余额永不过期'],
    featuresEn: ['Top up anytime', 'Access all models', 'Balance never expires'],
    highlight: false,
    ctaZh: '立即充值',
    ctaEn: 'Recharge Now',
    fixedAmount: 0,
    receiveAmount: 0,
  },
  {
    id: 'enterprise',
    nameZh: '联系我们',
    nameEn: 'Contact Us',
    priceZh: '定制方案',
    priceEn: 'Custom',
    descZh: '量身定制，专属部署',
    descEn: 'Custom solutions, dedicated deployment',
    featuresZh: ['定制使用配额', 'SLA 保障', '私有化部署选项', '专线技术支持'],
    featuresEn: ['Custom quotas', 'SLA guarantees', 'Private deployment', 'Dedicated support'],
    highlight: false,
    ctaZh: '联系我们',
    ctaEn: 'Contact Us',
    fixedAmount: 0,
    receiveAmount: 0,
  },
]

/* ── Pricing table data from design ── */
interface PricingTableRow {
  name: string
  input: string
  output: string
}

interface PricingTableGroup {
  group: string
  rows: PricingTableRow[]
}

const PRICING_TABLE_GROUPS: PricingTableGroup[] = [
  {
    group: 'DEEPSEEK ECOSYSTEM',
    rows: [
      { name: 'DeepSeek V4 Flash', input: '$0.07', output: '$0.21' },
      { name: 'DeepSeek V4 Pro', input: '$0.14', output: '$0.28' },
      { name: 'DeepSeek Chat', input: '$0.10', output: '$0.20' },
      { name: 'DeepSeek R1 (Reasoning)', input: '$0.55', output: '$2.19' },
    ],
  },
  {
    group: 'GLM (GENERAL LANGUAGE MODEL)',
    rows: [
      { name: 'GLM 4.7-Flash', input: '$0.08', output: '$0.16' },
      { name: 'GLM 4.5-Air', input: '$0.12', output: '$0.24' },
      { name: 'GLM 4V-Vision', input: '$0.60', output: '$0.60' },
    ],
  },
  {
    group: 'QWEN (ALIBABA CLOUD)',
    rows: [
      { name: 'Qwen Max 3.7', input: '$1.20', output: '$4.00' },
      { name: 'Qwen Plus 3.7', input: '$0.40', output: '$1.20' },
      { name: 'Qwen 3.5-Plus', input: '$0.30', output: '$0.90' },
      { name: 'Qwen Flash 3.5', input: '$0.05', output: '$0.10' },
      { name: 'Qwen Turbo 3.5', input: '$0.15', output: '$0.45' },
      { name: 'Qwen Long 3.5', input: '$0.25', output: '$0.75' },
    ],
  },
]

/* ── Billing FAQ data (bilingual) ── */
interface FaqItem {
  qZh: string
  qEn: string
  aZh: string
  aEn: string
}

const FAQS: FaqItem[] = [
  {
    qZh: '计费是怎么运作的？',
    qEn: 'How does billing work?',
    aZh: 'TokenMaster 采用预付费信用模式。您先充值到钱包，使用各种模型的 API 时，我们计算所用 token 并从余额中扣除等值美元金额。',
    aEn: 'TokenMaster operates on a prepaid credits model. You add funds to your wallet, and as you make API requests to various models, we calculate the tokens used and deduct the equivalent USD amount from your balance.',
  },
  {
    qZh: '余额会过期吗？',
    qEn: 'Does my balance expire?',
    aZh: '不会。充值后余额永久有效。我们不强迫用户在特定时间内用完信用额度。',
    aEn: 'No. Once you top up your account, the balance remains valid indefinitely. We do not believe in forcing users to use credits within a specific timeframe.',
  },
  {
    qZh: '我能查看使用记录吗？',
    qEn: 'Can I see my usage history?',
    aZh: '当然。Analytics 仪表盘提供每秒级别的使用量、模型类型和费用详情。您还可以导出 CSV 或 JSON 日志用于内部审计。',
    aEn: 'Absolutely. The Analytics dashboard provides per-second resolution on usage, model types, and costs. You can also export these logs as CSV or JSON for internal auditing.',
  },
  {
    qZh: '支持哪些支付方式？',
    qEn: 'What payment methods are supported?',
    aZh: '我们支持所有主流信用卡、Stripe 和 PayPal。对于月消费 $5,000 以上的企业客户，还支持电汇和企业发票。',
    aEn: 'We support all major Credit Cards, Stripe, and PayPal. For industrial clients with higher volume needs (+$5k/month), we also support wire transfers and corporate invoicing.',
  },
  {
    qZh: 'API 兼容 OpenAI 吗？',
    qEn: 'Is the API OpenAI-compatible?',
    aZh: '完全兼容 OpenAI 格式。您可以使用现有的 OpenAI SDK，只需将 base_url 改为 api.tokenmaster.com。',
    aEn: 'Yes, fully compatible. Use your existing OpenAI SDK and change the base_url to api.tokenmaster.com.',
  },
  {
    qZh: '支持退款吗？',
    qEn: 'Do you offer refunds?',
    aZh: '首次购买 7 天内可全额退款。之后按实际使用量扣除后退还余额。请联系 support@tokenmaster.com。',
    aEn: 'Full refund within 7 days of first purchase. After that, pro-rated. Email support@tokenmaster.com.',
  },
]

/* ── helpers ── */
function s(zh: string, en: string, isZh: boolean) {
  return isZh ? zh : en
}

/**
 * Call the Stripe pay API and return the checkout URL.
 * Returns null on error so the UI can show feedback.
 */
async function payViaStripe(amount: number): Promise<string | null> {
  try {
    const res = await api.post(
      '/api/user/stripe/pay',
      {
        amount: amount,
        payment_method: 'stripe',
        success_url: window.location.origin + '/plans?status=success',
        cancel_url: window.location.origin + '/plans?status=cancel',
      },
      { skipBusinessError: true } as Record<string, unknown>,
    )
    const body = res.data as { success?: boolean; data?: { pay_link?: string } }
    if (body.data?.pay_link) return body.data.pay_link
    return null
  } catch {
    return null
  }
}

/* ── Inline SVG Icons ── */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a43700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function PersonAddIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a43700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="17" y1="11" x2="23" y2="11" />
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a43700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
      <circle cx="18" cy="15" r="1" />
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a43700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function ExpandMoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a43700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

/* ── Payment Status Banner ── */
function PaymentStatusBanner({
  status,
  onDismiss,
}: {
  status: 'success' | 'cancel'
  onDismiss: () => void
}) {
  const { t } = useTranslation()
  const isSuccess = status === 'success'
  return (
    <div
      className={`mx-auto mb-6 flex max-w-2xl items-center justify-between rounded-xl border px-5 py-4 ${
        isSuccess
          ? 'border-green-300 bg-green-50 text-green-800 dark:border-green-600 dark:bg-green-950 dark:text-green-300'
          : 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-300'
      }`}
    >
      <span className='text-sm font-medium'>
        {isSuccess
          ? t('Payment successful! Balance has been added to your account.')
          : t('Payment was cancelled. No charges were made.')}
      </span>
      <button
        onClick={onDismiss}
        className='ml-4 shrink-0 text-sm underline-offset-2 hover:underline'
      >
        {t('Dismiss')}
      </button>
    </div>
  )
}

/* ── Package Payment Modal ── */
function PackagePaymentModal({
  pkg,
  availableMethods,
  selectedMethod,
  setSelectedMethod,
  paying,
  error,
  onPay,
  onClose,
  zh,
}: {
  pkg: Plan
  availableMethods: { id: string; name: string }[]
  selectedMethod: string | null
  setSelectedMethod: (id: string) => void
  paying: string | null
  error: string | null
  onPay: () => void
  onClose: () => void
  zh: boolean
}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
      <div className='w-full max-w-md rounded-2xl border bg-background p-6 shadow-2xl'>
        <h3 className='mb-1 text-xl font-bold text-foreground'>
          {zh ? pkg.nameZh : pkg.nameEn}
        </h3>
        <p className='text-muted-foreground mb-4 text-sm'>
          {zh ? pkg.descZh : pkg.descEn}
        </p>

        <div className='mb-5 rounded-xl border bg-muted/10 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground text-sm'>
              {zh ? '支付' : 'Pay'}
            </span>
            <span className='text-xl font-bold text-foreground'>
              ${pkg.fixedAmount}
            </span>
          </div>
          <div className='mt-2 flex items-center justify-between border-t border-border pt-2'>
            <span className='text-muted-foreground text-sm'>
              {zh ? '到账余额' : 'Balance received'}
            </span>
            <span className='text-lg font-semibold text-green-600 dark:text-green-400'>
              ${pkg.receiveAmount.toFixed(1)}
            </span>
          </div>
          {pkg.receiveAmount > pkg.fixedAmount && (
            <div className='mt-2 rounded-lg bg-green-50 px-3 py-1.5 text-center text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300'>
              🎉 {zh ? `多送 $${(pkg.receiveAmount - pkg.fixedAmount).toFixed(1)}` : `Bonus $${(pkg.receiveAmount - pkg.fixedAmount).toFixed(1)}`}
            </div>
          )}
        </div>

        {error && (
          <div className='mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-600 dark:bg-red-950 dark:text-red-300'>
            {error}
          </div>
        )}

        <label className='text-muted-foreground mb-2 block text-xs font-medium uppercase tracking-wider'>
          {zh ? '支付方式' : 'Payment Method'}
        </label>
        <div className='mb-6 flex flex-wrap gap-2'>
          {availableMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              disabled={paying !== null}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                selectedMethod === m.id
                  ? 'border-foreground bg-foreground/5 dark:border-foreground dark:bg-foreground/10'
                  : 'border-border hover:border-primary/50'
              } ${paying !== null ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className='flex gap-3'>
          <Button variant='outline' onClick={onClose} className='flex-1' disabled={paying !== null}>
            {zh ? '取消' : 'Cancel'}
          </Button>
          <Button onClick={onPay} className='flex-1' disabled={paying !== null || !selectedMethod}>
            {paying === 'stripe'
              ? (zh ? '跳转支付中...' : 'Redirecting...')
              : paying === 'paypal'
                ? (zh ? '跳转 PayPal...' : 'Redirecting...')
                : (zh ? `支付 $${pkg.fixedAmount}` : `Pay $${pkg.fixedAmount}`)}
          </Button>
        </div>
      </div>
    </div>
  )
}

/* =====================================================================
   Main Plans Page Component (Kinetic Forge Light Design)
   ===================================================================== */
export function PricingPlansPage() {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const zh = i18n.language.startsWith('zh')

  /* ── Payment status from URL ── */
  const urlParams = new URLSearchParams(window.location.search)
  const paymentStatus = (urlParams.get('status') || '') as 'success' | 'cancel' | ''
  const [dismissedStatus, setDismissedStatus] = useState(false)

  useEffect(() => {
    if (paymentStatus && !dismissedStatus) {
      const timeout = setTimeout(() => setDismissedStatus(true), 8000)
      return () => clearTimeout(timeout)
    }
  }, [paymentStatus, dismissedStatus])

  /* ── State ── */
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showTopup, setShowTopup] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [topupAmount, setTopupAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')
  const [topupInfo, setTopupInfo] = useState<TopupInfo | null>(null)
  const [topupLoading, setTopupLoading] = useState(false)
  const [paying, setPaying] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  /* ── Package payment modal state ── */
  const [packageToPay, setPackageToPay] = useState<Plan | null>(null)

  /* ── Fetch topup info (dynamic payment methods) ── */
  useEffect(() => {
    if (!auth?.user) return
    let cancelled = false
    setTopupLoading(true)
    api
      .get<TopupInfo>('/api/user/topup/info')
      .then((res) => {
        if (!cancelled) {
          setTopupInfo(res.data as unknown as TopupInfo)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setTopupLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [auth?.user])

  /* ── Build dynamic payment methods list ── */
  const availableMethods: { id: string; name: string }[] = []
  if (topupInfo?.enable_stripe_topup) {
    availableMethods.push({
      id: 'stripe',
      name: zh ? 'Stripe（信用卡）' : 'Stripe (Credit Card)',
    })
  }
  if (topupInfo?.enable_online_topup) {
    availableMethods.push({
      id: 'epay',
      name: zh ? '支付宝/微信' : 'Alipay/WeChat',
    })
  }
  if (topupInfo?.enable_creem_topup) {
    availableMethods.push({ id: 'creem', name: 'Creem (Crypto)' })
  }
  if (topupInfo?.enable_paypal_topup) {
    availableMethods.push({ id: 'paypal', name: 'PayPal' })
  }
  if (availableMethods.length === 0) {
    availableMethods.push({
      id: 'manual',
      name: zh ? '人工转账' : 'Manual Transfer',
    })
  }

  /* ── Payment handlers ── */
  const doStripePayment = useCallback(
    async (amount: number) => {
      setPaying('stripe')
      setError(null)
      const payLink = await payViaStripe(amount)
      if (!payLink) {
        setError(
          zh
            ? '拉起 Stripe 支付失败，请稍后重试或联系客服。'
            : 'Failed to initiate Stripe payment. Please try again or contact support.',
        )
        setPaying(null)
        return
      }
      window.location.href = payLink
    },
    [zh],
  )

  const doPayPalPayment = useCallback(
    async (amount: number) => {
      setPaying('paypal')
      setError(null)
      try {
        const res = await api.post(
          '/api/user/paypal/pay',
          {
            amount: amount,
            success_url: window.location.origin + '/plans?status=success',
            cancel_url: window.location.origin + '/plans?status=cancel',
          },
          { skipBusinessError: true } as Record<string, unknown>,
        )
        const body = res.data as {
          message?: string
          data?: { pay_link?: string }
        }
        if (body.data?.pay_link) {
          window.location.href = body.data.pay_link
          return
        }
        setError(
          zh
            ? '拉起 PayPal 支付失败，请稍后重试。'
            : 'Failed to initiate PayPal payment. Please try again.',
        )
        setPaying(null)
      } catch {
        setError(
          zh
            ? '拉起 PayPal 支付失败，请稍后重试。'
            : 'Failed to initiate PayPal payment. Please try again.',
        )
        setPaying(null)
      }
    },
    [zh],
  )

  /* ── Entry point for plan button clicks ── */
  function handlePlanClick(plan: Plan) {
    setSelectedPlan(plan.id)
    setError(null)

    if (plan.id === 'enterprise') {
      window.open(
        'mailto:support@tokenmaster.com?subject=Enterprise Plan Inquiry',
        '_blank',
      )
      return
    }

    // Not logged in -> redirect to signup
    if (!auth?.user) {
      navigate({ to: '/sign-up', search: { redirect: '/plans' } })
      return
    }

    if (plan.id === 'payg') {
      // PAYG → open topup panel
      setShowTopup(true)
      setPackageToPay(null)
      if (availableMethods.length > 0) {
        setSelectedMethod(availableMethods[0].id)
      }
    } else {
      // Recharge package → open payment modal with fixed amount
      setPackageToPay(plan)
      setShowTopup(false)
      if (availableMethods.length > 0) {
        setSelectedMethod(availableMethods[0].id)
      }
    }
  }

  function handlePackagePayment() {
    if (!packageToPay) return
    const amount = packageToPay.fixedAmount

    if (!auth?.user) {
      navigate({ to: '/sign-up', search: { redirect: '/plans' } })
      return
    }

    if (selectedMethod === 'stripe') {
      doStripePayment(amount)
    } else if (selectedMethod === 'paypal') {
      doPayPalPayment(amount)
    } else if (selectedMethod === 'manual') {
      setError(
        zh
          ? '人工转账 - 请联系客服完成充值。'
          : 'Manual transfer - please contact support to complete.',
      )
    } else {
      setError(
        zh
          ? '该支付方式暂未开通，请选择其他方式。'
          : 'This payment method is not yet available. Please choose another.',
      )
    }
  }

  function handlePaygPayment() {
    const amount = customAmount ? parseInt(customAmount) : topupAmount
    if (!amount || amount < 1) return
    if (!auth?.user) {
      navigate({ to: '/sign-up', search: { redirect: '/plans' } })
      return
    }
    if (selectedMethod === 'stripe') {
      doStripePayment(amount)
    } else if (selectedMethod === 'paypal') {
      doPayPalPayment(amount)
    } else if (selectedMethod === 'manual') {
      setError(
        zh
          ? '人工转账 - 请联系客服完成充值。'
          : 'Manual transfer - please contact support to complete.',
      )
    } else {
      setError(
        zh
          ? '该支付方式暂未开通，请选择其他方式。'
          : 'This payment method is not yet available. Please choose another.',
      )
    }
  }

  /* ── Topup Interface (PAYG only) ── */
  function TopupPanel() {
    if (!auth?.user) {
      return (
        <div className="tmp-topup-unauthed">
          <h2 className="tmp-faq-title">{zh ? '登录后即可充值' : 'Sign in to top up'}</h2>
          <p className="tmp-topup-desc">{zh ? '已有账号？登录后选择金额和支付方式。还没有账号？先注册，再充值。' : 'Already have an account? Sign in to continue. New here? Sign up first.'}</p>
          <div className="tmp-topup-auth-btns">
            <Button onClick={() => navigate({ to: '/sign-in', search: { redirect: '/plans' } })}>
              {zh ? '登录' : 'Sign In'}
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: '/sign-up', search: { redirect: '/plans' } })}>
              {zh ? '注册' : 'Sign Up'}
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="tmp-topup-section">
        {error && (
          <div className="tmp-topup-error">{error}</div>
        )}

        <h2 className="tmp-faq-title">{zh ? '自定义充值' : 'Custom Top Up'}</h2>

        <div className="tmp-topup-row">
          <label className="tmp-topup-label">{zh ? '选择金额' : 'Select Amount'}</label>
          <div className="tmp-topup-amounts">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setTopupAmount(amt)
                  setCustomAmount('')
                }}
                className={`tmp-topup-amt-btn ${topupAmount === amt && !customAmount ? 'tmp-topup-amt-active' : ''}`}
              >
                <div className="tmp-topup-amt-value">${amt}</div>
                <div className="tmp-topup-amt-label">${amt}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="tmp-topup-row">
          <Label htmlFor="custom-amount-input" className="tmp-topup-label">
            {zh ? '自定义金额' : 'Custom Amount'}
          </Label>
          <div className="tmp-topup-custom-wrap">
            <span className="tmp-topup-dollar">$</span>
            <Input
              id="custom-amount-input"
              type="number"
              min={1}
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setTopupAmount(0)
              }}
              placeholder="10"
              className="tmp-topup-custom-input"
            />
          </div>
        </div>

        <div className="tmp-topup-row">
          <label className="tmp-topup-label">{zh ? '支付方式' : 'Payment Method'}</label>
          <div className="tmp-topup-methods">
            {availableMethods.length > 0
              ? availableMethods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    disabled={paying !== null}
                    className={`tmp-topup-method-btn ${selectedMethod === m.id ? 'tmp-topup-method-active' : ''} ${paying !== null ? 'tmp-topup-disabled' : ''}`}
                  >
                    {m.name}
                  </button>
                ))
              : topupLoading && (
                  <span className="tmp-topup-loading">{zh ? '加载中...' : 'Loading...'}</span>
                )}
          </div>

          {selectedMethod === 'manual' && (
            <p className="tmp-topup-manual-note">
              {zh
                ? '请转账至公司银行账户，并将转账凭证发送至 support@tokenmaster.com。客服确认后为您充值。'
                : 'Please transfer to our company bank account and email the receipt to support@tokenmaster.com. We will credit your account upon confirmation.'}
            </p>
          )}
        </div>

        <div className="tmp-topup-footer-bar">
          <div className="tmp-topup-footer-info">
            <span className="tmp-topup-footer-label">{zh ? '到账' : 'You get'}: </span>
            <span className="tmp-topup-footer-amount">${customAmount ? parseInt(customAmount) || 0 : topupAmount}</span>
          </div>
          <Button onClick={handlePaygPayment} size="lg" disabled={paying !== null}>
            {paying === 'stripe'
              ? (zh ? '跳转支付中...' : 'Redirecting...')
              : paying === 'paypal'
                ? (zh ? '跳转 PayPal...' : 'Redirecting to PayPal...')
                : (zh ? '确认支付' : 'Pay Now')}
          </Button>
        </div>
      </div>
    )
  }

  /* ── Render ── */
  return (
    <PublicLayout showMainContainer={false}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');

        .tm-plans { font-family: 'Inter', -apple-system, sans-serif; color: #191c1d; background: #f7f3f0; line-height: 1.6; }
        .tm-plans * { box-sizing: border-box; margin: 0; padding: 0; }
        .tm-plans a { color: #a43700; text-decoration: none; transition: color .2s; }
        .tm-plans a:hover { color: #cd4700; }

        /* ── Hero ── */
        .tmp-hero { text-align: center; padding: 80px 24px 40px; max-width: 1440px; margin: 0 auto; }
        .tmp-hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 4px 16px;
          border-radius: 9999px; background: rgba(164,55,0,.1); color: #a43700;
          font-family: 'Space Grotesk', sans-serif; font-size: 14px; letter-spacing: .05em;
          font-weight: 600; margin-bottom: 24px; border: 1px solid rgba(164,55,0,.2); }
        .tmp-hero h1 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px,5vw,48px); line-height: 1.15; letter-spacing: -.02em;
          font-weight: 700; color: #191c1d; margin-bottom: 16px; }
        .tmp-hero p { font-size: clamp(16px,1.6vw,18px); line-height: 1.7; color: #5a4138;
          max-width: 640px; margin: 0 auto 24px; }
        .tmp-hero-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; margin-bottom: 40px; }
        .tmp-hero-pill { display: flex; align-items: center; gap: 8px; background: #fff;
          padding: 4px; padding-right: 16px; border-radius: 9999px; border: 1px solid #e6d9d2; }
        .tmp-hero-pill-tag { padding: 4px 8px; background: #e7e8e9; border-radius: 9999px;
          font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; }
        .tmp-hero-pill-text { font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; color: #5a4138; letter-spacing: .04em; }

        /* ── Plan Cards Grid ── */
        .tmp-cards { max-width: 1440px; margin: 0 auto; padding: 0 24px 40px; }
        .tmp-cards-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .tmp-card { display: flex; flex-direction: column; background: #fff; padding: 24px;
          border-radius: 10px; position: relative; transition: border-color .3s, box-shadow .3s; }
        .tmp-card-highlight { border: 2px solid #a43700; box-shadow: 0 4px 24px rgba(164,55,0,.12); }
        .tmp-card-default { border: 1px solid #e6d9d2; }
        .tmp-card:hover { border-color: #a43700; }
        .tmp-card-badges { position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 4px; z-index: 2; }
        .tmp-card-popular { background: #a43700; color: #fff; padding: 2px 12px; border-radius: 9999px;
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em;
          font-family: 'Space Grotesk', sans-serif; white-space: nowrap; }
        .tmp-card-bonus { background: #22C55E; color: #fff; padding: 2px 12px; border-radius: 9999px;
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em;
          font-family: 'Space Grotesk', sans-serif; white-space: nowrap; }
        .tmp-card-badge-right { position: absolute; top: -12px; right: 16px; z-index: 2; }
        .tmp-card h3 { font-family: 'Space Grotesk', sans-serif;
          font-size: 24px; line-height: 1.3; font-weight: 500; margin-bottom: 16px; }
        .tmp-card-price-wrap { margin-bottom: 16px; }
        .tmp-card-price { font-family: 'Space Grotesk', sans-serif;
          font-size: 32px; line-height: 1.2; font-weight: 700; color: #191c1d;
          display: flex; align-items: baseline; gap: 8px; }
        .tmp-card-original { color: #5a4138; text-decoration: line-through; font-size: 16px; font-weight: 400; }
        .tmp-card-balance { color: #22C55E; font-weight: 700; font-size: 14px; margin-top: 2px; }
        .tmp-card-desc { color: #5a4138; font-size: 14px; margin-top: 4px; }
        .tmp-card-features { list-style: none; margin-bottom: 24px; flex-grow: 1; }
        .tmp-card-features li { display: flex; align-items: center; gap: 8px; margin-bottom: 8px;
          font-size: 14px; color: #191c1d; }
        .tmp-card-btn { width: 100%; padding: 8px; border-radius: 9999px;
          font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all .2s; border: none; }
        .tmp-card-btn-primary { background: #a43700; color: #fff; }
        .tmp-card-btn-primary:hover { background: #cd4700; }
        .tmp-card-btn-outline { background: transparent; color: #191c1d; border: 1px solid #e6d9d2; }
        .tmp-card-btn-outline:hover { background: #f3f4f5; }

        /* ── Pricing Table ── */
        .tmp-table-wrap { max-width: 1440px; margin: 0 auto 40px; padding: 0 24px; }
        .tmp-table-inner { background: #fff; border-radius: 10px; border: 1px solid #e6d9d2; overflow: hidden; }
        .tmp-table-scroll { overflow-x: auto; }
        .tmp-table { width: 100%; border-collapse: collapse; text-align: left; }
        .tmp-table thead th { padding: 16px; font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 600; color: #191c1d; text-transform: uppercase;
          letter-spacing: .05em; border-bottom: 2px solid #e6d9d2; background: #f3f4f5;
          position: sticky; top: 0; z-index: 10; }
        .tmp-table tbody td { padding: 16px; border-bottom: 1px solid #e6d9d2; }
        .tmp-table .tmp-table-zebra { background: #F9FAFB; }
        .tmp-table tbody tr:hover { background: #f3f4f5; }
        .tmp-table .tmp-table-group td { padding: 8px 16px; font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 700; color: #a43700;
          border-bottom: 1px solid #e6d9d2; background: #fff;
          position: sticky; top: 48px; z-index: 5; }
        .tmp-table .tmp-model-name { font-weight: 500; color: #191c1d; }
        .tmp-table .tmp-model-price { font-family: 'JetBrains Mono', monospace; font-size: 14px; color: #191c1d; }

        /* ── How It Works ── */
        .tmp-how { max-width: 1440px; margin: 0 auto; padding: 40px 24px; }
        .tmp-how-header { text-align: center; margin-bottom: 24px; }
        .tmp-how-header h2 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(24px,3vw,32px); line-height: 1.25; letter-spacing: -.01em;
          font-weight: 600; color: #191c1d; margin-bottom: 8px; }
        .tmp-how-header p { color: #5a4138; font-size: 16px; }
        .tmp-how-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .tmp-how-card { background: #fff; padding: 24px; border-radius: 10px;
          border: 1px solid #e6d9d2; transition: border-color .3s; }
        .tmp-how-card:hover { border-color: #a43700; }
        .tmp-how-icon { width: 48px; height: 48px; background: rgba(164,55,0,.1);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px; transition: background .3s; }
        .tmp-how-card:hover .tmp-how-icon { background: #a43700; }
        .tmp-how-card:hover .tmp-how-icon svg { stroke: #fff; }
        .tmp-how-card h3 { font-family: 'Space Grotesk', sans-serif;
          font-size: 24px; line-height: 1.3; font-weight: 500; margin-bottom: 8px;
          color: #191c1d; }
        .tmp-how-card p { color: #5a4138; font-size: 15px; line-height: 1.65; }

        /* ── FAQ ── */
        .tmp-faq { max-width: 768px; margin: 0 auto; padding: 40px 24px; border-top: 1px solid #e6d9d2; }
        .tmp-faq-title { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(24px,3vw,32px); line-height: 1.25; letter-spacing: -.01em;
          font-weight: 600; color: #191c1d; text-align: center; margin-bottom: 24px; }
        .tmp-faq-list { display: flex; flex-direction: column; gap: 16px; }
        .tmp-faq-item { background: #fff; border-radius: 10px; border: 1px solid #e6d9d2; overflow: hidden; }
        .tmp-faq-summary { padding: 16px; font-weight: 600; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          list-style: none; font-size: 15px; color: #191c1d;
          transition: background .2s; user-select: none; }
        .tmp-faq-summary::-webkit-details-marker { display: none; }
        .tmp-faq-summary::-moz-list-bullet { display: none; }
        .tmp-faq-summary:hover { background: #f3f4f5; }
        .tmp-faq-arrow { transition: transform .2s; }
        .tmp-faq-item[open] .tmp-faq-arrow { transform: rotate(180deg); }
        .tmp-faq-answer { padding: 16px; border-top: 1px solid #e6d9d2; color: #5a4138; font-size: 15px; line-height: 1.65; }

        /* ── CTA ── */
        .tmp-cta { max-width: 1440px; margin: 0 auto 40px; padding: 0 24px; }
        .tmp-cta-box { background: #2e3132; color: #fff; border-radius: 12px;
          padding: 40px 24px; text-align: center; position: relative; overflow: hidden; }
        .tmp-cta-glow { position: absolute; top: -80px; right: -80px; width: 256px; height: 256px;
          background: rgba(164,55,0,.25); filter: blur(100px); pointer-events: none; }
        .tmp-cta-content { position: relative; z-index: 10; display: flex;
          flex-direction: column; align-items: center; }
        .tmp-cta h2 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(26px,4vw,40px); line-height: 1.2; font-weight: 600;
          margin-bottom: 20px; color: #fff; }
        .tmp-cta p { color: rgba(255,255,255,.8); font-size: clamp(15px,1.7vw,18px);
          line-height: 1.65; max-width: 640px; margin-bottom: 36px; }
        .tmp-cta-btn { display: inline-block; background: #a43700; color: #fff !important;
          padding: 15px 38px; font-family: 'Space Grotesk', sans-serif; font-size: 16px;
          font-weight: 600; border-radius: 8px; border: none; cursor: pointer;
          transition: all .2s; text-decoration: none !important;
          box-shadow: 0 10px 25px rgba(164,55,0,.2); }
        .tmp-cta-btn:hover { background: #cd4700; transform: scale(1.04); }

        /* ── Footer ── */
        .tmp-footer { background: #fff; border-top: 1px solid #e6d9d2; padding: 40px 24px; }
        .tmp-footer-inner { max-width: 1440px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 16px; align-items: center; }
        .tmp-footer-brand { font-family: 'Space Grotesk', sans-serif;
          font-size: 24px; font-weight: 600; color: #191c1d; }
        .tmp-footer-copy { font-size: 15px; color: #5a4138; text-align: center; }
        .tmp-footer-nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
        .tmp-footer-nav a { font-size: 15px; color: #5a4138; transition: color .2s; }
        .tmp-footer-nav a:hover { color: #a43700; }

        /* ── Topup Panel ── */
        .tmp-topup-section { max-width: 768px; margin: 0 auto 40px; padding: 24px;
          background: #fff; border: 1px solid #e6d9d2; border-radius: 10px; }
        .tmp-topup-unauthed { max-width: 768px; margin: 0 auto 40px; padding: 40px 24px;
          text-align: center; border: 1px solid #e6d9d2; border-radius: 10px; background: #fff; }
        .tmp-topup-unauthed .tmp-faq-title { font-size: 24px; }
        .tmp-topup-desc { color: #5a4138; font-size: 15px; margin: 12px auto 24px; max-width: 480px; }
        .tmp-topup-auth-btns { display: flex; gap: 16px; justify-content: center; }
        .tmp-topup-error { border: 1px solid #fca5a5; background: #fef2f2; color: #b91c1c;
          padding: 12px 16px; border-radius: 10px; font-size: 14px; margin-bottom: 24px; }
        .tmp-topup-row { margin-bottom: 24px; }
        .tmp-topup-label { display: block; font-size: 12px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .05em; color: #5a4138; margin-bottom: 8px; }
        .tmp-topup-amounts { display: flex; flex-wrap: wrap; gap: 12px; }
        .tmp-topup-amt-btn { min-width: 100px; padding: 12px; border-radius: 8px;
          border: 1px solid #e6d9d2; background: #fff; cursor: pointer;
          text-align: center; transition: all .2s; }
        .tmp-topup-amt-btn:hover { border-color: #a43700; }
        .tmp-topup-amt-active { border-color: #191c1d; background: rgba(0,0,0,.05); }
        .tmp-topup-amt-value { font-size: 18px; font-weight: 700; color: #191c1d; }
        .tmp-topup-amt-label { font-size: 12px; color: #5a4138; margin-top: 2px; }
        .tmp-topup-custom-wrap { display: flex; align-items: center; gap: 8px; max-width: 280px; }
        .tmp-topup-dollar { font-size: 18px; font-weight: 600; color: #191c1d; }
        .tmp-topup-custom-input { height: 40px; font-size: 18px; }
        .tmp-topup-methods { display: flex; flex-wrap: wrap; gap: 12px; }
        .tmp-topup-method-btn { padding: 10px 16px; border-radius: 8px;
          border: 1px solid #e6d9d2; background: #fff; cursor: pointer;
          font-size: 14px; font-weight: 500; transition: all .2s; }
        .tmp-topup-method-btn:hover { border-color: #a43700; }
        .tmp-topup-method-active { border-color: #191c1d; background: rgba(0,0,0,.05); }
        .tmp-topup-disabled { opacity: .5; cursor: not-allowed; }
        .tmp-topup-loading { font-size: 14px; color: #5a4138; font-style: italic; }
        .tmp-topup-manual-note { color: #5a4138; font-size: 13px; margin-top: 8px; line-height: 1.6; }
        .tmp-topup-footer-bar { display: flex; align-items: center; justify-content: space-between;
          padding: 16px; border: 1px solid #e6d9d2; border-radius: 10px;
          background: rgba(0,0,0,.02); flex-wrap: wrap; gap: 12px; }
        .tmp-topup-footer-label { color: #5a4138; font-size: 14px; }
        .tmp-topup-footer-amount { font-size: 24px; font-weight: 700; color: #191c1d; }

        /* ── Responsive ── */
        @media (min-width: 640px) {
          .tmp-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .tmp-how-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .tmp-cards-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1280px) {
          .tmp-hero { padding: 40px 96px; }
          .tmp-cards { padding: 0 96px 40px; }
          .tmp-table-wrap { padding: 0 96px; }
          .tmp-how { padding: 40px 96px; }
          .tmp-faq { padding: 40px 96px; }
          .tmp-cta { padding: 0 96px; }
          .tmp-footer-inner { flex-direction: row; justify-content: space-between; }
          .tmp-footer-inner > div:first-child { align-items: flex-start; }
          .tmp-footer-copy { text-align: left; }
        }
      `}</style>

      <div className="tm-plans">
        {/* ═══════ Payment Status Banner ═══════ */}
        {paymentStatus && !dismissedStatus && (
          <div className="tmp-hero">
            <PaymentStatusBanner
              status={paymentStatus}
              onDismiss={() => setDismissedStatus(true)}
            />
          </div>
        )}

        {/* ═══════ Hero ═══════ */}
        <section className="tmp-hero">
          <span className="tmp-hero-badge">✨ {t('Transparent Pricing')}</span>
          <h1>{t('Simple, usage-based pricing')}</h1>
          <p>{t('All prices in USD. No subscriptions. Pay only for tokens you use. High-precision infrastructure for industrial-grade AI development.')}</p>
          <div className="tmp-hero-pills">
            <div className="tmp-hero-pill">
              <span className="tmp-hero-pill-tag">DeepSeek</span>
              <span className="tmp-hero-pill-text">{t('V4 Flash, V4 Pro, R1')}</span>
            </div>
            <div className="tmp-hero-pill">
              <span className="tmp-hero-pill-tag">GLM</span>
              <span className="tmp-hero-pill-text">{t('4.7-Flash, 4.5-Air')}</span>
            </div>
            <div className="tmp-hero-pill">
              <span className="tmp-hero-pill-tag">Qwen</span>
              <span className="tmp-hero-pill-text">{t('3.7-Max, 3.7-Plus')}</span>
            </div>
          </div>
        </section>

        {/* ═══════ Plan Cards ═══════ */}
        <section className="tmp-cards">
          <div className="tmp-cards-grid">
            {PACKAGES.map((plan) => (
              <div
                key={plan.id}
                className={`tmp-card ${plan.highlight ? 'tmp-card-highlight' : 'tmp-card-default'} ${selectedPlan === plan.id ? 'tmp-card-highlight' : ''}`}
              >
                {/* Badges: left-center (Most Popular + Bonus) for Trial, right for others */}
                {plan.highlight && (
                  <div className="tmp-card-badges">
                    <span className="tmp-card-popular">{t('Most Popular')}</span>
                    {plan.badgeEn && (
                      <span className="tmp-card-bonus">{zh ? plan.badgeZh : plan.badgeEn}</span>
                    )}
                  </div>
                )}
                {!plan.highlight && plan.badgeEn && (
                  <div className="tmp-card-badge-right">
                    <span className="tmp-card-bonus">{zh ? plan.badgeZh : plan.badgeEn}</span>
                  </div>
                )}

                <h3>{zh ? plan.nameZh : plan.nameEn}</h3>

                <div className="tmp-card-price-wrap">
                  <div className="tmp-card-price">
                    <span>{zh ? plan.priceZh : plan.priceEn}</span>
                    {plan.id !== 'payg' && plan.id !== 'enterprise' && plan.receiveAmount > plan.fixedAmount && (
                      <span className="tmp-card-original">${plan.receiveAmount.toFixed(1)}</span>
                    )}
                  </div>
                  {plan.id !== 'payg' && plan.id !== 'enterprise' && plan.fixedAmount > 0 && (
                    <p className="tmp-card-balance">{t('Balance')}: ${plan.receiveAmount.toFixed(1)}</p>
                  )}
                  <p className="tmp-card-desc">{zh ? plan.descZh : plan.descEn}</p>
                </div>

                <ul className="tmp-card-features">
                  {(zh ? plan.featuresZh : plan.featuresEn).map((feat, i) => (
                    <li key={i}>
                      <CheckIcon />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick(plan)}
                  className={`tmp-card-btn ${plan.highlight ? 'tmp-card-btn-primary' : 'tmp-card-btn-outline'}`}
                  disabled={paying !== null && selectedPlan === plan.id}
                >
                  {paying !== null && selectedPlan === plan.id
                    ? (zh ? '处理中...' : 'Processing...')
                    : (zh ? plan.ctaZh : plan.ctaEn)}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ Topup Panel (PAYG) ═══════ */}
        {showTopup && <TopupPanel />}

        {/* ═══════ Package Payment Modal ═══════ */}
        {packageToPay && (
          <PackagePaymentModal
            pkg={packageToPay}
            availableMethods={availableMethods}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            paying={paying}
            error={error}
            onPay={handlePackagePayment}
            onClose={() => {
              setPackageToPay(null)
              setError(null)
              setPaying(null)
            }}
            zh={zh}
          />
        )}

        {/* ═══════ Pricing Table ═══════ */}
        <section className="tmp-table-wrap">
          <div className="tmp-table-inner">
            <div className="tmp-table-scroll">
              <table className="tmp-table">
                <thead>
                  <tr>
                    <th>{t('Model')}</th>
                    <th>{t('Input (per 1M tokens)')}</th>
                    <th>{t('Output (per 1M tokens)')}</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_TABLE_GROUPS.map((group, gi) => (
                    <>
                      <tr key={`group-${gi}`} className="tmp-table-group">
                        <td colSpan={3}>{group.group}</td>
                      </tr>
                      {group.rows.map((row, ri) => (
                        <tr key={`row-${gi}-${ri}`} className={ri % 2 === 1 ? 'tmp-table-zebra' : ''}>
                          <td className="tmp-model-name">{row.name}</td>
                          <td className="tmp-model-price">{row.input}</td>
                          <td className="tmp-model-price">{row.output}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════ How It Works ═══════ */}
        <section className="tmp-how">
          <div className="tmp-how-header">
            <h2>{t('How It Works')}</h2>
            <p>{t('Simple three-step engineering workflow.')}</p>
          </div>
          <div className="tmp-how-grid">
            <div className="tmp-how-card">
              <div className="tmp-how-icon">
                <PersonAddIcon />
              </div>
              <h3>{t('1. Sign up')}</h3>
              <p>{t('Create your TokenMaster account and instantly generate your unique API gateway key.')}</p>
            </div>
            <div className="tmp-how-card">
              <div className="tmp-how-icon">
                <WalletIcon />
              </div>
              <h3>{t('2. Top up')}</h3>
              <p>{t('Add USD balance to your account. No minimums, no expiration dates. Your funds stay yours.')}</p>
            </div>
            <div className="tmp-how-card">
              <div className="tmp-how-icon">
                <RocketIcon />
              </div>
              <h3>{t('3. Use')}</h3>
              <p>{t('Start making requests. Balance is deducted in real-time based on the exact token usage.')}</p>
            </div>
          </div>
        </section>

        {/* ═══════ Billing FAQ ═══════ */}
        <section className="tmp-faq">
          <h2 className="tmp-faq-title">{t('Billing FAQ')}</h2>
          <div className="tmp-faq-list">
            {(zh
              ? FAQS.map((f) => ({ q: f.qZh, a: f.aZh }))
              : FAQS.map((f) => ({ q: f.qEn, a: f.aEn }))
            ).map((item, i) => (
              <details key={i} className="tmp-faq-item">
                <summary className="tmp-faq-summary">
                  {item.q}
                  <span className="tmp-faq-arrow">
                    <ExpandMoreIcon />
                  </span>
                </summary>
                <div className="tmp-faq-answer">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section className="tmp-cta">
          <div className="tmp-cta-box">
            <div className="tmp-cta-glow" aria-hidden="true" />
            <div className="tmp-cta-content">
              <h2>{t('Ready to start building?')}</h2>
              <p>{t('Join 5,000+ developers scaling their applications with TokenMaster\'s high-precision API gateway.')}</p>
              <Link to="/sign-up" className="tmp-cta-btn">
                {t('Get Started for Free')}
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════ Footer ═══════ */}
        <footer className="tmp-footer">
          <div className="tmp-footer-inner">
            <div>
              <div className="tmp-footer-brand">TokenMaster</div>
              <p className="tmp-footer-copy">&copy; {new Date().getFullYear()} TokenMaster. {t('High-Precision Engineering for APIs.')}</p>
            </div>
            <nav className="tmp-footer-nav" aria-label="Footer navigation">
              <Link to="/privacy-policy">{t('Privacy Policy')}</Link>
              <Link to="/user-agreement">{t('Terms of Service')}</Link>
              <a href="https://status.tokenmaster.com" target="_blank" rel="noopener noreferrer">{t('API Status')}</a>
              <a href="mailto:support@tokenmaster.com">{t('Contact Support')}</a>
            </nav>
          </div>
        </footer>
      </div>
    </PublicLayout>
  )
}
