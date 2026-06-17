/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team - Payment Interface Page

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
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// ── Data ──
const PRESET_AMOUNTS = [5, 10, 25, 50, 100, 200]

type Tiers = {
  id: string
  nameZh: string
  nameEn: string
  priceZh: string
  priceEn: string
  priceYearlyZh: string | null
  priceYearlyEn: string | null
  descZh: string
  descEn: string
  featuresZh: string[]
  featuresEn: string[]
  highlight: boolean
  ctaZh: string
  ctaEn: string
}

const PLANS: Tiers[] = [
  {
    id: 'payg',
    nameZh: '按量付费',
    nameEn: 'Pay As You Go',
    priceZh: '最低 $1',
    priceEn: 'From $1',
    priceYearlyZh: null,
    priceYearlyEn: null,
    descZh: '充多少用多少，无需月费',
    descEn: 'Top up and use, no monthly commitment',
    featuresZh: ['随时充值，即刻到账', '支持所有已配置模型', '无限期有效，永不过期'],
    featuresEn: ['Top up anytime, instant credit', 'Access to all configured models', 'Never expires'],
    highlight: false,
    ctaZh: '立即充值',
    ctaEn: 'Recharge Now',
  },
  {
    id: 'starter',
    nameZh: '入门版',
    nameEn: 'Starter',
    priceZh: '$9.9',
    priceEn: '$9.9',
    priceYearlyZh: '$99',
    priceYearlyEn: '$99',
    descZh: '适合个人开发者和小团队',
    descEn: 'For individual developers and small teams',
    featuresZh: ['10,000 积分/月', 'DeepSeek V3/R1 无限使用', 'Qwen-Plus/Turbo 无限使用', '邮件支持'],
    featuresEn: ['10,000 credits/month', 'Unlimited DeepSeek V3/R1', 'Unlimited Qwen-Plus/Turbo', 'Email support'],
    highlight: true,
    ctaZh: '选择方案',
    ctaEn: 'Choose Plan',
  },
  {
    id: 'pro',
    nameZh: '专业版',
    nameEn: 'Pro',
    priceZh: '$29.9',
    priceEn: '$29.9',
    priceYearlyZh: '$299',
    priceYearlyEn: '$299',
    descZh: '适合高频率调用和商业项目',
    descEn: 'For high-frequency usage and commercial projects',
    featuresZh: ['50,000 积分/月', '所有模型无限使用', '优先技术支持', '完整 API 访问', '专属客户经理'],
    featuresEn: ['50,000 credits/month', 'All models unlimited', 'Priority technical support', 'Full API access', 'Dedicated account manager'],
    highlight: false,
    ctaZh: '选择方案',
    ctaEn: 'Choose Plan',
  },
  {
    id: 'enterprise',
    nameZh: '企业版',
    nameEn: 'Enterprise',
    priceZh: '联系我们',
    priceEn: 'Contact Us',
    priceYearlyZh: null,
    priceYearlyEn: null,
    descZh: '定制方案，专属部署',
    descEn: 'Custom solutions, dedicated deployment',
    featuresZh: ['量身定制使用配额', 'SLA 保障', '私有化部署选项', '专线技术支持'],
    featuresEn: ['Custom usage quotas', 'SLA guarantees', 'Private deployment options', 'Dedicated support line'],
    highlight: false,
    ctaZh: '联系我们',
    ctaEn: 'Contact Us',
  },
]

function isZh(): boolean {
  // checked via i18n.language at runtime — kept simple
  try {
    return require('react-i18next')?.useTranslation()?.i18n?.language?.startsWith('zh') ?? false
  } catch {
    return typeof navigator !== 'undefined' && navigator.language?.startsWith('zh')
  }
}

