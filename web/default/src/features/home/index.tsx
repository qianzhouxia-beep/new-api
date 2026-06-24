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
import { DotFieldBackground } from './DotFieldBackground'
import { AnalyticsViz } from './AnalyticsViz'

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
      <section className="relative overflow-hidden flex items-start min-h-screen pt-24 pb-16" style={{ backgroundColor: 'var(--m3-surface)' }}>
        <DotFieldBackground />

        {/* ─── Top-Right Decorative Icon ─── */}
        <div aria-hidden className="absolute top-0 right-0 z-[1] pointer-events-none select-none hidden lg:block">
          <svg width="300" height="340" viewBox="0 0 300 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.38] dark:opacity-[0.28]">
            <defs>
              {/* Primary glow gradient */}
              <radialGradient id="decor-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              {/* Secondary warm gradient */}
              <linearGradient id="decor-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.08" />
              </linearGradient>
              {/* Node pulse filter */}
            </defs>

            {/* Ambient glow behind everything */}
            <circle cx="220" cy="80" r="110" fill="url(#decor-glow)" />

            {/* ── Hexagonal hub (core) ── */}
            <g transform="translate(220, 80)" opacity="0.5">
              <polygon points="0,-36 31,-18 31,18 0,36 -31,18 -31,-18"
                       stroke="#ef4444" strokeWidth="1" fill="none" strokeDasharray="3 4" opacity="0.35" />
              <polygon points="0,-24 21,-12 21,12 0,24 -21,12 -21,-12"
                       stroke="#ef4444" strokeWidth="0.7" fill="none" opacity="0.22" />
              <circle cx="0" cy="0" r="6" fill="#ef4444" opacity="0.25" />
              <circle cx="0" cy="0" r="14" stroke="#ef4444" strokeWidth="0.5" fill="none" opacity="0.15" />
            </g>

            {/* ── Radiating data streams (curved paths) ── */}
            <path d="M220 80 Q260 40 275 10" stroke="url(#decor-line)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M220 80 Q265 90 280 130" stroke="#ef4444" strokeWidth="0.55" fill="none" opacity="0.18" strokeLinecap="round" />
            <path d="M220 80 Q255 125 270 180" stroke="#f97316" strokeWidth="0.45" fill="none" opacity="0.15" strokeLinecap="round" />
            <path d="M220 80 Q185 120 160 155" stroke="#ef4444" strokeWidth="0.5" fill="none" opacity="0.14" strokeLinecap="round" />
            <path d="M220 80 Q175 55 140 30" stroke="#ef4444" strokeWidth="0.55" fill="none" opacity="0.16" strokeLinecap="round" />

            {/* ── Outer orbit ring ── */}
            <circle cx="220" cy="80" r="85" stroke="#ef4444" strokeWidth="0.6"
                    fill="none" strokeDasharray="1 7" opacity="0.13" transform="rotate(-15 220 80)" />

            {/* ── Data nodes on stream endpoints ── */}
            <circle cx="275" cy="10" r="3.5" fill="#ef4444" opacity="0.32" />
            <circle cx="280" cy="130" r="2.8" fill="#ef4444" opacity="0.24" />
            <circle cx="270" cy="180" r="2.2" fill="#f97316" opacity="0.2" />
            <circle cx="160" cy="155" r="2.5" fill="#ef4444" opacity="0.2" />
            <circle cx="140" cy="30" r="3" fill="#ef4444" opacity="0.26" />

            {/* Tiny floating particles */}
            <circle cx="255" cy="48" r="1.3" fill="#ef4444" opacity="0.2" />
            <circle cx="195" cy="145" r="1.5" fill="#f97316" opacity="0.16" />
            <circle cx="245" cy="158" r="1.1" fill="#ef4444" opacity="0.14" />
            <circle cx="178" cy="42" r="1.2" fill="#ef4444" opacity="0.17" />
            <circle cx="290" cy="70" r="1" fill="#f97316" opacity="0.12" />

            {/* ── Subtle circuit trace along bottom-right edge ── */}
            <polyline points="270,210 285,225 285,250 275,265 275,290 292,305"
                      stroke="#ef4444" strokeWidth="0.45" fill="none"
                      opacity="0.1" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="292" cy="305" r="1.3" fill="#ef4444" opacity="0.12" />

            {/* ── Top accent: small spark/diamond ── */}
            <g transform="translate(278, 5)" opacity="0.3">
              <rect x="-4" y="-4" width="8" height="8" rx="1.5"
                    stroke="#ef4444" strokeWidth="0.7" fill="none"
                    transform="rotate(45)" />
              <circle cx="0" cy="0" r="1.2" fill="#ef4444" opacity="0.4" />
            </g>
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center px-10 relative z-10">
          <div className="lg:col-span-12 space-y-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5" style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.18), rgba(34,197,94,0.08))',
              border: '1px solid rgba(34,197,94,0.35)',
              boxShadow: '0 0 18px rgba(34,197,94,0.12), 0 0 4px rgba(34,197,94,0.08)'
            }}>
              <span className="material-symbols-outlined text-[16px]" style={{ color: '#22c55e', fontVariationSettings: "'FILL' 1" }}>new_releases</span>
              <span className="text-[12px] tracking-[0.08em] uppercase font-bold" style={{ fontFamily: 'Space Grotesk', color: '#86efac' }}>
                {t('New Models Available')}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
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
            {/* ─── $2 Free Trial Banner ─── */}
            <div className="inline-flex items-center gap-2 bg-red-500/90 text-white px-4 py-2 rounded-full shadow-lg mt-2 animate-pulse">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
              <span className="text-sm font-bold tracking-wider" style={{ fontFamily: 'Space Grotesk' }}>
                {t('$2 Free Trial — No credit card required. Start building today!')}
              </span>
            </div>
            <div className="flex gap-4 pt-4 justify-center">
              <button
                onClick={() => navigate({ to: isAuthenticated ? '/dashboard' : '/sign-in' })}
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
              <div className="hidden sm:block">
                <AnalyticsViz />
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

      {/* ─── Quickstart Guide ─── */}
      <section style={{ backgroundColor: 'var(--m3-surface-container-low)' }}>
        <div className="max-w-[1440px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-[36px] leading-[44px] -tracking-[0.02em] font-bold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
              {t('3-Step Quickstart')}
            </h2>
            <p className="text-base leading-6 mt-3" style={{ color: 'var(--m3-on-surface-variant)' }}>
              {t('Go from zero to your first API call in under 2 minutes.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary text-base font-bold">1</div>
                <div>
                  <h3 className="text-base font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>{t('Get Your API Key')}</h3>
                  <p className="text-xs" style={{ color: 'var(--m3-on-surface-variant)' }}>{t('One key for all models')}</p>
                </div>
              </div>
              <p className="text-sm leading-5 mb-3" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('Sign up at TokenMaster, go to Console → API Keys, and generate a new key.')}
              </p>
              <div className="mt-auto">
                <button
                  onClick={() => navigate({ to: isAuthenticated ? '/dashboard' : '/sign-in' })}
                  className="w-full text-center bg-primary/10 text-primary px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all" style={{ fontFamily: 'Space Grotesk' }}
                >
                  {t('Get API Key')} →
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary text-base font-bold">2</div>
                <div>
                  <h3 className="text-base font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>{t('Set Base URL')}</h3>
                  <p className="text-xs" style={{ color: 'var(--m3-on-surface-variant)' }}>{t('OpenAI-compatible endpoint')}</p>
                </div>
              </div>
              <p className="text-sm leading-5 mb-3" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('Configure your client with our universal API endpoint — works with any OpenAI-compatible tool.')}
              </p>
              <div className="mt-auto">
                <div className="bg-surface-container-low rounded-lg p-3 text-center text-xs font-mono" style={{ color: 'var(--m3-primary)' }}>
                  https://api-tokenmaster.com/v1
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container p-6 border border-surface-variant rounded-xl card-lift flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary text-base font-bold">3</div>
                <div>
                  <h3 className="text-base font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>{t('Start Chatting')}</h3>
                  <p className="text-xs" style={{ color: 'var(--m3-on-surface-variant)' }}>{t('Drop into any client')}</p>
                </div>
              </div>
              <p className="text-sm leading-5 mb-3" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('Use any OpenAI-compatible client — LobeChat, ChatBox, Cherry Studio, OpenCat, NextChat, or write your own code.')}
              </p>
              <div className="mt-auto">
                <Link to="/pricing" className="block w-full text-center bg-primary/10 text-primary px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all" style={{ fontFamily: 'Space Grotesk' }}>
                  {t('View Supported Models')} →
                </Link>
              </div>
            </div>
          </div>

          {/* Client Configuration Cards */}
          <div className="text-center mb-10">
            <h3 className="text-[22px] leading-8 -tracking-[0.01em] font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
              {t('Popular Client Configurations')}
            </h3>
            <p className="text-sm leading-5 mt-2" style={{ color: 'var(--m3-on-surface-variant)' }}>
              {t('Copy these settings into your favorite client and you\'re ready to go.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* LobeChat */}
            <div className="bg-surface-container p-5 border border-surface-variant rounded-xl card-lift flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-primary">hub</span>
                </div>
                <span className="text-sm font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>LobeChat</span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3 text-xs font-mono leading-5 mb-3" style={{ color: 'var(--m3-on-surface-variant)' }}>
                <div><span style={{ color: 'var(--m3-primary)' }}>Base URL</span>: api-tokenmaster.com/v1</div>
                <div><span style={{ color: 'var(--m3-primary)' }}>API Key</span>: Your API Key</div>
                <div><span style={{ color: 'var(--m3-primary)' }}>Model</span>: deepseek-v4-flash</div>
              </div>
              <a href="https://lobehub.com" target="_blank" rel="noopener noreferrer" className="mt-auto text-xs" style={{ color: 'var(--m3-primary)' }}>lobehub.com →</a>
            </div>

            {/* ChatBox */}
            <div className="bg-surface-container p-5 border border-surface-variant rounded-xl card-lift flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-secondary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-secondary">chat</span>
                </div>
                <span className="text-sm font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>ChatBox</span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3 text-xs font-mono leading-5 mb-3" style={{ color: 'var(--m3-on-surface-variant)' }}>
                <div><span style={{ color: 'var(--m3-primary)' }}>API Domain</span>: api-tokenmaster.com</div>
                <div><span style={{ color: 'var(--m3-primary)' }}>API Key</span>: Your API Key</div>
                <div><span style={{ color: 'var(--m3-primary)' }}>Model</span>: deepseek-reasoner</div>
              </div>
              <a href="https://chatbox.app" target="_blank" rel="noopener noreferrer" className="mt-auto text-xs" style={{ color: 'var(--m3-primary)' }}>chatbox.app →</a>
            </div>

            {/* Cherry Studio */}
            <div className="bg-surface-container p-5 border border-surface-variant rounded-xl card-lift flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-tertiary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">auto_awesome</span>
                </div>
                <span className="text-sm font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>Cherry Studio</span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3 text-xs font-mono leading-5 mb-3" style={{ color: 'var(--m3-on-surface-variant)' }}>
                <div><span style={{ color: 'var(--m3-primary)' }}>Endpoint</span>: api-tokenmaster.com</div>
                <div><span style={{ color: 'var(--m3-primary)' }}>API Key</span>: Your API Key</div>
                <div><span style={{ color: 'var(--m3-primary)' }}>Model</span>: deepseek-v4-pro</div>
              </div>
              <a href="https://cherry-ai.com" target="_blank" rel="noopener noreferrer" className="mt-auto text-xs" style={{ color: 'var(--m3-primary)' }}>cherry-ai.com →</a>
            </div>

            {/* OpenCat / NextChat */}
            <div className="bg-surface-container p-5 border border-surface-variant rounded-xl card-lift flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-on-primary-fixed">terminal</span>
                </div>
                <span className="text-sm font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>OpenCat / NextChat</span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3 text-xs font-mono leading-5 mb-3" style={{ color: 'var(--m3-on-surface-variant)' }}>
                <div><span style={{ color: 'var(--m3-primary)' }}>Base URL</span>: api-tokenmaster.com</div>
                <div><span style={{ color: 'var(--m3-primary)' }}>API Key</span>: Your API Key</div>
                <div><span style={{ color: 'var(--m3-primary)' }}>Model</span>: qwen3.7-plus</div>
              </div>
              <a href="https://opencat.app" target="_blank" rel="noopener noreferrer" className="mt-auto text-xs" style={{ color: 'var(--m3-primary)' }}>opencat.app →</a>
            </div>
          </div>

          {/* Quick Connect Links */}
          <div className="bg-surface-container p-5 border border-surface-variant rounded-xl card-lift text-center">
            <p className="text-sm font-semibold mb-3" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
              {t('Or click to connect instantly:')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/20 transition-all" style={{ fontFamily: 'Space Grotesk' }}>
                Lobe Chat ↵
              </button>
              <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/20 transition-all" style={{ fontFamily: 'Space Grotesk' }}>
                OpenCat ↵
              </button>
              <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/20 transition-all" style={{ fontFamily: 'Space Grotesk' }}>
                Cherry Studio ↵
              </button>
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
              onClick={() => navigate({ to: '/plans' })}
              className="bg-primary text-on-primary px-10 py-4 rounded-lg text-sm tracking-wider font-semibold flex items-center gap-2 hover:opacity-95 transition-all shadow-lg"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              {t('View Plans')} <span className="material-symbols-outlined">arrow_forward</span>
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
                {t('Why is TokenMaster priced higher than the official API?')}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-sm leading-5" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('We provide enterprise-grade infrastructure beyond basic API access: SOC2-compliant hosting, end-to-end encryption, global edge nodes (~50ms latency), automatic multi-model failover, smart key management with per-key budgets and permissions, full audit logs, and zero data retention. Our pricing reflects the value of a managed gateway vs. raw API access — we\'re an infrastructure partner, not a simple reseller.')}
              </p>
            </details>
            <details className="group rounded-xl border p-3 cursor-pointer transition-colors hover:bg-surface-container-high" style={{ backgroundColor: 'var(--m3-surface-container-low)', borderColor: 'var(--m3-surface-variant)' }}>
              <summary className="flex items-center justify-between text-base leading-6 font-normal list-none" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
                {t('Does my balance expire?')}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-sm leading-5" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('No. Your paid balance never expires. Free trial credits expire after 30 days. Top up once and use it anytime.')}
              </p>
            </details>
            <details className="group rounded-xl border p-3 cursor-pointer transition-colors hover:bg-surface-container-high" style={{ backgroundColor: 'var(--m3-surface-container-low)', borderColor: 'var(--m3-surface-variant)' }}>
              <summary className="flex items-center justify-between text-base leading-6 font-normal list-none" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
                {t('Are there any hidden fees?')}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-sm leading-5" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('No. We charge exactly what\'s shown. No top-up fees (unlike OpenRouter\'s 5.5%), no monthly minimums, no tier lock-in. Pay only for the tokens you use.')}
              </p>
            </details>
            <details className="group rounded-xl border p-3 cursor-pointer transition-colors hover:bg-surface-container-high" style={{ backgroundColor: 'var(--m3-surface-container-low)', borderColor: 'var(--m3-surface-variant)' }}>
              <summary className="flex items-center justify-between text-base leading-6 font-normal list-none" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>
                {t('Do you store or train on my data?')}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-sm leading-5" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('No. We have a zero data retention policy. Prompts and completions are not logged, stored, or used for training. This is contractual and verified by our SOC2 compliance.')}
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
        <div className="max-w-[1440px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand column */}
            <div className="col-span-1 space-y-3">
              <span className="text-base font-normal" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface)' }}>TokenMaster</span>
              <p className="text-xs leading-5" style={{ color: 'var(--m3-on-surface-variant)' }}>
                {t('An industrial-grade bridge connecting the world\'s most advanced AI models.')}
              </p>
            </div>
            {/* Product column */}
            <div className="col-span-1">
              <h4 className="text-xs tracking-wider font-light uppercase mb-3" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>
                {t('Product')}
              </h4>
              <ul className="space-y-1.5">
                <li><Link to="/pricing" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Pricing')}</Link></li>
                <li><Link to="/plans" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Plans')}</Link></li>
              </ul>
            </div>
            {/* Resources column */}
            <div className="col-span-1">
              <h4 className="text-xs tracking-wider font-light uppercase mb-3" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>
                {t('Resources')}
              </h4>
              <ul className="space-y-1.5">
                <li><Link to="/about" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('About')}</Link></li>
                <li><Link to="/security" className="text-xs tracking-wider font-normal hover:underline transition-opacity" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)', textDecorationColor: 'var(--m3-primary)' }}>{t('Security')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t flex flex-col md:flex-row justify-between items-center gap-2 pt-4" style={{ borderColor: 'var(--m3-surface-variant)' }}>
            <p className="text-xs tracking-wider font-light" style={{ fontFamily: 'Space Grotesk', color: 'var(--m3-on-surface-variant)' }}>
              &copy; {new Date().getFullYear()} TokenMaster. {t('All rights reserved.')}
            </p>
            <div className="flex gap-4">
              <a href="mailto:support@tokenmaster.com" style={{ color: 'var(--m3-on-surface-variant)' }} className="hover:text-primary transition-colors">
                <span className="material-symbols-outlined">mail</span>
              </a>
              <a href="https://stats.uptimerobot.com/8WQOPxXfoF" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--m3-on-surface-variant)' }} className="hover:text-primary transition-colors">
                <span className="material-symbols-outlined">signal_cellular_alt</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </PublicLayout>
  )
}
