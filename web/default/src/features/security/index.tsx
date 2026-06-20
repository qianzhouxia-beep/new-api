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

For commercial licensing, please contact support@tokenmaster.com.
*/
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'

/* ======== TokenMaster Security Page - Red+Black+White Dark Theme ======== */

const securityPractices = [
  {
    icon: (
      <svg viewBox='0 0 24 24' width='28' height='28' fill='none' stroke='#ef4444' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
        <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
        <path d='M7 11V7a5 5 0 0 1 10 0v4' />
      </svg>
    ),
    titleKey: 'security.practice.1.title',
    titleDefault: 'SOC 2 Type II Ready',
    descKey: 'security.practice.1.desc',
    descDefault: 'Our infrastructure aligns with SOC 2 Type II security standards. Independent audits verify our controls for availability, processing integrity, and confidentiality.',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' width='28' height='28' fill='none' stroke='#ef4444' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
      </svg>
    ),
    titleKey: 'security.practice.2.title',
    titleDefault: 'AES-256 Encryption',
    descKey: 'security.practice.2.desc',
    descDefault: 'All API traffic is encrypted in transit using TLS 1.3. Sensitive data at rest is encrypted with AES-256. Keys are stored using hardware security modules (HSM).',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' width='28' height='28' fill='none' stroke='#ef4444' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
        <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
        <polyline points='14 2 14 8 20 8' />
        <line x1='16' y1='13' x2='8' y2='13' />
        <line x1='16' y1='17' x2='8' y2='17' />
      </svg>
    ),
    titleKey: 'security.practice.3.title',
    titleDefault: 'Transparent Logging & Retention',
    descKey: 'security.practice.3.desc',
    descDefault: 'API request logs are retained for billing and debugging purposes. Log retention is configurable by the admin. You can export or delete your logs at any time from the dashboard.',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' width='28' height='28' fill='none' stroke='#ef4444' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
        <circle cx='12' cy='12' r='3' />
      </svg>
    ),
    titleKey: 'security.practice.4.title',
    titleDefault: 'Real-Time Monitoring',
    descKey: 'security.practice.4.desc',
    descDefault: 'Our security operations center monitors for anomalies 24/7. Automated DDoS protection and rate limiting are applied at the edge via Cloudflare.',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' width='28' height='28' fill='none' stroke='#ef4444' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
        <path d='M9 12l2 2 4-4' />
      </svg>
    ),
    titleKey: 'security.practice.5.title',
    titleDefault: 'Role-Based Access Control',
    descKey: 'security.practice.5.desc',
    descDefault: 'Granular permissions let you control exactly which team members can manage keys, view logs, or modify billing. SSO integration is available on Enterprise plans.',
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' width='28' height='28' fill='none' stroke='#ef4444' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='8' x2='12' y2='12' />
        <line x1='12' y1='16' x2='12.01' y2='16' />
      </svg>
    ),
    titleKey: 'security.practice.6.title',
    titleDefault: 'Transparent Incident Response',
    descKey: 'security.practice.6.desc',
    descDefault: 'We maintain a public status page with real-time incident reports. Our average time to resolve P1 incidents is under 30 minutes.',
  },
]

const complianceItems = [
  { key: 'SOC 2 Type II', statusKey: 'security.compliance.in.progress', statusDefault: 'In Progress' },
  { key: 'GDPR', statusKey: 'security.compliance.compliant', statusDefault: 'Compliant' },
  { key: 'CCPA', statusKey: 'security.compliance.compliant', statusDefault: 'Compliant' },
  { key: 'ISO 27001', statusKey: 'security.compliance.planning', statusDefault: 'Planning' },
]

