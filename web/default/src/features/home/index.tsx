/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team - TokenMaster Custom Home Page

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
 * TokenMaster Custom Home Page
 * 
 * This component replicates the TokenMaster landing page using React components.
 * It uses New API's i18n system for translations.
 */
export function Home() {
  const { t, i18n } = useTranslation()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const isZh = i18n.language.startsWith('zh')

  return (
    <PublicLayout showMainContainer={false}>
      <main className='overflow-x-hidden'>
        {/* Hero Section */}
        <section className='relative overflow-hidden px-6 py-24 text-center'>
          <div className='mx-auto max-w-4xl'>
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border bg-white/50 px-4 py-2 text-sm backdrop-blur-sm'>
              <span className='text-primary text-xs font-semibold tracking-wide uppercase'>
                {isZh ? '全新升级' : 'NEW'}
              </span>
              <span className='text-muted-foreground'>
                {isZh ? 'TokenMaster AI 服务平台正式上线' : 'TokenMaster AI Platform is now live'}
              </span>
            </div>

            <h1 className='text-foreground text-5xl font-bold tracking-tight sm:text-6xl'>
              {isZh ? '一个 API，连接' : 'One API, Connect '}
              <span className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
                {isZh ? '所有 AI 模型' : 'All AI Models'}
              </span>
            </h1>

            <p className='text-muted-foreground mx-auto mt-6 max-w-2xl text-xl leading-relaxed'>
              {isZh 
                ? '通过统一的 API 接口，访问 GPT-4o、Claude 3.5、Gemini 等顶级 AI 模型。简单易用，按需付费。'
                : 'Access top AI models like GPT-4o, Claude 3.5, Gemini through a unified API interface. Simple, pay-as-you-go.'}
            </p>

            <div className='mt-10 flex items-center justify-center gap-4'>
              <Button size='lg' className='rounded-full px-8'>
                {isZh ? '开始使用' : 'Get Started'}
              </Button>
              <Button size='lg' variant='outline' className='rounded-full px-8'>
                {isZh ? '查看文档' : 'View Docs'}
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='px-6 py-24'>
          <div className='mx-auto max-w-7xl'>
            <h2 className='text-foreground mb-12 text-center text-3xl font-bold'>
              {isZh ? '为什么选择 TokenMaster？' : 'Why Choose TokenMaster?'}
            </h2>

            <div className='grid gap-8 md:grid-cols-3'>
              {[
                {
                  title: isZh ? '统一接口' : 'Unified Interface',
                  desc: isZh ? '一个 API 访问所有主流 AI 模型，无需管理多个账号' : 'One API for all major AI models, no need to manage multiple accounts',
                },
                {
                  title: isZh ? '透明计费' : 'Transparent Billing',
                  desc: isZh ? '按量计费，无隐藏费用，实时查看用量和账单' : 'Pay as you go, no hidden fees, real-time usage and billing',
                },
                {
                  title: isZh ? '稳定可靠' : 'Stable & Reliable',
                  desc: isZh ? '99.9% 可用性保证，企业级基础设施' : '99.9% availability SLA, enterprise-grade infrastructure',
                },
              ].map((feature, i) => (
                <div key={i} className='rounded-2xl border p-8'>
                  <h3 className='text-foreground mb-4 text-xl font-semibold'>{feature.title}</h3>
                  <p className='text-muted-foreground'>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className='bg-muted/30 px-6 py-24'>
          <div className='mx-auto max-w-7xl'>
            <h2 className='text-foreground mb-12 text-center text-3xl font-bold'>
              {isZh ? '简单透明的定价' : 'Simple, Transparent Pricing'}
            </h2>

            {/* Billing Toggle */}
            <div className='mb-12 flex items-center justify-center gap-4'>
              <span className={billingCycle === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}>
                {isZh ? '月付' : 'Monthly'}
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className='bg-primary relative inline-flex h-6 w-11 items-center rounded-full'
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={billingCycle === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}>
                {isZh ? '年付（省 20%）' : 'Yearly (Save 20%)'}
              </span>
            </div>

            {/* Pricing Cards */}
            <div className='grid gap-8 lg:grid-cols-4'>
              {[
                {
                  name: isZh ? '免费试用' : 'Free Trial',
                  price: '$0',
                  credits: isZh ? '500 积分' : '500 credits',
                  features: [isZh ? 'GPT-4o 试用' : 'GPT-4o Trial', isZh ? 'Claude 3.5 试用' : 'Claude 3.5 Trial'],
                },
                {
                  name: isZh ? '按量计费' : 'Pay As You Go',
                  price: '$0.01',
                  period: isZh ? '/1K tokens' : '/1K tokens',
                  credits: isZh ? '无限制' : 'Unlimited',
                  features: [isZh ? '所有模型访问' : 'All Models', isZh ? '无月费' : 'No Monthly Fee'],
                  popular: true,
                },
                {
                  name: isZh ? '入门版' : 'Starter',
                  price: billingCycle === 'monthly' ? '$9.9' : '$99',
                  period: billingCycle === 'monthly' ? '/month' : '/year',
                  credits: isZh ? '10,000 积分/月' : '10,000 credits/month',
                  features: [isZh ? 'GPT-4o 无限制' : 'GPT-4o Unlimited', isZh ? '邮件支持' : 'Email Support'],
                },
                {
                  name: isZh ? '专业版' : 'Pro',
                  price: billingCycle === 'monthly' ? '$29.9' : '$299',
                  period: billingCycle === 'monthly' ? '/month' : '/year',
                  credits: isZh ? '50,000 积分/月' : '50,000 credits/month',
                  features: [isZh ? '所有模型 + 优先' : 'All Models + Priority', isZh ? '24/7 支持' : '24/7 Support'],
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-8 ${
                    plan.popular ? 'border-primary shadow-lg' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className='bg-primary text-primary-foreground mb-4 inline-block rounded-full px-3 py-1 text-sm font-semibold'>
                      {isZh ? '最受欢迎' : 'Most Popular'}
                    </div>
                  )}
                  
                  <h3 className='text-foreground mb-4 text-xl font-semibold'>{plan.name}</h3>
                  <div className='mb-6'>
                    <span className='text-foreground text-4xl font-bold'>{plan.price}</span>
                    {plan.period && <span className='text-muted-foreground ml-2'>{plan.period}</span>}
                  </div>
                  <p className='text-muted-foreground mb-6 text-sm'>{plan.credits}</p>

                  <ul className='mb-8 space-y-3'>
                    {plan.features.map((feature, j) => (
                      <li key={j} className='flex items-center gap-3'>
                        <svg className='text-primary h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        <span className='text-sm'>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className='w-full' variant={plan.popular ? 'default' : 'outline'}>
                    {isZh ? '选择方案' : 'Choose Plan'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='px-6 py-24'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='text-foreground mb-12 text-center text-3xl font-bold'>
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            
            <div className='space-y-6'>
              {[
                {
                  q: isZh ? '如何购买积分？' : 'How to purchase credits?',
                  a: isZh ? '您可以通过 PayPal 或信用卡购买积分。' : 'You can purchase credits via PayPal or Credit Card.',
                },
                {
                  q: isZh ? '积分会过期吗？' : 'Do credits expire?',
                  a: isZh ? '不会，您的积分永不过期。' : 'No, your credits never expire.',
                },
              ].map((faq, i) => (
                <details key={i} className='rounded-lg border p-6'>
                  <summary className='text-foreground cursor-pointer font-semibold'>{faq.q}</summary>
                  <p className='text-muted-foreground mt-4'>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}
