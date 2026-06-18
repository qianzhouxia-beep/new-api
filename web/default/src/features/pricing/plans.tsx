/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team - Recharge Packages Page

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
import { useNavigate } from '@tanstack/react-router'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth-store'
import { BrandIcon } from '@/components/icons/brand-icons'
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

const MODELS = [
  {
    brand: 'deepseek' as const,
    name: 'DeepSeek',
    models: ['DeepSeek-V3', 'DeepSeek-R1', 'DeepSeek-V4', 'DeepSeek-Coder'],
  },
  {
    brand: 'zhipu' as const,
    name: 'GLM / Zhipu',
    models: ['GLM-4.5', 'GLM-4.5-Air', 'GLM-4.7', 'GLM-4.7-Flash'],
  },
  {
    brand: 'qwen' as const,
    name: 'Qwen / Tongyi',
    models: [
      'Qwen-Plus',
      'Qwen-Turbo',
      'Qwen-Max',
      'Qwen-Long',
      'Qwen-Coder-Plus',
    ],
  },
]

const FAQS_ZH = [
  {
    q: '如何充值？',
    a: '注册账号后，在 /plans 选择按量付费或充值优惠包。支持 Stripe（信用卡/储蓄卡）和 PayPal。充值后余额立即到账。',
  },
  {
    q: '充值优惠包和多送金额怎么算？',
    a: '优惠包是一次性充值，多送的部分相当于折扣。例如标准包付 $29 到账 $31，多送的 $2 直接计入余额，可用于所有模型调用。',
  },
  {
    q: '余额会过期吗？',
    a: '不会。所有充值余额永不过期，用完为止。',
  },
  {
    q: '支持哪些模型？',
    a: '目前支持 DeepSeek（V3/R1/V4/Coder）、GLM（4.5/4.5-Air/4.7/4.7-Flash）和 Qwen（Plus/Turbo/Max/Long/Coder-Plus）系列。持续新增中。',
  },
  { q: 'API 兼容 OpenAI 吗？', a: '完全兼容 OpenAI 格式。您可以使用现有的 OpenAI SDK，只需将 base_url 改为 api-tokenmaster.com。' },
  { q: '支持退款吗？', a: '首次购买 7 天内可全额退款。之后按实际使用量扣除后退还余额。请联系 support@api-tokenmaster.com。' },
]

const FAQS_EN = [
  { q: 'How do I top up?', a: 'After signing up, choose Pay As You Go or a Recharge Package on /plans. We support Stripe and PayPal. Balance is added instantly.' },
  { q: 'What are the recharge packages?', a: 'Packages are one-time top-ups with bonus credit. E.g. pay $29, get $31 — the extra $2 is added to your balance and usable on all models.' },
  { q: 'Does balance expire?', a: 'No. Your balance never expires.' },
  { q: 'Which models are supported?', a: 'Currently supports DeepSeek (V3/R1/V4/Coder), GLM (4.5/4.5-Air/4.7/4.7-Flash), and Qwen (Plus/Turbo/Max/Long/Coder-Plus) series. More coming soon.' },
  { q: 'Is the API OpenAI-compatible?', a: 'Yes, fully compatible. Use your existing OpenAI SDK and change the base_url to api-tokenmaster.com.' },
  { q: 'Do you offer refunds?', a: 'Full refund within 7 days of first purchase. After that, pro-rated. Email support@api-tokenmaster.com.' },
]

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
  fixedAmount: number       // 0 for PAYG, >0 for packages
  receiveAmount: number     // how much the user actually receives in their balance
  badgeZh?: string          // optional bonus badge text
  badgeEn?: string
}

