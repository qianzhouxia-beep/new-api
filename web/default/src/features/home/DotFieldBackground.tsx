import { useRef, useEffect, useCallback } from 'react'

interface DotFieldBackgroundProps {
  dotRadius?: number
  dotSpacing?: number
  cursorRadius?: number
  bulgeStrength?: number
  glowColor?: string
  dotColor?: string
  bulgeColor?: string
}

export function DotFieldBackground({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  bulgeStrength = 67,
  glowColor = 'rgba(239, 68, 68, 0.08)',
  dotColor = 'rgba(255, 255, 255, 0.15)',
  bulgeColor = 'rgba(239, 68, 68, 0.6)',
}: DotFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const dotsRef = useRef<{ x: number; y: number; baseX: number; baseY: number; opacity: number }[]>([])

  const initDots = useCallback((width: number, height: number) => {
    const dots = []
    const cols = Math.ceil(width / dotSpacing) + 2
    const rows = Math.ceil(height / dotSpacing) + 2
    const offsetX = (width - (cols - 1) * dotSpacing) / 2
    const offsetY = (height - (rows - 1) * dotSpacing) / 2

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: offsetX + i * dotSpacing,
          y: offsetY + j * dotSpacing,
          baseX: offsetX + i * dotSpacing,
          baseY: offsetY + j * dotSpacing,
          opacity: Math.random() * 0.5 + 0.5,
        })
      }
    }
    dotsRef.current = dots
  }, [dotSpacing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width: number, height: number

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      initDots(width, height)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    resize()

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw glow
      const { x: mx, y: my } = mouseRef.current
      if (mx > 0 && my > 0 && mx < width && my < height) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, cursorRadius)
        gradient.addColorStop(0, glowColor)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      }

      // Draw dots
      dotsRef.current.forEach((dot) => {
        const dx = mx - dot.baseX
        const dy = my - dot.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        let currentX = dot.baseX
        let currentY = dot.baseY
        let currentOpacity = dot.opacity * 0.15
        let currentColor = dotColor

        if (dist < cursorRadius) {
          const force = (1 - dist / cursorRadius) * (bulgeStrength / 100)
          currentX = dot.baseX - (dx / dist) * force * 20
          currentY = dot.baseY - (dy / dist) * force * 20
          currentOpacity = dot.opacity * (0.15 + force * 0.85)
          currentColor = bulgeColor
        }

        ctx.beginPath()
        ctx.arc(currentX, currentY, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = currentColor
        ctx.globalAlpha = currentOpacity
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [dotRadius, dotSpacing, cursorRadius, bulgeStrength, glowColor, dotColor, bulgeColor, initDots])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
  )
}
