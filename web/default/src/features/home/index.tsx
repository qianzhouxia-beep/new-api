/*
Copyright (C) 2023-2026 QuantumNous
Modified by TokenMaster Team — Kinetic Forge Light Design System
Fully faithful to tokenmaster_enhanced_animation_visibility/code_en.html
*/
import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'

/* ─── M3 Color System + Tailwind Extensions ─── */
const designSystemStyle = `
  body {
    background-color: #fcfaf8;
  }
  .glow-radial {
    background: radial-gradient(circle at center, rgba(164, 55, 0, 0.12) 0%, transparent 70%);
  }
  .card-lift {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  }
  .card-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  }
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
  #hero-shader-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.9;
  }
  /* ─── Spacing Utilities ─── */
  .gap-xs { gap: 4px; }
  .gap-sm { gap: 8px; }
  .gap-md { gap: 16px; }
  .gap-lg { gap: 24px; }
  .gap-xl { gap: 40px; }
  .p-xs { padding: 4px; }
  .p-sm { padding: 8px; }
  .p-md { padding: 16px; }
  .p-lg { padding: 24px; }
  .p-xl { padding: 40px; }
  .px-xs { padding-left: 4px; padding-right: 4px; }
  .px-sm { padding-left: 8px; padding-right: 8px; }
  .px-md { padding-left: 16px; padding-right: 16px; }
  .px-lg { padding-left: 24px; padding-right: 24px; }
  .px-xl { padding-left: 40px; padding-right: 40px; }
  .px-gutter { padding-left: 24px; padding-right: 24px; }
  .py-sm { padding-top: 8px; padding-bottom: 8px; }
  .py-md { padding-top: 16px; padding-bottom: 16px; }
  .py-lg { padding-top: 24px; padding-bottom: 24px; }
  .py-xl { padding-top: 40px; padding-bottom: 40px; }
  .py-32 { padding-top: 128px; padding-bottom: 128px; }
  .pt-sm { padding-top: 8px; }
  .pt-md { padding-top: 16px; }
  .pt-48 { padding-top: 192px; }
  .pb-sm { padding-bottom: 8px; }
  .pb-32 { padding-bottom: 128px; }
  .mb-sm { margin-bottom: 8px; }
  .mb-md { margin-bottom: 16px; }
  .mb-lg { margin-bottom: 24px; }
  .mb-xl { margin-bottom: 40px; }
  .mt-sm { margin-top: 8px; }
  .mt-md { margin-top: 16px; }
  .mt-2xl { margin-top: 60px; }
  .space-y-xs > * + * { margin-top: 4px; }
  .space-y-sm > * + * { margin-top: 8px; }
  .space-y-md > * + * { margin-top: 16px; }
  .space-y-lg > * + * { margin-top: 24px; }
  .space-y-xl > * + * { margin-top: 40px; }
  .min-w-\\[80px\\] { min-width: 80px; }
  .min-h-\\[300px\\] { min-height: 300px; }
  /* ─── Typography Utilities ─── */
  .font-body-md { font-family: 'Inter', sans-serif; font-weight: 400; }
  .font-body-lg { font-family: 'Inter', sans-serif; font-weight: 400; }
  .font-headline-lg { font-family: 'Space Grotesk', sans-serif; font-weight: 600; }
  .font-headline-md { font-family: 'Space Grotesk', sans-serif; font-weight: 500; }
  .font-headline-sm { font-family: 'Space Grotesk', sans-serif; }
  .font-display { font-family: 'Space Grotesk', sans-serif; font-weight: 700; }
  .font-label-md { font-family: 'Space Grotesk', sans-serif; font-weight: 600; letter-spacing: 0.05em; }
  .font-mono-code { font-family: 'JetBrains Mono', monospace; font-weight: 400; }
  .text-body-md { font-size: 16px; line-height: 24px; font-weight: 400; }
  .text-body-lg { font-size: 18px; line-height: 28px; font-weight: 400; }
  .text-headline-lg { font-size: 32px; line-height: 40px; letter-spacing: -0.01em; font-weight: 600; }
  .text-headline-md { font-size: 24px; line-height: 32px; font-weight: 500; }
  .text-headline-sm { font-size: 20px; line-height: 28px; }
  .text-display { font-size: 48px; line-height: 56px; letter-spacing: -0.02em; font-weight: 700; }
  .text-label-md { font-size: 14px; line-height: 20px; letter-spacing: 0.05em; font-weight: 600; }
  .text-mono-code { font-size: 14px; line-height: 20px; font-weight: 400; }
  .text-\\[12px\\] { font-size: 12px; }
  .text-\\[13px\\] { font-size: 13px; }
  .text-\\[18px\\] { font-size: 18px; }
  /* ─── Color Utilities ─── */
  .text-primary { color: #a43700; }
  .text-on-primary { color: #ffffff; }
  .text-on-primary-fixed { color: #380d00; }
  .text-on-primary-fixed-variant { color: #802a00; }
  .text-primary-fixed-dim { color: #ffb59a; }
  .text-on-surface { color: #191c1d; }
  .text-on-surface-variant { color: #5a4138; }
  .text-secondary { color: #4c56af; }
  .text-tertiary { color: #0f666a; }
  .text-error { color: #ba1a1a; }
  .text-secondary-container { color: #959efd; }
  .text-on-tertiary-fixed-variant { color: #004f53; }
  .text-white { color: #ffffff; }
  .bg-white { background: #ffffff; }
  .bg-primary { background: #a43700; }
  .bg-primary\\/10 { background: rgba(164, 55, 0, 0.1); }
  .bg-primary\\/5 { background: rgba(164, 55, 0, 0.05); }
  .bg-primary\\/20 { background: rgba(164, 55, 0, 0.2); }
  .bg-primary-fixed { background: #ffdbcf; }
  .bg-secondary-container\\/20 { background: rgba(149, 158, 253, 0.2); }
  .bg-tertiary-container\\/20 { background: rgba(51, 127, 131, 0.2); }
  .bg-error-container\\/20 { background: rgba(186, 26, 26, 0.2); }
  .bg-inverse-surface { background: #2e3132; }
  .bg-surface-container-low { background: #f3f4f5; }
  .bg-surface-container-lowest { background: #ffffff; }
  .bg-surface-container { background: #edeeef; }
  .bg-surface-container-low { background: #f3f4f5; }
  .bg-surface-variant { background: #e1e3e4; }
  .bg-white\\/80 { background: rgba(255, 255, 255, 0.8); }
  .border-surface-variant { border-color: #e1e3e4; }
  .border-outline-variant { border-color: #e3bfb2; }
  .border-white\\/10 { border-color: rgba(255, 255, 255, 0.1); }
  .border-outline-variant\\/30 { border-color: rgba(227, 191, 178, 0.3); }
  .border-primary { border-color: #a43700; }
  .border-transparent { border-color: transparent; }
  .hover\\:bg-surface-container:hover { background: #edeeef; }
  .hover\\:bg-surface-container-high:hover { background: #e7e8e9; }
  .hover\\:text-primary:hover { color: #a43700; }
  .hover\\:opacity-95:hover { opacity: 0.95; }
  .hover\\:underline:hover { text-decoration: underline; }
  .decoration-primary { text-decoration-color: #a43700; }
  .transition-opacity { transition: opacity 0.2s; }
  .transition-all { transition: all 0.2s ease; }
  .transition-colors { transition: colors 0.2s ease; }
  .transition-transform { transition: transform 0.2s ease; }
  /* ─── Effect Classes ─── */
  .backdrop-blur-md { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  .shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
  .shadow-lg { box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08); }
  .shadow-xl { box-shadow: 0 20px 40px -10px rgba(0,0,0,0.10); }
  .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); }
  .tracking-wider { letter-spacing: 0.05em; }
  .tracking-widest { letter-spacing: 0.1em; }
  .uppercase { text-transform: uppercase; }
  .list-none { list-style: none; }
  .overflow-x-auto { overflow-x: auto; }
  .overflow-hidden { overflow: hidden; }
  .pointer-events-none { pointer-events: none; }
  .cursor-pointer { cursor: pointer; }
  .select-none { user-select: none; }
  .relative { position: relative; }
  .absolute { position: absolute; }
  .sticky { position: sticky; }
  .top-0 { top: 0; }
  .z-0 { z-index: 0; }
  .z-10 { z-index: 10; }
  .z-50 { z-index: 50; }
  .-top-48 { top: -192px; }
  .-left-48 { left: -192px; }
  .-bottom-48 { bottom: -192px; }
  .-right-48 { right: -192px; }
  .inset-0 { inset: 0; }
  .w-\\[600px\\] { width: 600px; }
  .w-\\[800px\\] { width: 800px; }
  .w-3 { width: 12px; }
  .w-20 { width: 80px; }
  .w-32 { width: 128px; }
  .w-full { width: 100%; }
  .h-3 { height: 12px; }
  .h-20 { height: 80px; }
  .h-32 { height: 128px; }
  .h-auto { height: auto; }
  .h-full { height: 100%; }
  .max-w-2xl { max-width: 42rem; }
  .max-w-4xl { max-width: 56rem; }
  .max-w-container-max { max-width: 1440px; }
  .min-w-\\[80px\\] { min-width: 80px; }
  .rounded { border-radius: 2px; }
  .rounded-lg { border-radius: 4px; }
  .rounded-xl { border-radius: 8px; }
  .rounded-full { border-radius: 12px; }
  .rounded-\\[12px\\] { border-radius: 12px; }
  .border { border: 1px solid; }
  .border-4 { border-width: 4px; }
  .border-t { border-top: 1px solid; }
  .border-b { border-bottom: 1px solid; }
  .border-b-2 { border-bottom: 2px solid; }
  .border-t-primary { border-top-color: #a43700; }
  .border-r-primary { border-right-color: #a43700; }
  .border-b-primary\\/20 { border-bottom-color: rgba(164, 55, 0, 0.2); }
  .border-l-primary\\/20 { border-left-color: rgba(164, 55, 0, 0.2); }
  .animate-spin { animation: spin 1s linear infinite; }
  .group-open\\:rotate-180[open] .group-open\\:rotate-180 { transform: rotate(180deg); }
  details > summary::-webkit-details-marker { display: none; }
  details summary { list-style: none; }
  details summary::-webkit-details-marker { display: none; }
  .hidden { display: none; }
  .block { display: block; }
  .inline-block { display: inline-block; }
  .inline-flex { display: inline-flex; }
  .flex { display: flex; }
  .grid { display: grid; }
  .flex-col { flex-direction: column; }
  .flex-wrap { flex-wrap: wrap; }
  .items-center { align-items: center; }
  .items-start { align-items: flex-start; }
  .justify-between { justify-content: space-between; }
  .justify-center { justify-content: center; }
  .text-center { text-align: center; }
  .opacity-40 { opacity: 0.4; }
  .opacity-90 { opacity: 0.9; }
  .opacity-0 { opacity: 0; }
  .opacity-100 { opacity: 1; }
  .translate-y-0 { transform: translateY(0); }
  .translate-y-8 { transform: translateY(32px); }
`

