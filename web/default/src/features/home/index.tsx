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
import { ArrowRight, Sparkles, Zap, Shield, Database, Code2, Globe } from 'lucide-react'

/* ---------- brand icon SVGs ---------- */
function DeepSeekIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 48 48' fill='none'>
      <rect x='0' y='0' width='48' height='48' rx='10' className='fill-blue-500' />
      <text x='24' y='31' textAnchor='middle' className='fill-white text-xl font-bold' style={{ fontFamily: 'system-ui' }}>D</text>
    </svg>
  )
}
function ZhipuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 48 48' fill='none'>
      <rect x='0' y='0' width='48' height='48' rx='10' className='fill-emerald-500' />
      <text x='24' y='31' textAnchor='middle' className='fill-white text-xl font-bold' style={{ fontFamily: 'system-ui' }}>G</text>
    </svg>
  )
}
function QwenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 48 48' fill='none'>
      <rect x='0' y='0' width='48' height='48' rx='10' className='fill-violet-500' />
      <text x='24' y='31' textAnchor='middle' className='fill-white text-xl font-bold' style={{ fontFamily: 'system-ui' }}>Q</text>
    </svg>
  )
}
/* -------- model data with bilingual labels + brand -------- */
interface ModelDef { nameZh: string; nameEn: string; tagZh: string; tagEn: string; brand: 'deepseek' | 'zhipu' | 'qwen' }

const models: ModelDef[] = [
  { nameZh: 'DeepSeek V4 Flash', nameEn: 'DeepSeek V4 Flash', tagZh: '极速推理', tagEn: 'Fast Inference', brand: 'deepseek' },
  { nameZh: 'DeepSeek V4 Pro',   nameEn: 'DeepSeek V4 Pro',   tagZh: '旗舰推理', tagEn: 'Flagship Reasoning', brand: 'deepseek' },
  { nameZh: 'DeepSeek Chat',     nameEn: 'DeepSeek Chat',     tagZh: '通用对话', tagEn: 'General Chat', brand: 'deepseek' },
  { nameZh: 'DeepSeek Reasoner', nameEn: 'DeepSeek Reasoner', tagZh: '复杂推理', tagEn: 'Advanced Reasoning', brand: 'deepseek' },
  { nameZh: 'GLM 4.7-Flash',     nameEn: 'GLM 4.7-Flash',    tagZh: '轻量高效', tagEn: 'Lightweight', brand: 'zhipu' },
  { nameZh: 'GLM 4.5-Air',       nameEn: 'GLM 4.5-Air',      tagZh: '高性价比', tagEn: 'High Value', brand: 'zhipu' },
  { nameZh: 'GLM 4-Vision',      nameEn: 'GLM 4-Vision',     tagZh: '多模态',   tagEn: 'Multimodal', brand: 'zhipu' },
  { nameZh: 'Qwen 3.7-Max',      nameEn: 'Qwen 3.7-Max',     tagZh: '旗舰模型', tagEn: 'Flagship', brand: 'qwen' },
  { nameZh: 'Qwen 3.7-Plus',     nameEn: 'Qwen 3.7-Plus',    tagZh: '均衡全能', tagEn: 'All-round', brand: 'qwen' },
  { nameZh: 'Qwen 3.5-Plus',     nameEn: 'Qwen 3.5-Plus',    tagZh: '经典优选', tagEn: 'Best Value', brand: 'qwen' },
  { nameZh: 'Qwen Plus',         nameEn: 'Qwen Plus',        tagZh: '通用模型', tagEn: 'General', brand: 'qwen' },
  { nameZh: 'Qwen Turbo',        nameEn: 'Qwen Turbo',       tagZh: '快速响应', tagEn: 'Fast Response', brand: 'qwen' },
]

function BrandIcon({ brand, className }: { brand: string; className?: string }) {
  switch (brand) {
    case 'deepseek': return <DeepSeekIcon className={className} />
    case 'zhipu':    return <ZhipuIcon className={className} />
    case 'qwen':     return <QwenIcon className={className} />
    default:         return null
  }
}

const brandColors: Record<string, string> = {
  deepseek: 'from-blue-500 to-indigo-600',
  zhipu:    'from-emerald-500 to-teal-600',
  qwen:     'from-violet-500 to-purple-600',
}

const brandGradients: Record<string, `oklch${string}`> = {
  deepseek: 'oklch(0.60 0.22 250 / 80%)',
  zhipu:    'oklch(0.65 0.18 170 / 80%)',
  qwen:     'oklch(0.60 0.20 280 / 80%)',
}

