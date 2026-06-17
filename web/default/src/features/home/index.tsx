/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team
*/
import { Link } from '@tanstack/react-router'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, Database, Code2, Globe } from 'lucide-react'
import { BrandIcon } from '@/components/icons/brand-icons'

interface ModelDef {
  name: string;
  desc: string;
  brand: 'deepseek' | 'zhipu' | 'qwen';
}

const models: ModelDef[] = [
  { name: 'DeepSeek V4 Flash · V4 Pro · Chat · Reasoner', desc: 'OpenAI 兼容格式', brand: 'deepseek' },
  { name: 'GLM 4.7-Flash · 4.5-Air · 4-Vision', desc: '中文优化，稳定可靠', brand: 'zhipu' },
  { name: 'Qwen 3.7-Max · 3.7-Plus · Turbo', desc: '百万级上下文支持', brand: 'qwen' },
]

const featuresData = [
  { icon: Zap, title: '统一 API 网关', desc: '一个 Key 调用多个模型，全部兼容 OpenAI 格式。换模型只需改 model 参数。' },
  { icon: Code2, title: 'OpenAI 兼容，零迁移成本', desc: '改一行 base_url 即可。现存的 OpenAI SDK 代码无需任何修改。' },
  { icon: Globe, title: '即充即用', desc: '美金充值，按量扣费。无月费、无订阅、无最低消费。充多少用多少。' },
  { icon: Shield, title: '无需多家注册', desc: '一个 TokenMaster 账号 = 全部模型。不用在 DeepSeek、智谱、阿里云分别注册。' },
  { icon: Database, title: '用量透明', desc: '后台实时查看用量、余额、调用记录。每笔扣费清晰可查。' },
  { icon: Zap, title: '持续扩展', desc: '更多模型持续接入中。一个平台，管理所有 AI 模型接入。' },
]

const faqs = [
  { q: 'TokenMaster 和直接用 OpenAI 有什么区别？', a: 'TokenMaster 主要接入国内优质模型（DeepSeek、智谱 GLM、通义千问），一个 Key 调用全部模型，免去每个平台分别注册充值。模型定价透明，余额可查。' },
  { q: '支持哪些模型？', a: '当前已接入 DeepSeek（V4 Flash / V4 Pro / Chat / Reasoner）、智谱 GLM（4.7-Flash / 4.5-Air / 4-Vision 等）、通义千问 Qwen（3.7-Max / 3.7-Plus / 3.5 系列等）。更多模型持续接入中。' },
  { q: '需要准备自己的 API Key 吗？', a: '不需要。在 TokenMaster 注册后即可获取专属 API Key。一个 Key 调用全部模型，无需额外准备 DeepSeek / 智谱 / 阿里云的 Key。' },
  { q: '怎么收费？', a: '当前使用美金充值制。充值后获得余额，按实际使用量扣费。每个模型明码标价，无月费、无订阅、无最低消费。' },
  { q: '余额会过期吗？', a: '余额长期有效。充多少用多少，不设有效期限制。' },
  { q: '怎么开始用？', a: '三步操作：(1) 注册账号获取 API Key；(2) 后台充值美金余额；(3) 把 OpenAI SDK 的 base_url 改成 https://api-tokenmaster.com/v1。' },
]

/* ---------- colors ---------- */
const COLORS = {
  orange: '#FF6B35',
  orangeDark: '#ab3500',
  surface: '#fff8f6',
  surfaceLow: '#fff1ed',
  surfaceContainer: '#ffe9e3',
  onSurface: '#261814',
  onSurfaceVariant: '#594139',
  outline: '#8d7168',
  outlineVariant: '#e1bfb5',
}

