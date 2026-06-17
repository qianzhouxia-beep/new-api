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
function DeepSeekIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor' style={style}><title>DeepSeek</title><path d='M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z'/></svg>
  )
}
function ZhipuIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} viewBox='0 0 24 24' style={style}><title>Zhipu</title><path d='M11.991 23.503a.24.24 0 00-.244.248.24.24 0 00.244.249.24.24 0 00.245-.249.24.24 0 00-.22-.247l-.025-.001zM9.671 5.365a1.697 1.697 0 011.099 2.132l-.071.172-.016.04-.018.054c-.07.16-.104.32-.104.498-.035.71.47 1.279 1.186 1.314h.366c1.309.053 2.338 1.173 2.286 2.523-.052 1.332-1.152 2.38-2.478 2.327h-.174c-.715.018-1.274.64-1.239 1.368 0 .124.018.23.053.337.209.373.54.658.96.8.75.23 1.517-.125 1.9-.782l.018-.035c.402-.64 1.17-.96 1.92-.711.854.284 1.378 1.226 1.099 2.167a1.661 1.661 0 01-2.077 1.102 1.711 1.711 0 01-.907-.711l-.017-.035c-.2-.323-.463-.58-.851-.711l-.056-.018a1.646 1.646 0 00-1.954.746 1.66 1.66 0 01-1.065.764 1.677 1.677 0 01-1.989-1.279c-.209-.906.332-1.83 1.257-2.043a1.51 1.51 0 01.296-.035h.018c.68-.071 1.151-.622 1.116-1.333a1.307 1.307 0 00-.227-.693 2.515 2.515 0 01-.366-1.403 2.39 2.39 0 01.366-1.208c.14-.195.21-.444.227-.693.018-.71-.506-1.261-1.186-1.332l-.07-.018a1.43 1.43 0 01-.299-.07l-.05-.019a1.7 1.7 0 01-1.047-2.114 1.68 1.68 0 012.094-1.101zm-5.575 10.11c.26-.264.639-.367.994-.27.355.096.633.379.728.74.095.362-.007.748-.267 1.013-.402.41-1.053.41-1.455 0a1.062 1.062 0 010-1.482zm14.845-.294c.359-.09.738.024.992.297.254.274.344.665.237 1.025-.107.36-.396.634-.756.718-.551.128-1.1-.22-1.23-.781a1.05 1.05 0 01.757-1.26zm-.064-4.39c.314.32.49.753.49 1.206 0 .452-.176.886-.49 1.206-.315.32-.74.5-1.185.5-.444 0-.87-.18-1.184-.5a1.727 1.727 0 010-2.412 1.654 1.654 0 012.369 0zm-11.243.163c.364.484.447 1.128.218 1.691a1.665 1.665 0 01-2.188.923c-.855-.36-1.26-1.358-.907-2.228a1.68 1.68 0 011.33-1.038c.593-.08 1.183.169 1.547.652zm11.545-4.221c.368 0 .708.2.892.524.184.324.184.724 0 1.048a1.026 1.026 0 01-.892.524c-.568 0-1.03-.47-1.03-1.048 0-.579.462-1.048 1.03-1.048zm-14.358 0c.368 0 .707.2.891.524.184.324.184.724 0 1.048a1.026 1.026 0 01-.891.524c-.569 0-1.03-.47-1.03-1.048 0-.579.461-1.048 1.03-1.048zm10.031-1.475c.925 0 1.675.764 1.675 1.706s-.75 1.705-1.675 1.705-1.674-.763-1.674-1.705c0-.942.75-1.706 1.674-1.706zm-2.626-.684c.362-.082.653-.356.761-.718a1.062 1.062 0 00-.238-1.028 1.017 1.017 0 00-.996-.294c-.547.14-.881.7-.752 1.257.13.558.675.907 1.225.783zm0 16.876c.359-.087.644-.36.75-.72a1.062 1.062 0 00-.237-1.019 1.018 1.018 0 00-.985-.301 1.037 1.037 0 00-.762.717c-.108.361-.017.754.239 1.028.245.263.606.377.953.305l.043-.01zM17.19 3.5a.631.631 0 00.628-.64c0-.355-.279-.64-.628-.64a.631.631 0 00-.628.64c0 .355.28.64.628.64zm-10.38 0a.631.631 0 00.628-.64c0-.355-.28-.64-.628-.64a.631.631 0 00-.628.64c0 .355.279.64.628.64zm-5.182 7.852a.631.631 0 00-.628.64c0 .354.28.639.628.639a.63.63 0 00.627-.606l.001-.034a.62.62 0 00-.628-.64zm5.182 9.13a.631.631 0 00-.628.64c0 .355.279.64.628.64a.631.631 0 00.628-.64c0-.355-.28-.64-.628-.64zm10.38.018a.631.631 0 00-.628.64c0 .355.28.64.628.64a.631.631 0 00.628-.64c0-.355-.279-.64-.628-.64zm5.182-9.148a.631.631 0 00-.628.64c0 .354.279.639.628.639a.631.631 0 00.628-.64c0-.355-.28-.64-.628-.64zm-.384-4.992a.24.24 0 00.244-.249.24.24 0 00-.244-.249.24.24 0 00-.244.249c0 .142.122.249.244.249zM11.991.497a.24.24 0 00.245-.248A.24.24 0 0011.99 0a.24.24 0 00-.244.249c0 .133.108.236.223.247l.021.001zM2.011 6.36a.24.24 0 00.245-.249.24.24 0 00-.244-.249.24.24 0 00-.244.249.24.24 0 00.244.249zm0 11.263a.24.24 0 00-.243.248.24.24 0 00.244.249.24.24 0 00.244-.249.252.252 0 00-.244-.248zm19.995-.018a.24.24 0 00-.245.248.24.24 0 00.245.25.24.24 0 00.244-.25.252.252 0 00-.244-.248z' fill='#3859FF' fillRule='nonzero' /></svg>
  )
}
function QwenIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor' style={style}><title>Qwen</title><path d='M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z'/></svg>
  )
}
/* -------- model data with bilingual labels + brand -------- */
interface ModelDef { nameZh: string; nameEn: string; tagZh: string; tagEn: string; brand: 'deepseek' | 'zhipu' | 'qwen' }

