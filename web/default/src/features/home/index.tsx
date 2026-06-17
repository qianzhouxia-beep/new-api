/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team
*/
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'

export function Home() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const models = [
    {
      brand: 'DeepSeek',
      items: [
        'V4 Flash — ' + t('Lightweight fast inference'),
        'V4 Pro — ' + t('Flagship deep reasoning'),
        'Chat (V3) — ' + t('General conversation'),
        'Reasoner (R1) — ' + t('Complex logical reasoning'),
      ],
      badge: t('OpenAI Compatible'),
      badgeColor: '#FF6B35',
    },
    {
      brand: t('Zhipu GLM'),
      items: [
        '4.7-Flash — ' + t('Next-gen lightweight model'),
        '4.5-Air — ' + t('High cost-performance'),
        '4-Vision — ' + t('Multimodal understanding'),
        '4-Series — ' + t('General conversation'),
      ],
      badge: t('Chinese-optimized, reliable'),
      badgeColor: '#FF6B35',
    },
    {
      brand: t('Qwen (Tongyi Qianwen)'),
      items: [
        '3.7-Max — ' + t('Alibaba flagship model'),
        '3.7-Plus — ' + t('Balanced all-rounder'),
        '3.5-Plus / Flash — ' + t('Cost-effective choice'),
        'Plus / Turbo / Long — ' + t('Classic series'),
      ],
      badge: t('1M context window support'),
      badgeColor: '#FF6B35',
    },
  ]

  const faqs = [
    {
      q: t('How is TokenMaster different from using models directly?'),
      a: t('TokenMaster provides unified access to top Chinese AI models (DeepSeek, GLM, Qwen) with a single API key. No need to register and prepay on each platform separately.'),
    },
    {
      q: t('Which models are supported?'),
      a: t('Currently: DeepSeek (V4 Flash, V4 Pro, Chat, Reasoner), GLM (4.7-Flash, 4.5-Air, 4-Vision, etc.), Qwen (3.7-Max, 3.7-Plus, 3.5 series). More models being added continuously.'),
    },
    {
      q: t('Do I need to bring my own API keys?'),
      a: t('No. After signing up, you get a dedicated API key that works for all models. No need to prepare keys from DeepSeek, Zhipu, or Alibaba Cloud.'),
    },
    {
      q: t('How does billing work?'),
      a: t('USD prepaid balance, pay-per-use. Each model has a clear price tag. No monthly fees, no subscriptions, no minimum spend.'),
    },
    {
      q: t('Does my balance expire?'),
      a: t('Balance never expires. Top up once and use it anytime.'),
    },
    {
      q: t('How do I get started?'),
      a: t('Three steps: (1) Sign up for an API key; (2) Top up your USD balance; (3) Change your OpenAI SDK base_url to https://api-tokenmaster.com/v1 and start calling.'),
    },
  ]

  return (
    <PublicLayout showMainContainer={false}>
      <main>
        {/* ===== Hero ===== */}
        <section className="relative py-20 px-6" style={{ backgroundColor: '#fff8f6' }}>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-[#261814] leading-tight" style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textWrap: 'balance',
              }}>
                <span style={{ color: '#ab3500' }}>{t('One line')}</span>{' '}
                {t('to access top AI models.')}<br />
                {'DeepSeek · GLM · Qwen, '}
                <span style={{ color: '#FF6B35' }}>{t('one key for all')}</span>。
              </h1>
              <p className="max-w-xl text-lg leading-relaxed" style={{ color: '#594139' }}>
                {t('TokenMaster is a unified AI API gateway for developers. Top up once, use multiple models. No separate registrations, no multiple keys, no SDK switching.')}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row pt-2">
                <Link to="/register">
                  <Button size="lg" className="gap-2 border-0 text-white shadow-md hover:shadow-lg" style={{ backgroundColor: '#FF6B35', padding: '12px 40px' }}>
                    {t('Sign Up Free')} →
                  </Button>
                </Link>
                <a href="/#usage">
                  <Button size="lg" variant="outline" className="gap-2" style={{ borderColor: '#8d7168', color: '#261814', padding: '12px 40px' }}>
                    {t('How to Use')}
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 border-t pt-8" style={{ borderColor: '#e1bfb5', color: '#594139' }}>
                <span><strong className="font-bold text-[#261814]">DeepSeek</strong> <em>V4 Flash · V4 Pro · Chat · Reasoner</em></span>
                <span><strong className="font-bold text-[#261814]">GLM</strong> <em>4.7-Flash · 4.5-Air</em></span>
                <span><strong className="font-bold text-[#261814]">Qwen</strong> <em>3.7-Max · 3.7-Plus · 3.5 {t('series')}</em></span>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative overflow-hidden rounded-xl border shadow-2xl bg-white" style={{ borderColor: '#e1bfb5' }}>
                <img
                  className="w-full h-auto object-cover"
                  src="/assets/hero.svg"
                  alt="TokenMaster AI Gateway"
                  style={{ aspectRatio: '560/380' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== Supported Models ===== */}
        <section className="py-20 px-6" style={{ backgroundColor: '#fff1ed' }} id="models">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#261814]">{t('Supported Models')}</h2>
              <p className="mt-3" style={{ color: '#594139' }}>{t('More models being added continuously')}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {models.map((m) => (
                <div key={m.brand} className="bg-white border rounded-xl p-8 transition-all hover:shadow-md" style={{ borderColor: '#e1bfb5' }}>
                  <h3 className="text-lg font-semibold mb-4 text-[#261814]">{m.brand}</h3>
                  <ul className="space-y-2" style={{ color: '#594139' }}>
                    {m.items.map((item) => (
                      <li key={item} style={{ listStyle: 'none' }}>· {item}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs font-medium" style={{ color: m.badgeColor }}>{m.badge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Features ===== */}
        <section className="py-20 px-6" style={{ backgroundColor: '#fff8f6' }} id="features">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-semibold text-[#261814]">{t('Why TokenMaster?')}</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8 bg-white border rounded-xl p-8 transition-all hover:shadow-md flex flex-col justify-between" style={{ borderColor: '#e1bfb5' }}>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#261814]">{t('Unified API Gateway')}</h3>
                  <p className="max-w-md mb-6" style={{ color: '#594139' }}>
                    {t('One key for all models, fully OpenAI-compatible. Switch models by changing the model parameter, no SDK changes needed.')}
                  </p>
                </div>
                <div className="rounded p-4 text-sm font-mono overflow-x-auto" style={{ backgroundColor: '#261814', color: '#fff8f6' }}>
                  <code className="block" style={{ color: '#FF6B35' }}>POST /v1/chat/completions</code>
                  <code className="block mt-1 opacity-70">Authorization: Bearer <span style={{ color: '#fff8f6' }}>tm_{t('your_key')}</span></code>
                  <code className="block mt-1 opacity-70">{'{ "model": "'}<span style={{ color: '#fff8f6' }}>deepseek-v4-flash</span>'{", \"messages\": [...] }"}</code>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white border rounded-xl p-8 transition-all hover:shadow-md" style={{ borderColor: '#e1bfb5' }}>
                <h3 className="text-xl font-semibold mb-2 text-[#261814]">{t('Prepay & Use')}</h3>
                <p style={{ color: '#594139' }}>
                  {t('USD prepaid balance, pay-per-use. No monthly fees, no subscriptions, no minimum spend.')}
                </p>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl p-8 text-white" style={{ backgroundColor: '#FF6B35' }}>
                <h3 className="text-xl font-semibold mb-2">{t('No Multiple Sign-ups')}</h3>
                <p className="opacity-90">
                  {t('One TokenMaster account = all models. No need to register, prepay, and manage keys on each platform separately.')}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-8 bg-white border rounded-xl p-8 transition-all hover:shadow-md flex items-center gap-6" style={{ borderColor: '#e1bfb5' }}>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#261814]">{t('OpenAI Compatible, Zero Migration')}</h3>
                  <p style={{ color: '#594139' }}>
                    {t('Just change your base_url. Existing OpenAI SDK code needs zero modification. Python, Node.js, cURL all supported.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Quick Start ===== */}
        <section className="py-20 px-6 bg-white" id="usage">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#261814]">{t('Quick Start')}</h2>
              <p className="mt-3" style={{ color: '#594139' }}>{t('Three steps, no complex setup')}</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: '#ffffff', borderColor: '#e1bfb5' }}>
                <p className="mb-3 text-xs font-medium tracking-wider" style={{ color: '#594139' }}>{t('Python (3 lines)')}</p>
                <pre className="rounded p-4 text-sm leading-relaxed overflow-x-auto" style={{ backgroundColor: '#261814', color: '#fff8f6' }}>
                  <code>{`import openai
client = openai.OpenAI(
    api_key="tm_your_key",
    base_url="https://api-tokenmaster.com/v1",
)
resp = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role":"user", "content": "Hello!"}],
)`}</code>
                </pre>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border p-5" style={{ backgroundColor: '#ffffff', borderColor: '#e1bfb5' }}>
                  <p className="mb-2 text-xs font-medium tracking-wider" style={{ color: '#594139' }}>{t('cURL (any language)')}</p>
                  <pre className="rounded p-3 text-xs leading-relaxed overflow-x-auto" style={{ backgroundColor: '#261814', color: '#fff8f6' }}>
                    <code>{`curl https://api-tokenmaster.com/v1/chat/completions \\
  -H "Authorization: Bearer tm_your_key" \\
  -d '{"model":"glm-4.7-flash","messages":[...]}'`}</code>
                  </pre>
                </div>
                <div className="rounded-xl border p-5" style={{ backgroundColor: '#ffffff', borderColor: '#e1bfb5' }}>
                  <p className="mb-2 text-sm font-semibold text-[#261814]">{t('3 Steps')}</p>
                  <ol className="space-y-1 pl-5" style={{ color: '#594139', listStyle: 'decimal' }}>
                    <li>{t('Sign up for TokenMaster')}</li>
                    <li>{t('Top up (USD balance)')}</li>
                    <li>{t('Call APIs with your key, pay as you go')}</li>
                  </ol>
                </div>
              </div>
            </div>
            <p className="mt-10 text-center" style={{ color: '#594139' }}>
              {t("Don't have an account?")}{' '}
              <Link to="/register" style={{ color: '#FF6B35' }} className="hover:underline">{t('Sign Up Free')}</Link>
              {' — '}{t('Get your API key instantly.')}
            </p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-20 px-6" style={{ backgroundColor: '#fff1ed' }} id="faq">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-semibold text-[#261814]">{t('FAQ')}</h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-white border rounded-lg" style={{ borderColor: '#e1bfb5' }}>
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium select-none text-[#261814] transition-colors group-open:text-[#FF6B35]">
                    {faq.q}
                  </summary>
                  <div className="border-t px-6 py-4 text-sm leading-relaxed" style={{ borderColor: '#e1bfb580', color: '#594139' }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <footer className="border-t px-6 py-16" style={{ backgroundColor: '#fff1ed', borderColor: '#e1bfb5' }}>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="text-lg font-bold text-[#261814]">TokenMaster</span>
                <p className="mt-3 max-w-xs text-sm" style={{ color: '#594139' }}>
                  {t('One-stop AI API gateway for developers. One key, all models.')}
                </p>
                <p className="mt-6 text-xs" style={{ color: '#594139' }}>© {year} TokenMaster. {t('All rights reserved.')}</p>
              </div>
              <div className="lg:col-span-6 grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <h4 className="mb-4 text-xs font-bold tracking-wider uppercase text-[#261814]">{t('Product')}</h4>
                  <ul className="space-y-2 text-sm" style={{ color: '#594139' }}>
                    <li><a href="#models" className="hover:text-[#FF6B35]">{t('Models')}</a></li>
                    <li><a href="#features" className="hover:text-[#FF6B35]">{t('Features')}</a></li>
                    <li><Link to="/pricing" className="hover:text-[#FF6B35]">{t('Pricing')}</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-xs font-bold tracking-wider uppercase text-[#261814]">{t('Resources')}</h4>
                  <ul className="space-y-2 text-sm" style={{ color: '#594139' }}>
                    <li><a href="#" className="hover:text-[#FF6B35]">{t('Docs')}</a></li>
                    <li><a href="#" className="hover:text-[#FF6B35]">{t('API Reference')}</a></li>
                    <li><a href="#faq" className="hover:text-[#FF6B35]">{t('FAQ')}</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-xs font-bold tracking-wider uppercase text-[#261814]">{t('About')}</h4>
                  <ul className="space-y-2 text-sm" style={{ color: '#594139' }}>
                    <li><a href="#" className="hover:text-[#FF6B35]">{t('About Us')}</a></li>
                    <li><a href="#" className="hover:text-[#FF6B35]">{t('Contact Us')}</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-xs font-bold tracking-wider uppercase text-[#261814]">{t('Legal')}</h4>
                  <ul className="space-y-2 text-sm" style={{ color: '#594139' }}>
                    <li><a href="#" className="hover:text-[#FF6B35]">{t('Privacy Policy')}</a></li>
                    <li><a href="#" className="hover:text-[#FF6B35]">{t('Terms of Service')}</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-center gap-3 border-t pt-6" style={{ borderColor: '#e1bfb5' }}>
              <span className="inline-block size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs" style={{ color: '#594139' }}>{t('All Systems Operational')}</span>
            </div>
          </div>
        </footer>
      </main>
    </PublicLayout>
  )
}
