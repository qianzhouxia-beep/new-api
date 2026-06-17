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
      {/* Hero with tech background */}
      <section className="hero-section relative overflow-hidden px-6 py-24 lg:py-32">
        {/* Background effects */}
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="hero-glow hero-glow-1 pointer-events-none absolute" />
        <div className="hero-glow hero-glow-2 pointer-events-none absolute" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
              <Sparkles className="size-4" />
              AI Model Gateway
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              One API Key for{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                All Top AI Models
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Access DeepSeek, GLM, Qwen and more through a single unified API.
              Fully OpenAI-compatible — switch models instantly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/sign-up">
                <Button size="lg" className="gap-2 shadow-lg shadow-blue-500/25">
                  Get Started Free <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-800">
                  View Models
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {[
                { value: '99.9%', label: 'Uptime SLA' },
                { value: '<50ms', label: 'Avg Latency' },
                { value: '10+', label: 'Model Providers' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="border-y border-slate-800 bg-slate-950/50 px-6 py-20" id="models">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-white">Available Models</h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-sm text-slate-400">
            Premium AI models at competitive prices, all through a single unified endpoint.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {models.map((m, i) => (
              <div key={i} className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-blue-500/30 hover:bg-slate-900/80">
                <BrandIcon brand={m.brand} className="size-8 shrink-0 transition-transform group-hover:scale-110" />
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
          <h2 className="mb-2 text-center text-3xl font-bold text-white">Why TokenMaster?</h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-sm text-slate-400">
            Built for developers who need reliable, fast, and affordable AI model access.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-blue-500/20">
                <f.icon className="mb-4 size-10 text-blue-400" />
                <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - simple 3 steps */}
      <section className="border-t border-slate-800 bg-slate-950/30 px-6 py-20" id="how-it-works">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">Get Started in 3 Steps</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your free account in seconds. No credit card required.' },
              { step: '02', title: 'Get Your API Key', desc: 'Generate your unique API key from the dashboard.' },
              { step: '03', title: 'Start Building', desc: 'Replace base_url in your code and start making requests.' },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-blue-500/10 text-xl font-bold text-blue-400 ring-1 ring-blue-500/20">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-800 px-6 py-20" id="faq">
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
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-10 text-center shadow-lg shadow-blue-500/20">
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

      {/* Scan line overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="scan-line" />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
      </div>

      {/* Embedded styles for hero background effects */}
      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #0a0e27 0%, #0f172a 40%, #0c1929 70%, #0a1628 100%);
        }
        .hero-grid {
          background-image:
            linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
        }
        .hero-glow {
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
        }
        .hero-glow-1 {
          width: 600px;
          height: 600px;
          top: -200px;
          right: -100px;
          background: radial-gradient(circle, #3b82f6, transparent 70%);
        }
        .hero-glow-2 {
          width: 500px;
          height: 500px;
          bottom: -150px;
          left: -100px;
          background: radial-gradient(circle, #06b6d4, transparent 70%);
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scan-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent);
          animation: scan 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.7; }
        }
        .particle {
          position: absolute;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #3b82f6;
          animation: float 5s ease-in-out infinite;
        }
        .particle-1 { top: 20%; left: 15%; animation-delay: 0s; }
        .particle-2 { top: 40%; left: 75%; animation-delay: 1.2s; background: #06b6d4; }
        .particle-3 { top: 65%; left: 30%; animation-delay: 2.5s; }
        .particle-4 { top: 30%; left: 55%; animation-delay: 3.8s; background: #10b981; }
      `}</style>
    </PublicLayout>
  )
}