const models: ModelDef[] = [
  { nameZh: 'DeepSeek V4 Flash', nameEn: 'DeepSeek V4 Flash', tagZh: '极速推理', tagEn: 'Fast Inference', brand: 'deepseek' },
  { nameZh: 'DeepSeek V4 Pro',   nameEn: 'DeepSeek V4 Pro',   tagZh: '旗舰推理', tagEn: 'Flagship Reasoning', brand: 'deepseek' },
  { nameZh: 'DeepSeek Chat',     nameEn: 'DeepSeek Chat',     tagZh: '通用对话', tagEn: 'General Chat', brand: 'deepseek' },
  { nameZh: 'DeepSeek Reasoner', nameEn: 'DeepSeek Reasoner', tagZh: '复杂推理', tagEn: 'Advanced Reasoning', brand: 'deepseek' },
  { nameZh: 'GLM 4.7-Flash',     nameEn: 'GLM 4.7-Flash',    tagZh: '轻量高效', tagEn: 'Lightweight', brand: 'zhipu' },
  { nameZh: 'GLM 4.5-Air',       nameEn: 'GLM 4.5-Air',      tagZh: '高性价比', tagEn: 'High Value', brand: 'zhipu' },
  { nameZh: 'GLM 4-Vision',      nameEn: 'GLM 4-Vision',     tagZh: '多模态',   tagEn: 'Multimodal', brand: 'zhipu' },
  { nameZh: 'Qwen 3.7-Max',      nameEn: 'Qwen 3.7-Max',     tagZh: '旗舰模型', tagEn: 'Flagship', brand: 'qwen' },
  { nameZh: 'Qwen 3.7-Plus',     nameEn: 'Qwen 3.7-Plus',    tagZh: '均衡全能', tagEn: 'All-round', brand: 'qwen' },
  { nameZh: 'Qwen 3.5-Plus',     nameEn: 'Qwen 3.5-Plus',    tagZh: '经典优选', tagEn: 'Best Value', brand: 'qwen' },
  { nameZh: 'Qwen Plus',         nameEn: 'Qwen Plus',        tagZh: '通用模型', tagEn: 'General', brand: 'qwen' },
  { nameZh: 'Qwen Turbo',        nameEn: 'Qwen Turbo',       tagZh: '快速响应', tagEn: 'Fast Response', brand: 'qwen' },
]

const brandIconColors: Record<string, string> = {
  deepseek: '#4B6BFB',
  zhipu:    '#10B981',
  qwen:     '#8B5CF6',
}

