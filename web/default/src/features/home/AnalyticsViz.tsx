import { useEffect, useRef } from 'react'

/**
 * AnalyticsViz — 替代旧 spinner 的数据分析可视化动画
 * 风格与 DotFieldBackground 统一（红+黑+灰科技感）
 * 效果：中心向外扩散的波纹 + 漂浮的数据粒子
 */
export function AnalyticsViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 128 // display size
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const W = size
    const H = size
    const cx = W / 2
    const cy = H / 2

    // ── 波纹 ring state ──
    interface Ripple { r: number; alpha: number; speed: number }
    const ripples: Ripple[] = []
    let rippleTimer = 0
    const RIPPLE_INTERVAL = 1200 // ms between ripples
    const MAX_RIPPLE_R = W * 0.48

    function spawnRipple() {
      ripples.push({ r: 4, alpha: 0.6, speed: 0.45 })
    }

    // ── 数据粒子 (floating dots) ──
    interface Dot { x: number; y: number; vx: number; vy: number; r: number; alpha: number }
    const dots: Dot[] = []
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = 12 + Math.random() * (W * 0.32)
      dots.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.8,
        alpha: 0.25 + Math.random() * 0.55,
      })
    }

    // ── 连线 (subtle) ──
    function drawConnections() {
      ctx.strokeStyle = 'rgba(239,68,68,0.06)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = dx * dx + dy * dy
          if (dist < 900) {
            ctx.globalAlpha = (1 - dist / 900) * 0.3
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    // ── Center icon glow ──
    let pulsePhase = 0

    function drawCenterIcon() {
      const glowAlpha = 0.15 + Math.sin(pulsePhase) * 0.08
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18)
      gradient.addColorStop(0, `rgba(239,68,68,${glowAlpha})`)
      gradient.addColorStop(1, 'rgba(239,68,68,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(cx, cy, 18, 0, Math.PI * 2)
      ctx.fill()

      // mini bar chart icon (3 bars)
      ctx.fillStyle = '#ef4444'
      const bw = 3
      const bh1 = 6 + Math.sin(pulsePhase * 1.5) * 2
      const bh2 = 10 + Math.sin(pulsePhase * 1.8 + 1) * 2
      const bh3 = 7 + Math.sin(pulsePhase * 1.2 + 2) * 2
      const bx = cx - 7
      const by = cy + 2
      ctx.fillRect(bx, by - bh1, bw, bh1)
      ctx.fillRect(bx + 5, by - bh2, bw, bh2)
      ctx.fillRect(bx + 10, by - bh3, bw, bh3)
    }

    // ── render loop ──
    let animId: number
    let lastTime = performance.now()

    function render(now: number) {
      const dt = Math.min((now - lastTime) / 16.67, 3) // normalize to ~60fps
      lastTime = now

      ctx.clearRect(0, 0, W, H)

      // spawn ripples
      rippleTimer += dt * 16.67
      if (rippleTimer >= RIPPLE_INTERVAL) {
        spawnRipple()
        rippleTimer = 0
      }

      // update & draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.r += rp.speed * dt * 1.8
        rp.alpha -= 0.008 * dt
        if (rp.alpha <= 0 || rp.r > MAX_RIPPLE_R) {
          ripples.splice(i, 1)
          continue
        }
        ctx.strokeStyle = `rgba(239,68,68,${rp.alpha * 0.35})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(cx, cy, rp.r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // update dots
      for (const d of dots) {
        d.x += d.vx * dt
        d.y += d.vy * dt
        // soft bounce off bounds
        const margin = 10
        if (d.x < margin || d.x > W - margin) { d.vx *= -1; d.x = Math.max(margin, Math.min(W - margin, d.x)) }
        if (d.y < margin || d.y > H - margin) { d.vy *= -1; d.y = Math.max(margin, Math.min(H - margin, d.y)) }
        // gentle pull toward center
        d.vx += (cx - d.x) * 0.0003 * dt
        d.vy += (cy - d.y) * 0.0003 * dt
      }

      // draw connections (very subtle)
      drawConnections()

      // draw dots
      for (const d of dots) {
        const flicker = 0.75 + Math.sin(now * 0.003 + d.x) * 0.25
        ctx.fillStyle = `rgba(239,68,68,${d.alpha * flicker})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // center icon
      pulsePhase += 0.03 * dt
      drawCenterIcon()

      animId = requestAnimationFrame(render)
    }

    // initial ripple
    spawnRipple()
    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
