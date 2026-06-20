/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team — Kinetic Forge Light Design System
Fully faithful 1:1 conversion from stitch_tokenmaster_design_system (5)/code.html
*/
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'

/* ─── M3 Color System + Tailwind Extensions ─── */
const designSystemStyle = `
  @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap");
  body {
    background-color: #1a1a1a;
  }
  .glow-radial {
    background: radial-gradient(circle at center, rgba(239, 68, 68, 0.08) 0%, transparent 70%);
  }
  /* ─── Hero Tech Grid Background ─── */
  .hero-tech-grid {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .hero-tech-grid::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: grid-drift 20s linear infinite;
  }
  .hero-tech-grid::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(239,68,68,0.06) 0%, transparent 70%);
  }
  @keyframes grid-drift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(40px, 40px); }
  }
  /* mouse-follow glow */
  .hero-glow {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  }
  .card-lift {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  }
  .card-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  }
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }

  /* ─── M3 Color CSS Variables ─── */
  :root {
    --m3-primary: #ef4444;
    --m3-on-primary: #ffffff;
    --m3-primary-fixed: #fecaca;
    --m3-primary-fixed-dim: #fca5a5;
    --m3-on-primary-fixed: #3b0909;
    --m3-on-primary-fixed-variant: #7f1d1d;
    --m3-primary-container: #b91c1c;
    --m3-on-primary-container: #ffffff;
    --m3-surface: #1a1a1a;
    --m3-surface-dim: #2a2a2a;
    --m3-surface-bright: #2e2e2e;
    --m3-surface-container-lowest: #111111;
    --m3-surface-container-low: #1a1a1a;
    --m3-surface-container: #222222;
    --m3-surface-container-high: #2a2a2a;
    --m3-surface-container-highest: #333333;
    --m3-surface-variant: #444444;
    --m3-on-surface: #ffffff;
    --m3-on-surface-variant: #d1d5db;
    --m3-secondary: #6b7280;
    --m3-secondary-container: #374151;
    --m3-on-secondary: #ffffff;
    --m3-on-secondary-container: #e5e7eb;
    --m3-secondary-fixed: #e5e7eb;
    --m3-secondary-fixed-dim: #9ca3af;
    --m3-on-secondary-fixed: #1f2937;
    --m3-on-secondary-fixed-variant: #374151;
    --m3-tertiary: #6b7280;
    --m3-tertiary-container: #374151;
    --m3-on-tertiary: #ffffff;
    --m3-on-tertiary-fixed: #1f2937;
    --m3-on-tertiary-fixed-variant: #374151;
    --m3-tertiary-fixed: #e5e7eb;
    --m3-tertiary-fixed-dim: #9ca3af;
    --m3-on-tertiary-container: #e5e7eb;
    --m3-error: #ef4444;
    --m3-error-container: #7f1d1d;
    --m3-on-error: #ffffff;
    --m3-on-error-container: #fecaca;
    --m3-background: #1a1a1a;
    --m3-on-background: #ffffff;
    --m3-outline: #6b7280;
    --m3-outline-variant: #4b5563;
    --m3-inverse-surface: #e5e7eb;
    --m3-inverse-on-surface: #1a1a1a;
    --m3-inverse-primary: #ef4444;
  }

  /* ─── M3 Utility Classes ─── */
  .bg-primary { background-color: var(--m3-primary); }
  .text-primary { color: var(--m3-primary); }
  .border-primary { border-color: var(--m3-primary); }
  .bg-primary\\/10 { background-color: color-mix(in srgb, var(--m3-primary) 10%, transparent); }
  .bg-primary\\/5 { background-color: color-mix(in srgb, var(--m3-primary) 5%, transparent); }
  .bg-on-primary { background-color: var(--m3-on-primary); }
  .text-on-primary { color: var(--m3-on-primary); }
  .bg-primary-fixed { background-color: var(--m3-primary-fixed); }
  .text-on-primary-fixed { color: var(--m3-on-primary-fixed); }
  .bg-primary-container { background-color: var(--m3-primary-container); }
  .text-on-primary-container { color: var(--m3-on-primary-container); }

  .bg-surface { background-color: var(--m3-surface); }
  .bg-surface-container { background-color: var(--m3-surface-container); }
  .bg-surface-container-low { background-color: var(--m3-surface-container-low); }
  .bg-surface-container-lowest { background-color: var(--m3-surface-container-lowest); }
  .bg-surface-container-high { background-color: var(--m3-surface-container-high); }
  .text-on-surface { color: var(--m3-on-surface); }
  .text-on-surface-variant { color: var(--m3-on-surface-variant); }
  .border-surface-variant { border-color: var(--m3-surface-variant); }
  .border-outline-variant { border-color: var(--m3-outline-variant); }

  .bg-secondary { background-color: var(--m3-secondary); }
  .text-secondary { color: var(--m3-secondary); }
  .bg-secondary-container\\/20 { background-color: color-mix(in srgb, var(--m3-secondary-container) 20%, transparent); }
  .bg-secondary-container\\/40 { background-color: color-mix(in srgb, var(--m3-secondary-container) 40%, transparent); }
  .text-on-secondary { color: var(--m3-on-secondary); }
  .text-on-secondary-container { color: var(--m3-on-secondary-container); }

  .text-tertiary { color: var(--m3-tertiary); }
  .bg-tertiary-container\\/20 { background-color: color-mix(in srgb, var(--m3-tertiary-container) 20%, transparent); }
  .bg-on-tertiary-fixed-variant\\/40 { background-color: color-mix(in srgb, var(--m3-on-tertiary-fixed-variant) 40%, transparent); }
  .text-on-tertiary-fixed-variant { color: var(--m3-on-tertiary-fixed-variant); }

  .text-error { color: var(--m3-error); }
  .bg-error\\/40 { background-color: color-mix(in srgb, var(--m3-error) 40%, transparent); }
  .bg-error-container\\/20 { background-color: color-mix(in srgb, var(--m3-error-container) 20%, transparent); }

  .bg-white\\/80 { background-color: rgba(255, 255, 255, 0.8); }
`

