/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team - Added Pricing Page

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
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'

/**
 * Pricing Page Component
 * 
 * Displays TokenMaster pricing plans:
 * - Free Trial (500 credits)
 * - Pay-as-you-go ($0.01/1K tokens)
 * - Starter Plan ($9.9/month)
 * - Pro Plan ($29.9/month)
 * - Enterprise (Custom)
 */
export function PricingPage() {
  const { t, i18n } = useTranslation()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      id: 'free',
      name: i18n.language.startsWith('zh') ? '免费试用' : 'Free Trial',
      price: '$0',
      period: '',
      credits: i18n.language.startsWith('zh') ? '500 积分' : '500 credits',
      features: [
        i18n.language.startsWith('zh') ? 'GPT-4o 试用' : 'GPT-4o Trial',
        i18n.language.startsWith('zh') ? 'Claude 3.5 试用' : 'Claude 3.5 Trial',
        i18n.language.startsWith('zh') ? '基本模型访问' : 'Basic Model Access',
      ],
      cta: i18n.language.startsWith('zh') ? '开始使用' : 'Get Started',
      popular: false,
    },
    {
      id: 'pay-as-you-go',
      name: i18n.language.startsWith('zh') ? '按量计费' : 'Pay As You Go',
      price: '$0.01',
      period: i18n.language.startsWith('zh') ? '/1K tokens' : '/1K tokens',
      credits: i18n.language.startsWith('zh') ? '无限制' : 'Unlimited',
      features: [
        i18n.language.startsWith('zh') ? '所有模型访问' : 'All Models Access',
        i18n.language.startsWith('zh') ? '优先支持' : 'Priority Support',
        i18n.language.startsWith('zh') ? '无月费' : 'No Monthly Fee',
      ],
      cta: i18n.language.startsWith('zh') ? '立即充值' : 'Recharge Now',
      popular: false,
    },
    {
      id: 'starter',
      name: i18n.language.startsWith('zh') ? '入门版' : 'Starter',
      price: billingCycle === 'monthly' ? '$9.9' : '$99',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      credits: i18n.language.startsWith('zh') ? '10,000 积分/月' : '10,000 credits/month',
      features: [
        i18n.language.startsWith('zh') ? 'GPT-4o 无限制' : 'GPT-4o Unlimited',
        i18n.language.startsWith('zh') ? 'Claude 3.5 无限制' : 'Claude 3.5 Unlimited',
        i18n.language.startsWith('zh') ? '邮件支持' : 'Email Support',
      ],
      cta: i18n.language.startsWith('zh') ? '选择方案' : 'Choose Plan',
      popular: true,
    },
    {
      id: 'pro',
      name: i18n.language.startsWith('zh') ? '专业版' : 'Pro',
      price: billingCycle === 'monthly' ? '$29.9' : '$299',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      credits: i18n.language.startsWith('zh') ? '50,000 积分/月' : '50,000 credits/month',
      features: [
        i18n.language.startsWith('zh') ? '所有模型 + 优先' : 'All Models + Priority',
        i18n.language.startsWith('zh') ? '24/7 支持' : '24/7 Support',
        i18n.language.startsWith('zh') ? 'API 访问' : 'API Access',
      ],
      cta: i18n.language.startsWith('zh') ? '选择方案' : 'Choose Plan',
      popular: false,
    },
  ]

  return (
    <PublicLayout showMainContainer={false}>
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='relative overflow-hidden px-6 py-24 text-center'>
          <div className='mx-auto max-w-4xl'>
            <h1 className='text-foreground text-5xl font-bold tracking-tight sm:text-6xl'>
              {i18n.language.startsWith('zh') ? '简单透明的定价' : 'Simple, Transparent Pricing'}
            </h1>
            <p className='text-muted-foreground mt-6 text-xl leading-relaxed'>
              {i18n.language.startsWith('zh') 
                ? '选择适合您的方案，开始使用 TokenMaster AI 服务' 
                : 'Choose the plan that fits your needs and start using TokenMaster AI services'}
            </p>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className='px-6 pb-12'>
          <div className='mx-auto flex max-w-sm items-center justify-center gap-4'>
            <span className={billingCycle === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}>
              {i18n.language.startsWith('zh') ? '月付' : 'Monthly'}
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className='bg-primary relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={billingCycle === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}>
              {i18n.language.startsWith('zh') ? '年付（省 20%）' : 'Yearly (Save 20%)'}
            </span>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className='px-6 pb-24'>
          <div className='mx-auto grid max-w-7xl gap-8 lg:grid-cols-4'>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-8 ${
                  plan.popular 
                    ? 'border-primary shadow-lg' 
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className='bg-primary text-primary-foreground absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-semibold'>
                    {i18n.language.startsWith('zh') ? '最受欢迎' : 'Most Popular'}
                  </div>
                )}
                
                <div className='mb-8'>
                  <h3 className='text-foreground text-xl font-semibold'>{plan.name}</h3>
                  <div className='mt-4'>
                    <span className='text-foreground text-4xl font-bold'>{plan.price}</span>
                    {plan.period && (
                      <span className='text-muted-foreground ml-2'>{plan.period}</span>
                    )}
                  </div>
                  <p className='text-muted-foreground mt-2 text-sm'>{plan.credits}</p>
                </div>

                <ul className='mb-8 space-y-3'>
                  {plan.features.map((feature, i) => (
                    <li key={i} className='flex items-center gap-3'>
                      <svg className='text-primary h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                      <span className='text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className='w-full'
                  variant={plan.popular ? 'default' : 'outline'}
                  size='lg'
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className='bg-muted/30 px-6 py-24'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='text-foreground mb-12 text-center text-3xl font-bold'>
              {i18n.language.startsWith('zh') ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            
            <div className='space-y-6'>
              <details className='rounded-lg border p-6'>
                <summary className='text-foreground cursor-pointer font-semibold'>
                  {i18n.language.startsWith('zh') ? '如何购买积分？' : 'How to purchase credits?'}
                </summary>
                <p className='text-muted-foreground mt-4'>
                  {i18n.language.startsWith('zh') 
                    ? '您可以通过 PayPal 或信用卡购买积分。购买后积分将立即到账。' 
                    : 'You can purchase credits via PayPal or Credit Card. Credits will be added to your account immediately.'}
                </p>
              </details>

              <details className='rounded-lg border p-6'>
                <summary className='text-foreground cursor-pointer font-semibold'>
                  {i18n.language.startsWith('zh') ? '积分会过期吗？' : 'Do credits expire?'}
                </summary>
                <p className='text-muted-foreground mt-4'>
                  {i18n.language.startsWith('zh') 
                    ? '不会，您的积分永不过期，可以长期使用。' 
                    : 'No, your credits never expire and can be used anytime.'}
                </p>
              </details>

              <details className='rounded-lg border p-6'>
                <summary className='text-foreground cursor-pointer font-semibold'>
                  {i18n.language.startsWith('zh') ? '支持退款吗？' : 'Do you offer refunds?'}
                </summary>
                <p className='text-muted-foreground mt-4'>
                  {i18n.language.startswith('zh') 
                    ? '如果您对服务不满意，我们提供 7 天无理由退款保证。' 
                    : 'We offer a 7-day no-questions-asked refund guarantee if you are not satisfied with our service.'}
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}