function BrandIcon({ brand, className }: { brand: string; className?: string }) {
  const color = brandIconColors[brand]
  const style = color ? { color } : undefined
  switch (brand) {
    case 'deepseek': return <DeepSeekIcon className={className} style={style} />
    case 'zhipu':    return <ZhipuIcon className={className} style={style} />
    case 'qwen':     return <QwenIcon className={className} style={style} />
    default:         return null
  }
}

const brandColors: Record<string, string> = {
  deepseek: 'from-blue-500 to-indigo-600',
  zhipu:    'from-emerald-500 to-teal-600',
  qwen:     'from-violet-500 to-purple-600',
}

const brandGradients: Record<string, `oklch${string}`> = {
  deepseek: 'oklch(0.60 0.22 250 / 80%)',
  zhipu:    'oklch(0.65 0.18 170 / 80%)',
  qwen:     'oklch(0.60 0.20 280 / 80%)',
}

/* -------- features (bilingual) -------- */
const features = (isZh: boolean) => [
  { icon: Zap, title: isZh ? '一 Key 通用' : 'One Key for All', desc: isZh
    ? '一个 API Key 调用 DeepSeek、GLM、Qwen 多个模型。换模型只需改 model 参数，代码零改动。'
    : 'One API key for DeepSeek, GLM, Qwen. Switch models by changing the model parameter only.' },
  { icon: Code2, title: isZh ? 'OpenAI 兼容' : 'OpenAI Compatible', desc: isZh
    ? '完全兼容 OpenAI API 格式。改一行 base_url 即可接入，现有 SDK 无需修改。'
    : 'Fully OpenAI-compatible. Just change your base_url, no SDK changes needed.' },
  { icon: Globe, title: isZh ? '国内模型深度优化' : 'Optimized for CN Models', desc: isZh
    ? 'DeepSeek、智谱 GLM、通义千问国内直连，低延迟、高可用。'
    : 'DeepSeek, GLM, Qwen direct connections in China — low latency, high availability.' },
  { icon: Database, title: isZh ? '即充即用' : 'Prepay & Use', desc: isZh
    ? '美金充值，按量扣费。无月费无订阅，充多少用多少。'
    : 'USD prepaid balance, pay per usage. No monthly fees, no subscriptions.' },
  { icon: Shield, title: isZh ? '用量透明' : 'Transparent Usage', desc: isZh
    ? '后台实时查看用量、余额、调用记录。每笔扣费清晰可查。'
    : 'Real-time usage dashboard with clear billing records for every API call.' },
  { icon: Zap, title: isZh ? '持续扩展' : 'Expanding', desc: isZh
    ? '更多模型持续接入中。一个平台，管理所有 AI 模型接入。'
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
                ? '面向开发者的一站式 AI 模型 API 网关。一个 Key，全部模型。'
                : 'A one-stop AI model API gateway for developers. One key, all models.'}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-10 md:gap-16'>
            <div>
              <p className='text-muted-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase'>
                {isZh ? '产品' : 'Product'}
              </p>
              <ul className='space-y-2.5'>
                <li><a href='#models' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '模型' : 'Models'}</a></li>
                <li><a href='#features' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '优势' : 'Features'}</a></li>
                <li><Link to='/pricing' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '价格' : 'Pricing'}</Link></li>
              </ul>
            </div>
            <div>
              <p className='text-muted-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase'>
                {isZh ? '支持' : 'Support'}
              </p>
              <ul className='space-y-2.5'>
                <li><Link to='/sign-up' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '注册' : 'Sign Up'}</Link></li>
                <li><Link to='/sign-in' className='hover:text-primary text-muted-foreground text-sm transition-colors'>{isZh ? '登录' : 'Sign In'}</Link></li>
                <li><a href='#faq' className='hover:text-primary text-muted-foreground text-sm transition-colors'>FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='border-border/30 mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 sm:flex-row'>
          <p className='text-muted-foreground/40 text-xs'>&copy; {year} TokenMaster. {isZh ? '保留所有权利。' : 'All rights reserved.'}</p>
          <div className='flex items-center gap-2'>
            <span className='inline-block size-1.5 rounded-full bg-green-500' />
            <span className='text-muted-foreground/40 text-xs'>{isZh ? '服务运行正常' : 'Service Operational'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ================================================================== */
export function Home() {
  const { t, i18n } = useTranslation()
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
                  {isZh ? '已接入 12+ 主流 AI 模型' : '12+ AI Models Available'}
                </span>
              </div>

              <h1 className='text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]'>
                {isZh ? '一个 API，畅用' : 'One API for '}
                <span className='bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent'>
                  {isZh ? '三大国产模型' : 'All Major Models'}
                </span>
              </h1>

              <p className='text-muted-foreground mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed lg:mx-0'>
                {isZh
                  ? 'TokenMaster 统一 DeepSeek、智谱 GLM、通义千问 API 接入。一个 Key，全部模型。无需分别注册、无需管理多个平台。'
                  : 'TokenMaster unifies DeepSeek, GLM, and Qwen APIs. One key for all models — no separate signups, no multi-platform management.'}
              </p>

              <div className='mt-9 flex flex-wrap items-center gap-4 lg:justify-start'>
                <Button size='lg' className='rounded-full px-8' render={<Link to='/sign-up' />}>
                  {isZh ? '免费注册' : 'Get Started'}
                  <ArrowRight className='ml-1.5 size-4' />
                </Button>
                <Button size='lg' variant='outline' className='rounded-full px-8' render={<Link to='/pricing' />}>
                  {isZh ? '模型价格' : 'View Pricing'}
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
                {isZh ? '已接入模型' : 'Available Models'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '全系 OpenAI 兼容，按需选用' : 'All OpenAI-compatible, pick what you need'}
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
                {isZh ? '为什么选择 TokenMaster？' : 'Why TokenMaster?'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '为你省去多平台管理的麻烦' : 'No more juggling multiple platforms'}
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
                {isZh ? '快速开始' : 'Quick Start'}
              </h2>
              <p className='text-muted-foreground mt-2'>
                {isZh ? '三步接入，一行代码' : 'Three steps, one line of code'}
              </p>
            </div>
            <div className='grid gap-6 md:grid-cols-3'>
              {[
                { step: '01', title: isZh ? '注册账号' : 'Register', desc: isZh ? '免费注册，获取专属 API Key' : 'Sign up free, get your API Key' },
                { step: '02', title: isZh ? '充值余额' : 'Top Up',   desc: isZh ? '后台充入美金余额，按需付费' : 'Deposit USD balance, pay-as-you-go' },
                { step: '03', title: isZh ? '调用 API' : 'Call API', desc: isZh ? '改一行 base_url，用 Key 直接调用' : 'Change base_url, start calling' },
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
              {isZh ? '常见问题' : 'FAQ'}
            </h2>
            <div className='space-y-4'>
              {[
                { q: isZh ? 'TokenMaster 支持哪些模型？' : 'What models does TokenMaster support?',
                  a: isZh ? '目前已接入 DeepSeek（V4 Flash/Pro/Chat/Reasoner）、智谱 GLM（4.7-Flash/4.5-Air/4-Vision 等）、通义千问 Qwen（3.7-Max/3.7-Plus/3.5 系列等），更多模型持续接入中。'
                    : 'Currently: DeepSeek (V4 Flash/Pro/Chat/Reasoner), GLM (4.7-Flash/4.5-Air/4-Vision etc.), Qwen (3.7-Max/3.7-Plus/3.5 series etc.). More coming soon.' },
                { q: isZh ? '需要准备自己的 API Key 吗？' : 'Do I need my own API keys?',
                  a: isZh ? '不需要。注册后获取专属 Key，一个 Key 调用全部模型。'
                    : 'No. Get one TokenMaster key that works for all models.' },
                { q: isZh ? '怎么收费？' : 'How does pricing work?',
                  a: isZh ? '美金充值，按量扣费。明码标价，无月费无订阅无最低消费。'
                    : 'USD prepaid credits, pay per usage. Transparent prices, no monthly fees.' },
                { q: isZh ? '和 OpenAI 兼容吗？' : 'Is it OpenAI compatible?',
                  a: isZh ? '完全兼容。改一行 base_url 到 https://api-tokenmaster.com/v1 即可。'
                    : 'Fully compatible. Just set base_url to https://api-tokenmaster.com/v1.' },
                { q: isZh ? '余额会过期吗？' : 'Do credits expire?',
                  a: isZh ? '不设有效期，充多少用多少。' : 'No expiration. Your balance lasts indefinitely.' },
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
              {isZh ? '开始使用 TokenMaster' : 'Get Started with TokenMaster'}
            </h2>
            <p className='mt-4 text-lg opacity-90'>
              {isZh ? '免费注册，立即体验统一 AI 模型网关' : 'Join free and try the unified AI gateway'}
            </p>
            <div className='mt-8'>
              <Button size='lg' className='rounded-full bg-white px-10 text-foreground hover:bg-white/90' render={<Link to='/sign-up' />}>
                {isZh ? '免费注册' : 'Sign Up Free'}
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
