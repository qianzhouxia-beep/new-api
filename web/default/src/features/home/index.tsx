/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team — Kinetic Forge Light Design System
*/
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'

/* ─── CSS-in-JS: Kinetic Forge shader background ─── */
const kineticForgeStyle = `
/* shader-flow background — CSS approximation of the GLSL sandbox shader */
@keyframes shaderFlow {
  0%   { background-position: 0% 0%, 33% 66%, 66% 33%; }
  25%  { background-position: 15% 30%, 55% 40%, 80% 60%; }
  50%  { background-position: 30% 60%, 10% 80%, 40% 90%; }
  75%  { background-position: 10% 15%, 70% 20%, 20% 50%; }
  100% { background-position: 0% 0%, 33% 66%, 66% 33%; }
}
@keyframes glitchShimmer {
  0%, 100% { opacity: 0.02; }
  50%      { opacity: 0.07; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 30px rgba(255,107,53,0.15); }
  50%      { box-shadow: 0 0 60px rgba(255,107,53,0.30); }
}
@keyframes floatParticle {
  0%   { transform: translateY(0) scale(1); opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.6; }
  100% { transform: translateY(-120px) scale(0.6); opacity: 0; }
}
.kf-hero {
  position: relative;
  overflow: hidden;
  background: #f7f3f0;
}
.kf-hero::before {
  content: '';
  position: absolute;
  inset: -50%;
  z-index: 0;
  background:
    radial-gradient(ellipse 50% 40% at 50% 90%, rgba(255,107,53,0.10) 0%, transparent 70%),
    radial-gradient(ellipse 30% 60% at 20% 40%, rgba(255,107,53,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 40% 50% at 80% 30%, rgba(255,167,83,0.05) 0%, transparent 50%);
  background-size: 200% 200%, 180% 180%, 190% 190%;
  animation: shaderFlow 24s ease-in-out infinite;
  pointer-events: none;
}
.kf-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    repeating-linear-gradient(90deg, transparent 0px, rgba(255,107,53,0.01) 1px, transparent 2px);
  background-size: 60px 60px;
  animation: glitchShimmer 8s ease-in-out infinite;
  pointer-events: none;
}
.kf-hero > * { position: relative; z-index: 1; }

/* 3D illustration card */
.api-orb-card {
  position: relative;
  width: 100%;
  max-width: 540px;
  aspect-ratio: 4/3;
  border-radius: 24px;
  background: linear-gradient(145deg, #1f1512 0%, #2b1e19 40%, #3d2922 100%);
  box-shadow:
    0 20px 80px rgba(255,107,53,0.12),
    0 0 0 1px rgba(255,107,53,0.08);
  overflow: hidden;
  animation: pulseGlow 4s ease-in-out infinite;
  margin: 0 auto;
}
.api-orb-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 60% 75%, rgba(255,107,53,0.20) 0%, transparent 60%),
    radial-gradient(circle 40% at 30% 30%, rgba(255,167,83,0.08) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 20% 80%, rgba(255,107,53,0.06) 0%, transparent 50%);
  pointer-events: none;
}
.api-orb-card .orb-glow {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(255,107,53,0.35) 0%, rgba(255,167,83,0.08) 40%, transparent 65%);
  filter: blur(20px);
  pointer-events: none;
}
.api-orb-card .orb-core {
  position: absolute;
  width: 120px;
  height: 120px;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fff6f0 0%, #ff8a50 20%, #ff6b35 50%, #bf4400 100%);
  box-shadow:
    0 0 40px rgba(255,107,53,0.5),
    0 0 80px rgba(255,167,83,0.2);
  pointer-events: none;
}
.api-orb-card .orb-ring {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 28%;
  left: 50%;
  transform: translateX(-50%) rotateX(70deg);
  border-radius: 50%;
  border: 1.5px solid rgba(255,107,53,0.15);
  box-shadow:
    0 0 20px rgba(255,107,53,0.05),
    inset 0 0 20px rgba(255,107,53,0.03);
  pointer-events: none;
}
.api-orb-card .orb-ring-2 {
  position: absolute;
  width: 300px;
  height: 80px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(60deg);
  border-radius: 50%;
  border: 1px solid rgba(255,107,53,0.06);
  pointer-events: none;
}
.api-orb-card .orb-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255,167,83,0.5);
  animation: floatParticle 6s ease-in-out infinite;
  pointer-events: none;
}
.api-orb-card .orb-particle:nth-child(1) { left: 20%; top: 70%; animation-delay: 0s; }
.api-orb-card .orb-particle:nth-child(2) { left: 75%; top: 65%; animation-delay: 1.5s; }
.api-orb-card .orb-particle:nth-child(3) { left: 40%; top: 80%; animation-delay: 3s; }
.api-orb-card .orb-particle:nth-child(4) { left: 60%; top: 55%; animation-delay: 4.5s; }
.api-orb-card .orb-particle:nth-child(5) { left: 85%; top: 45%; animation-delay: 2s; width: 3px; height: 3px; }
.api-orb-card .orb-label {
  position: absolute;
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Space Grotesk', monospace;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.15);
  text-shadow: 0 0 10px rgba(255,107,53,0.1);
  pointer-events: none;
}
.api-orb-card .orb-grid {
  position: absolute;
  inset: 10%;
  background:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

/* model brand badge */
.model-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 100px;
  background: white;
  border: 1px solid #e6d9d2;
  font-size: 13px;
  font-weight: 500;
  color: #261814;
  transition: all 0.2s ease;
}
.model-badge:hover {
  border-color: #FF6B35;
  box-shadow: 0 2px 12px rgba(255,107,53,0.10);
}

/* feature card */
.feature-card {
  background: white;
  border: 1px solid #e6d9d2;
  border-radius: 20px;
  padding: 32px;
  transition: all 0.25s ease;
}
.feature-card:hover {
  border-color: #FF6B35;
  box-shadow: 0 8px 30px rgba(255,107,53,0.06);
  transform: translateY(-2px);
}
.feature-card.accent {
  background: linear-gradient(135deg, #FF6B35 0%, #ff854f 100%);
  border-color: transparent;
  color: white;
}

/* section heading */
.section-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #261814;
  line-height: 1.15;
}
`

