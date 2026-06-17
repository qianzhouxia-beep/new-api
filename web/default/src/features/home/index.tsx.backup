/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team - TokenMaster Custom Home Page

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

For commercial licensing, please contact support@quantumnous.com
*/
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, Shield, Database, Code2, Globe } from 'lucide-react'

/* ---------- brand icon SVGs (from @lobehub/icons) ---------- */
import { BrandIcon } from '@/components/icons/brand-icons'
interface ModelDef { nameZh: string; nameEn: string; tagZh: string; tagEn: string; brand: 'deepseek' | 'zhipu' | 'qwen' }

const models: ModelDef[] = [
  { nameZh: 'DeepSeek V4 Flash', nameEn: 'DeepSeek V4 Flash', tagZh: '鏋侀€熸帹鐞?, tagEn: 'Fast Inference', brand: 'deepseek' },
  { nameZh: 'DeepSeek V4 Pro',   nameEn: 'DeepSeek V4 Pro',   tagZh: '鏃楄埌鎺ㄧ悊', tagEn: 'Flagship Reasoning', brand: 'deepseek' },
  { nameZh: 'DeepSeek Chat',     nameEn: 'DeepSeek Chat',     tagZh: '閫氱敤瀵硅瘽', tagEn: 'General Chat', brand: 'deepseek' },
  { nameZh: 'DeepSeek Reasoner', nameEn: 'DeepSeek Reasoner', tagZh: '澶嶆潅鎺ㄧ悊', tagEn: 'Advanced Reasoning', brand: 'deepseek' },
  { nameZh: 'GLM 4.7-Flash',     nameEn: 'GLM 4.7-Flash',    tagZh: '杞婚噺楂樻晥', tagEn: 'Lightweight', brand: 'zhipu' },
  { nameZh: 'GLM 4.5-Air',       nameEn: 'GLM 4.5-Air',      tagZh: '楂樻€т环姣?, tagEn: 'High Value', brand: 'zhipu' },
  { nameZh: 'GLM 4-Vision',      nameEn: 'GLM 4-Vision',     tagZh: '澶氭ā鎬?,   tagEn: 'Multimodal', brand: 'zhipu' },
  { nameZh: 'Qwen 3.7-Max',      nameEn: 'Qwen 3.7-Max',     tagZh: '鏃楄埌妯″瀷', tagEn: 'Flagship', brand: 'qwen' },
  { nameZh: 'Qwen 3.7-Plus',     nameEn: 'Qwen 3.7-Plus',    tagZh: '鍧囪　鍏ㄨ兘', tagEn: 'All-round', brand: 'qwen' },
  { nameZh: 'Qwen 3.5-Plus',     nameEn: 'Qwen 3.5-Plus',    tagZh: '缁忓吀浼橀€?, tagEn: 'Best Value', brand: 'qwen' },
  { nameZh: 'Qwen Plus',         nameEn: 'Qwen Plus',        tagZh: '閫氱敤妯″瀷', tagEn: 'General', brand: 'qwen' },
  { nameZh: 'Qwen Turbo',        nameEn: 'Qwen Turbo',       tagZh: '蹇€熷搷搴?, tagEn: 'Fast Response', brand: 'qwen' },
]

const brandGradients: Record<string, `oklch${string}`> = {
  deepseek: 'oklch(0.60 0.22 250 / 80%)',
  zhipu:    'oklch(0.65 0.18 170 / 80%)',
  qwen:     'oklch(0.60 0.20 280 / 80%)',
}

/* -------- features (bilingual) -------- */
const features = (isZh: boolean) => [
  { icon: Zap, title: isZh ? '涓€ Key 閫氱敤' : 'One Key for All', desc: isZh
    ? '涓€涓?API Key 璋冪敤 DeepSeek銆丟LM銆丵wen 澶氫釜妯″瀷銆傛崲妯″瀷鍙渶鏀?model 鍙傛暟锛屼唬鐮侀浂鏀瑰姩銆?
    : 'One API key for DeepSeek, GLM, Qwen. Switch models by changing the model parameter only.' },
  { icon: Code2, title: isZh ? 'OpenAI 鍏煎' : 'OpenAI Compatible', desc: isZh
    ? '瀹屽叏鍏煎 OpenAI API 鏍煎紡銆傛敼涓€琛?base_url 鍗冲彲鎺ュ叆锛岀幇鏈?SDK 鏃犻渶淇敼銆?
    : 'Fully OpenAI-compatible. Just change your base_url, no SDK changes needed.' },
  { icon: Globe, title: isZh ? '鍥藉唴妯″瀷娣卞害浼樺寲' : 'Optimized for CN Models', desc: isZh
    ? 'DeepSeek銆佹櫤璋?GLM銆侀€氫箟鍗冮棶鍥藉唴鐩磋繛锛屼綆寤惰繜銆侀珮鍙敤銆?
    : 'DeepSeek, GLM, Qwen direct connections in China 鈥?low latency, high availability.' },
  { icon: Database, title: isZh ? '鍗冲厖鍗崇敤' : 'Prepay & Use', desc: isZh
    ? '缇庨噾鍏呭€硷紝鎸夐噺鎵ｈ垂銆傛棤鏈堣垂鏃犺闃咃紝鍏呭灏戠敤澶氬皯銆?
    : 'USD prepaid balance, pay per usage. No monthly fees, no subscriptions.' },
  { icon: Shield, title: isZh ? '鐢ㄩ噺閫忔槑' : 'Transparent Usage', desc: isZh
    ? '鍚庡彴瀹炴椂鏌ョ湅鐢ㄩ噺銆佷綑棰濄€佽皟鐢ㄨ褰曘€傛瘡绗旀墸璐规竻鏅板彲鏌ャ€?
    : 'Real-time usage dashboard with clear billing records for every API call.' },
  { icon: Zap, title: isZh ? '鎸佺画鎵╁睍' : 'Expanding', desc: isZh
    ? '鏇村妯″瀷鎸佺画鎺ュ叆涓€備竴涓钩鍙帮紝绠＄悊鎵€鏈?AI 妯″瀷鎺ュ叆銆?
    : 'New models added regularly. One platform to manage all your AI access.' },
]

/* -------- footer -------- */
function HomeFooter({ isZh }: { isZh: boolean }) {
  const year = new Date().getFullYear()
  return (
    <footer className='border-t border-border/40 bg-gradient-to-r from-orange-50/80 via-red-50/60 to-purple-50/80'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:py-16'>
        <div className='flex flex-col justify-between gap-10 md:flex-row md:gap-16'>
          <div className='shrink-0'>
            <span className='text-foreground text-lg font-bold tracking-tight'>TokenMaster</span>
            <p className='text-muted-foreground/60 mt-2 max-w-[220px] text-sm leading-relaxed'>
              {isZh
                ? '闈㈠悜寮€鍙戣€呯殑涓€绔欏紡 AI 妯″瀷 API 缃戝叧銆備竴涓?Key锛屽叏閮ㄦā鍨嬨€?
                : 'A one-stop AI model API gateway for developers. One key, all models.'}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-10 md:gap-16'>
            <div>
              <p className='text-muted-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase'>
                {isZh ? '浜у搧' : 'Product'}
              </p>
              <ul className='space-y-2.5'>
                <li><a href='#models' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '妯″瀷' : 'Models'}</a></li>
                <li><a href='#features' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '浼樺娍' : 'Features'}</a></li>
                <li><Link to='/pricing' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '浠锋牸' : 'Pricing'}</Link></li>
              </ul>
            </div>
            <div>
              <p className='text-muted-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase'>
                {isZh ? '鏀寔' : 'Support'}
              </p>
              <ul className='space-y-2.5'>
                <li><Link to='/sign-up' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '娉ㄥ唽' : 'Sign Up'}</Link></li>
                <li><Link to='/sign-in' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '鐧诲綍' : 'Sign In'}</Link></li>
                <li><a href='#faq' className='hover:text-primary text-muted-foreground text-sm transition-colors'>FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='border-border/30 mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 sm:flex-row'>
          <p className='text-muted-foreground/40 text-xs'>&copy; {year} TokenMaster. {isZh ? '淇濈暀鎵€鏈夋潈鍒┿€? : 'All rights reserved.'}</p>
          <div className='flex items-center gap-2'>
            <span className='inline-block size-1.5 rounded-full bg-green-500' />
            <span className='text-muted-foreground/40 text-xs'>{isZh ? '鏈嶅姟杩愯姝ｅ父' : 'Service Operational'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ================================================================== */
export function Home() {
  const { i18n } = useTranslation()
  const isZh = i18n.language.startsWith('zh')

  return (
    <PublicLayout showMainContainer={false}>
      <main className='overflow-x-hidden'>

        {/* ===== Hero ===== */}
        <section className='relative overflow-hidden px-6 min-h-[100dvh] flex items-center'>
          {/* tech background layers */}
          <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
            {/* base gradient atmosphere */}
            <div className='absolute inset-0 opacity-30 dark:opacity-[0.15]'
              style={{
                background: [
                  'radial-gradient(ellipse 60% 50% at 20% 30%, oklch(0.55 0.20 25 / 80%) 0%, transparent 70%)',
                  'radial-gradient(ellipse 45% 35% at 80% 20%, oklch(0.50 0.18 250 / 60%) 0%, transparent 70%)',
                  'radial-gradient(ellipse 35% 30% at 50% 80%, oklch(0.60 0.15 180 / 40%) 0%, transparent 70%)',
                ].join(', '),
              }}
            />
            {/* fine grid pattern */}
            <div className='absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_55%_45%_at_50%_40%,black_12%,transparent_100%)] bg-[size:2.5rem_2.5rem] opacity-[0.06]' />
            {/* dot matrix overlay */}
            <div className='absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_50%_40%_at_50%_40%,black_8%,transparent_100%)] opacity-[0.04]' />
            {/* animated scan line */}
            <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan-line' />
            {/* corner accents */}
            <div className='absolute top-8 left-8 h-16 w-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg' />
            <div className='absolute top-8 right-8 h-16 w-16 border-r-2 border-t-2 border-primary/20 rounded-tr-lg' />
            <div className='absolute bottom-8 left-8 h-16 w-16 border-b-2 border-l-2 border-primary/20 rounded-bl-lg' />
            <div className='absolute bottom-8 right-8 h-16 w-16 border-b-2 border-r-2 border-primary/20 rounded-br-lg' />

            {/* floating particles */}
            <div className='absolute inset-0 overflow-hidden'>
              <div className='absolute top-[15%] left-[10%] size-3 rounded-full bg-orange-400/25 blur-[2px] animate-float-particle animation-delay-0' />
              <div className='absolute top-[25%] right-[15%] size-2.5 rounded-full bg-purple-500/25 blur-[2px] animate-float-particle animation-delay-1000' />
              <div className='absolute bottom-[35%] left-[20%] size-2 rounded-full bg-blue-400/25 blur-[2px] animate-float-particle animation-delay-2000' />
              <div className='absolute bottom-[20%] right-[25%] size-3.5 rounded-full bg-emerald-400/20 blur-[2px] animate-float-particle animation-delay-3000' />
              <div className='absolute top-[55%] left-[5%] size-2 rounded-full bg-cyan-400/20 blur-[2px] animate-float-particle animation-delay-1500' />
              <div className='absolute top-[65%] right-[8%] size-2.5 rounded-full bg-rose-400/20 blur-[2px] animate-float-particle animation-delay-2500' />
            </div>

            {/* glowing orbs */}
            <div className='absolute -top-20 -left-20 size-60 rounded-full bg-blue-500/10 blur-[80px] animate-orb-pulse' />
            <div className='absolute -bottom-32 -right-20 size-72 rounded-full bg-purple-500/10 blur-[100px] animate-orb-pulse animation-delay-2000' />
          </div>

          <div className='mx-auto max-w-[90%] w-full grid items-center gap-8 lg:gap-10 lg:grid-cols-2'>
            {/* ---- text column ---- */}
            <div className='text-center lg:text-left'>
              <div className='mb-5 inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-1.5 text-sm backdrop-blur-sm shadow-xs'>
                <Sparkles className='text-primary size-4' />
                <span className='text-muted-foreground'>
                  {isZh ? '宸叉帴鍏?12+ 涓绘祦 AI 妯″瀷' : '12+ AI Models Available'}
                </span>
              </div>

              <h1 className='text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]'>
                {isZh ? '涓€涓?API锛岀晠鐢? : 'One API for '}
                <span className='bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent'>
                  {isZh ? '涓夊ぇ鍥戒骇妯″瀷' : 'All Major Models'}
                </span>
              </h1>

              <p className='text-muted-foreground mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed lg:mx-0'>
                {isZh
                  ? 'TokenMaster 缁熶竴 DeepSeek銆佹櫤璋?GLM銆侀€氫箟鍗冮棶 API 鎺ュ叆銆備竴涓?Key锛屽叏閮ㄦā鍨嬨€傛棤闇€鍒嗗埆娉ㄥ唽銆佹棤闇€绠＄悊澶氫釜骞冲彴銆?
                  : 'TokenMaster unifies DeepSeek, GLM, and Qwen APIs. One key for all models 鈥?no separate signups, no multi-platform management.'}
              </p>

              <div className='mt-9 flex flex-wrap items-center gap-4 lg:justify-start'>
                <Button size='lg' className='rounded-full px-8' render={<Link to='/sign-up' />}>
                  {isZh ? '鍏嶈垂娉ㄥ唽' : 'Get Started'}
                  <ArrowRight className='ml-1.5 size-4' />
                </Button>
                <Button size='lg' variant='outline' className='rounded-full px-8' render={<Link to='/pricing' />}>
                  {isZh ? '妯″瀷浠锋牸' : 'View Pricing'}
                </Button>
              </div>
            </div>

            {/* ---- image column ---- */}
            <div className='relative flex justify-center lg:justify-end'>
              <div className='relative max-w-md xl:max-w-lg'>
                {/* glow behind image */}
                <div aria-hidden className='absolute -inset-4 rounded-2xl bg-gradient-to-br from-orange-200/30 via-purple-200/20 to-blue-200/30 blur-2xl dark:from-orange-900/20 dark:via-purple-900/15 dark:to-blue-900/20' />
                <img
                  src='/hero-ai-chip.png'
                  alt='AI Model Hub Visualization'
                  className='relative w-full drop-shadow-2xl landing-animate-fade-up'
                  loading='eager'
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== Model Showcase ===== */}
        <section className='bg-muted/30 px-6 py-20' id='models'>
          <div className='mx-auto max-w-7xl'>
            <div className='mb-10 text-center'>
              <h2 className='text-foreground text-3xl font-bold'>
                {isZh ? '宸叉帴鍏ユā鍨? : 'Available Models'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '鍏ㄧ郴 OpenAI 鍏煎锛屾寜闇€閫夌敤' : 'All OpenAI-compatible, pick what you need'}
              </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {models.map((m, i) => (
                <div key={i} className='group relative overflow-hidden rounded-xl border bg-white/50 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'>
                  <div aria-hidden className='absolute -top-6 -right-6 size-20 rounded-full opacity-[0.07] transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.12]'
                    style={{ background: `radial-gradient(circle, ${brandGradients[m.brand]}, transparent)` }}
                  />
                  <div className='relative flex items-start gap-3'>
                    <BrandIcon brand={m.brand} className='mt-0.5 size-9 shrink-0' />
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center justify-between gap-1'>
                        <span className='text-foreground text-sm font-semibold truncate'>
                          {isZh ? m.nameZh : m.nameEn}
                        </span>
                        <span className='text-muted-foreground/60 shrink-0 text-[10px] font-medium uppercase tracking-wider'>
                          {isZh ? m.tagZh : m.tagEn}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Features ===== */}
        <section className='px-6 py-20' id='features'>
          <div className='mx-auto max-w-7xl'>
            <div className='mb-12 text-center'>
              <h2 className='text-foreground text-3xl font-bold'>
                {isZh ? '涓轰粈涔堥€夋嫨 TokenMaster锛? : 'Why TokenMaster?'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '涓轰綘鐪佸幓澶氬钩鍙扮鐞嗙殑楹荤儲' : 'No more juggling multiple platforms'}
              </p>
            </div>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {features(isZh).map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className='group rounded-xl border bg-white/50 p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
                    <div className='bg-primary/10 text-primary mb-4 inline-flex size-11 items-center justify-center rounded-lg transition-colors group-hover:bg-primary group-hover:text-white'>
                      <Icon className='size-5' />
                    </div>
                    <h3 className='text-foreground mb-2 text-lg font-semibold'>{f.title}</h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== Quick Start ===== */}
        <section className='bg-muted/30 px-6 py-20'>
          <div className='mx-auto max-w-5xl'>
            <div className='mb-10 text-center'>
              <h2 className='text-foreground text-3xl font-bold'>
                {isZh ? '蹇€熷紑濮? : 'Quick Start'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '涓夋鎺ュ叆锛屼竴琛屼唬鐮? : 'Three steps, one line of code'}
              </p>
            </div>
            <div className='grid gap-6 md:grid-cols-3'>
              {[
                { step: '01', title: isZh ? '娉ㄥ唽璐﹀彿' : 'Register', desc: isZh ? '鍏嶈垂娉ㄥ唽锛岃幏鍙栦笓灞?API Key' : 'Sign up free, get your API Key' },
                { step: '02', title: isZh ? '鍏呭€间綑棰? : 'Top Up',   desc: isZh ? '鍚庡彴鍏呭叆缇庨噾浣欓锛屾寜闇€浠樿垂' : 'Deposit USD balance, pay-as-you-go' },
                { step: '03', title: isZh ? '璋冪敤 API' : 'Call API', desc: isZh ? '鏀逛竴琛?base_url锛岀敤 Key 鐩存帴璋冪敤' : 'Change base_url, start calling' },
              ].map((item, i) => (
                <div key={i} className='relative rounded-xl border bg-white/50 p-6'>
                  <span className='text-5xl font-black opacity-[0.04] absolute -top-2 -right-2 select-none leading-none'>{item.step}</span>
                  <div className='text-primary mb-3 text-2xl font-bold'>{item.step}</div>
                  <h3 className='text-foreground mb-1 text-lg font-semibold'>{item.title}</h3>
                  <p className='text-muted-foreground text-sm'>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className='mt-10 rounded-xl border bg-white/50 p-6'>
              <p className='text-muted-foreground/70 mb-2 text-xs font-bold tracking-widest uppercase'>PYTHON</p>
              <pre className='bg-muted/50 text-sm overflow-x-auto rounded-lg p-4'>
                <code>{`import openai
client = openai.OpenAI(
    api_key="tm_your_key",
    base_url="https://api-tokenmaster.com/v1",
)
resp = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(resp.choices[0].message.content)`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className='px-6 py-20' id='faq'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='text-foreground mb-12 text-center text-3xl font-bold'>
              {isZh ? '甯歌闂' : 'FAQ'}
            </h2>
            <div className='space-y-4'>
              {[
                { q: isZh ? 'TokenMaster 鏀寔鍝簺妯″瀷锛? : 'What models does TokenMaster support?',
                  a: isZh ? '鐩墠宸叉帴鍏?DeepSeek锛圴4 Flash/Pro/Chat/Reasoner锛夈€佹櫤璋?GLM锛?.7-Flash/4.5-Air/4-Vision 绛夛級銆侀€氫箟鍗冮棶 Qwen锛?.7-Max/3.7-Plus/3.5 绯诲垪绛夛級锛屾洿澶氭ā鍨嬫寔缁帴鍏ヤ腑銆?
                    : 'Currently: DeepSeek (V4 Flash/Pro/Chat/Reasoner), GLM (4.7-Flash/4.5-Air/4-Vision etc.), Qwen (3.7-Max/3.7-Plus/3.5 series etc.). More coming soon.' },
                { q: isZh ? '闇€瑕佸噯澶囪嚜宸辩殑 API Key 鍚楋紵' : 'Do I need my own API keys?',
                  a: isZh ? '涓嶉渶瑕併€傛敞鍐屽悗鑾峰彇涓撳睘 Key锛屼竴涓?Key 璋冪敤鍏ㄩ儴妯″瀷銆?
                    : 'No. Get one TokenMaster key that works for all models.' },
                { q: isZh ? '鎬庝箞鏀惰垂锛? : 'How does pricing work?',
                  a: isZh ? '缇庨噾鍏呭€硷紝鎸夐噺鎵ｈ垂銆傛槑鐮佹爣浠凤紝鏃犳湀璐规棤璁㈤槄鏃犳渶浣庢秷璐广€?
                    : 'USD prepaid credits, pay per usage. Transparent prices, no monthly fees.' },
                { q: isZh ? '鍜?OpenAI 鍏煎鍚楋紵' : 'Is it OpenAI compatible?',
                  a: isZh ? '瀹屽叏鍏煎銆傛敼涓€琛?base_url 鍒?https://api-tokenmaster.com/v1 鍗冲彲銆?
                    : 'Fully compatible. Just set base_url to https://api-tokenmaster.com/v1.' },
                { q: isZh ? '浣欓浼氳繃鏈熷悧锛? : 'Do credits expire?',
                  a: isZh ? '涓嶈鏈夋晥鏈燂紝鍏呭灏戠敤澶氬皯銆? : 'No expiration. Your balance lasts indefinitely.' },
              ].map((faq, i) => (
                <details key={i} className='group rounded-xl border bg-white/50 p-5'>
                  <summary className='text-foreground cursor-pointer text-base font-medium transition-colors group-open:text-primary flex items-center justify-between'>
                    <span>{faq.q}</span>
                    <svg className='size-4 shrink-0 transition-transform group-open:rotate-180' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                      <path d='M6 9l6 6 6-6' />
                    </svg>
                  </summary>
                  <p className='text-muted-foreground mt-4 text-sm leading-relaxed'>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className='bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 px-6 py-20'>
          <div className='mx-auto max-w-3xl text-center text-white'>
            <h2 className='text-3xl font-bold'>
              {isZh ? '寮€濮嬩娇鐢?TokenMaster' : 'Get Started with TokenMaster'}
            </h2>
            <p className='mt-4 text-lg opacity-90'>
              {isZh ? '鍏嶈垂娉ㄥ唽锛岀珛鍗充綋楠岀粺涓€ AI 妯″瀷缃戝叧' : 'Join free and try the unified AI gateway'}
            </p>
            <div className='mt-8'>
              <Button size='lg' className='rounded-full bg-white px-10 text-foreground hover:bg-white/90' render={<Link to='/sign-up' />}>
                {isZh ? '鍏嶈垂娉ㄥ唽' : 'Sign Up Free'}
                <ArrowRight className='ml-1.5 size-4' />
              </Button>
            </div>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <HomeFooter isZh={isZh} />
      </main>
    </PublicLayout>
  )
}