export function Home() {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeTab, setActiveTab] = useState<'python' | 'curl'>('python')
  const year = new Date().getFullYear()

  /* ─── WebGL Shader ─── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    let width: number, height: number
    let mouseX = 0.5, mouseY = 0.5

    const vertexShaderSource = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `
    const fragmentShaderSource = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 mouse;
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.15;
        float n = 0.0;
        for(float i = 1.0; i < 5.0; i++) {
          p += vec2(0.15 * sin(t + p.y * i), 0.15 * cos(t + p.x * i));
          n += noise(p * i + t) * (1.0 / i);
        }
        vec3 bgColor = vec3(0.988, 0.98, 0.972);
        vec3 flowColor = vec3(1.0, 0.42, 0.208);
        float intensity = smoothstep(0.35, 0.75, n);
        float dist = length(uv - mouse);
        intensity += smoothstep(0.25, 0.0, dist) * 0.15;
        vec3 color = mix(bgColor, flowColor, intensity * 0.12);
        float grid = (step(0.996, fract(uv.x * 25.0)) + step(0.996, fract(uv.y * 25.0))) * 0.015;
        color += grid;
        gl_FragColor = vec4(color, 1.0);
      }
    `
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)!)
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)!)
    gl.linkProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'position')
    const timeLocation = gl.getUniformLocation(program, 'time')
    const resLocation = gl.getUniformLocation(program, 'resolution')
    const mouseLocation = gl.getUniformLocation(program, 'mouse')

    function resize() {
      const parent = canvas!.parentElement!
      width = parent.clientWidth
      height = parent.clientHeight
      canvas!.width = width
      canvas!.height = height
      gl.viewport(0, 0, width, height)
    }

    window.addEventListener('resize', resize)

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / width
      mouseY = 1.0 - ((e.clientY - rect.top) / height)
    }
    window.addEventListener('mousemove', onMouseMove)

    let animId: number
    function render(time: number) {
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.enableVertexAttribArray(positionLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      gl.uniform1f(timeLocation, time * 0.001)
      gl.uniform2f(resLocation, width, height)
      gl.uniform2f(mouseLocation, mouseX, mouseY)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animId = requestAnimationFrame(render)
    }

    resize()
    animId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  /* ─── IntersectionObserver for card-lift animations ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.card-lift').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <PublicLayout showMainContainer={false}>
      {/* Preload fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <style>{designSystemStyle}</style>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}

      <main className="relative">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative overflow-hidden pb-32 pt-48">
          <canvas
            ref={canvasRef}
            className="pointer-events-none"
            id="hero-shader-canvas"
          />
          <div className="glow-radial absolute -top-48 -left-48 w-[600px] h-[600px] pointer-events-none" />
          <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-xl items-center px-xl relative z-10">
            <div className="lg:col-span-7 space-y-lg">
              <div className="inline-flex items-center gap-sm bg-primary-fixed text-on-primary-fixed px-sm py-1 rounded-full">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                <span className="font-label-md text-[12px] tracking-wider uppercase">
                  {t('New Models Added')}
                </span>
              </div>
              <h1 className="font-display text-display text-on-surface">
                {t('One line to access top AI models —')}
                <br />
                <span className="text-primary">
                  {t('DeepSeek · GLM · Qwen')}</span>, {t('one key for all.')}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                {t('Seamlessly integrate cutting-edge LLMs with a single API. Professional-grade infrastructure for high-precision engineering and data science workloads.')}
              </p>

              {/* Model Badges */}
              <div className="pt-sm space-y-md">
                <div className="flex flex-wrap gap-sm items-center">
                  <span className="font-label-md text-label-md text-on-surface-variant min-w-[80px]">DeepSeek:</span>
                  <span className="px-sm py-xs bg-white border border-surface-variant rounded text-on-surface font-label-md text-xs">V4 Flash</span>
                  <span className="px-sm py-xs bg-white border border-surface-variant rounded text-on-surface font-label-md text-xs">V4 Pro</span>
                  <span className="px-sm py-xs bg-white border border-surface-variant rounded text-on-surface font-label-md text-xs">Chat</span>
                  <span className="px-sm py-xs bg-white border border-surface-variant rounded text-on-surface font-label-md text-xs">Reasoner</span>
                </div>
                <div className="flex flex-wrap gap-sm items-center">
                  <span className="font-label-md text-label-md text-on-surface-variant min-w-[80px]">GLM:</span>
                  <span className="px-sm py-xs bg-white border border-surface-variant rounded text-on-surface font-label-md text-xs">4.7-Flash</span>
                  <span className="px-sm py-xs bg-white border border-surface-variant rounded text-on-surface font-label-md text-xs">4.5-Air</span>
                </div>
                <div className="flex flex-wrap gap-sm items-center">
                  <span className="font-label-md text-label-md text-on-surface-variant min-w-[80px]">Qwen:</span>
                  <span className="px-sm py-xs bg-white border border-surface-variant rounded text-on-surface font-label-md text-xs">3.7-Max</span>
                  <span className="px-sm py-xs bg-white border border-surface-variant rounded text-on-surface font-label-md text-xs">3.7-Plus</span>
                  <span className="px-sm py-xs bg-white border border-surface-variant rounded text-on-surface font-label-md text-xs">{t('3.5 Series')}</span>
                </div>
              </div>

              <div className="flex gap-md pt-md">
                <Link to="/register">
                  <button className="bg-primary text-on-primary px-xl py-md rounded-lg font-label-md text-label-md flex items-center gap-sm hover:opacity-95 transition-all shadow-lg">
                    {t('Get API Key')} <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </Link>
                <button className="bg-white border border-outline-variant text-primary px-xl py-md rounded-lg font-label-md text-label-md hover:bg-surface-container transition-all">
                  {t('Documentation')}
                </button>
              </div>
            </div>

            {/* 3D illustration */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all" />
              <div className="relative z-10 bg-white p-4 rounded-xl border border-surface-variant shadow-2xl">
                <img
                  alt={t('High-fidelity 3D tech illustration for an AI API gateway platform. A central glowing orange sphere representing a master key or core engine, surrounded by floating translucent data nodes and intricate white circuit lines.')}
                  className="w-full h-auto rounded-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5e2fy42apB-xHkBvo0N_cc03O0tfDPsjLs48csNcWSWVaPxbfDrRw2yAbi8WJOgNRs_Trj3W4MX2q7e5f-T-ciALW3lC9d3888TXUo95banA_UdAxhCAX57D6huuSJLp4ohdMg75v5Kng7KGqeADu9n35T7q7U7--3ZKYS1Dk89KNz4-lLriAlsBxhAHABYGJG3jd4XwUAFsBHZo_fvdUXV6PHUVFnZSsOih5nUVxATNkEChn0i7FH8SwoGHHK4kvpAneoYaQDEI"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ BENTO GRID FEATURES ═══════════════ */}
        <section className="py-xl bg-surface-container-lowest relative">
          <div className="max-w-container-max mx-auto px-gutter px-xl">
            <div className="mb-xl text-center">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {t('Engineered for Performance')}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
                {t('Built for massive scale and millisecond latency.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-lg">
              {/* Large Card: API Gateway */}
              <div className="md:col-span-2 lg:col-span-2 bg-white p-lg border border-surface-variant rounded-xl card-lift flex flex-col justify-between transition-all duration-500 opacity-100 translate-y-0">
                <div>
                  <div className="flex items-center gap-sm text-primary mb-md">
                    <span className="material-symbols-outlined">hub</span>
                    <span className="font-label-md text-label-md uppercase tracking-widest">{t('Unified API Gateway')}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-sm">{t('Standardize your AI pipeline')}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                    {t('Access every top-tier model through a single OpenAI-compatible endpoint. Switch models in production without changing a line of your infrastructure code.')}
                  </p>
                </div>
                <div className="bg-inverse-surface rounded-lg p-md font-mono-code text-white overflow-x-auto border border-outline-variant/30">
                  <div className="flex gap-sm mb-sm border-b border-white/10 pb-sm">
                    <div className="w-3 h-3 rounded-full bg-error" />
                    <div className="w-3 h-3 rounded-full bg-secondary-container" />
                    <div className="w-3 h-3 rounded-full bg-on-tertiary-fixed-variant" />
                  </div>
                  <pre className="text-[13px] leading-relaxed opacity-90">
                    <code>
                      <span className="text-secondary-container">POST</span> /v1/chat/completions{'\n'}
                      {'{'}{'\n'}
                      {'  '}"<span className="text-primary-fixed-dim">model</span>": "<span className="text-on-primary-fixed-variant">deepseek-v4-pro</span>",{'\n'}
                      {'  '}"<span className="text-primary-fixed-dim">messages</span>": [{'\n'}
                      {'    '}{"{"}"<span className="text-primary-fixed-dim">role</span>": "<span className="text-on-primary-fixed-variant">user</span>", "<span className="text-primary-fixed-dim">content</span>": "<span className="text-on-primary-fixed-variant">{t('Optimize this SQL...')}</span>"{'}'}{'\n'}
                      {'  '}]{'\n'}
                      {'}'}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Feature 2: Enterprise Security */}
              <div className="bg-white p-lg border border-surface-variant rounded-xl card-lift flex flex-col items-start transition-all duration-500 opacity-100 translate-y-0">
                <div className="bg-primary/10 p-md rounded-full mb-md">
                  <span className="material-symbols-outlined text-primary">security</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-sm">{t('Enterprise Security')}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {t('SOC2 compliant infrastructure with end-to-end encryption for all token transmissions and prompts.')}
                </p>
              </div>

              {/* Feature 3: Low Latency */}
              <div className="bg-white p-lg border border-surface-variant rounded-xl card-lift flex flex-col items-start transition-all duration-500 opacity-100 translate-y-0">
                <div className="bg-secondary-container/20 p-md rounded-full mb-md">
                  <span className="material-symbols-outlined text-secondary">speed</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-sm">{t('Low Latency')}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {t('Global edge nodes ensure your API calls reach the nearest model server in under 50ms.')}
                </p>
              </div>

              {/* Feature 4: Analytics */}
              <div className="lg:col-span-2 bg-white p-lg border border-surface-variant rounded-xl card-lift flex items-center gap-lg transition-all duration-500 opacity-100 translate-y-0">
                <div className="flex-1">
                  <div className="flex items-center gap-sm text-primary mb-md">
                    <span className="material-symbols-outlined">analytics</span>
                    <span className="font-label-md text-label-md uppercase tracking-widest">{t('Real-time Insights')}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-sm">{t('Granular Usage Analytics')}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {t('Monitor token consumption, costs, and response times across all models in a unified dashboard.')}
                  </p>
                </div>
                <div className="hidden sm:block w-32 h-32 relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-full flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-t-primary border-r-primary border-b-primary/20 border-l-primary/20 rounded-full animate-spin" />
                  </div>
                </div>
              </div>

              {/* Feature 5: Smart Key Management */}
              <div className="bg-white p-lg border border-surface-variant rounded-xl card-lift flex flex-col items-start transition-all duration-500 opacity-100 translate-y-0">
                <div className="bg-tertiary-container/20 p-md rounded-full mb-md">
                  <span className="material-symbols-outlined text-tertiary">key</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-sm">{t('Smart Key Management')}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {t('Set per-key budgets, expiration dates, and model restrictions with ease.')}
                </p>
              </div>

              {/* Feature 6: Log everything */}
              <div className="bg-white p-lg border border-surface-variant rounded-xl card-lift flex flex-col items-start transition-all duration-500 opacity-100 translate-y-0">
                <div className="bg-error-container/20 p-md rounded-full mb-md">
                  <span className="material-symbols-outlined text-error">monitoring</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-sm">{t('Log everything')}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {t('Complete audit trails for every request, making debugging and compliance a breeze.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ QUICK START ═══════════════ */}
        <section className="py-32 relative overflow-hidden">
          <div className="glow-radial absolute bottom-0 right-0 w-[800px] h-[800px] opacity-40" />
          <div className="max-w-container-max mx-auto px-gutter px-xl">
            <div className="flex flex-col lg:flex-row gap-xl items-center">
              <div className="lg:w-1/2 space-y-md">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  {t('Get started in seconds')}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  {t('Stop juggling multiple API documentation sites. Use our SDK or generic REST calls to tap into the world most powerful models.')}
                </p>
                <ul className="space-y-sm">
                  <li className="flex items-center gap-sm font-body-md text-body-md text-on-surface">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {t('Fully OpenAI-Compatible')}
                  </li>
                  <li className="flex items-center gap-sm font-body-md text-body-md text-on-surface">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {t('Python & Node.js Native SDKs')}
                  </li>
                  <li className="flex items-center gap-sm font-body-md text-body-md text-on-surface">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {t('Global Rate-Limit Handling')}
                  </li>
                </ul>
              </div>

              {/* Dual Pane Code Block */}
              <div className="lg:w-1/2 w-full">
                <div className="bg-white rounded-xl shadow-xl border border-surface-variant overflow-hidden">
                  <div className="flex border-b border-surface-variant bg-surface-container-low">
                    <button
                      className={`px-lg py-md font-label-md text-label-md border-b-2 transition-all ${activeTab === 'python' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:bg-surface-container'}`}
                      onClick={() => setActiveTab('python')}
                    >
                      Python
                    </button>
                    <button
                      className={`px-lg py-md font-label-md text-label-md border-b-2 transition-all ${activeTab === 'curl' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:bg-surface-container'}`}
                      onClick={() => setActiveTab('curl')}
                    >
                      cURL
                    </button>
                  </div>
                  <div className="p-lg bg-white min-h-[300px] font-mono-code">
                    {activeTab === 'python' && (
                      <pre className="text-body-md">
                        <code className="text-on-surface-variant">
                          <span className="text-primary">import</span> tokenmaster{'\n\n'}
                          client = tokenmaster.Client(api_key=<span className="text-on-tertiary-fixed-variant">"tm_..."</span>){'\n\n'}
                          response = client.chat.completions.create({'\n'}
                          {'    '}model=<span className="text-on-tertiary-fixed-variant">"deepseek-reasoner"</span>,{'\n'}
                          {'    '}messages=[{'{"role":'}<span className="text-on-tertiary-fixed-variant">"user"</span>, {'"content":'}<span className="text-on-tertiary-fixed-variant">"Hi!"</span>{'}'}]{'\n'}
                          ){'\n\n'}
                          print(response.choices[<span className="text-secondary">0</span>].message.content)
                        </code>
                      </pre>
                    )}
                    {activeTab === 'curl' && (
                      <pre className="text-body-md">
                        <code className="text-on-surface-variant">{[
                          'curl https://api.tokenmaster.ai/v1/chat/completions \\',
                          '  -H "Content-Type: application/json" \\',
                          '  -H "Authorization: Bearer $TM_API_KEY" \\',
                          "  -d '{",
                          '    "model": "glm-4-flash",',
                          '    "messages": [{"role": "user", "content": "Hello!"}]',
                          "  }'",
                        ].join(String.fromCharCode(10))}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ PRICING CTA ═══════════════ */}
        <section className="py-xl bg-surface-container-lowest relative">
          <div className="max-w-container-max mx-auto px-gutter px-xl">
            <div className="mb-xl text-center">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {t('Ready to ship?')}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
                {t('USD prepaid, pay-per-use. Top up your balance and start building.')}
              </p>
            </div>

            {/* Package Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
              <div className="bg-white border border-surface-variant rounded-xl p-lg card-lift text-center flex flex-col items-center transition-all duration-500 opacity-100 translate-y-0">
                <div className="bg-primary/10 p-md rounded-full mb-md">
                  <span className="material-symbols-outlined text-primary text-[28px]">bolt</span>
                </div>
                <span className="font-headline-md text-headline-md text-on-surface">$10</span>
                <span className="inline-block px-sm py-xs bg-primary/10 text-primary font-label-md text-label-md rounded-full mt-sm">+$1</span>
                <p className="font-body-md text-body-md text-on-surface-variant mt-sm">{t('Get $11.00 balance')}</p>
              </div>
              <div className="bg-white border border-surface-variant rounded-xl p-lg card-lift text-center flex flex-col items-center transition-all duration-500 opacity-100 translate-y-0">
                <div className="bg-secondary-container/20 p-md rounded-full mb-md">
                  <span className="material-symbols-outlined text-secondary text-[28px]">rocket_launch</span>
                </div>
                <span className="font-headline-md text-headline-md text-on-surface">$50</span>
                <span className="inline-block px-sm py-xs bg-secondary-container/20 text-secondary font-label-md text-label-md rounded-full mt-sm">+$8</span>
                <p className="font-body-md text-body-md text-on-surface-variant mt-sm">{t('Get $58.00 balance')}</p>
              </div>
              <div className="bg-white border border-surface-variant rounded-xl p-lg card-lift text-center flex flex-col items-center transition-all duration-500 opacity-100 translate-y-0">
                <div className="bg-tertiary-container/20 p-md rounded-full mb-md">
                  <span className="material-symbols-outlined text-tertiary text-[28px]">diamond</span>
                </div>
                <span className="font-headline-md text-headline-md text-on-surface">$100</span>
                <span className="inline-block px-sm py-xs bg-tertiary-container/20 text-tertiary font-label-md text-label-md rounded-full mt-sm">+$20</span>
                <p className="font-body-md text-body-md text-on-surface-variant mt-sm">{t('Get $120.00 balance')}</p>
              </div>
              <div className="bg-white border border-surface-variant rounded-xl p-lg card-lift text-center flex flex-col items-center transition-all duration-500 opacity-100 translate-y-0">
                <div className="bg-surface-container p-md rounded-full mb-md">
                  <span className="material-symbols-outlined text-on-surface-variant text-[28px]">tune</span>
                </div>
                <span className="font-headline-md text-headline-md text-on-surface">{t('Custom')}</span>
                <span className="inline-block px-sm py-xs bg-surface-container text-on-surface-variant font-label-md text-label-md rounded-full mt-sm">{t('Any amount')}</span>
                <p className="font-body-md text-body-md text-on-surface-variant mt-sm">{t('Enter any amount in USD')}</p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/plans">
                <button className="bg-primary text-on-primary px-xl py-md rounded-lg font-label-md text-label-md inline-flex items-center gap-sm hover:opacity-95 transition-all shadow-lg">
                  {t('Top Up Now')} <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
                {t('No monthly fees, no subscriptions. Only pay for what you use.')}
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════ FAQ ═══════════════ */}
        <section className="py-xl bg-white">
          <div className="max-w-4xl mx-auto px-gutter px-xl">
            <h2 className="font-headline-lg text-headline-lg text-center mb-xl">
              {t('Common Questions')}
            </h2>
            <div className="space-y-md">
              <details className="group bg-surface-container-low rounded-xl border border-surface-variant p-md cursor-pointer hover:bg-surface-container-high transition-colors" open>
                <summary className="flex items-center justify-between font-headline-md text-headline-md list-none">
                  {t('How does the billing work?')}
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <p className="mt-md font-body-md text-body-md text-on-surface-variant">
                  {t('We use a unified credit system. You purchase TM-Tokens, and we handle the translation to provider-specific costs. You only pay for what you use across all models.')}
                </p>
              </details>
              <details className="group bg-surface-container-low rounded-xl border border-surface-variant p-md cursor-pointer hover:bg-surface-container-high transition-colors">
                <summary className="flex items-center justify-between font-headline-md text-headline-md list-none">
                  {t('Is there a limit on API keys?')}
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <p className="mt-md font-body-md text-body-md text-on-surface-variant">
                  {t('On our Starter plan, you can create up to 10 keys. Pro and Enterprise plans offer unlimited keys with granular permission sets.')}
                </p>
              </details>
              <details className="group bg-surface-container-low rounded-xl border border-surface-variant p-md cursor-pointer hover:bg-surface-container-high transition-colors">
                <summary className="flex items-center justify-between font-headline-md text-headline-md list-none">
                  {t('Which models are supported?')}
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <p className="mt-md font-body-md text-body-md text-on-surface-variant">
                  {t('Currently we support the full suites of DeepSeek, GLM, and Qwen. We add new state-of-the-art models within 24 hours of their public release.')}
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-surface-container-low border-t border-surface-variant">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg px-gutter py-xl max-w-container-max mx-auto px-xl">
          <div className="col-span-1 space-y-md">
            <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">TokenMaster</span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t('The industrial-grade bridge to the world most advanced artificial intelligence models.')}
            </p>
          </div>
          <div className="col-span-1">
            <h4 className="font-label-md text-label-md text-on-surface-variant uppercase mb-md">{t('Product')}</h4>
            <ul className="space-y-sm">
              <li><Link to="/pricing" className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-opacity">{t('Models')}</Link></li>
              <li><Link to="/plans" className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-opacity">{t('Pricing')}</Link></li>
              <li><a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-opacity">{t('API Reference')}</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-label-md text-label-md text-on-surface-variant uppercase mb-md">{t('Resources')}</h4>
            <ul className="space-y-sm">
              <li><a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-opacity">{t('Documentation')}</a></li>
              <li><a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-opacity">{t('Changelog')}</a></li>
              <li><a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-opacity">{t('System Status')}</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-label-md text-label-md text-on-surface-variant uppercase mb-md">{t('Legal')}</h4>
            <ul className="space-y-sm">
              <li><Link to="/user-agreement" className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-opacity">{t('Terms')}</Link></li>
              <li><Link to="/privacy-policy" className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-opacity">{t('Privacy')}</Link></li>
              <li><a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-opacity">{t('Security')}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-gutter py-md border-t border-surface-variant flex flex-col md:flex-row justify-between items-center gap-sm px-xl">
          <p className="font-label-md text-label-md text-on-surface-variant">{t('© 2024 TokenMaster AI. All systems operational.')}</p>
          <div className="flex gap-md">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">public</span></a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">chat</span></a>
          </div>
        </div>
      </footer>
    </PublicLayout>
  )
}
