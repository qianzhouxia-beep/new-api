/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team
*/
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Code2, Globe, Shield, Database } from 'lucide-react'
import { BrandIcon } from '@/components/icons/brand-icons'

const COLORS = {
  orange: '#FF6B35',
  orangeDark: '#ab3500',
  surface: '#fff8f6',
  surfaceLow: '#fff1ed',
  onSurface: '#261814',
  onSurfaceVariant: '#594139',
  outlineVariant: '#e1bfb5',
}

interface ModelDef { name: { zh: string; en: string }; desc: { zh: string; en: string }; brand: 'deepseek' | 'zhipu' | 'qwen' }

const models: ModelDef[] = [
  { name: { zh: 'DeepSeek V4 Flash · V4 Pro · Chat · Reasoner', en: 'DeepSeek V4 Flash · V4 Pro · Chat · Reasoner' }, desc: { zh: 'OpenAI 兼容格式', en: 'OpenAI Compatible' }, brand: 'deepseek' },
  { name: { zh: 'GLM 4.7-Flash · 4.5-Air · 4-Vision', en: 'GLM 4.7-Flash · 4.5-Air · 4-Vision' }, desc: { zh: '中文优化，稳定可靠', en: 'Chinese-native, reliable' }, brand: 'zhipu' },
  { name: { zh: 'Qwen 3.7-Max · 3.7-Plus · Turbo', en: 'Qwen 3.7-Max · 3.7-Plus · Turbo' }, desc: { zh: '百万级上下文支持', en: '1M context window' }, brand: 'qwen' },
]

const brandLabels: Record<string, { zh: string; en: string }> = {
  deepseek: { zh: 'DeepSeek', en: 'DeepSeek' },
  zhipu: { zh: '智谱 GLM', en: 'GLM (Zhipu)' },
  qwen: { zh: '通义千问', en: 'Qwen' },
}

const faqs: { q: { zh: string; en: string }; a: { zh: string; en: string } }[] = [
  {
    q: { zh: 'TokenMaster 和直接用 OpenAI 有什么区别？', en: 'How is TokenMaster different from using OpenAI directly?' },
    a: { zh: 'TokenMaster 主要接入国内优质模型（DeepSeek、智谱 GLM、通义千问），一个 Key 调用全部模型，免去每个平台分别注册充值。', en: 'TokenMaster provides unified access to top Chinese AI models (DeepSeek, GLM, Qwen) with a single API key — no need to register and prepay on each platform separately.' },
  },
  {
    q: { zh: '支持哪些模型？', en: 'Which models are supported?' },
    a: { zh: '当前已接入 DeepSeek（V4 Flash / V4 Pro / Chat / Reasoner）、智谱 GLM（4.7-Flash / 4.5-Air）、通义千问（3.7-Max / 3.7-Plus / 3.5 系列等）。', en: 'Currently: DeepSeek (V4 Flash, V4 Pro, Chat, Reasoner), GLM (4.7-Flash, 4.5-Air), Qwen (3.7-Max, 3.7-Plus, 3.5 series). More coming soon.' },
  },
  {
    q: { zh: '需要准备自己的 API Key 吗？', en: 'Do I need my own API keys?' },
    a: { zh: '不需要。注册后即可获取专属 API Key，一个 Key 调用全部模型。', en: 'No. You get one API key after sign-up that works for all models.' },
  },
  {
    q: { zh: '怎么收费？', en: 'How does billing work?' },
    a: { zh: '美金充值制，按实际使用量扣费。无月费、无订阅、无最低消费。', en: 'USD prepaid balance, pay-per-use. No monthly fees, no subscriptions, no minimum.' },
  },
  {
    q: { zh: '余额会过期吗？', en: 'Does my balance expire?' },
    a: { zh: '余额长期有效，不设有效期限制。', en: 'Balance never expires. Use it anytime.' },
  },
  {
    q: { zh: '怎么开始用？', en: 'How do I get started?' },
    a: { zh: '三步操作：(1) 注册账号获取 API Key；(2) 后台充值；(3) 改 base_url 即可调用。', en: 'Three steps: (1) Sign up for an API key; (2) Top up your balance; (3) Set base_url to https://api-tokenmaster.com/v1 and start calling.' },
  },
]

function T({ zh, en }: { zh: string; en: string }) {
  const { i18n } = useTranslation()
  return <>{i18n.language.startsWith('zh') ? zh : en}</>
}

function useIsZh() {
  const { i18n } = useTranslation()
  return i18n.language.startsWith('zh')
}

