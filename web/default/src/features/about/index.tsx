/*
Copyright (C) 2023-2026 QuantumNous

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

For commercial licensing, please contact support@quantumnous.com.
*/
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'

/* ======== TokenMaster About Page - Red+Black+White Dark Theme ======== */
/* All styles are self-contained; no Tailwind config dependency.       */

export function About() {
  const { t } = useTranslation()

  return (
    <PublicLayout showMainContainer={false}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .tm-about { font-family: 'Inter', -apple-system, sans-serif; color: #e5e7eb; background: #1a1a1a; line-height: 1.6; }
        .tm-about * { box-sizing: border-box; margin: 0; padding: 0; }
        .tm-about a { color: #ef4444; text-decoration: none; transition: color .2s; }
        .tm-about a:hover { color: #fca5a5; }

        /* ---- Hero ---- */
        .tm-hero { position: relative; overflow: hidden; background: #1a1a1a; padding: 40px 24px;
          background-image: radial-gradient(rgba(239,68,68,.08) .5px, transparent .5px); background-size: 24px 24px; }
        .tm-hero-inner { max-width: 1440px; margin: 0 auto; position: relative; z-index: 1; }
        .tm-hero-badge { display: flex; align-items: center; gap: 8px; color: #ef4444; margin-bottom: 24px; }
        .tm-hero-badge-line { width: 48px; height: 1px; background: #ef4444; }
        .tm-hero-badge-text { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600;
          letter-spacing: .15em; text-transform: uppercase; }
        .tm-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(32px,5vw,48px);
          line-height: 1.15; letter-spacing: -.02em; font-weight: 700; color: #ffffff; margin-bottom: 24px; max-width: 768px; }
        .tm-hero p { font-size: clamp(16px,1.6vw,18px); line-height: 1.7; color: #9ca3af; max-width: 640px; }
        .tm-hero-deco { position: absolute; right: -80px; top: 50%; transform: translateY(-50%);
          opacity: .06; pointer-events: none; font-size: 400px; line-height: 1; user-select: none; color: #ef4444; }

        /* ---- Section base ---- */
        .tm-section { padding: 80px 24px; }
        .tm-section-inner { max-width: 1440px; margin: 0 auto; }

        /* ---- Mission (image + text) ---- */
        .tm-mission { background: #1a1a1a; }
        .tm-mission-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
        .tm-mission-img-wrap { aspect-ratio: 16/9; overflow: hidden; border-radius: 12px;
          border: 1px solid #374151; background: #222222;
          box-shadow: 0 1px 3px rgba(0,0,0,.3); }
        .tm-mission-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .tm-mission-content h2 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(24px,3vw,32px); line-height: 1.25; letter-spacing: -.01em;
          font-weight: 600; color: #ffffff; margin-bottom: 20px; }
        .tm-mission-content p { font-size: 16px; line-height: 1.6; color: #9ca3af; margin-bottom: 14px; }
        .tm-mission-content strong { color: #ef4444; font-weight: 600; }

        /* ---- Values cards ---- */
        .tm-values { background: #222222; border-top: 1px solid #374151; border-bottom: 1px solid #374151; }
        .tm-values-header { text-align: center; margin-bottom: 56px; }
        .tm-values-header h2 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(24px,3vw,32px); line-height: 1.25; letter-spacing: -.01em;
          font-weight: 600; color: #ffffff; margin-bottom: 8px; }
        .tm-values-header p { font-size: 16px; line-height: 1.5; color: #9ca3af; }
        .tm-values-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .tm-value-card { background: #2a2a2a; padding: 28px; border-radius: 10px;
          border: 1px solid #374151; transition: border-color .3s; }
        .tm-value-card:hover { border-color: #ef4444; }
        .tm-value-icon { width: 64px; height: 64px; margin-bottom: 22px; display: flex;
          align-items: center; justify-content: center; background: rgba(239,68,68,.15); border-radius: 50%;
          overflow: hidden; flex-shrink: 0; }
        .tm-value-icon svg { width: 36px; height: 36px; }
        .tm-value-card h3 { font-family: 'Space Grotesk', sans-serif;
          font-size: 20px; line-height: 1.4; font-weight: 500; color: #ffffff;
          margin-bottom: 14px; padding-bottom: 14px; position: relative; }
        .tm-value-card h3::after { content: ''; position: absolute; bottom: 0; left: 0;
          width: 40px; height: 2px; background: #ef4444; }
        .tm-value-card p { font-size: 15px; line-height: 1.65; color: #9ca3af; }

        /* ---- Story / Timeline ---- */
        .tm-story { background: #1a1a1a; overflow: hidden; }
        .tm-story-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
        .tm-story-tag { display: inline-block; padding: 8px 16px; border: 1px solid #ef4444;
          color: #ef4444; font-family: 'Space Grotesk', sans-serif; font-size: 13px;
          font-weight: 600; border-radius: 9999px; margin-bottom: 20px; letter-spacing: .04em; }
        .tm-story h2 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px,5vw,48px); line-height: 1.15; letter-spacing: -.02em;
          font-weight: 700; color: #ffffff; margin-bottom: 20px; }
        .tm-story-quote { font-size: clamp(15px,1.7vw,18px); line-height: 1.65;
          color: #9ca3af; font-style: italic; border-left: 4px solid #ef4444; padding-left: 20px; }
        .tm-timeline { position: relative; padding-left: 24px; border-left: 1px solid #374151; }
        .tm-tl-item { position: relative; margin-bottom: 36px; }
        .tm-tl-item:last-child { margin-bottom: 0; }
        .tm-tl-dot { position: absolute; left: -33px; top: 4px; width: 14px; height: 14px;
          border-radius: 50%; background: #374151; border: 4px solid #1a1a1a; }
        .tm-tl-item:first-child .tm-tl-dot { background: #ef4444; }
        .tm-tl-item h4 { font-family: 'Space Grotesk', sans-serif; font-size: 13px;
          font-weight: 600; color: #ef4444; margin-bottom: 8px; letter-spacing: .06em; }
        .tm-tl-item:not(:first-child) h4 { color: #9ca3af; }
        .tm-tl-item p { font-size: 15px; line-height: 1.65; color: #e5e7eb; }

        /* ---- CTA ---- */
        .tm-cta { background: #222222; }
        .tm-cta-box { background: #111111; color: #ffffff; border-radius: 12px;
          padding: 56px 28px; text-align: center; position: relative; overflow: hidden; }
        .tm-cta-glow1 { position: absolute; top: 0; right: 0; width: 256px; height: 256px;
          background: rgba(239,68,68,.12); filter: blur(100px); pointer-events: none; }
        .tm-cta-glow2 { position: absolute; bottom: 0; left: 0; width: 256px; height: 256px;
          background: rgba(239,68,68,.06); filter: blur(100px); pointer-events: none; }
        .tm-cta-content { position: relative; z-index: 10; max-width: 640px; margin: 0 auto; }
        .tm-cta h2 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(26px,4vw,40px); line-height: 1.2; font-weight: 600; margin-bottom: 20px; }
        .tm-cta p { font-size: clamp(15px,1.7vw,18px); line-height: 1.65;
          opacity: .8; margin-bottom: 36px; }
        .tm-cta-btns { display: flex; flex-direction: column; gap: 14px;
          align-items: center; justify-content: center; flex-wrap: wrap; }
        .tm-cta-btn-primary { display: inline-block; background: #ef4444; color: #ffffff !important;
          padding: 15px 38px; font-family: 'Space Grotesk', sans-serif; font-size: 14px;
          font-weight: 600; border-radius: 8px; border: none; cursor: pointer;
          transition: all .2s; text-decoration: none !important;
          box-shadow: 0 10px 25px rgba(239,68,68,.25); }
        .tm-cta-btn-primary:hover { background: #dc2626; transform: scale(1.04); color: #ffffff !important; }
        .tm-cta-btn-primary span { color: #ffffff !important; }
        .tm-cta-btn-secondary { display: inline-block; background: transparent; color: #ffffff !important;
          padding: 15px 38px; font-family: 'Space Grotesk', sans-serif; font-size: 14px;
          font-weight: 600; border-radius: 8px; border: 1px solid #4b5563; cursor: pointer;
          transition: all .2s; text-decoration: none !important; }
        .tm-cta-btn-secondary:hover { background: rgba(255,255,255,.05); color: #ffffff !important; }

        /* ---- Responsive md (768px+) ---- */
        @media (min-width: 768px) {
          .tm-hero { padding: 128px 96px; }
          .tm-hero-deco { display: block; }
          .tm-section { padding: 128px 24px; }
          .tm-section-inner { padding: 0 96px; }
          .tm-mission-grid { grid-template-columns: 1fr 1fr; }
          .tm-mission-grid > div:first-child { order: 2; }
          .tm-mission-grid > div:last-child { order: 1; }
          .tm-mission-img-wrap { aspect-ratio: 1; }
          .tm-values-grid { grid-template-columns: repeat(3, 1fr); }
          .tm-story-grid { grid-template-columns: 5fr 7fr; }
          .tm-cta-box { padding: 96px 80px; }
          .tm-cta-btns { flex-direction: row; }
        }
      `}</style>

      <div className='tm-about'>

        {/* ======== Hero ======== */}
        <header className='tm-hero'>
          <div className='tm-hero-inner'>
            <div className='tm-hero-badge'>
              <span className='tm-hero-badge-line' />
              <span className='tm-hero-badge-text'>{t('about.hero.badge', 'The Kinetic Foundation')}</span>
            </div>
            <h1>{t('about.hero.title', 'Engineering Universal AI Access')}</h1>
            <p>{t('about.hero.description', 'TokenMaster was founded to bridge the gap between complex AI ecosystems and the developers who build with them. We engineer the conduits that power modern intelligence.')}</p>
          </div>
          <div className='tm-hero-deco' aria-hidden='true'>*</div>
        </header>

        {/* ======== Mission ======== */}
        <section className='tm-section tm-mission'>
          <div className='tm-section-inner'>
            <div className='tm-mission-grid'>
              <div>
                <div className='tm-mission-img-wrap'>
                  <img src='/about-architecture.png' alt='TokenMaster Architecture' />
                </div>
              </div>
              <div className='tm-mission-content'>
                <h2>{t('about.mission.title', 'The Architecture of Connectivity')}</h2>
                <p>{t('about.mission.p1', 'At TokenMaster, we believe that the complexity of the AI landscape shouldn\'t be a barrier to innovation. The current state of the industry is defined by fragmentation---disparate APIs, inconsistent billing models, and unpredictable latency profiles.')}</p>
                <p>{t('about.mission.p2', 'Our mission is to provide a single, high-precision gateway that abstracts this complexity away. We handle the orchestration, the model fallback logic, and the unified metering so that engineers can focus on what actually matters: building the next generation of intelligent software.')}</p>
                <p><strong>{t('about.mission.p3', "Reliability isn't just a feature; it's our core architecture.")}</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ======== Core Values ======== */}
        <section className='tm-section tm-values'>
          <div className='tm-section-inner'>
            <div className='tm-values-header'>
              <h2>{t('about.values.title', 'Our Engineering Principles')}</h2>
              <p>{t('about.values.subtitle', 'Guided by the philosophy of high-precision performance.')}</p>
            </div>
            <div className='tm-values-grid'>

              {/* Value 1 - Universal Access */}
              <div className='tm-value-card'>
                <div className='tm-value-icon'>
                  <svg viewBox='0 0 24 24' width='36' height='36' fill='none' stroke='#ef4444' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                    <circle cx='12' cy='12' r='10' />
                    <path d='M2 12h20' />
                    <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
                  </svg>
                </div>
                <h3>{t('about.values.universal.title', 'Universal Access')}</h3>
                <p>{t('about.values.universal.description', "A single integration key unlocks the world's most powerful LLMs including DeepSeek, GLM, Qwen, and beyond. One interface, infinite potential.")}</p>
              </div>

              {/* Value 2 - High-Precision */}
              <div className='tm-value-card'>
                <div className='tm-value-icon'>
                  <svg viewBox='0 0 24 24' width='36' height='36' fill='none' stroke='#ef4444' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                    <circle cx='12' cy='12' r='3' />
                    <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' />
                  </svg>
                </div>
                <h3>{t('about.values.precision.title', 'High-Precision')}</h3>
                <p>{t('about.values.precision.description', 'Engineered for massive scale with millisecond latency targets. Our infrastructure is a precision instrument designed for enterprise-grade workloads.')}</p>
              </div>

              {/* Value 3 - Transparent Economics */}
              <div className='tm-value-card'>
                <div className='tm-value-icon'>
                  <svg viewBox='0 0 24 24' width='36' height='36' fill='none' stroke='#ef4444' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                    <rect x='2' y='4' width='20' height='16' rx='2' ry='2' />
                    <line x1='2' y1='10' x2='22' y2='10' />
                    <line x1='6' y1='14' x2='14' y2='14' />
                    <line x1='6' y1='17' x2='18' y2='17' />
                  </svg>
                </div>
                <h3>{t('about.values.economics.title', 'Transparent Economics')}</h3>
                <p>{t('about.values.economics.description', 'No obscure tier systems or hidden fees. We operate on a pure pay-per-use model, ensuring your costs scale linearly with your success.')}</p>
              </div>

            </div>
          </div>
        </section>

        {/* ======== Story / Philosophy ======== */}
        <section className='tm-section tm-story'>
          <div className='tm-section-inner'>
            <div className='tm-story-grid'>
              <div>
                <span className='tm-story-tag'>{t('about.story.tag', 'OUR PHILOSOPHY')}</span>
                <h2>{t('about.story.title', 'The Kinetic Forge Philosophy')}</h2>
                <p className='tm-story-quote'>
                  &ldquo;{t('about.story.quote', 'In engineering, kinetic energy is defined by mass and velocity. In software, it is defined by precision and execution.')}&rdquo;
                </p>
              </div>
              <div className='tm-timeline'>
                <div className='tm-tl-item'>
                  <div className='tm-tl-dot' />
                  <h4>{t('about.story.timeline.precision.title', 'PRECISION')}</h4>
                  <p>{t('about.story.timeline.precision.description', 'Every line of code in our gateway is audited for efficiency. We treat token management as a structural science, ensuring zero loss and maximum clarity.')}</p>
                </div>
                <div className='tm-tl-item'>
                  <div className='tm-tl-dot' />
                  <h4>{t('about.story.timeline.power.title', 'POWER')}</h4>
                  <p>{t('about.story.timeline.power.description', "The forge isn't just about shaping---it's about tempering. We stress-test our routing algorithms to withstand the highest volatility in provider performance.")}</p>
                </div>
                <div className='tm-tl-item'>
                  <div className='tm-tl-dot' />
                  <h4>{t('about.story.timeline.movement.title', 'MOVEMENT')}</h4>
                  <p>{t('about.story.timeline.movement.description', 'We move at the speed of the industry. As new models emerge, they are forged into our ecosystem within hours, not weeks.')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======== CTA ======== */}
        <section className='tm-section tm-cta'>
          <div className='tm-section-inner'>
            <div className='tm-cta-box'>
              <div className='tm-cta-glow1' aria-hidden='true' />
              <div className='tm-cta-glow2' aria-hidden='true' />
              <div className='tm-cta-content'>
                <h2>{t('about.cta.title', 'Join the Future of AI Integration')}</h2>
                <p>{t('about.cta.description', "Ready to simplify your tech stack? Get your single API key today and start building with the world's best models in minutes.")}</p>
                <div className='tm-cta-btns'>
                  <Link to='/sign-up' className='tm-cta-btn-primary'>
                    {t('about.cta.button.primary', 'Get Started Now')}
                  </Link>
                  <a href='mailto:support@tokenmaster.com' className='tm-cta-btn-secondary'>
                    {t('about.cta.button.secondary', 'Talk to Engineering')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======== Footer ======== */}
      </div>
    </PublicLayout>
  )
}