export function Security() {
  const { t } = useTranslation()

  return (
    <PublicLayout showMainContainer={false}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .tm-security { font-family: 'Inter', -apple-system, sans-serif; color: #e5e7eb; background: #1a1a1a; line-height: 1.6; }
        .tm-security * { box-sizing: border-box; margin: 0; padding: 0; }
        .tm-security a { color: #ef4444; text-decoration: none; transition: color .2s; }
        .tm-security a:hover { color: #fca5a5; }

        /* ---- Hero ---- */
        .tm-sec-hero { position: relative; overflow: hidden; background: #1a1a1a; padding: 40px 24px;
          background-image: radial-gradient(rgba(239,68,68,.08) .5px, transparent .5px); background-size: 24px 24px; }
        .tm-sec-hero-inner { max-width: 1440px; margin: 0 auto; position: relative; z-index: 1; }
        .tm-sec-hero-badge { display: flex; align-items: center; gap: 8px; color: #ef4444; margin-bottom: 24px; }
        .tm-sec-hero-badge-line { width: 48px; height: 1px; background: #ef4444; }
        .tm-sec-hero-badge-text { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600;
          letter-spacing: .15em; text-transform: uppercase; }
        .tm-sec-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(32px,5vw,48px);
          line-height: 1.15; letter-spacing: -.02em; font-weight: 700; color: #ffffff; margin-bottom: 24px; max-width: 768px; }
        .tm-sec-hero p { font-size: clamp(16px,1.6vw,18px); line-height: 1.7; color: #9ca3af; max-width: 640px; }
        .tm-sec-hero-deco { position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          opacity: .2; pointer-events: none; user-select: none; }
        .tm-sec-hero-deco svg { width: 320px; height: 320px; }

        /* ---- Section base ---- */
        .tm-sec-section { padding: 80px 24px; }
        .tm-sec-section-inner { max-width: 1440px; margin: 0 auto; }

        /* ---- Practices grid ---- */
        .tm-sec-practices { background: #222222; }
        .tm-sec-practices-header { text-align: center; margin-bottom: 56px; }
        .tm-sec-practices-header h2 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(24px,3vw,32px); line-height: 1.25; letter-spacing: -.01em;
          font-weight: 600; color: #ffffff; margin-bottom: 8px; }
        .tm-sec-practices-header p { font-size: 16px; line-height: 1.5; color: #9ca3af; }
        .tm-sec-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .tm-sec-card { background: #2a2a2a; padding: 28px; border-radius: 10px;
          border: 1px solid #374151; transition: border-color .3s; }
        .tm-sec-card:hover { border-color: #ef4444; }
        .tm-sec-card-icon { width: 52px; height: 52px; margin-bottom: 18px; display: flex;
          align-items: center; justify-content: center; background: rgba(239,68,68,.12); border-radius: 10px; }
        .tm-sec-card h3 { font-family: 'Space Grotesk', sans-serif;
          font-size: 18px; line-height: 1.4; font-weight: 600; color: #ffffff;
          margin-bottom: 10px; }
        .tm-sec-card p { font-size: 14px; line-height: 1.65; color: #9ca3af; }

        /* ---- Compliance table ---- */
        .tm-sec-compliance { background: #1a1a1a; }
        .tm-sec-compliance-header { text-align: center; margin-bottom: 48px; }
        .tm-sec-compliance-header h2 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(24px,3vw,32px); line-height: 1.25; letter-spacing: -.01em;
          font-weight: 600; color: #ffffff; margin-bottom: 8px; }
        .tm-sec-compliance-header p { font-size: 16px; line-height: 1.5; color: #9ca3af; }
        .tm-sec-table-wrap { overflow-x: auto; }
        .tm-sec-table { width: 100%; border-collapse: collapse; }
        .tm-sec-table th { font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600;
          letter-spacing: .06em; text-transform: uppercase; color: #9ca3af;
          padding: 12px 16px; text-align: left; border-bottom: 1px solid #374151; }
        .tm-sec-table td { font-size: 15px; color: #e5e7eb; padding: 16px; border-bottom: 1px solid #262626; }
        .tm-sec-table tr:hover td { background: rgba(239,68,68,.04); }
        .tm-sec-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px;
          font-size: 12px; font-weight: 600; font-family: 'Space Grotesk', sans-serif; }
        .tm-sec-badge-green { background: rgba(34,197,94,.15); color: #22c55e; }
        .tm-sec-badge-yellow { background: rgba(234,179,8,.15); color: #eab308; }
        .tm-sec-badge-blue { background: rgba(59,130,246,.15); color: #3b82f6; }

        /* ---- CTA ---- */
        .tm-sec-cta { background: #222222; }
        .tm-sec-cta-box { background: #111111; color: #ffffff; border-radius: 12px;
          padding: 56px 28px; text-align: center; position: relative; overflow: hidden; }
        .tm-sec-cta-glow { position: absolute; top: 0; right: 0; width: 256px; height: 256px;
          background: rgba(239,68,68,.1); filter: blur(100px); pointer-events: none; }
        .tm-sec-cta-content { position: relative; z-index: 10; max-width: 640px; margin: 0 auto; }
        .tm-sec-cta h2 { font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(26px,4vw,40px); line-height: 1.2; font-weight: 600; margin-bottom: 20px; }
        .tm-sec-cta p { font-size: clamp(15px,1.7vw,18px); line-height: 1.65;
          opacity: .8; margin-bottom: 36px; }
        .tm-sec-cta-btn { display: inline-block; background: #ef4444; color: #ffffff !important;
          padding: 15px 38px; font-family: 'Space Grotesk', sans-serif; font-size: 14px;
          font-weight: 600; border-radius: 8px; border: none; cursor: pointer;
          transition: all .2s; text-decoration: none !important;
          box-shadow: 0 10px 25px rgba(239,68,68,.25); }
        .tm-sec-cta-btn:hover { background: #dc2626; transform: scale(1.04); color: #ffffff !important; }

        /* ---- Responsive md ---- */
        @media (min-width: 768px) {
          .tm-sec-hero { padding: 128px 96px; }
          .tm-sec-hero-deco { display: block; }
          .tm-sec-section { padding: 128px 24px; }
          .tm-sec-section-inner { padding: 0 96px; }
          .tm-sec-grid { grid-template-columns: repeat(3, 1fr); }
          .tm-sec-cta-box { padding: 96px 80px; }
        }
      `}</style>

      <div className='tm-security'>

        {/* ======== Hero ======== */}
        <header className='tm-sec-hero'>
          <div className='tm-sec-hero-inner'>
            <div className='tm-sec-hero-badge'>
              <span className='tm-sec-hero-badge-line' />
              <span className='tm-sec-hero-badge-text'>{t('security.hero.badge', 'Security First')}</span>
            </div>
            <h1>{t('security.hero.title', 'Enterprise-Grade Security by Design')}</h1>
            <p>{t('security.hero.description', 'Security at TokenMaster is not an afterthought — it is architected into every layer of our infrastructure. From encryption to access control, we protect your data with the same rigor we apply to our own.')}</p>
          </div>
          {/* Decorative shield mesh SVG */}
          <div className='tm-sec-hero-deco' aria-hidden='true'>
            <svg viewBox='0 0 320 320' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <radialGradient id='secGlow' cx='50%' cy='50%' r='50%'>
                  <stop offset='0%' stopColor='#ef4444' stopOpacity='0.12' />
                  <stop offset='100%' stopColor='#ef4444' stopOpacity='0' />
                </radialGradient>
              </defs>
              <circle cx='160' cy='160' r='150' fill='url(#secGlow)' />
              {/* Shield outline */}
              <path d='M160 50 L220 80 L220 150 Q220 220 160 260 Q100 220 100 150 L100 80 Z'
                stroke='#ef4444' strokeWidth='1.2' fill='none' opacity='0.35' />
              {/* Inner grid pattern */}
              <circle cx='160' cy='150' r='40' stroke='#ef4444' strokeWidth='0.6' fill='none' opacity='0.2' />
              <circle cx='160' cy='150' r='60' stroke='#ef4444' strokeWidth='0.6' fill='none' opacity='0.15' />
              <line x1='160' y1='90' x2='160' y2='210' stroke='#ef4444' strokeWidth='0.5' opacity='0.15' />
              <line x1='100' y1='150' x2='220' y2='150' stroke='#ef4444' strokeWidth='0.5' opacity='0.15' />
              {/* Checkmark */}
              <path d='M140 155 L155 170 L190 135' stroke='#ef4444' strokeWidth='2.5' fill='none' opacity='0.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </header>

        {/* ======== Security Practices ======== */}
        <section className='tm-sec-section tm-sec-practices'>
          <div className='tm-sec-section-inner'>
            <div className='tm-sec-practices-header'>
              <h2>{t('security.practices.title', 'Our Security Practices')}</h2>
              <p>{t('security.practices.subtitle', 'Six pillars that protect your infrastructure.')}</p>
            </div>
            <div className='tm-sec-grid'>
              {securityPractices.map((p, i) => (
                <div className='tm-sec-card' key={i}>
                  <div className='tm-sec-card-icon'>{p.icon}</div>
                  <h3>{t(p.titleKey, p.titleDefault)}</h3>
                  <p>{t(p.descKey, p.descDefault)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======== Compliance ======== */}
        <section className='tm-sec-section tm-sec-compliance'>
          <div className='tm-sec-section-inner'>
            <div className='tm-sec-compliance-header'>
              <h2>{t('security.compliance.title', 'Compliance & Certifications')}</h2>
              <p>{t('security.compliance.subtitle', 'We are continuously working toward industry-standard certifications.')}</p>
            </div>
            <div className='tm-sec-table-wrap'>
              <table className='tm-sec-table'>
                <thead>
                  <tr>
                    <th>{t('security.compliance.table.framework', 'Framework')}</th>
                    <th>{t('security.compliance.table.status', 'Status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceItems.map((item, i) => {
                    let badgeClass = 'tm-sec-badge '
                    let statusText = t(item.statusKey, item.statusDefault)
                    if (statusText === 'Compliant' || statusText === t('security.compliance.compliant', 'Compliant')) {
                      badgeClass += 'tm-sec-badge-green'
                    } else if (statusText.includes('Progress') || statusText.includes('进度')) {
                      badgeClass += 'tm-sec-badge-yellow'
                    } else {
                      badgeClass += 'tm-sec-badge-blue'
                    }
                    return (
                      <tr key={i}>
                        <td style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>{item.key}</td>
                        <td><span className={badgeClass}>{statusText}</span></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ======== CTA ======== */}
        <section className='tm-sec-section tm-sec-cta'>
          <div className='tm-sec-section-inner'>
            <div className='tm-sec-cta-box'>
              <div className='tm-sec-cta-glow' aria-hidden='true' />
              <div className='tm-sec-cta-content'>
                <h2>{t('security.cta.title', 'Have a Security Question?')}</h2>
                <p>{t('security.cta.description', "Reach out to our security team for detailed documentation, penetration test reports, or custom compliance requirements.")}</p>
                <a href='mailto:security@tokenmaster.com' className='tm-sec-cta-btn'>
                  {t('security.cta.button', 'Contact Security Team')}
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  )
}