/* -------- features (bilingual) -------- */
const features = (isZh: boolean) => [
  { icon: Zap, title: isZh ? '一 Key 通用' : 'One Key for All', desc: isZh
    ? '一个 API Key 调用 DeepSeek、GLM、Qwen 多个模型。换模型只需改 model 参数，代码零改动。'
    : 'One API key for DeepSeek, GLM, Qwen. Switch models by changing the model parameter only.' },
  { icon: Code2, title: isZh ? 'OpenAI 兼容' : 'OpenAI Compatible', desc: isZh
    ? '完全兼容 OpenAI API 格式。改一行 base_url 即可接入，现有 SDK 无需修改。'
    : 'Fully OpenAI-compatible. Just change your base_url, no SDK changes needed.' },
  { icon: Globe, title: isZh ? '国内模型深度优化' : 'Optimized for CN Models', desc: isZh
    ? 'DeepSeek、智谱 GLM、通义千问国内直连，低延迟、高可用。'
    : 'DeepSeek, GLM, Qwen direct connections in China — low latency, high availability.' },
  { icon: Database, title: isZh ? '即充即用' : 'Prepay & Use', desc: isZh
    ? '美金充值，按量扣费。无月费无订阅，充多少用多少。'
    : 'USD prepaid balance, pay per usage. No monthly fees, no subscriptions.' },
  { icon: Shield, title: isZh ? '用量透明' : 'Transparent Usage', desc: isZh
    ? '后台实时查看用量、余额、调用记录。每笔扣费清晰可查。'
    : 'Real-time usage dashboard with clear billing records for every API call.' },
  { icon: Zap, title: isZh ? '持续扩展' : 'Expanding', desc: isZh
    ? '更多模型持续接入中。一个平台，管理所有 AI 模型接入。'
    : 'New models added regularly. One platform to manage all your AI access.' },
]