export function Home() {
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
              <span style={{ color: COLORS.orangeDark }}>一行代码</span>接入主流 AI 模型。<br />
              DeepSeek · GLM · 通义千问，<span style={{ color: COLORS.orange }}>一 Key 通用</span>。
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: COLORS.onSurfaceVariant }}>
              TokenMaster 是面向开发者的统一 AI API 网关。充值一次，畅用多个模型。无需分别注册、无需多个 Key、无需切换 SDK。
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/sign-up">
                <Button size="lg" className="gap-2 border-0 text-white shadow-md hover:shadow-lg" style={{ backgroundColor: COLORS.orange, padding: '12px 40px' }}>
                  免费注册 <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="gap-2 hover:bg-white" style={{ borderColor: COLORS.outline, color: COLORS.onSurface, padding: '12px 40px' }}>
                  模型与价格
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t pt-8" style={{ borderColor: COLORS.outlineVariant, color: COLORS.onSurfaceVariant }}>
              <span><strong className="font-bold">DeepSeek</strong> <em>V4 Flash · V4 Pro · Chat · Reasoner</em></span>
              <span><strong className="font-bold">GLM</strong> <em>4.7-Flash · 4.5-Air</em></span>
              <span><strong className="font-bold">Qwen</strong> <em>3.7-Max · 3.7-Plus · 3.5 系列</em></span>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative overflow-hidden rounded-xl border shadow-2xl bg-white" style={{ borderColor: COLORS.outlineVariant }}>
              <img
                className="w-full h-full object-cover"
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
            <h2 className="text-3xl font-semibold" style={{ color: COLORS.onSurface }}>已接入模型</h2>
            <p className="mt-3" style={{ color: COLORS.onSurfaceVariant }}>更多模型持续接入中</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {models.map((m) => (
              <div key={m.name} className="tm-card rounded-xl border bg-white p-8 transition-all hover:shadow-md" style={{ borderColor: COLORS.outlineVariant }}>
                <div className="flex items-center gap-3 mb-4">
                  <BrandIcon brand={m.brand} className="size-8" />
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.onSurface }}>{m.brand === 'deepseek' ? 'DeepSeek' : m.brand === 'zhipu' ? '智谱 GLM' : '通义千问'}</h3>
                </div>
                <ul className="space-y-2 text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                  {m.name.split('·').map((s) => (
                    <li key={s.trim()} style={{ listStyle: 'none' }}>· {s.trim()}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-medium" style={{ color: COLORS.orange }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 核心优势 (Bento Grid) ===== */}
      <section className="py-20 px-6" style={{ backgroundColor: COLORS.surface }} id="features">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-semibold" style={{ color: COLORS.onSurface }}>为什么选择 TokenMaster？</h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8 tm-card rounded-xl border bg-white p-8 transition-all hover:shadow-md" style={{ borderColor: COLORS.outlineVariant }}>
              <h3 className="mb-2 text-xl font-semibold" style={{ color: COLORS.onSurface }}>统一 API 网关</h3>
              <p className="mb-6 max-w-md text-sm" style={{ color: COLORS.onSurfaceVariant }}>一个 Key 调用多个模型，全部兼容 OpenAI 格式。换模型只需改 model 参数，无需换 SDK。</p>
              <div className="rounded p-4 text-sm" style={{ backgroundColor: COLORS.onSurface, color: COLORS.surface }}>
                <code>POST /v1/chat/completions</code><br />
                <code className="opacity-70">Authorization: Bearer tm_你的_key</code><br />
                <code className="opacity-70">{'{ "model": "deepseek-v4-flash", "messages": [...] }'}</code>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 tm-card rounded-xl border bg-white p-8 transition-all hover:shadow-md" style={{ borderColor: COLORS.outlineVariant }}>
              <h3 className="mb-2 text-xl font-semibold" style={{ color: COLORS.onSurface }}>即充即用</h3>
              <p className="text-sm" style={{ color: COLORS.onSurfaceVariant }}>美金充值，按量扣费。无月费、无订阅、无最低消费。充多少用多少，用多久都行。</p>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 tm-card rounded-xl p-8 text-white" style={{ backgroundColor: COLORS.orange }}>
              <h3 className="mb-2 text-xl font-semibold">无需多家注册</h3>
              <p className="text-sm opacity-90">一个 TokenMaster 账号 = 全部模型。不用在 DeepSeek、智谱、阿里云分别注册、分别充值、分别管理 Key。</p>
            </div>
            <div className="col-span-12 lg:col-span-8 tm-card rounded-xl border bg-white p-8 transition-all hover:shadow-md flex items-center gap-6" style={{ borderColor: COLORS.outlineVariant }}>
              <div>
                <h3 className="mb-2 text-xl font-semibold" style={{ color: COLORS.onSurface }}>OpenAI 兼容，零迁移成本</h3>
                <p className="text-sm" style={{ color: COLORS.onSurfaceVariant }}>改一行 base_url 即可。现存的 OpenAI SDK 代码无需任何修改。Python、Node.js、cURL 全支持。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 快速开始 (Code Examples) ===== */}
      <section className="py-20 px-6 bg-white" id="usage">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold" style={{ color: COLORS.onSurface }}>快速开始</h2>
            <p className="mt-3" style={{ color: COLORS.onSurfaceVariant }}>三步接入，无需复杂配置</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-xl border p-8" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.outlineVariant }}>
              <p className="mb-3 text-xs font-medium tracking-wider" style={{ color: COLORS.onSurfaceVariant }}>Python (3 行搞定)</p>
              <pre className="rounded p-4 text-sm leading-relaxed overflow-x-auto" style={{ backgroundColor: COLORS.onSurface, color: COLORS.surface }}>
                <code>{`import openai
client = openai.OpenAI(
    api_key="tm_your_key",
    base_url="https://api-tokenmaster.com/v1",
)
resp = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role":"user", "content": "你好！"}],
)
print(resp.choices[0].message.content)`}</code>
              </pre>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border p-6" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.outlineVariant }}>
                <p className="mb-2 text-xs font-medium tracking-wider" style={{ color: COLORS.onSurfaceVariant }}>cURL (任何语言通用)</p>
                <pre className="rounded p-3 text-xs leading-relaxed overflow-x-auto" style={{ backgroundColor: COLORS.onSurface, color: COLORS.surface }}>
                  <code>{`curl https://api-tokenmaster.com/v1/chat/completions \\
  -H "Authorization: Bearer tm_your_key" \\
  -d '{"model":"glm-4.7-flash","messages":[{"role":"user","content":"hi"}]}'`}</code>
                </pre>
              </div>
              <div className="rounded-xl border p-6" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.outlineVariant }}>
                <p className="mb-2 text-sm font-semibold" style={{ color: COLORS.onSurface }}>三步上手</p>
                <ol className="space-y-1 text-sm pl-5" style={{ color: COLORS.onSurfaceVariant, listStyle: 'decimal' }}>
                  <li>注册 TokenMaster 账户</li>
                  <li>后台充值（美金余额）</li>
                  <li>用 Key 调 API，按量扣费</li>
                </ol>
              </div>
            </div>
          </div>
          <p className="mt-10 text-center text-sm" style={{ color: COLORS.onSurfaceVariant }}>
            还没账号？<Link to="/sign-up" style={{ color: COLORS.orange }} className="hover:underline">免费注册</Link> — 注册即拥有 API Key。
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 px-6" style={{ backgroundColor: COLORS.surfaceLow }} id="faq">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-semibold" style={{ color: COLORS.onSurface }}>常见问题</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-lg border bg-white" style={{ borderColor: COLORS.outlineVariant }}>
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium transition-colors select-none" style={{ color: COLORS.onSurface }}>
                  {faq.q}
                  <span className="text-lg transition-transform group-open:rotate-180" style={{ color: COLORS.orange }}>▾</span>
                </summary>
                <div className="border-t px-6 py-4 text-sm leading-relaxed" style={{ borderColor: `${COLORS.outlineVariant}80`, color: COLORS.onSurfaceVariant }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6" style={{ backgroundColor: COLORS.surface }}>
        <div className="mx-auto max-w-3xl rounded-2xl p-12 text-center" style={{ backgroundColor: COLORS.orange }}>
          <h2 className="mb-4 text-3xl font-bold text-white">准备好了吗？</h2>
          <p className="mb-8 text-lg text-white/90">加入使用 TokenMaster 的开发者，以最简便的方式访问最优质的 AI 模型。</p>
          <Link to="/sign-up">
            <Button size="lg" className="gap-2 bg-white text-black hover:bg-slate-100 shadow-lg">
              免费注册 <ArrowRight className="size-4" />
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
              <p className="mt-3 max-w-xs text-sm" style={{ color: COLORS.onSurfaceVariant }}>面向开发者的一站式 AI 模型 API 网关。一个 Key，全部模型。</p>
              <p className="mt-6 text-xs" style={{ color: COLORS.onSurfaceVariant }}>© {new Date().getFullYear()} TokenMaster. All rights reserved.</p>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h4 className="mb-4 text-xs font-bold tracking-wider uppercase" style={{ color: COLORS.onSurface }}>产品</h4>
                <ul className="space-y-2 text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                  <li><a href="#models" className="hover:underline" style={{ color: COLORS.orange }}>模型</a></li>
                  <li><a href="#features" className="hover:underline" style={{ color: COLORS.orange }}>优势</a></li>
                  <li><Link to="/pricing" className="hover:underline" style={{ color: COLORS.orange }}>价格</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-xs font-bold tracking-wider uppercase" style={{ color: COLORS.onSurface }}>资源</h4>
                <ul className="space-y-2 text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                  <li><span className="cursor-default">文档</span></li>
                  <li><span className="cursor-default">API 参考</span></li>
                  <li><a href="#faq" className="hover:underline" style={{ color: COLORS.orange }}>FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-xs font-bold tracking-wider uppercase" style={{ color: COLORS.onSurface }}>关于</h4>
                <ul className="space-y-2 text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                  <li><span className="cursor-default">关于我们</span></li>
                  <li><span className="cursor-default">联系我们</span></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-xs font-bold tracking-wider uppercase" style={{ color: COLORS.onSurface }}>法律</h4>
                <ul className="space-y-2 text-sm" style={{ color: COLORS.onSurfaceVariant }}>
                  <li><span className="cursor-default">隐私政策</span></li>
                  <li><span className="cursor-default">服务条款</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 flex items-center justify-center gap-3 border-t pt-6" style={{ borderColor: COLORS.outlineVariant }}>
            <span className="inline-block size-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs" style={{ color: COLORS.onSurfaceVariant }}>服务运行正常</span>
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