const PACKAGES: Plan[] = [
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

        {/* Amount preview */}
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

        {/* Payment method selection */}
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

        {/* Action buttons */}
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

export function PricingPlansPage() {
  const { i18n } = useTranslation()
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
        'mailto:support@api-tokenmaster.com?subject=Enterprise Plan Inquiry',
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

  /* ── Hero ── */
  const title = s('简单透明的定价', 'Simple, Transparent Pricing', zh)
  const subtitle = zh
    ? '注册即送 $5 体验金。选择按量付费或充值优惠包，无任何承诺要求。'
    : 'Get $5 free credit on signup. Pay as you go or grab a package — no commitment.'

  /* ── Model card ── */
  function ModelCards() {
    return (
      <section className='mt-8 bg-muted/30 px-4 py-16 sm:px-6' id='models'>
        <div className='mx-auto max-w-5xl text-center'>
          <h2 className='mb-8 text-2xl font-bold text-foreground'>
            {s('支持模型一览', 'Supported Models', zh)}
          </h2>
          <div className='grid gap-6 sm:grid-cols-3'>
            {MODELS.map((g) => (
              <div
                key={g.brand}
                className='rounded-xl border bg-background/50 p-6 text-left'
              >
                <div className='mb-3 flex items-center gap-3'>
                  <BrandIcon brand={g.brand} className='size-10 shrink-0' />
                  <h3 className='font-semibold text-foreground'>{g.name}</h3>
                </div>
                <ul className='space-y-1'>
                  {g.models.map((m) => (
                    <li
                      key={m}
                      className='text-muted-foreground flex items-center gap-2 text-xs'
                    >
                      <span className='inline-block h-1 w-1 rounded-full bg-primary/20' />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  /* ── FAQ ── */
  function Faq() {
    const faqs = zh ? FAQS_ZH : FAQS_EN
    return (
      <section className='px-4 py-16 sm:px-6' id='faq'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-10 text-center text-2xl font-bold text-foreground'>
            {s('常见问题', 'FAQ', zh)}
          </h2>
          <div className='space-y-4'>
            {faqs.map((item, i) => (
              <details key={i} className='group rounded-xl border p-5'>
                <summary className='cursor-pointer text-sm font-semibold text-foreground'>
                  {item.q}
                </summary>
                <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    )
  }

  /* ── Topup Interface (PAYG only) ── */
  function TopupPanel() {
    if (!auth?.user) {
      return (
        <section
          className='mx-auto mt-8 max-w-4xl rounded-2xl border border-border/50 p-6 text-center sm:p-8'
          id='topup'
        >
          <h2 className='mb-4 text-2xl font-bold text-foreground'>
            {s('登录后即可充值', 'Sign in to top up', zh)}
          </h2>
          <p className='text-muted-foreground mx-auto mb-6 max-w-md text-sm'>
            {s(
              '已有账号？登录后选择金额和支付方式。还没有账号？先注册，再充值。',
              'Already have an account? Sign in to continue. New here? Sign up first.',
              zh,
            )}
          </p>
          <div className='flex justify-center gap-4'>
            <Button
              onClick={() =>
                navigate({ to: '/sign-in', search: { redirect: '/plans' } })
              }
            >
              {s('登录', 'Sign In', zh)}
            </Button>
            <Button
              variant='outline'
              onClick={() =>
                navigate({ to: '/sign-up', search: { redirect: '/plans' } })
              }
            >
              {s('注册', 'Sign Up', zh)}
            </Button>
          </div>
        </section>
      )
    }

    return (
      <section
        className='mx-auto mt-8 max-w-4xl rounded-2xl border border-border/50 p-6 sm:p-8'
        id='topup'
      >
        {error && (
          <div className='mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-600 dark:bg-red-950 dark:text-red-300'>
            {error}
          </div>
        )}

        <h2 className='mb-6 text-2xl font-bold text-foreground'>
          {s('自定义充值', 'Custom Top Up', zh)}
        </h2>

        {/* amount presets */}
        <div className='mb-6'>
          <label className='text-muted-foreground mb-3 block text-xs font-medium uppercase tracking-wider'>
            {s('选择金额', 'Select Amount', zh)}
          </label>
          <div className='flex flex-wrap gap-3'>
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setTopupAmount(amt)
                  setCustomAmount('')
                }}
                className={`min-w-[80px] rounded-lg border px-4 py-3 text-center transition-all ${
                  topupAmount === amt && !customAmount
                    ? 'border-foreground bg-foreground/5 dark:border-foreground dark:bg-foreground/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className='text-lg font-bold'>${amt}</div>
                <div className='text-muted-foreground mt-0.5 text-xs'>
                  ${amt}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* custom amount */}
        <div className='mb-6'>
          <Label
            htmlFor='custom-amount-input'
            className='text-muted-foreground mb-2 block text-xs font-medium uppercase tracking-wider'
          >
            {s('自定义金额', 'Custom Amount', zh)}
          </Label>
          <div className='flex max-w-xs items-center gap-2'>
            <span className='text-lg font-semibold text-foreground'>$</span>
            <Input
              id='custom-amount-input'
              type='number'
              min={1}
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setTopupAmount(0)
              }}
              placeholder='10'
              className='h-10 text-lg'
            />
          </div>
        </div>

        {/* payment methods - loaded dynamically from backend */}
        <div className='mb-8'>
          <label className='text-muted-foreground mb-3 block text-xs font-medium uppercase tracking-wider'>
            {s('支付方式', 'Payment Method', zh)}
          </label>
          <div className='flex flex-wrap gap-3'>
            {availableMethods.length > 0
              ? availableMethods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    disabled={paying !== null}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                      selectedMethod === m.id
                        ? 'border-foreground bg-foreground/5 dark:border-foreground dark:bg-foreground/10'
                        : 'border-border hover:border-primary/50'
                    } ${paying !== null ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {m.name}
                  </button>
                ))
              : topupLoading && (
                  <p className='text-muted-foreground text-sm italic'>
                    {s('加载中...', 'Loading...', zh)}
                  </p>
                )}
          </div>

          {selectedMethod === 'manual' && (
            <p className='text-muted-foreground mt-2 text-xs leading-relaxed'>
              {s(
                '请转账至公司银行账户，并将转账凭证发送至 support@api-tokenmaster.com。客服确认后为您充值。',
                'Please transfer to our company bank account and email the receipt to support@api-tokenmaster.com. We will credit your account upon confirmation.',
                zh,
              )}
            </p>
          )}
        </div>

        {/* CTA */}
        <div className='flex items-center justify-between rounded-xl border bg-muted/20 p-4'>
          <div>
            <span className='text-muted-foreground text-sm'>
              {s('到账', 'You get', zh)}:{' '}
            </span>
            <span className='text-2xl font-bold text-foreground'>
              ${customAmount ? parseInt(customAmount) || 0 : topupAmount}
            </span>
          </div>
          <Button onClick={handlePaygPayment} size='lg' disabled={paying !== null}>
            {paying === 'stripe'
              ? (zh ? '跳转支付中...' : 'Redirecting...')
              : paying === 'paypal'
                ? (zh ? '跳转 PayPal...' : 'Redirecting to PayPal...')
                : (zh ? '确认支付' : 'Pay Now')}
          </Button>
        </div>
      </section>
    )
  }

  /* ── Render ── */
  return (
    <PublicLayout showMainContainer={false}>
      <main className='flex-1'>
        {/* Payment status banner */}
        {paymentStatus && !dismissedStatus && (
          <section className='px-4 pt-6 sm:px-6'>
            <div className='mx-auto max-w-6xl'>
              <PaymentStatusBanner
                status={paymentStatus}
                onDismiss={() => setDismissedStatus(true)}
              />
            </div>
          </section>
        )}

        {/* Hero */}
        <section className='relative overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-24'>
          <div className='pointer-events-none absolute inset-0'>
            <div className='absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 blur-3xl' />
          </div>
          <div className='relative mx-auto max-w-3xl'>
            <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
              {title}
            </h1>
            <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed'>
              {subtitle}
            </p>
          </div>
        </section>

        {/* Plan Cards */}
        <section className='px-4 pb-6 sm:px-6' id='pricing-cards'>
          <div className='mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {PACKAGES.map((plan) => {
              const isSelected = selectedPlan === plan.id
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 ${
                    plan.highlight
                      ? 'z-10 scale-105 border-primary shadow-lg shadow-primary/10'
                      : 'border-border hover:border-primary/50'
                  } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                >
                  {plan.highlight && (
                    <div className='bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-0.5 text-xs font-semibold'>
                      {s('最受欢迎', 'Most Popular', zh)}
                    </div>
                  )}

                  {/* Bonus badge */}
                  {plan.badgeZh && plan.badgeEn && (
                    <div className='absolute -top-3 right-4 rounded-full bg-green-500 px-3 py-0.5 text-xs font-semibold text-white shadow-sm'>
                      {zh ? plan.badgeZh : plan.badgeEn}
                    </div>
                  )}

                  <div className='mb-6'>
                    <h3 className='text-lg font-semibold text-foreground'>
                      {zh ? plan.nameZh : plan.nameEn}
                    </h3>

                    {/* Price display */}
                    <div className='mt-3'>
                      <span className='text-3xl font-bold text-foreground'>
                        {zh ? plan.priceZh : plan.priceEn}
                      </span>
                      {plan.id !== 'payg' && plan.id !== 'enterprise' && plan.receiveAmount > plan.fixedAmount && (
                        <span className='text-muted-foreground ml-2 text-sm line-through'>
                          ${plan.receiveAmount.toFixed(1)}
                        </span>
                      )}
                    </div>

                    {/* Show receive amount for packages */}
                    {plan.id !== 'payg' && plan.id !== 'enterprise' && plan.fixedAmount > 0 && (
                      <p className='text-sm text-green-600 dark:text-green-400'>
                        {s('到账', 'Balance')}: ${plan.receiveAmount.toFixed(1)}
                      </p>
                    )}

                    <p className='text-muted-foreground mt-2 text-xs leading-relaxed'>
                      {zh ? plan.descZh : plan.descEn}
                    </p>
                  </div>

                  <ul className='mb-auto space-y-2.5'>
                    {(zh ? plan.featuresZh : plan.featuresEn).map((feat, i) => (
                      <li key={i} className='flex items-start gap-2.5'>
                        <svg
                          className='mt-0.5 h-4 w-4 shrink-0 text-primary'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                        <span className='text-muted-foreground text-sm'>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanClick(plan)}
                    className='mt-6 w-full'
                    variant={plan.highlight ? 'default' : 'outline'}
                    size='lg'
                    disabled={paying !== null && selectedPlan === plan.id}
                  >
                    {paying !== null && selectedPlan === plan.id
                      ? s('处理中...', 'Processing...', zh)
                      : zh
                        ? plan.ctaZh
                        : plan.ctaEn}
                  </Button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Topup Panel - shown only when PAYG is selected & user is logged in */}
        {showTopup && <TopupPanel />}

        {/* Package Payment Modal */}
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

        {/* Models */}
        <ModelCards />

        {/* FAQ */}
        <Faq />

        {/* Footer CTA */}
        <section className='border-t bg-primary/5 px-4 py-12 text-center'>
          <h2 className='mb-4 text-xl font-bold text-foreground'>
            {s('准备好开始了吗？', 'Ready to get started?', zh)}
          </h2>
          <p className='text-muted-foreground mx-auto mb-6 max-w-lg text-sm'>
            {s(
              '注册即可获得 $5 体验金，无需绑定支付方式。',
              'Sign up now and get $5 free credit. No payment method required.',
              zh,
            )}
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Button
              size='lg'
              onClick={() =>
                navigate({ to: '/sign-up', search: { redirect: '/wallet' } })
              }
            >
              {s('免费注册', 'Sign Up Free', zh)}
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => {
                const el = document.getElementById('pricing-cards')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {s('查看方案', 'View Plans', zh)}
            </Button>
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}