export function Home() {
  const isZh = useIsZh()
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <PublicLayout>
      {/* ===== Hero ===== */}
      <section className="tm-hero-section relative" style={{ backgroundColor: COLORS.surface }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 lg:flex-row lg:py-28">
          <div className="lg:w-1/2 lg:pr-8">
            <h1 className="text-on-surface leading-tight" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}>
              {isZh ? (
                <><span style={{ color: COLORS.orangeDark }}>一行代码</span>接入主流 AI 模型。<br />DeepSeek · GLM · 通义千问，<span style={{ color: COLORS.orange }}>一 Key 通用</span>。</>
              ) : (
                <><span style={{ color: COLORS.orangeDark }}>One line</span> to access top AI models.<br />DeepSeek · GLM · Qwen, <span style={{ color: COLORS.orange }}>one key</span> for all.</>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: COLORS.onSurfaceVariant }}>
              <T zh="TokenMaster 是面向开发者的统一 AI API 网关。充值一次，畅用多个模型。无需分别注册、无需多个 Key、无需切换 SDK。" en="TokenMaster is a unified AI API gateway for developers. Top up once, use multiple models. No separate registrations, no multiple keys, no SDK switching." />
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/sign-up">
                <Button size="lg" className="gap-2 border-0 text-white shadow-md hover:shadow-lg" style={{ backgroundColor: COLORS.orange, padding: '12px 40px' }}>
                  <T zh="免费注册" en="Sign Up Free" /> <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="gap-2 hover:bg-white" style={{ borderColor: '#8d7168', color: COLORS.onSurface, padding: '12px 40px' }}>
                  <T zh="模型与价格" en="Models & Pricing" />
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t pt-8" style={{ borderColor: COLORS.outlineVariant, color: COLORS.onSurfaceVariant }}>
              <span><strong className="font-bold">DeepSeek</strong> <em>{isZh ? 'V4 Flash · V4 Pro · Chat · Reasoner' : 'V4 Flash · V4 Pro · Chat · Reasoner'}</em></span>
              <span><strong className="font-bold">GLM</strong> <em>{isZh ? '4.7-Flash · 4.5-Air' : '4.7-Flash · 4.5-Air'}</em></span>
              <span><strong className="font-bold">Qwen</strong> <em>{isZh ? '3.7-Max · 3.7-Plus · 3.5 系列' : '3.7-Max · 3.7-Plus · 3.5'}</em></span>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative overflow-hidden rounded-xl border shadow-2xl bg-white" style={{ borderColor: COLORS.outlineVariant }}>
              <img
                className="w-full object-cover"
                src="https://pay.api-tokenmaster.com/assets/hero.png?v=2"
                alt="TokenMaster AI Gateway"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 已接入模型 ===== */}
      <section className="py-20 px-6" style={{ backgroundColor: COLORS.surfaceLow }} id="models">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold" style={{ color: COLORS.onSurface }}>
              <T zh="已接入模型" en="Supported Models" />
            </h2>
            <p className="mt-3" style={{ color: COLORS.onSurfaceVariant }}>
              <T zh="更多模型持续接入中" en="More models coming soon" />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {models.map((m) => (
              <div key={m.brand} className="tm-card rounded-xl border bg-white p-8 transition-all hover:shadow-md" style={{ borderColor: COLORS.outlineVariant }}>
                <div className="flex items-center gap-3 mb-4">
                  <BrandIcon brand={m.brand} className="size-8" />
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.onSurface }}>{brandLabels[m.brand][isZh ? 'zh' : 'en']}</h3>
                </div>
                <ul className="space-y-2 text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                  {m.name[isZh ? 'zh' : 'en'].split('·').map((s: string) => (
                    <li key={s.trim()} style={{ listStyle: 'none' }}>· {s.trim()}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-medium" style={{ color: COLORS.orange }}>{m.desc[isZh ? 'zh' : 'en']}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 核心优势 ===== */}
      <section className="py-20 px-6" style={{ backgroundColor: COLORS.surface }} id="features">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-semibold" style={{ color: COLORS.onSurface }}>
            <T zh="为什么选择 TokenMaster？" en="Why TokenMaster?" />
          </h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8 tm-card rounded-xl border bg-white p-8 transition-all hover:shadow-md" style={{ borderColor: COLORS.outlineVariant }}>
              <h3 className="mb-2 text-xl font-semibold" style={{ color: COLORS.onSurface }}>
                <T zh="统一 API 网关" en="Unified API Gateway" />
              </h3>
              <p className="mb-6 max-w-md text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                <T zh="一个 Key 调用多个模型，全部兼容 OpenAI 格式。换模型只需改 model 参数。" en="One key for all models, fully OpenAI-compatible. Switch models by changing the model parameter." />
              </p>
              <div className="rounded p-4 text-sm font-mono" style={{ backgroundColor: COLORS.onSurface, color: COLORS.surface }}>
                <div>POST /v1/chat/completions</div>
                <div className="opacity-70">Authorization: Bearer <span className="text-[#FF6B35]">tm_your_key</span></div>
                <div className="opacity-70">{'{ "model": "deepseek-v4-flash" }'}</div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 tm-card rounded-xl border bg-white p-8 transition-all hover:shadow-md" style={{ borderColor: COLORS.outlineVariant }}>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="size-5" style={{ color: COLORS.orange }} />
                <h3 className="text-xl font-semibold" style={{ color: COLORS.onSurface }}>
                  <T zh="即充即用" en="Prepay & Use" />
                </h3>
              </div>
              <p className="text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                <T zh="美金充值，按量扣费。无月费、无订阅、无最低消费。" en="USD prepaid balance, pay-per-use. No monthly fees or minimums." />
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 tm-card rounded-xl p-8 text-white" style={{ backgroundColor: COLORS.orange }}>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="size-5" />
                <h3 className="text-xl font-semibold">
                  <T zh="无需多家注册" en="No Multiple Sign-ups" />
                </h3>
              </div>
              <p className="text-sm opacity-90">
                <T zh="一个账号 = 全部模型。不用分别注册、充值、管理 Key。" en="One account = all models. No need to sign up and prepay on each platform." />
              </p>
            </div>
            <div className="col-span-12 lg:col-span-8 tm-card rounded-xl border bg-white p-8 transition-all hover:shadow-md flex items-center gap-6" style={{ borderColor: COLORS.outlineVariant }}>
              <div>
                <h3 className="mb-2 text-xl font-semibold" style={{ color: COLORS.onSurface }}>
                  <T zh="OpenAI 兼容，零迁移成本" en="OpenAI-Compatible, Zero Migration" />
                </h3>
                <p className="text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                  <T zh="改一行 base_url 即可。现有 OpenAI SDK 代码无需任何修改。" en="Just change your base_url. No code changes needed for existing OpenAI SDK code." />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 快速开始 ===== */}
      <section className="py-20 px-6 bg-white" id="usage">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold" style={{ color: COLORS.onSurface }}>
              <T zh="快速开始" en="Quick Start" />
            </h2>
            <p className="mt-3" style={{ color: COLORS.onSurfaceVariant }}>
              <T zh="三步接入，无需复杂配置" en="Three steps, no complex setup" />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-xl border p-6" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.outlineVariant }}>
              <p className="mb-3 text-xs font-medium tracking-wider" style={{ color: COLORS.onSurfaceVariant }}>Python</p>
              <pre className="rounded p-4 text-sm leading-relaxed overflow-x-auto" style={{ backgroundColor: COLORS.onSurface, color: COLORS.surface }}>
                <code>{`import openai
client = openai.OpenAI(
    api_key="tm_your_key",
    base_url="https://api-tokenmaster.com/v1",
)
resp = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role":"user", "content":"你好！"}],
)`}</code>
              </pre>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border p-6" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.outlineVariant }}>
                <p className="mb-3 text-xs font-medium tracking-wider" style={{ color: COLORS.onSurfaceVariant }}>cURL</p>
                <pre className="rounded p-3 text-xs leading-relaxed overflow-x-auto" style={{ backgroundColor: COLORS.onSurface, color: COLORS.surface }}>
                  <code>{`curl https://api-tokenmaster.com/completions \\
  -H "Authorization: Bearer tm_your_key"`}</code>
                </pre>
              </div>
              <div className="rounded-xl border p-6" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.outlineVariant }}>
                <p className="mb-2 text-sm font-semibold" style={{ color: COLORS.onSurface }}>
                  <T zh="三步上手" en="3 Steps" />
                </p>
                <ol className="space-y-1 text-sm pl-5" style={{ color: COLORS.onSurfaceVariant, listStyle: 'decimal' }}>
                  <li><T zh="注册 TokenMaster 账户" en="Sign up for TokenMaster" /></li>
                  <li><T zh="后台充值（美金余额）" en="Top up (USD balance)" /></li>
                  <li><T zh="用 Key 调 API，按量扣费" en="Call APIs with your key" /></li>
                </ol>
              </div>
            </div>
          </div>
          <p className="mt-10 text-center text-sm" style={{ color: COLORS.onSurfaceVariant }}>
            <T zh="还没账号？" en="Don't have an account?" />{' '}
            <Link to="/sign-up" style={{ color: COLORS.orange }} className="hover:underline"><T zh="免费注册" en="Sign Up Free" /></Link> —
            <T zh="注册即拥有 API Key。" en="Get your API key instantly." />
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 px-6" style={{ backgroundColor: COLORS.surfaceLow }} id="faq">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-semibold" style={{ color: COLORS.onSurface }}>
            <T zh="常见问题" en="FAQ" />
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q.zh} className="group rounded-lg border bg-white" style={{ borderColor: COLORS.outlineVariant }}>
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium transition-colors select-none" style={{ color: COLORS.onSurface }}>
                  <T zh={faq.q.zh} en={faq.q.en} />
                  <span className="ml-2 shrink-0 text-lg transition-transform group-open:rotate-180" style={{ color: COLORS.orange }}>▾</span>
                </summary>
                <div className="border-t px-6 py-4 text-sm leading-relaxed" style={{ borderColor: `${COLORS.outlineVariant}80`, color: COLORS.onSurfaceVariant }}>
                  <T zh={faq.a.zh} en={faq.a.en} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6" style={{ backgroundColor: COLORS.surface }}>
        <div className="mx-auto max-w-3xl rounded-2xl p-12 text-center" style={{ backgroundColor: COLORS.orange }}>
          <h2 className="mb-4 text-3xl font-bold text-white">
            <T zh="准备好了吗？" en="Ready to Get Started?" />
          </h2>
          <p className="mb-8 text-lg text-white/90">
            <T zh="加入使用 TokenMaster 的开发者，以最简便的方式访问最优质的 AI 模型。" en="Join developers using TokenMaster for the easiest access to top AI models." />
          </p>
          <Link to="/sign-up">
            <Button size="lg" className="gap-2 bg-white text-black hover:bg-slate-100 shadow-lg">
              <T zh="免费注册" en="Sign Up Free" /> <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t px-6 py-16" style={{ backgroundColor: COLORS.surfaceLow, borderColor: COLORS.outlineVariant }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-lg font-bold" style={{ color: COLORS.onSurface }}>TokenMaster</span>
              <p className="mt-3 max-w-xs text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                <T zh="面向开发者的一站式 AI 模型 API 网关。" en="One-stop AI API gateway for developers." />
              </p>
              <p className="mt-6 text-xs" style={{ color: COLORS.onSurfaceVariant }}>© {year} TokenMaster</p>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { title: { zh: '产品', en: 'Product' }, links: [
                  { label: { zh: '模型', en: 'Models' }, href: '#models' },
                  { label: { zh: '优势', en: 'Features' }, href: '#features' },
                  { label: { zh: '价格', en: 'Pricing' }, to: '/pricing' as const },
                ]},
                { title: { zh: '资源', en: 'Resources' }, links: [
                  { label: { zh: '文档', en: 'Docs' } },
                  { label: { zh: 'API 参考', en: 'API Reference' } },
                  { label: { zh: 'FAQ', en: 'FAQ' }, href: '#faq' },
                ]},
                { title: { zh: '关于', en: 'About' }, links: [
                  { label: { zh: '关于我们', en: 'About' } },
                  { label: { zh: '联系我们', en: 'Contact' } },
                ]},
                { title: { zh: '法律', en: 'Legal' }, links: [
                  { label: { zh: '隐私政策', en: 'Privacy' } },
                  { label: { zh: '服务条款', en: 'Terms' } },
                ]},
              ].map((col) => (
                <div key={col.title.zh}>
                  <h4 className="mb-4 text-xs font-bold tracking-wider uppercase" style={{ color: COLORS.onSurface }}>
                    <T zh={col.title.zh} en={col.title.en} />
                  </h4>
                  <ul className="space-y-2 text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                    {col.links.map((link) => (
                      <li key={link.label.zh}>
                        {'to' in link && link.to ? (
                          <Link to={link.to} className="hover:underline" style={{ color: COLORS.orange }}><T zh={link.label.zh} en={link.label.en} /></Link>
                        ) : 'href' in link && link.href ? (
                          <a href={link.href} className="hover:underline" style={{ color: COLORS.orange }}><T zh={link.label.zh} en={link.label.en} /></a>
                        ) : (
                          <span className="cursor-default"><T zh={link.label.zh} en={link.label.en} /></span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex items-center justify-center gap-3 border-t pt-6" style={{ borderColor: COLORS.outlineVariant }}>
            <span className="inline-block size-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs" style={{ color: COLORS.onSurfaceVariant }}>
              <T zh="服务运行正常" en="All Systems Operational" />
            </span>
          </div>
        </div>
      </footer>

      {/* Global styles */}
      <style>{`
        .tm-hero-section h1,
        .tm-hero-section p {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
        }
        .tm-card {
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .tm-card:hover {
          border-color: #FF6B35;
        }
        details > summary {
          list-style: none;
        }
        details > summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </PublicLayout>
  )
}