/* -------- footer -------- */
function HomeFooter({ isZh }: { isZh: boolean }) {
  const year = new Date().getFullYear()
  return (
    <footer className='border-t border-border/40 bg-gradient-to-r from-orange-50/80 via-red-50/60 to-purple-50/80'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:py-16'>
        <div className='flex flex-col justify-between gap-10 md:flex-row md:gap-16'>
          <div className='shrink-0'>
            <span className='text-foreground text-lg font-bold tracking-tight'>TokenMaster</span>
            <p className='text-muted-foreground/60 mt-2 max-w-[220px] text-sm leading-relaxed'>
              {isZh
                ? '面向开发者的一站式 AI 模型 API 网关。一个 Key，全部模型。'
                : 'A one-stop AI model API gateway for developers. One key, all models.'}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-10 md:gap-16'>
            <div>
              <p className='text-muted-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase'>
                {isZh ? '产品' : 'Product'}
              </p>
              <ul className='space-y-2.5'>
                <li><a href='#models' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '模型' : 'Models'}</a></li>
                <li><a href='#features' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '优势' : 'Features'}</a></li>
                <li><Link to='/pricing' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '价格' : 'Pricing'}</Link></li>
              </ul>
            </div>
            <div>
              <p className='text-muted-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase'>
                {isZh ? '支持' : 'Support'}
              </p>
              <ul className='space-y-2.5'>
                <li><Link to='/sign-up' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '注册' : 'Sign Up'}</Link></li>
                <li><Link to='/sign-in' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '登录' : 'Sign In'}</Link></li>
                <li><a href='#faq' className='hover:text-primary text-muted-foreground text-sm transition-colors'>FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='border-border/30 mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 sm:flex-row'>
          <p className='text-muted-foreground/40 text-xs'>&copy; {year} TokenMaster. {isZh ? '保留所有权利。' : 'All rights reserved.'}</p>
          <div className='flex items-center gap-2'>
            <span className='inline-block size-1.5 rounded-full bg-green-500' />
            <span className='text-muted-foreground/40 text-xs'>{isZh ? '服务运行正常' : 'Service Operational'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ================================================================== */
export function Home() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language.startsWith('zh')

  return (
    <PublicLayout showMainContainer={false}>
      <main className='overflow-x-hidden'>

        {/* ===== Hero ===== */}
        <section className='relative overflow-hidden px-6 min-h-[100dvh] flex items-center'>
          <div aria-hidden className='pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-[0.15]'
            style={{
              background: [
                'radial-gradient(ellipse 60% 50% at 20% 30%, oklch(0.55 0.20 25 / 80%) 0%, transparent 70%)',
                'radial-gradient(ellipse 45% 35% at 80% 20%, oklch(0.50 0.18 250 / 60%) 0%, transparent 70%)',
                'radial-gradient(ellipse 35% 30% at 50% 80%, oklch(0.60 0.15 180 / 40%) 0%, transparent 70%)',
              ].join(', '),
            }}
          />
          <div aria-hidden className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_40%_at_50%_40%,black_15%,transparent_100%)] bg-[size:3.5rem_3.5rem] opacity-[0.05]' />

          {/* floating particles */}
          <div aria-hidden className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
            <div className='absolute top-[15%] left-[10%] size-3 rounded-full bg-orange-400/20 blur-sm animate-pulse' />
            <div className='absolute top-[25%] right-[15%] size-2.5 rounded-full bg-purple-500/20 blur-sm animate-pulse delay-300' />
            <div className='absolute bottom-[35%] left-[20%] size-2 rounded-full bg-blue-400/20 blur-sm animate-pulse delay-700' />
            <div className='absolute bottom-[20%] right-[25%] size-3.5 rounded-full bg-emerald-400/15 blur-sm animate-pulse delay-1000' />
          </div>

          <div className='mx-auto max-w-7xl w-full grid items-center gap-10 lg:gap-16 lg:grid-cols-2'>
            {/* ---- text column ---- */}
            <div className='text-center lg:text-left'>
              <div className='mb-5 inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-1.5 text-sm backdrop-blur-sm shadow-xs'>
                <Sparkles className='text-primary size-4' />
                <span className='text-muted-foreground'>
                  {isZh ? '已接入 12+ 主流 AI 模型' : '12+ AI Models Available'}
                </span>
              </div>

              <h1 className='text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]'>
                {isZh ? '一个 API，畅用' : 'One API for '}
                <span className='bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent'>
                  {isZh ? '三大国产模型' : 'All Major Models'}
                </span>
              </h1>

              <p className='text-muted-foreground mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed lg:mx-0'>
                {isZh
                  ? 'TokenMaster 统一 DeepSeek、智谱 GLM、通义千问 API 接入。一个 Key，全部模型。无需分别注册、无需管理多个平台。'
                  : 'TokenMaster unifies DeepSeek, GLM, and Qwen APIs. One key for all models — no separate signups, no multi-platform management.'}
              </p>

              <div className='mt-9 flex flex-wrap items-center gap-4 lg:justify-start'>
                <Button size='lg' className='rounded-full px-8' render={<Link to='/sign-up' />}>
                  {isZh ? '免费注册' : 'Get Started'}
                  <ArrowRight className='ml-1.5 size-4' />
                </Button>
                <Button size='lg' variant='outline' className='rounded-full px-8' render={<Link to='/pricing' />}>
                  {isZh ? '模型价格' : 'View Pricing'}
                </Button>
              </div>
            </div>

            {/* ---- image column ---- */}
            <div className='relative flex justify-center lg:justify-end'>
              <div className='relative max-w-md xl:max-w-lg'>
                {/* glow behind image */}
                <div aria-hidden className='absolute -inset-4 rounded-2xl bg-gradient-to-br from-orange-200/30 via-purple-200/20 to-blue-200/30 blur-2xl dark:from-orange-900/20 dark:via-purple-900/15 dark:to-blue-900/20' />
                <img
                  src='/hero-ai-chip.png'
                  alt='AI Model Hub Visualization'
                  className='relative w-full drop-shadow-2xl landing-animate-fade-up'
                  loading='eager'
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== Model Showcase ===== */}
        <section className='bg-muted/30 px-6 py-20' id='models'>
          <div className='mx-auto max-w-7xl'>
            <div className='mb-10 text-center'>
              <h2 className='text-foreground text-3xl font-bold'>
                {isZh ? '已接入模型' : 'Available Models'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '全系 OpenAI 兼容，按需选用' : 'All OpenAI-compatible, pick what you need'}
              </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {models.map((m, i) => (
                <div key={i} className='group relative overflow-hidden rounded-xl border bg-white/50 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'>
                  <div aria-hidden className='absolute -top-6 -right-6 size-20 rounded-full opacity-[0.07] transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.12]'
                    style={{ background: `radial-gradient(circle, ${brandGradients[m.brand]}, transparent)` }}
                  />
                  <div className='relative flex items-start gap-3'>
                    <BrandIcon brand={m.brand} className='mt-0.5 size-9 shrink-0' />
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center justify-between gap-1'>
                        <span className='text-foreground text-sm font-semibold truncate'>
                          {isZh ? m.nameZh : m.nameEn}
                        </span>
                        <span className='text-muted-foreground/60 shrink-0 text-[10px] font-medium uppercase tracking-wider'>
                          {isZh ? m.tagZh : m.tagEn}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Features ===== */}
        <section className='px-6 py-20' id='features'>
          <div className='mx-auto max-w-7xl'>
            <div className='mb-12 text-center'>
              <h2 className='text-foreground text-3xl font-bold'>
                {isZh ? '为什么选择 TokenMaster？' : 'Why TokenMaster?'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '为你省去多平台管理的麻烦' : 'No more juggling multiple platforms'}
              </p>
            </div>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {features(isZh).map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className='group rounded-xl border bg-white/50 p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
                    <div className='bg-primary/10 text-primary mb-4 inline-flex size-11 items-center justify-center rounded-lg transition-colors group-hover:bg-primary group-hover:text-white'>
                      <Icon className='size-5' />
                    </div>
                    <h3 className='text-foreground mb-2 text-lg font-semibold'>{f.title}</h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>{f.desc}</p>
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
                { step: '01', title: isZh ? '注册账号' : 'Register', desc: isZh ? '免费注册，获取专属 API Key' : 'Sign up free, get your API Key' },
                { step: '02', title: isZh ? '充值余额' : 'Top Up',   desc: isZh ? '后台充入美金余额，按需付费' : 'Deposit USD balance, pay-as-you-go' },
                { step: '03', title: isZh ? '调用 API' : 'Call API', desc: isZh ? '改一行 base_url，用 Key 直接调用' : 'Change base_url, start calling' },
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
                <code>{`import openai
client = openai.OpenAI(
    api_key="tm_your_key",
    base_url="https://api-tokenmaster.com/v1",
)
resp = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(resp.choices[0].message.content)`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className='px-6 py-20' id='faq'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='text-foreground mb-12 text-center text-3xl font-bold'>
              {isZh ? '常见问题' : 'FAQ'}
            </h2>
            <div className='space-y-4'>
              {[
                { q: isZh ? 'TokenMaster 支持哪些模型？' : 'What models does TokenMaster support?',
                  a: isZh ? '目前已接入 DeepSeek（V4 Flash/Pro/Chat/Reasoner）、智谱 GLM（4.7-Flash/4.5-Air/4-Vision 等）、通义千问 Qwen（3.7-Max/3.7-Plus/3.5 系列等），更多模型持续接入中。'
                    : 'Currently: DeepSeek (V4 Flash/Pro/Chat/Reasoner), GLM (4.7-Flash/4.5-Air/4-Vision etc.), Qwen (3.7-Max/3.7-Plus/3.5 series etc.). More coming soon.' },
                { q: isZh ? '需要准备自己的 API Key 吗？' : 'Do I need my own API keys?',
                  a: isZh ? '不需要。注册后获取专属 Key，一个 Key 调用全部模型。'
                    : 'No. Get one TokenMaster key that works for all models.' },
                { q: isZh ? '怎么收费？' : 'How does pricing work?',
                  a: isZh ? '美金充值，按量扣费。明码标价，无月费无订阅无最低消费。'
                    : 'USD prepaid credits, pay per usage. Transparent prices, no monthly fees.' },
                { q: isZh ? '和 OpenAI 兼容吗？' : 'Is it OpenAI compatible?',
                  a: isZh ? '完全兼容。改一行 base_url 到 https://api-tokenmaster.com/v1 即可。'
                    : 'Fully compatible. Just set base_url to https://api-tokenmaster.com/v1.' },
                { q: isZh ? '余额会过期吗？' : 'Do credits expire?',
                  a: isZh ? '不设有效期，充多少用多少。' : 'No expiration. Your balance lasts indefinitely.' },
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
              {isZh ? '免费注册，立即体验统一 AI 模型网关' : 'Join free and try the unified AI gateway'}
            </p>
            <div className='mt-8'>
              <Button size='lg' className='rounded-full bg-white px-10 text-foreground hover:bg-white/90' render={<Link to='/sign-up' />}>
                {isZh ? '免费注册' : 'Sign Up Free'}
                <ArrowRight className='ml-1.5 size-4' />
              </Button>
            </div>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <HomeFooter isZh={isZh} />
      </main>
    </PublicLayout>
  )
}