export default function HomePage() {
  return <Home />
}

export function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user
  const [activeTab, setActiveTab] = useState<'python' | 'curl'>('python')
  const glowRef = useRef<HTMLDivElement>(null)

  /* ─── Force dark mode ─── */
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  /* ─── Hero Tech Grid Background (mouse glow) ─── */
  useEffect(() => {
    const glowEl = glowRef.current
    if (!glowEl) return
    const section = glowEl.parentElement
    if (!section) return
    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      glowEl.style.left = `${e.clientX - rect.left}px`
      glowEl.style.top = `${e.clientY - rect.top}px`
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  /* ─── Intersection Observer for card animations ─── */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-8')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.card-lift').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-500')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <PublicLayout showMainContainer={false}>
      <style>{designSystemStyle}</style>

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden pb-32 pt-48" style={{ backgroundColor: 'var(--m3-surface)' }}>
        <div className="hero-tech-grid" />
        <div ref={glowRef} className="hero-glow" />
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center px-10 relative z-10">
          <div className="lg:col-span-12 space-y-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-[var(--m3-primary-fixed)] text-[var(--m3-on-primary-fixed)] px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="text-[12px] tracking-wider uppercase font-semibold" style={{ fontFamily: 'Space Grotesk', letterSpacing: '0.05em' }}>
                {t('New Models Available')}
              </span>
            </div>
            <h1 className="text-[48px] leading-[56px] -tracking-[0.02em] font-bold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
              {t('One line of code to access top AI models.')}<br />
              <span style={{ color: 'var(--m3-primary)' }}>{t('DeepSeek \u00b7 GLM \u00b7 Qwen,')}</span>{' '}{t('one key for all.')}
            </h1>
            <p className="text-[18px] leading-7 max-w-2xl" style={{ color: 'var(--m3-on-surface-variant)' }}>
              {t('Seamlessly integrate leading LLMs through a single API. Professional-grade infrastructure built for high-precision engineering and data science workloads.')}
            </p>
            {/* Model Badges */}
            <div className="pt-2 space-y-4 flex flex-col items-center">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm tracking-wider font-semibold min-w-[80px]" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>DeepSeek:</span>
                <span className="px-2 py-1 bg-surface-container border rounded text-xs font-semibold" style={{ borderColor: 'var(--m3-surface-variant)', color: 'var(--m3-on-surface)', fontFamily: 'Space Grotesk' }}>V4 Flash</span>
                <span className="px-2 py-1 bg-surface-container border rounded text-xs font-semibold" style={{ borderColor: 'var(--m3-surface-variant)', color: 'var(--m3-on-surface)', fontFamily: 'Space Grotesk' }}>V4 Pro</span>
                <span className="px-2 py-1 bg-surface-container border rounded text-xs font-semibold" style={{ borderColor: 'var(--m3-surface-variant)', color: 'var(--m3-on-surface)', fontFamily: 'Space Grotesk' }}>Chat</span>
                <span className="px-2 py-1 bg-surface-container border rounded text-xs font-semibold" style={{ borderColor: 'var(--m3-surface-variant)', color: 'var(--m3-on-surface)', fontFamily: 'Space Grotesk' }}>Reasoner</span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm tracking-wider font-semibold min-w-[80px]" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>GLM:</span>
                <span className="px-2 py-1 bg-surface-container border rounded text-xs font-semibold" style={{ borderColor: 'var(--m3-surface-variant)', color: 'var(--m3-on-surface)', fontFamily: 'Space Grotesk' }}>4.7-Flash</span>
                <span className="px-2 py-1 bg-surface-container border rounded text-xs font-semibold" style={{ borderColor: 'var(--m3-surface-variant)', color: 'var(--m3-on-surface)', fontFamily: 'Space Grotesk' }}>4.5-Air</span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm tracking-wider font-semibold min-w-[80px]" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>Qwen:</span>
                <span className="px-2 py-1 bg-surface-container border rounded text-xs font-semibold" style={{ borderColor: 'var(--m3-surface-variant)', color: 'var(--m3-on-surface)', fontFamily: 'Space Grotesk' }}>3.7-Max</span>
                <span className="px-2 py-1 bg-surface-container border rounded text-xs font-semibold" style={{ borderColor: 'var(--m3-surface-variant)', color: 'var(--m3-on-surface)', fontFamily: 'Space Grotesk' }}>3.7-Plus</span>
                <span className="px-2 py-1 bg-surface-container border rounded text-xs font-semibold" style={{ borderColor: 'var(--m3-surface-variant)', color: 'var(--m3-on-surface)', fontFamily: 'Space Grotesk' }}>3.5 Series</span>
              </div>
            </div>
            <div className="flex gap-4 pt-4 justify-center">
              <button
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/sign-in')}
                className="bg-primary text-on-primary px-10 py-4 rounded-lg text-sm tracking-wider font-semibold flex items-center gap-2 hover:opacity-95 transition-all shadow-lg"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {t('Get API Key')} <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <Link to="/pricing" className="bg-surface-container border border-outline-variant text-primary px-10 py-4 rounded-lg text-sm tracking-wider font-semibold hover:bg-surface-container-high transition-all" style={{ fontFamily: 'Space Grotesk' }}>
                {t('Documentation')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bento Grid Features ─── */}
      <section className="py-10 relative" style={{ backgroundColor: 'var(--m3-surface-container-lowest)' }}>
        <div className="max-w-[1440px] mx-auto px-6 px-10">
          <div className="mb-10 text-center">
            <h2 className="text-[32px] leading-10 -tracking-[0.01em] font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
              {t('Engineered for Performance')}
            </h2>
            <p className="text-base leading-6 mt-2" style={{ color: 'var(--m3-on-surface-variant)' }}>
              {t('Built for massive scale and millisecond latency.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Unified API Gateway */}
            <div className="md:col-span-2 lg:col-span-2 bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-4">
                  <span className="material-symbols-outlined">hub</span>
                  <span className="text-sm tracking-widest uppercase font-semibold" style={{ fontFamily: 'Space Grotesk' }}>
                    {t('Unified API Gateway')}
                  </span>
                </div>
                <h3 className="text-2xl leading-8 font-medium mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                  {t('Standardize your AI pipeline')}
                </h3>
                <p className="text-base leading-6 mb-6" style={{ color: 'var(--m3-on-surface-variant)' }}>
                  {t('Access every top model via a single OpenAI-compatible endpoint. Switch models in production without changing a line of infrastructure code.')}
                </p>
              </div>
              <div className="rounded-lg p-4 font-mono text-sm overflow-x-auto border" style={{ backgroundColor: 'var(--m3-surface-container-low)', borderColor: 'color-mix(in srgb, var(--m3-outline-variant) 30%, transparent)' }}>
                <div className="flex gap-2 mb-2 pb-2 border-b" style={{ borderColor: 'color-mix(in srgb, var(--m3-surface-variant) 30%, transparent)' }}>
                  <div className="w-3 h-3 rounded-full bg-error/40"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary-container/40"></div>
                  <div className="w-3 h-3 rounded-full bg-on-tertiary-fixed-variant/40"></div>
                </div>
                <pre className="text-[13px] leading-relaxed"><code><span className="text-secondary">POST</span> /v1/chat/completions<br />{'{'}<br />  <span className="text-primary">&quot;model&quot;</span>: <span className="text-tertiary">&quot;deepseek-v4-pro&quot;</span>,<br />  <span className="text-primary">&quot;messages&quot;</span>: [<br />    {'{'}<span className="text-primary">&quot;role&quot;</span>: <span className="text-tertiary">&quot;user&quot;</span>, <span className="text-primary">&quot;content&quot;</span>: <span className="text-tertiary">&quot;Optimize this SQL...&quot;</span>{'}'}<br />  ]<br />{'}'}</code></pre>
              </div>
            </div>

            {/* Enterprise Security */}
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col items-start">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <span className="material-symbols-outlined text-primary">security</span>
              </div>
              <h3 className="text-2xl leading-8 font-medium mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                {t('Enterprise Security')}
              </h3>
              <p className="text-base leading-6" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('SOC2 compliant infrastructure with end-to-end encryption for all token transmissions and prompts.')}
              </p>
            </div>

            {/* Low Latency */}
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col items-start">
              <div className="bg-secondary-container/20 p-4 rounded-full mb-4">
                <span className="material-symbols-outlined text-secondary">speed</span>
              </div>
              <h3 className="text-2xl leading-8 font-medium mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                {t('Low Latency')}
              </h3>
              <p className="text-base leading-6" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('Global edge nodes ensure your API calls reach the nearest model server within 50ms.')}
              </p>
            </div>

            {/* Analytics */}
            <div className="lg:col-span-2 bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <span className="material-symbols-outlined">analytics</span>
                  <span className="text-sm tracking-widest uppercase font-semibold" style={{ fontFamily: 'Space Grotesk' }}>
                    {t('Real-time Insights')}
                  </span>
                </div>
                <h3 className="text-2xl leading-8 font-medium mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                  {t('Granular Usage Analytics')}
                </h3>
                <p className="text-base leading-6" style={{ color: 'var(--m3-on-surface-variant)' }}>
                  {t('Monitor token consumption, costs, and response times across all models in a unified dashboard.')}
                </p>
              </div>
              <div className="hidden sm:block w-32 h-32 relative">
                <div className="absolute inset-0 bg-primary/5 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 border-4 rounded-full animate-spin" style={{ borderTopColor: 'var(--m3-primary)', borderRightColor: 'var(--m3-primary)', borderBottomColor: 'color-mix(in srgb, var(--m3-primary) 20%, transparent)', borderLeftColor: 'color-mix(in srgb, var(--m3-primary) 20%, transparent)' }}></div>
                </div>
              </div>
            </div>

            {/* Smart Key Management */}
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col items-start">
              <div className="bg-tertiary-container/20 p-4 rounded-full mb-4">
                <span className="material-symbols-outlined text-tertiary">key</span>
              </div>
              <h3 className="text-2xl leading-8 font-medium mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                {t('Smart Key Management')}
              </h3>
              <p className="text-base leading-6" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('Easily set budgets, expiration dates, and model access permissions for each API key.')}
              </p>
            </div>

            {/* Full Audit Logging */}
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col items-start">
              <div className="bg-error-container/20 p-4 rounded-full mb-4">
                <span className="material-symbols-outlined text-error">monitoring</span>
              </div>
              <h3 className="text-2xl leading-8 font-medium mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                {t('Full Audit Logging')}
              </h3>
              <p className="text-base leading-6" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('Complete audit trails for every request, making debugging and compliance effortless.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Start ─── */}
      <section className="py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--m3-surface)' }}>
        <div className="glow-radial absolute bottom-0 right-0 w-[800px] h-[800px] opacity-40"></div>
        <div className="max-w-[1440px] mx-auto px-6 px-10">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2 space-y-4">
              <h2 className="text-[32px] leading-10 -tracking-[0.01em] font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
                {t('Get started in seconds')}
              </h2>
              <p className="text-[18px] leading-7" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t("Stop juggling multiple API documents. Use our SDK or a universal REST call to access the world's most powerful models.")}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-base leading-6" style={{ color: 'var(--m3-on-surface)' }}>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t('Fully OpenAI Compatible')}
                </li>
                <li className="flex items-center gap-2 text-base leading-6" style={{ color: 'var(--m3-on-surface)' }}>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t('Native Python & Node.js SDKs')}
                </li>
                <li className="flex items-center gap-2 text-base leading-6" style={{ color: 'var(--m3-on-surface)' }}>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t('Global Rate-Limit Handling')}
                </li>
              </ul>
            </div>
            {/* Dual Pane Code Block */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-surface-container rounded-xl shadow-xl border border-surface-variant overflow-hidden">
                <div className="flex border-b border-surface-variant" style={{ backgroundColor: 'var(--m3-surface-container-low)' }}>
                  <button
                    onClick={() => setActiveTab('python')}
                    className={`px-6 py-4 text-sm tracking-wider font-semibold transition-all ${activeTab === 'python' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent hover:bg-[var(--m3-surface-container)]'}`}
                    style={{ fontFamily: 'Space Grotesk', color: activeTab !== 'python' ? 'var(--m3-on-surface-variant)' : undefined }}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setActiveTab('curl')}
                    className={`px-6 py-4 text-sm tracking-wider font-semibold transition-all ${activeTab === 'curl' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent hover:bg-[var(--m3-surface-container)]'}`}
                    style={{ fontFamily: 'Space Grotesk', color: activeTab !== 'curl' ? 'var(--m3-on-surface-variant)' : undefined }}
                  >
                    cURL
                  </button>
                </div>
                <div className="p-6 bg-surface-container-low min-h-[300px]" style={{ fontFamily: 'JetBrains Mono' }}>
                  {activeTab === 'python' ? (
                    <pre className="text-base"><code style={{ color: 'var(--m3-on-surface-variant)' }}><span className="text-primary">import</span> tokenmaster{'\n\n'}client = tokenmaster.Client(api_key=<span className="text-on-tertiary-fixed-variant">&quot;tm_...&quot;</span>){'\n\n'}response = client.chat.completions.create({'\n'}    model=<span className="text-on-tertiary-fixed-variant">&quot;deepseek-reasoner&quot;</span>,{'\n'}    messages=[{'{'}role<span className="text-on-tertiary-fixed-variant">&quot;: &quot;user&quot;</span>, content<span className="text-on-tertiary-fixed-variant">&quot;: &quot;Hello!&quot;</span>{'}'}]{'\n'}){'\n\n'}print(response.choices[<span className="text-secondary">0</span>].message.content)</code></pre>
                  ) : (
                    <pre className="text-base"><code style={{ color: 'var(--m3-on-surface-variant)' }}>curl https://api.tokenmaster.ai/v1/chat/completions \<br />  -H <span className="text-on-tertiary-fixed-variant">&quot;Content-Type: application/json&quot;</span> \<br />  -H <span className="text-on-tertiary-fixed-variant">&quot;Authorization: Bearer $TM_API_KEY&quot;</span> \<br />  -d <span className="text-on-tertiary-fixed-variant">&apos;{'{'}</span><br />    <span className="text-primary">&quot;model&quot;</span>: <span className="text-on-tertiary-fixed-variant">&quot;glm-4-flash&quot;</span>,<br />    <span className="text-primary">&quot;messages&quot;</span>: [{'{'}role<span className="text-on-tertiary-fixed-variant">&quot;: &quot;user&quot;</span>, <span className="text-primary">&quot;content&quot;</span>: <span className="text-on-tertiary-fixed-variant">&quot;Hello!&quot;</span>{'}'}]<br />  {'}'}</code></pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Recharge Packages ─── */}
      <section className="py-32" style={{ backgroundColor: 'var(--m3-surface-container-lowest)' }}>
        <div className="max-w-[1440px] mx-auto px-6 px-10">
          <div className="text-center mb-10">
            <h2 className="text-[48px] leading-[56px] -tracking-[0.02em] font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
              {t('Ready to ship?')}
            </h2>
            <p className="text-[18px] leading-7" style={{ color: 'var(--m3-on-surface-variant)' }}>
              {t('USD prepaid, pay-per-use. Top up your balance and start building.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
              </div>
              <div className="text-[32px] leading-10 font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>$10</div>
              <div className="bg-primary-fixed text-on-primary-fixed px-2 py-1 rounded-full text-xs font-semibold mb-4" style={{ fontFamily: 'Space Grotesk' }}>+$1</div>
              <div className="text-base" style={{ color: 'var(--m3-on-surface-variant)' }}>{t('Get')} $11.00 {t('balance')}</div>
            </div>
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary-container/20 rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-secondary text-3xl">rocket_launch</span>
              </div>
              <div className="text-[32px] leading-10 font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>$50</div>
              <div className="text-on-secondary-container px-2 py-1 rounded-full text-xs font-semibold mb-4" style={{ fontFamily: 'Space Grotesk', backgroundColor: 'color-mix(in srgb, var(--m3-secondary-container) 40%, transparent)' }}>+$8</div>
              <div className="text-base" style={{ color: 'var(--m3-on-surface-variant)' }}>{t('Get')} $58.00 {t('balance')}</div>
            </div>
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-tertiary-container/20 rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-tertiary text-3xl">diamond</span>
              </div>
              <div className="text-[32px] leading-10 font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>$100</div>
              <div className="text-tertiary px-2 py-1 rounded-full text-xs font-semibold mb-4" style={{ fontFamily: 'Space Grotesk', backgroundColor: 'color-mix(in srgb, var(--m3-tertiary-container) 20%, transparent)' }}>+$20</div>
              <div className="text-base" style={{ color: 'var(--m3-on-surface-variant)' }}>{t('Get')} $120.00 {t('balance')}</div>
            </div>
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-surface-container-high rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl" style={{ color: 'var(--m3-on-surface-variant)' }}>tune</span>
              </div>
              <div className="text-[32px] leading-10 font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>{t('Custom')}</div>
              <div className="text-xs font-semibold px-2 py-1 rounded-full mb-4" style={{ fontFamily: 'Space Grotesk', backgroundColor: 'var(--m3-surface-container)', color: 'var(--m3-on-surface-variant)' }}>
                {t('Any amount')}
              </div>
              <div className="text-base" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('Enter any amount in USD')}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => navigate(isAuthenticated ? '/console/topup' : '/sign-in')}
              className="bg-primary text-on-primary px-10 py-4 rounded-lg text-sm tracking-wider font-semibold flex items-center gap-2 hover:opacity-95 transition-all shadow-lg"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              {t('Top Up Now')} <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className="text-base leading-6" style={{ color: 'var(--m3-on-surface-variant)' }}>
              {t('No monthly fees, no subscriptions. Only pay for what you use.')}
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-8" style={{ backgroundColor: 'var(--m3-surface-container-low)' }}>
        <div className="max-w-4xl mx-auto px-6 px-10">
          <h2 className="text-[22px] leading-8 -tracking-[0.01em] font-semibold text-center mb-8" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
            {t('Common Questions')}
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl border p-3 cursor-pointer transition-colors hover:bg-surface-container-high" style={{ backgroundColor: 'var(--m3-surface-container-low)', borderColor: 'var(--m3-surface-variant)' }} open>
              <summary className="flex items-center justify-between text-base leading-6 font-normal list-none" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
                {t('How does the billing work?')}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-sm leading-5" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('We use a unified credit system. You purchase TM-Tokens, and we handle the conversion to the specific costs of each provider. You only pay for your actual usage across all models.')}
              </p>
            </details>
            <details className="group rounded-xl border p-3 cursor-pointer transition-colors hover:bg-surface-container-high" style={{ backgroundColor: 'var(--m3-surface-container-low)', borderColor: 'var(--m3-surface-variant)' }}>
              <summary className="flex items-center justify-between text-base leading-6 font-normal list-none" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
                {t('Is there a limit on API keys?')}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-sm leading-5" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('On our Starter plan, you can create up to 10 keys. Pro and Enterprise plans offer unlimited keys with granular permission settings.')}
              </p>
            </details>
            <details className="group rounded-xl border p-3 cursor-pointer transition-colors hover:bg-surface-container-high" style={{ backgroundColor: 'var(--m3-surface-container-low)', borderColor: 'var(--m3-surface-variant)' }}>
              <summary className="flex items-center justify-between text-base leading-6 font-normal list-none" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
                {t('Which models are supported?')}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-sm leading-5" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('We currently support the full series of DeepSeek, GLM (Zhipu), and Qwen (Tongyi Qianwen) models. We integrate new models within 24 hours of their public beta release.')}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t" style={{ backgroundColor: 'var(--m3-surface-container-low)', borderColor: 'var(--m3-surface-variant)' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-5 max-w-[1440px] mx-auto px-10">
          <div className="col-span-1 space-y-3">
            <span className="text-base font-normal" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>TokenMaster</span>
            <p className="text-xs leading-5" style={{ color: 'var(--m3-on-surface-variant)' }}>
              {t('An industrial-grade bridge connecting the world\'s most advanced AI models.')}
            </p>
          </div>
          <div className="col-span-1">
            <h4 className="text-xs tracking-wider font-light uppercase mb-3" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>
              {t('Product')}
            </h4>
            <ul className="space-y-1.5">
              <li><Link to="/pricing" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Model Library')}</Link></li>
              <li><Link to="/plans" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Pricing Plans')}</Link></li>
              <li><Link to="/pricing" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Model Library')}</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="text-xs tracking-wider font-light uppercase mb-3" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>
              {t('Resources')}
            </h4>
            <ul className="space-y-1.5">
              <li><Link to="/pricing" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Model Library')}</Link></li>
              <li><span className="text-xs tracking-wider font-normal opacity-50 cursor-default" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>{t('Changelog')}</span></li>
              <li><a href="https://status.tokenmaster.com" target="_blank" rel="noopener noreferrer" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('System Status')}</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="text-xs tracking-wider font-light uppercase mb-3" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>
              {t('Legal')}
            </h4>
            <ul className="space-y-1.5">
              <li><Link to="/user-agreement" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Terms of Service')}</Link></li>
              <li><Link to="/privacy-policy" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Privacy Policy')}</Link></li>
              <li><Link to="/about" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Security')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 py-3 border-t flex flex-col md:flex-row justify-between items-center gap-2 px-10" style={{ borderColor: 'var(--m3-surface-variant)' }}>
          <p className="text-xs tracking-wider font-light" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>
            {t('\u00a9 2024 TokenMaster AI. All systems operational.')}
          </p>
          <div className="flex gap-4">
            <a href="mailto:support@tokenmaster.com" style={{ color: 'var(--m3-on-surface-variant)' }} className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>
      </footer>
    </PublicLayout>
  )
}