export function PricingPlansPage() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const zh = i18n.language.startsWith('zh')

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showTopup, setShowTopup] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [topupAmount, setTopupAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')

  function s(zhStr: string, enStr: string) { return zh ? zhStr : enStr }

  function handlePlanClick(planId: string) {
    if (planId === 'enterprise') {
      window.open('mailto:support@api-tokenmaster.com?subject=Enterprise Plan Inquiry', '_blank')
      return
    }
    setSelectedPlan(planId)
    if (planId === 'payg') {
      setShowTopup(true)
    } else {
      navigate({ to: '/sign-up' })
    }
  }

  function handleTopupSubmit() {
    const amount = customAmount ? parseInt(customAmount) : topupAmount
    if (!amount || amount < 1) return
    navigate({ to: '/sign-up' })
  }

  return (
    <PublicLayout showMainContainer={false}>
      <main className='flex-1'>
        {/* ── Hero ── */}
        <section className='relative overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-24'>
          <div className='pointer-events-none absolute inset-0'>
            <div className='absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 blur-3xl' />
          </div>
          <div className='relative mx-auto max-w-3xl'>
            <h1 className='text-foreground text-4xl font-bold tracking-tight sm:text-5xl'>
              {s('简单透明的定价', 'Simple, Transparent Pricing')}
            </h1>
            <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed'>
              {s(
                '注册即送 500 积分体验。根据需求选择合适的方案，支持按量付费和月付套餐。',
                'Get 500 free credits on signup. Choose the plan that fits your needs — pay as you go or subscribe monthly.'
              )}
            </p>
          </div>
        </section>

        {/* ── Plan Cards ── */}
        <section className='px-4 pb-6 sm:px-6'>
          <div className='mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {PLANS.map((plan) => {
              const isSelected = selectedPlan === plan.id
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 ${
                    plan.highlight
                      ? 'border-primary shadow-lg shadow-primary/10 scale-105 z-10'
                      : 'border-border hover:border-primary/50'
                  } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                >
                  {plan.highlight && (
                    <div className='bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-0.5 text-xs font-semibold'>
                      {s('最受欢迎', 'Most Popular')}
                    </div>
                  )}

                  <div className='mb-6'>
                    <h3 className='text-foreground text-lg font-semibold'>
                      {zh ? plan.nameZh : plan.nameEn}
                    </h3>
                    <div className='mt-3'>
                      <span className='text-foreground text-3xl font-bold'>
                        {zh ? plan.priceZh : plan.priceEn}
                      </span>
                      {plan.id !== 'payg' && plan.id !== 'enterprise' && (
                        <span className='text-muted-foreground ml-1 text-sm'>
                          /{s('月', 'mo')}
                        </span>
                      )}
                    </div>
                    {plan.id !== 'enterprise' && (
                      <p className='text-muted-foreground mt-1 text-xs tracking-tight'>
                        {s('年付', 'Yearly')}: {zh ? (plan.priceYearlyZh || '-') : (plan.priceYearlyEn || '-')}
                        {plan.id !== 'payg' && <span className='ml-0.5'> ({s('省20%', 'save 20%')})</span>}
                      </p>
                    )}
                    <p className='text-muted-foreground mt-2 text-xs leading-relaxed'>
                      {zh ? plan.descZh : plan.descEn}
                    </p>
                  </div>

                  <ul className='mb-auto space-y-2.5'>
                    {(zh ? plan.featuresZh : plan.featuresEn).map((feat, i) => (
                      <li key={i} className='flex items-start gap-2.5'>
                        <svg className='text-primary mt-0.5 h-4 w-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        <span className='text-muted-foreground text-sm'>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanClick(plan.id)}
                    className='mt-6 w-full'
                    variant={plan.highlight ? 'default' : 'outline'}
                    size='lg'
                  >
                    {zh ? plan.ctaZh : plan.ctaEn}
                  </Button>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Topup Interface (PAYG checkout) ── */}
        {showTopup && (
          <section id='topup-section' className='border-border/50 mx-auto mt-8 max-w-4xl rounded-2xl border p-6 sm:p-8'>
            <h2 className='text-foreground mb-6 text-2xl font-bold'>
              {s('充值积分', 'Top Up Credits')}
            </h2>

            {/* Preset amounts */}
            <div className='mb-6'>
              <label className='text-muted-foreground mb-3 block text-xs font-medium uppercase tracking-wider'>
                {s('选择金额', 'Select Amount')}
              </label>
              <div className='flex flex-wrap gap-3'>
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setTopupAmount(amt); setCustomAmount('') }}
                    className={`min-w-[80px] rounded-lg border px-4 py-3 text-center transition-all ${
                      topupAmount === amt && !customAmount
                        ? 'border-foreground bg-foreground/5 dark:border-foreground dark:bg-foreground/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className='text-lg font-bold'>${amt}</div>
                    <div className='text-muted-foreground mt-0.5 text-xs'>
                      ${amt} {s('积分', 'credits')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom amount */}
            <div className='mb-6'>
              <Label
                htmlFor='custom-amount-input'
                className='text-muted-foreground mb-2 block text-xs font-medium uppercase tracking-wider'
              >
                {s('自定义金额', 'Custom Amount')}
              </Label>
              <div className='flex max-w-xs items-center gap-2'>
                <span className='text-foreground text-lg font-semibold'>$</span>
                <Input
                  id='custom-amount-input'
                  type='number'
                  min={1}
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setTopupAmount(0) }}
                  placeholder='10'
                  className='h-10 text-lg'
                />
                <span className='text-muted-foreground text-sm'>{s('积分', 'credits')}</span>
              </div>
            </div>

            {/* Payment method select */}
            <div className='mb-8'>
              <label className='text-muted-foreground mb-3 block text-xs font-medium uppercase tracking-wider'>
                {s('支付方式', 'Payment Method')}
              </label>
              <div className='flex flex-wrap gap-3'>
                {[
                  { id: 'paypal', label: s('PayPal', 'PayPal') },
                  { id: 'alipay', label: s('支付宝', 'Alipay') },
                  { id: 'wechat', label: s('微信支付', 'WeChat Pay') },
                  { id: 'stripe', label: s('信用卡', 'Credit Card') },
                  { id: 'manual', label: s('人工转账', 'Manual Transfer') },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                      selectedMethod === m.id
                        ? 'border-foreground bg-foreground/5 dark:border-foreground dark:bg-foreground/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              {selectedMethod === 'manual' && (
                <p className='text-muted-foreground mt-2 text-xs'>
                  {s(
                    '我们当前正在集成在线支付系统。在此期间，可选择人工转账方式，联系客服手动充值。',
                    'Online payment is being integrated. You may choose manual transfer and contact support to complete top-up.'
                  )}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className='flex items-center justify-between rounded-xl border bg-muted/20 p-4'>
              <div>
                <span className='text-muted-foreground text-sm'>{s('合计', 'Total')}: </span>
                <span className='text-foreground text-2xl font-bold'>
                  ${customAmount ? parseInt(customAmount) || 0 : topupAmount}
                </span>
                <span className='text-muted-foreground ml-1 text-sm'>{s('积分', 'credits')}</span>
              </div>
              <Button onClick={handleTopupSubmit} size='lg'>
                {s('注册并充值', 'Sign Up & Top Up')}
              </Button>
            </div>
          </section>
        )}

        {/* ── Supported Models ── */}
        <section className='bg-muted/30 mt-12 px-4 py-16 sm:px-6'>
          <div className='mx-auto max-w-5xl text-center'>
            <h2 className='text-foreground mb-8 text-2xl font-bold'>
              {s('支持模型一览', 'Supported Models')}
            </h2>
            <div className='grid gap-6 sm:grid-cols-3'>
              {/* DeepSeek */}
              <div className='rounded-xl border bg-background/50 p-6'>
                <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 text-lg font-bold text-white'>
                  D
                </div>
                <h3 className='text-foreground mb-1 font-semibold'>DeepSeek</h3>
                <p className='text-muted-foreground text-xs'>
                  DeepSeek-V3, DeepSeek-R1, DeepSeek-V4 Pro, DeepSeek-Coder
                </p>
              </div>

              {/* GLM / Zhipu */}
              <div className='rounded-xl border bg-background/50 p-6'>
                <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#3859FF] text-lg font-bold text-white'>
                  G
                </div>
                <h3 className='text-foreground mb-1 font-semibold'>GLM / Zhipu</h3>
                <p className='text-muted-foreground text-xs'>
                  GLM-4.5, GLM-4.5-Air, GLM-4.7, GLM-4.7-Flash
                </p>
              </div>

              {/* Qwen */}
              <div className='rounded-xl border bg-background/50 p-6'>
                <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 text-lg font-bold text-white'>
                  Q
                </div>
                <h3 className='text-foreground mb-1 font-semibold'>Qwen / Tongyi</h3>
                <p className='text-muted-foreground text-xs'>
                  Qwen-Plus, Qwen-Turbo, Qwen-Max, Qwen-Long, Qwen-Coder-Plus
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className='px-4 py-16 sm:px-6'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='text-foreground mb-10 text-center text-2xl font-bold'>
              {s('常见问题', 'Frequently Asked Questions')}
            </h2>
            <div className='space-y-4'>
              {/* Q1 */}
              <details className='group rounded-xl border p-5'>
                <summary className='text-foreground cursor-pointer text-sm font-semibold'>
                  {s('如何充值？', 'How do I top up?')}
                </summary>
                <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
                  {s(
                    '注册账号后，在 /plans 页面选择按量付费或购买套餐。我们支持 PayPal、支付宝、微信支付和信用卡。充值后积分立即到账。',
                    'After signing up, choose Pay As You Go or a plan on this page. We accept PayPal, Alipay, WeChat Pay, and credit cards. Credits are added instantly.'
                  )}
                </p>
              </details>

              {/* Q2 */}
              <details className='group rounded-xl border p-5'>
                <summary className='text-foreground cursor-pointer text-sm font-semibold'>
                  {s('积分会过期吗？', 'Do credits expire?')}
                </summary>
                <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
                  {s(
                    '按量付费购买的积分永不过期。月付套餐的积分按月刷新，未用完的积分不会累积到下月。',
                    'PAYG credits never expire. Monthly plan credits refresh each month and do not roll over.'
                  )}
                </p>
              </details>

              {/* Q3 */}
              <details className='group rounded-xl border p-5'>
                <summary className='text-foreground cursor-pointer text-sm font-semibold'>
                  {s('支持哪些模型？', 'Which models are supported?')}
                </summary>
                <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
                  {s(
                    '目前支持 DeepSeek（V3/R1/V4/Coder）、GLM（4.5/4.5-Air/4.7/4.7-Flash）和 Qwen（Plus/Turbo/Max/Long/Coder-Plus）系列。持续新增中。',
                    'Currently supports DeepSeek (V3/R1/V4/Coder), GLM (4.5/4.5-Air/4.7/4.7-Flash), and Qwen (Plus/Turbo/Max/Long/Coder-Plus) series. More models coming soon.'
                  )}
                </p>
              </details>

              {/* Q4 */}
              <details className='group rounded-xl border p-5'>
                <summary className='text-foreground cursor-pointer text-sm font-semibold'>
                  {s('提供的 API 兼容 OpenAI 吗？', 'Is the API compatible with OpenAI?')}
                </summary>
                <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
                  {s(
                    '完全兼容 OpenAI 格式。您可以使用现有的 OpenAI SDK，只需将 base_url 改为 api-tokenmaster.com 即可。',
                    'Fully OpenAI-compatible. Use your existing OpenAI SDK and simply change the base_url to api-tokenmaster.com.'
                  )}
                </p>
              </details>

              {/* Q5 */}
              <details className='group rounded-xl border p-5'>
                <summary className='text-foreground cursor-pointer text-sm font-semibold'>
                  {s('支持退款吗？', 'Do you offer refunds?')}
                </summary>
                <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
                  {s(
                    '首次购买 7 天内可全额退款。之后按实际使用量扣除后退还余额。请联系 support@api-tokenmaster.com。',
                    'Full refund within 7 days of first purchase. After that, refunds are pro-rated based on usage. Contact support@api-tokenmaster.com.'
                  )}
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}
