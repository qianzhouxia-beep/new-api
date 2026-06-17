/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team
*/
import { Link } from '@tanstack/react-router'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, Shield, Database, Code2, Globe } from 'lucide-react'
import { BrandIcon } from '@/components/icons/brand-icons'

interface ModelDef {
  nameZh: string
  nameEn: string
  tagZh: string
  tagEn: string
  brand: 'deepseek' | 'zhipu' | 'qwen'
}

const models: ModelDef[] = [
  { nameZh: 'DeepSeek V4 Flash', nameEn: 'DeepSeek V4 Flash', tagZh: '极速推理', tagEn: 'Fast Inference', brand: 'deepseek' },
  { nameZh: 'DeepSeek V4 Pro', nameEn: 'DeepSeek V4 Pro', tagZh: '旗舰推理', tagEn: 'Flagship Reasoning', brand: 'deepseek' },
  { nameZh: 'DeepSeek Chat', nameEn: 'DeepSeek Chat', tagZh: '通用对话', tagEn: 'General Chat', brand: 'deepseek' },
  { nameZh: 'GLM 4.7-Flash', nameEn: 'GLM 4.7-Flash', tagZh: '轻量高效', tagEn: 'Lightweight', brand: 'zhipu' },
  { nameZh: 'GLM 4.5-Air', nameEn: 'GLM 4.5-Air', tagZh: '高性价比', tagEn: 'High Value', brand: 'zhipu' },
  { nameZh: 'Qwen 3.7-Max', nameEn: 'Qwen 3.7-Max', tagZh: '旗舰模型', tagEn: 'Flagship', brand: 'qwen' },
  { nameZh: 'Qwen 3.7-Plus', nameEn: 'Qwen 3.7-Plus', tagZh: '均衡全能', tagEn: 'All-round', brand: 'qwen' },
  { nameZh: 'Qwen Turbo', nameEn: 'Qwen Turbo', tagZh: '快速响应', tagEn: 'Fast Response', brand: 'qwen' },
]

const featuresData = [
  { icon: Zap, title: 'One Key for All', desc: 'One API key for DeepSeek, GLM, Qwen.' },
  { icon: Code2, title: 'OpenAI Compatible', desc: 'Fully compatible with OpenAI API format.' },
  { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security with permission management.' },
  { icon: Database, title: 'Pay As You Go', desc: 'Only pay for what you use, no subscription required.' },
  { icon: Globe, title: 'Global Access', desc: 'Low-latency endpoints worldwide.' },
  { icon: Sparkles, title: 'Easy Integration', desc: 'Change one line of code to get started.' },
]

const faqs = [
  { q: 'How do I get started?', a: 'Sign up, get your API key, and start making requests in minutes.' },
  { q: 'Which models are supported?', a: 'We support DeepSeek, GLM (Zhipu), Qwen (Tongyi), and more.' },
  { q: 'Is it really OpenAI-compatible?', a: 'Yes. Just change the base_url and keep everything else the same.' },
  { q: 'How does billing work?', a: 'Pay-as-you-go with transparent per-token pricing. No hidden fees.' },
]

export function Home() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-sm text-blue-300">
              <Sparkles className="size-4" />
              AI Model Gateway
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              One API Key for{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                All Top AI Models
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-400">
              Access DeepSeek, GLM, Qwen and more through a single unified API.
              Fully OpenAI-compatible — switch models instantly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/sign-up">
                <Button size="lg" className="gap-2">
                  Get Started Free <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  View Models
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="border-y border-slate-800 bg-slate-950/50 px-6 py-20" id="models">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-white">Available Models</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {models.map((m, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-slate-700">
                <BrandIcon brand={m.brand} className="size-8 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white">{m.nameEn}</div>
                  <div className="text-xs text-slate-500">{m.tagEn}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20" id="features">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">Why TokenMaster?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <f.icon className="mb-4 size-10 text-blue-400" />
                <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-800 bg-slate-950/30 px-6 py-20" id="faq">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-white">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-lg border border-slate-800 bg-slate-900/50">
                <summary className="cursor-pointer px-5 py-4 font-medium text-white transition group-hover:text-blue-400">
                  {faq.q}
                </summary>
                <div className="border-t border-slate-800 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Join developers who use TokenMaster to access the best AI models.
          </p>
          <Link to="/sign-up">
            <Button size="lg" variant="secondary" className="gap-2 bg-white text-slate-900 hover:bg-slate-100">
              Start for Free <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-10">
        <div className="mx-auto max-w-7xl text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} TokenMaster. All rights reserved.
        </div>
      </footer>
    </PublicLayout>
  )
}
