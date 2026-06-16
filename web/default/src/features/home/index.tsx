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
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Cpu, Globe, Zap, Shield, Database, Code2 } from 'lucide-react'

const models = [
  { name: 'DeepSeek V4 Flash', tag: '极速推理', color: 'from-blue-500 to-blue-600' },
  { name: 'DeepSeek V4 Pro',  tag: '旗舰推理', color: 'from-blue-600 to-indigo-600' },
  { name: 'DeepSeek Chat',    tag: '通用对话', color: 'from-blue-400 to-blue-500' },
  { name: 'DeepSeek R1',      tag: '复杂推理', color: 'from-indigo-500 to-purple-600' },
  { name: 'GLM 4.7-Flash',    tag: '轻量高效', color: 'from-emerald-500 to-teal-600' },
  { name: 'GLM 4.5-Air',      tag: '高性价比', color: 'from-teal-400 to-emerald-500' },
  { name: 'GLM 4-Vision',     tag: '多模态',   color: 'from-green-500 to-emerald-600' },
  { name: 'Qwen 3.7-Max',     tag: '旗舰模型', color: 'from-violet-500 to-purple-600' },
  { name: 'Qwen 3.7-Plus',    tag: '均衡全能', color: 'from-purple-400 to-violet-500' },
  { name: 'Qwen 3.5-Plus',    tag: '经典优选', color: 'from-fuchsia-500 to-pink-600' },
  { name: 'Qwen Plus',        tag: '通用模型', color: 'from-pink-400 to-rose-500' },
  { name: 'Qwen Turbo',       tag: '快速响应', color: 'from-rose-500 to-orange-500' },
]

const features = [
  {
    icon: Zap,
    title: '一 Key 通用',
    desc: '一个 API Key 调用 DeepSeek、GLM、Qwen 多个模型。换模型只需改 model 参数，代码零改动。',
  },
  {
    icon: Code2,
    title: 'OpenAI 兼容',
    desc: '完全兼容 OpenAI API 格式。改一行 base_url 即可接入，现有 SDK 无需修改。',
  },
  {
    icon: Cpu,
    title: '国内模型深度优化',
    desc: 'DeepSeek、智谱 GLM、通义千问国内直连，低延迟、高可用。',
  },
  {
    icon: Database,
    title: '即充即用',
    desc: '美金充值，按量扣费。无月费无订阅，充多少用多少。',
  },
  {
    icon: Shield,
    title: '用量透明',
    desc: '后台实时查看用量、余额、调用记录。每笔扣费清晰可查。',
  },
  {
    icon: Globe,
    title: '持续扩展',
    desc: '更多模型持续接入中。一个平台，管理所有 AI 模型接入。',
  },
]