export function Home() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const modelBrands = [
    { name: 'DeepSeek', models: 'V4 Flash · V4 Pro · R1' },
    { name: 'GLM', models: '4.7-Flash · 4.5-Air · 4-Vision' },
    { name: 'Qwen', models: '3.7-Max · 3.7-Plus · 3.5' },
  ]

  const features = [
    {
      icon: '⚡',
      title: t('Unified API Gateway'),
      desc: t('One key to access all models — DeepSeek, GLM, Qwen. Fully OpenAI-compatible. Switch models by changing the model parameter. No SDK changes needed.'),
      wide: true,
    },
    {
      icon: '💳',
      title: t('Prepay & Use'),
      desc: t('USD prepaid balance, pay-per-use. No monthly fees, no subscriptions, no minimum spend.'),
    },
    {
      icon: '🔑',
      title: t('No Multiple Sign-ups'),
      desc: t('One TokenMaster account = all models. No separate registrations or API keys needed.'),
    },
    {
      icon: '🔄',
      title: t('Zero Migration'),
      desc: t('Just change your base_url. Existing OpenAI SDK code needs zero modification.'),
      wide: true,
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
      a: t('USD prepaid balance, pay-per-use. Each model has a clear per-million-token price. No monthly fees, no subscriptions, no minimum spend.'),
    },
    {
      q: t('Does my balance expire?'),
      a: t('Balance never expires. Top up once and use it anytime.'),
    },
    {
      q: t('How do I get started?'),
      a: t('Three steps: (1) Sign up to get your API key; (2) Top up your USD balance; (3) Change your OpenAI SDK base_url to https://api-tokenmaster.com/v1 and start calling.'),
    },
  ]

  return (
    <PublicLayout showMainContainer={false}>
      <style>{kineticForgeStyle}</style>
      <main>
        {/* ════════════════════════════════════════
             HERO — Kinetic Forge Light
             ════════════════════════════════════════ */}
        <section className="kf-hero px-6 py-20 lg:py-28">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
            {/* --- left: text --- */}
            <div className="flex-1 space-y-8">
              {/* tagline */}
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
                style={{ background: 'rgba(255,107,53,0.08)', color: '#cc5500' }}
              >
                {t('⚡ One API Key for All Top AI Models')}
              </span>

              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.03,
                  letterSpacing: '-0.035em',
                  color: '#1c110c',
                  textWrap: 'balance',
                }}
              >
                {t('The Fastest')}{' '}
                <span style={{ color: '#FF6B35' }}>
                  {t('AI API')}
                </span>
                <br />
                {t('for Production')}
              </h1>

              <p
                className="max-w-xl text-lg leading-relaxed"
                style={{ color: '#594139' }}
              >
                {t('One unified gateway to DeepSeek, GLM, and Qwen. One key. Pay as you go. No separate registrations, no SDK switching. Built for developers who ship.')}
              </p>

              {/* model brand badges */}
              <div className="flex flex-wrap gap-3">
                {modelBrands.map((b) => (
                  <span key={b.name} className="model-badge">
                    <span style={{
                      display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                      background: '#FF6B35', flexShrink: 0,
                    }} />
                    <strong>{b.name}</strong>
                    <span style={{ color: '#8d7168' }}>{b.models}</span>
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4 sm:flex-row pt-2">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="gap-2 border-0 text-white shadow-md hover:shadow-lg"
                    style={{
                      background: '#FF6B35',
                      padding: '14px 44px',
                      fontSize: '15px',
                      fontWeight: 600,
                      borderRadius: 12,
                    }}
                  >
                    {t('Start Building for Free')} →
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2"
                    style={{
                      borderColor: '#c9b7ae',
                      color: '#261814',
                      padding: '14px 44px',
                      fontSize: '15px',
                      fontWeight: 600,
                      borderRadius: 12,
                    }}
                  >
                    {t('View Pricing')}
                  </Button>
                </Link>
              </div>

              {/* social proof */}
              <div className="flex items-center gap-2 text-xs" style={{ color: '#8d7168' }}>
                <span className="flex -space-x-1.5">
                  {['👨‍💻', '👩‍💻', '🧑‍💻', '👨‍💻'].map((emoji, i) => (
                    <span key={i} className="inline-flex items-center justify-center size-6 rounded-full"
                      style={{ background: '#f0e8e4', border: '2px solid #f7f3f0' }}>{emoji}</span>
                  ))}
                </span>
                <span>{t('Trusted by developers worldwide · 100ms avg latency')}</span>
              </div>
            </div>

            {/* --- right: 3D illustration orb --- */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <div className="api-orb-card">
                <div className="orb-glow" />
                <div className="orb-grid" />
                <div className="orb-core" />
                <div className="orb-ring" />
                <div className="orb-ring-2" />
                <div className="orb-particle" />
                <div className="orb-particle" />
                <div className="orb-particle" />
                <div className="orb-particle" />
                <div className="orb-particle" />
                <div className="orb-label">API Gateway</div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
             WHY TOKENMASTER — Features
             ════════════════════════════════════════ */}
        <section className="px-6 py-20" style={{ background: '#ffffff' }} id="features">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wider uppercase"
                style={{ background: 'rgba(255,107,53,0.08)', color: '#cc5500' }}>
                {t('Why TokenMaster')}
              </span>
              <h2 className="section-heading mt-4">
                {t('Built for developers who ship fast')}
              </h2>
              <p className="mt-3 max-w-xl mx-auto" style={{ color: '#594139' }}>
                {t('Stop managing API keys across platforms. One integration, all the models you need.')}
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* wide card — code demo */}
              <div className="feature-card col-span-12 lg:col-span-8 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#261814' }}>
                    <span style={{ color: '#FF6B35' }}>⚡</span> {t('Unified API Gateway')}
                  </h3>
                  <p style={{ color: '#594139' }}>
                    {t('One key for all models, fully OpenAI-compatible. Switch models by changing the model parameter, no SDK changes needed.')}
                  </p>
                </div>
                <div
                  className="rounded-xl p-5 text-sm font-mono overflow-x-auto"
                  style={{ background: '#1c110c', color: '#f0e8e4' }}
                >
                  <code className="block" style={{ color: '#FF6B35' }}>POST /v1/chat/completions</code>
                  <code className="block mt-1 opacity-70">
                    Authorization: Bearer{' '}
                    <span style={{ color: '#fff' }}>tm_{t('your_key')}</span>
                  </code>
                  <code className="block mt-1 opacity-70">
                    {`{ "model": "`}<span style={{ color: '#fff' }}>deepseek-v4-flash</span>{`", "messages": [...] }`}
                  </code>
                </div>
              </div>

              {/* prepay */}
              <div className="feature-card col-span-12 md:col-span-6 lg:col-span-4">
                <div className="text-2xl mb-3">💳</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#261814' }}>
                  {t('Prepay & Use')}
                </h3>
                <p style={{ color: '#594139' }}>
                  {t('USD prepaid balance, pay-per-use. No monthly fees, no subscriptions, no minimum spend.')}
                </p>
              </div>

              {/* no multiple signups — accent */}
              <div className="feature-card accent col-span-12 md:col-span-6 lg:col-span-4">
                <div className="text-2xl mb-3">🔑</div>
                <h3 className="text-lg font-semibold mb-2">{t('No Multiple Sign-ups')}</h3>
                <p className="opacity-90">
                  {t('One TokenMaster account = all models. No need to register, prepay, and manage keys on each platform separately.')}
                </p>
              </div>

              {/* zero migration */}
              <div className="feature-card col-span-12 lg:col-span-8 flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-1">
                  <div className="text-2xl mb-3">🔄</div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#261814' }}>
                    {t('Zero Migration, Drop-in Replacement')}
                  </h3>
                  <p style={{ color: '#594139' }}>
                    {t('Just change your base_url. Existing OpenAI SDK code needs zero modification. Python, Node.js, cURL — all languages supported.')}
                  </p>
                </div>
                <div
                  className="rounded-xl px-4 py-3 text-xs font-mono shrink-0"
                  style={{ background: '#f7f3f0', border: '1px solid #e6d9d2', color: '#594139' }}
                >
                  <code className="block">base_url = <span style={{ color: '#FF6B35' }}>"https://api-tokenmaster.com/v1"</span></code>
                  <code className="block mt-1 opacity-70"># That's it. No other changes.</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
             QUICK START
             ════════════════════════════════════════ */}
        <section className="px-6 py-20" style={{ background: '#f7f3f0' }} id="usage">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wider uppercase"
                style={{ background: 'rgba(255,107,53,0.08)', color: '#cc5500' }}>
                {t('Quick Start')}
              </span>
              <h2 className="section-heading mt-4">{t('Get started in 3 minutes')}</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* python */}
              <div
                className="rounded-xl border p-6"
                style={{ background: '#ffffff', borderColor: '#e6d9d2' }}
              >
                <p className="mb-3 text-xs font-medium tracking-wider uppercase" style={{ color: '#594139' }}>
                  {t('Python — 3 lines')}
                </p>
                <pre
                  className="rounded-xl p-5 text-sm leading-relaxed overflow-x-auto"
                  style={{ background: '#1c110c', color: '#f0e8e4' }}
                >
                  <code>{`import openai
client = openai.OpenAI(
    api_key="tm_${t('your_key')}",
    base_url="https://api-tokenmaster.com/v1",
)
resp = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role":"user", "content": "Hello!"}],
)`}</code>
                </pre>
              </div>

              {/* cURL + steps */}
              <div className="flex flex-col gap-6">
                <div
                  className="rounded-xl border p-5"
                  style={{ background: '#ffffff', borderColor: '#e6d9d2' }}
                >
                  <p className="mb-2 text-xs font-medium tracking-wider uppercase" style={{ color: '#594139' }}>
                    {t('cURL — any language')}
                  </p>
                  <pre
                    className="rounded-xl p-4 text-xs leading-relaxed overflow-x-auto"
                    style={{ background: '#1c110c', color: '#f0e8e4' }}
                  >
                    <code>{`curl https://api-tokenmaster.com/v1/chat/completions \\
  -H "Authorization: Bearer tm_${t('your_key')}" \\
  -d '{"model":"glm-4.7-flash","messages":[{"role":"user","content":"Hi"}]}'`}</code>
                  </pre>
                </div>
                <div
                  className="rounded-xl border p-5 flex items-center gap-4"
                  style={{ background: '#ffffff', borderColor: '#e6d9d2' }}
                >
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-bold"
                    style={{ background: 'rgba(255,107,53,0.10)', color: '#FF6B35' }}
                  >
                    3
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#261814' }}>{t('3 Steps')}</p>
                    <ol className="mt-1 space-y-0.5 text-sm" style={{ color: '#594139' }}>
                      <li>1. {t('Sign up for TokenMaster → get your API key instantly')}</li>
                      <li>2. {t('Top up USD balance (no monthly fees)')}</li>
                      <li>3. {t('Call APIs with your key — pay only for what you use')}</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p style={{ color: '#594139' }}>
                {t("Don't have an account?")}{' '}
                <Link to="/register" style={{ color: '#FF6B35' }} className="hover:underline font-medium">
                  {t('Sign Up Free')
                }</Link>
                {' — '}{t('Get your API key in 30 seconds.')}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
             FAQ
             ════════════════════════════════════════ */}
        <section className="px-6 py-20" style={{ background: '#ffffff' }} id="faq">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wider uppercase"
                style={{ background: 'rgba(255,107,53,0.08)', color: '#cc5500' }}>
                {t('FAQ')}
              </span>
              <h2 className="section-heading mt-4">{t('Frequently asked questions')}</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group border rounded-xl overflow-hidden"
                  style={{ background: '#ffffff', borderColor: '#e6d9d2' }}
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium select-none transition-colors"
                    style={{ color: '#261814' }}
                  >
                    <span className="group-open:text-[#FF6B35]">{faq.q}</span>
                    <span className="ml-4 text-lg transition-transform group-open:rotate-180" style={{ color: '#FF6B35' }}>
                      ▾
                    </span>
                  </summary>
                  <div
                    className="border-t px-6 py-4 text-sm leading-relaxed"
                    style={{ borderColor: '#e6d9d280', color: '#594139' }}
                  >
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
             FOOTER
             ════════════════════════════════════════ */}
        <footer
          className="border-t px-6 py-16"
          style={{ background: '#f7f3f0', borderColor: '#e6d9d2' }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* brand */}
              <div className="lg:col-span-4">
                <span className="text-lg font-bold" style={{ color: '#261814' }}>
                  <span style={{ color: '#FF6B35' }}>⚡</span> TokenMaster
                </span>
                <p className="mt-3 max-w-xs text-sm" style={{ color: '#594139' }}>
                  {t('One-stop AI API gateway for developers. One key, all models.')}
                </p>
                <p className="mt-6 text-xs" style={{ color: '#8d7168' }}>
                  © {year} TokenMaster. {t('All rights reserved.')}
                </p>
              </div>

              {/* links */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <h4 className="mb-4 text-xs font-bold tracking-wider uppercase" style={{ color: '#261814' }}>
                    {t('Product')}
                  </h4>
                  <ul className="space-y-2.5 text-sm" style={{ color: '#594139' }}>
                    <li><a href="#features" className="hover:text-[#FF6B35] transition-colors">{t('Features')}</a></li>
                    <li><Link to="/pricing" className="hover:text-[#FF6B35] transition-colors">{t('Pricing')}</Link></li>
                    <li><Link to="/plans" className="hover:text-[#FF6B35] transition-colors">{t('Plans')}</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-xs font-bold tracking-wider uppercase" style={{ color: '#261814' }}>
                    {t('Resources')}
                  </h4>
                  <ul className="space-y-2.5 text-sm" style={{ color: '#594139' }}>
                    <li><a href="https://api-tokenmaster.com/docs" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition-colors">{t('API Docs')}</a></li>
                    <li><a href="#faq" className="hover:text-[#FF6B35] transition-colors">{t('FAQ')}</a></li>
                    <li><Link to="/about" className="hover:text-[#FF6B35] transition-colors">{t('About')}</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-xs font-bold tracking-wider uppercase" style={{ color: '#261814' }}>
                    {t('Legal')}
                  </h4>
                  <ul className="space-y-2.5 text-sm" style={{ color: '#594139' }}>
                    <li><Link to="/privacy-policy" className="hover:text-[#FF6B35] transition-colors">{t('Privacy Policy')}</Link></li>
                    <li><Link to="/user-agreement" className="hover:text-[#FF6B35] transition-colors">{t('Terms of Service')}</Link></li>
                  </ul>
                </div>
              </div>

              {/* status */}
              <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-end">
                <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs"
                  style={{ background: 'white', border: '1px solid #e6d9d2' }}>
                  <span className="inline-block size-2 rounded-full bg-green-500 animate-pulse" />
                  <span style={{ color: '#594139' }}>{t('All Systems Operational')}</span>
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="mt-12 border-t pt-6 text-center text-xs" style={{ borderColor: '#e6d9d2', color: '#8d7168' }}>
              {t('Built with')} ❤️ {t('for the developer community')}
            </div>
          </div>
        </footer>
      </main>
    </PublicLayout>
  )
}