export function Home() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language.startsWith('zh')

  return (
    <PublicLayout showMainContainer={false}>
      <main className='overflow-x-hidden'>
        
        {/* ===== Hero ===== */}
        <section className='relative overflow-hidden px-6 pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-36 lg:pb-32'>
          <div aria-hidden className='pointer-events-none absolute inset-0 -z-10 opacity-25 dark:opacity-[0.12]'
            style={{
              background: [
                'radial-gradient(ellipse 70% 55% at 25% 20%, oklch(0.55 0.20 25 / 80%) 0%, transparent 70%)',
                'radial-gradient(ellipse 50% 40% at 75% 15%, oklch(0.50 0.18 250 / 60%) 0%, transparent 70%)',
                'radial-gradient(ellipse 40% 35% at 50% 85%, oklch(0.60 0.15 180 / 40%) 0%, transparent 70%)',
              ].join(', '),
            }}
          />
          <div aria-hidden className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black_20%,transparent_100%)] bg-[size:4rem_4rem] opacity-[0.06]' />

          <div className='mx-auto max-w-5xl text-center'>
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border bg-white/50 px-4 py-1.5 text-sm backdrop-blur-sm shadow-xs'>
              <Sparkles className='text-primary size-4' />
              <span className='text-muted-foreground'>
                {isZh ? '已接入 12+ 主流 AI 模型' : '12+ AI models available'}
              </span>
            </div>

            <h1 className='text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              {isZh ? '一个 API，畅用' : 'One API to Use '}
              <span className='bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent'>
                {isZh ? '三大国产模型' : 'All Major Models'}
              </span>
            </h1>

            <p className='text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed'>
              {isZh
                ? 'TokenMaster 统一 DeepSeek、智谱 GLM、通义千问 API 接入。一个 Key，全部模型。无需分别注册、无需管理多个平台。'
                : 'TokenMaster unifies DeepSeek, GLM, Qwen API access. One key for all models. No separate signups, no multi-platform management.'}
            </p>

            <div className='mt-10 flex items-center justify-center gap-4'>
              <Button size='lg' className='rounded-full px-8' render={<Link to='/sign-up' />}>
                {isZh ? '免费注册' : 'Get Started'}
                <ArrowRight className='ml-1.5 size-4' />
              </Button>
              <Button size='lg' variant='outline' className='rounded-full px-8' render={<Link to='/pricing' />}>
                {isZh ? '模型价格' : 'View Pricing'}
              </Button>
            </div>
          </div>
        </section>

        {/* ===== 模型展示 ===== */}
        <section className='bg-muted/30 px-6 py-20'>
          <div className='mx-auto max-w-7xl'>
            <div className='mb-10 text-center'>
              <h2 className='text-foreground text-3xl font-bold'>
                {isZh ? '已接入模型' : 'Available Models'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '全系 OpenAI 兼容，按需选用' : 'All OpenAI-compatible, choose as needed'}
              </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {models.map((model, i) => (
                <div
                  key={i}
                  className='group relative overflow-hidden rounded-xl border bg-white/50 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'
                >
                  <div
                    aria-hidden
                    className='absolute -top-6 -right-6 size-20 rounded-full opacity-[0.07] transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.12]'
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                      '--tw-gradient-from': model.color.split(' ')[0].split('-')[1] ? `oklch(0.6 0.2 250)` : '#3b82f6',
                      '--tw-gradient-to': model.color.split(' ')[1]?.split('-')[1] ? `oklch(0.5 0.2 280)` : '#6366f1',
                    } as React.CSSProperties}
                  />
                  <div className='relative'>
                    <div className='flex items-center justify-between'>
                      <span className='text-foreground text-sm font-semibold'>{model.name}</span>
                      <span className='text-muted-foreground/60 text-[10px] font-medium uppercase tracking-wider'>{model.tag}</span>
                    </div>
                    <div className='mt-2 flex flex-wrap gap-1.5'>
                      <span className='inline-block rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400'>
                        OpenAI 兼容
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 核心优势 ===== */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-7xl'>
            <div className='mb-12 text-center'>
              <h2 className='text-foreground text-3xl font-bold'>
                {isZh ? '为什么选择 TokenMaster？' : 'Why TokenMaster?'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '为你省去多平台管理的麻烦' : 'Eliminate the hassle of multi-platform management'}
              </p>
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className='group rounded-xl border bg-white/50 p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
                    <div className='bg-primary/10 text-primary mb-4 inline-flex size-11 items-center justify-center rounded-lg transition-colors group-hover:bg-primary group-hover:text-white'>
                      <Icon className='size-5' />
                    </div>
                    <h3 className='text-foreground mb-2 text-lg font-semibold'>{feature.title}</h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>{feature.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== Quick Start ===== */}
        <section className='bg-muted/30 px-6 py-20'>
          <div className='mx-auto max-w-5xl'>
            <div className='mb-10 text-center'>
              <h2 className='text-foreground text-3xl font-bold'>
                {isZh ? '快速开始' : 'Quick Start'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '三步接入，一行代码' : 'Three steps, one line of code'}
              </p>
            </div>

            <div className='grid gap-6 md:grid-cols-3'>
              {[
                { step: '01', title: isZh ? '注册账号' : 'Register', desc: isZh ? '免费注册 TokenMaster，获取专属 API Key' : 'Sign up for free and get your API Key' },
                { step: '02', title: isZh ? '充值余额' : 'Top Up', desc: isZh ? '后台充入美金余额，按需付费' : 'Deposit USD balance, pay-as-you-go' },
                { step: '03', title: isZh ? '调用 API' : 'Call API', desc: isZh ? '改一行 base_url，用你的 Key 直接调用' : 'Change base_url, use your key to call models' },
              ].map((item, i) => (
                <div key={i} className='relative rounded-xl border bg-white/50 p-6'>
                  <span className='text-5xl font-black opacity-[0.04] absolute -top-2 -right-2 select-none leading-none'>{item.step}</span>
                  <div className='text-primary mb-3 text-2xl font-bold'>{item.step}</div>
                  <h3 className='text-foreground mb-1 text-lg font-semibold'>{item.title}</h3>
                  <p className='text-muted-foreground text-sm'>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className='mt-10 rounded-xl border bg-white/50 p-6'>
              <p className='text-muted-foreground/70 mb-2 text-xs font-bold tracking-widest uppercase'>PYTHON</p>
              <pre className='bg-muted/50 text-sm overflow-x-auto rounded-lg p-4'>
                <code>
                  <span className='text-muted-foreground'>import</span>{' '}
                  <span className='text-blue-600'>openai</span>
                  {'\n'}
                  client ={' '}
                  <span className='text-blue-600'>openai</span>.
                  <span className='text-blue-600'>OpenAI</span>({'\n'}
                  {'    '}api_key=<span className='text-emerald-600'>"tm_your_key"</span>,{'\n'}
                  {'    '}base_url=<span className='text-emerald-600'>"https://api-tokenmaster.com/v1"</span>,{'\n'}
                  ){'\n\n'}
                  response = client.chat.completions.
                  <span className='text-blue-600'>create</span>({'\n'}
                  {'    '}model=<span className='text-emerald-600'>"deepseek-v4-flash"</span>,{'\n'}
                  {'    '}messages=[{'{'}"role": <span className='text-emerald-600'>"user"</span>, "content": <span className='text-emerald-600'>"你好"</span>{'}'}]{'\n'}
                  )
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='text-foreground mb-12 text-center text-3xl font-bold'>
              {isZh ? '常见问题' : 'FAQ'}
            </h2>
            <div className='space-y-4'>
              {[
                {
                  q: isZh ? 'TokenMaster 支持哪些模型？' : 'What models does TokenMaster support?',
                  a: isZh
                    ? '目前已接入 DeepSeek（V4 Flash/Pro/Chat/Reasoner）、智谱 GLM（4.7-Flash/4.5-Air/4-Vision 等）、通义千问 Qwen（3.7-Max/3.7-Plus/3.5 系列等），更多模型持续接入中。'
                    : 'Currently supports DeepSeek (V4 Flash/Pro/Chat/Reasoner), GLM (4.7-Flash/4.5-Air/4-Vision etc.), Qwen (3.7-Max/3.7-Plus/3.5 series etc.). More models coming soon.',
                },
                {
                  q: isZh ? '需要准备自己的 API Key 吗？' : 'Do I need my own API keys?',
                  a: isZh
                    ? '不需要。注册 TokenMaster 后即可获取专属 API Key，一个 Key 调用全部模型，无需另外准备任何平台的 Key。'
                    : 'No. Register on TokenMaster and get one API key for all models. No need to get separate keys from each platform.',
                },
                {
                  q: isZh ? '怎么收费？价格如何？' : 'How does pricing work?',
                  a: isZh
                    ? '采用美金充值制，按实际使用量扣费。每个模型明码标价，可在后台模型广场查看。无月费、无订阅、无最低消费。'
                    : 'USD prepaid credit system, pay per actual usage. Each model has transparent pricing visible in the dashboard. No monthly fees, no subscriptions, no minimums.',
                },
                {
                  q: isZh ? '和 OpenAI 兼容吗？' : 'Is it OpenAI compatible?',
                  a: isZh
                    ? '完全兼容。改一行 base_url 为 https://api-tokenmaster.com/v1 即可，现有 OpenAI SDK 代码无需任何修改。'
                    : 'Fully compatible. Just change base_url to https://api-tokenmaster.com/v1. Your existing OpenAI SDK code works without any changes.',
                },
                {
                  q: isZh ? '余额会过期吗？' : 'Do credits expire?',
                  a: isZh
                    ? '不设有效期，充多少用多少。余额长期有效。'
                    : 'No expiration. Your balance is valid indefinitely.',
                },
              ].map((faq, i) => (
                <details key={i} className='group rounded-xl border bg-white/50 p-5'>
                  <summary className='text-foreground cursor-pointer text-base font-medium transition-colors group-open:text-primary flex items-center justify-between'>
                    <span>{faq.q}</span>
                    <svg className='size-4 shrink-0 transition-transform group-open:rotate-180' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                      <path d='M6 9l6 6 6-6' />
                    </svg>
                  </summary>
                  <p className='text-muted-foreground mt-4 text-sm leading-relaxed'>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className='bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 px-6 py-20'>
          <div className='mx-auto max-w-3xl text-center text-white'>
            <h2 className='text-3xl font-bold'>
              {isZh ? '开始使用 TokenMaster' : 'Get Started with TokenMaster'}
            </h2>
            <p className='mt-4 text-lg opacity-90'>
              {isZh ? '免费注册，立即体验统一 AI 模型网关' : 'Sign up free and experience unified AI model gateway'}
            </p>
            <div className='mt-8'>
              <Button
                size='lg'
                className='rounded-full bg-white px-10 text-foreground hover:bg-white/90'
                render={<Link to='/sign-up' />}
              >
                {isZh ? '免费注册' : 'Sign Up Free'}
                <ArrowRight className='ml-1.5 size-4' />
              </Button>
            </div>
          </div>
        </section>

      </main>
    </PublicLayout>
  )
}
