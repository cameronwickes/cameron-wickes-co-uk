/**
 * HeroParticles — canvas-based particle system for the homepage hero.
 * Renders floating symbols, dots, and crosses that
 * respond to mouse movement with a repel effect.
 */
import { useMemo, useEffect, useRef } from 'react'
import { useTheme } from '../theme/ThemeProvider'
import { hexToRgb, bgLuminance, isLightBg } from '../../utils/colour'

/** Symbols rendered as text particles, weighted equally. */
const SYMBOLS = ['$', '0', '1', '>_', '#', '>', '~', '{}', '</>', 'λ', '&&', '*', '@', '%']
const REPEL_RADIUS = 150
const REPEL_STRENGTH = 2.5
const FRICTION = 0.995
const WANDER = 0.12
const COUNTS = { symbol: 45, dot: 8, cross: 8 } as const
const INITIAL_VELOCITY = 0.6
const EXCLUSION_RADIUS = 0.2
const OPACITY_BOOST_FACTOR = 8
const MAX_OPACITY = 0.9

type ParticleType = keyof typeof COUNTS

interface Particle {
  type: ParticleType
  char: string | null
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  maxSpeed: number
  rotation: number
  rotSpeed: number
}

function distributePositions(count: number) {
  const cols = Math.ceil(Math.sqrt(count * 1.5))
  const rows = Math.ceil(count / cols)
  const positions: { x: number; y: number }[] = []

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      positions.push({
        x: (c + 0.15 + Math.random() * 0.7) / cols,
        y: (r + 0.15 + Math.random() * 0.7) / rows,
      })

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j], positions[i]]
  }
  return positions
}

function createParticle(
  type: ParticleType,
  char: string | null,
  size: number,
  opacity: number,
  x: number,
  y: number,
): Particle {
  return {
    type,
    char,
    x,
    y,
    vx: (Math.random() - 0.5) * INITIAL_VELOCITY,
    vy: (Math.random() - 0.5) * INITIAL_VELOCITY,
    size,
    opacity,
    maxSpeed: (0.15 + Math.random() * 0.15) * 3,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03,
  }
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  x: number,
  y: number,
  primary: string,
  secondary: string,
  opacityBoost: number,
) {
  const op = Math.min(p.opacity * opacityBoost, MAX_OPACITY)
  const pColor = `rgba(${primary},${op})`
  const sColor = `rgba(${secondary},${op})`

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(p.rotation)

  switch (p.type) {
    case 'symbol':
      ctx.font = `${p.size}px 'Noto Sans Mono',monospace`
      ctx.fillStyle = pColor
      ctx.fillText(p.char!, -p.size * 0.3, p.size * 0.35)
      break
    case 'dot':
      ctx.beginPath()
      ctx.arc(0, 0, p.size, 0, Math.PI * 2)
      ctx.fillStyle = pColor
      ctx.fill()
      break
    case 'cross':
      ctx.strokeStyle = pColor
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(-p.size, 0)
      ctx.lineTo(p.size, 0)
      ctx.moveTo(0, -p.size)
      ctx.lineTo(0, p.size)
      ctx.stroke()
      break
  }

  ctx.restore()
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const { theme } = useTheme()
  const initParticles = useMemo(() => {
    const total = Object.values(COUNTS).reduce((a, b) => a + b, 0)
    const positions = distributePositions(total)
    let idx = 0
    const pos = () => positions[idx++] ?? { x: Math.random(), y: Math.random() }

    const specs: {
      type: ParticleType
      char: (i: number) => string | null
      size: () => number
      opacity: () => number
    }[] = [
      {
        type: 'symbol',
        char: (i) => SYMBOLS[i % SYMBOLS.length],
        size: () => 6 + Math.random() * 18,
        opacity: () => 0.2 + Math.random() * 0.25,
      },
      {
        type: 'dot',
        char: () => null,
        size: () => 0.5 + Math.random() * 1.5,
        opacity: () => 0.4 + Math.random() * 0.4,
      },
      {
        type: 'cross',
        char: () => null,
        size: () => 3 + Math.random() * 5,
        opacity: () => 0.25 + Math.random() * 0.15,
      },
    ]

    return specs.flatMap(({ type, char, size, opacity }) =>
      Array.from({ length: COUNTS[type] }, (_, i) => {
        const p = pos()
        return createParticle(type, char(i), size(), opacity(), p.x, p.y)
      }),
    )
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    particlesRef.current = initParticles

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let running = true
    const loop = () => {
      if (!running) return
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      const { x: mx, y: my } = mouseRef.current

      for (const p of particlesRef.current) {
        const px = p.x * w,
          py = p.y * h
        const dx = px - mx,
          dy = py - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        p.vx = p.vx * FRICTION + (Math.random() - 0.5) * WANDER
        p.vy = p.vy * FRICTION + (Math.random() - 0.5) * WANDER

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > p.maxSpeed) {
          p.vx = (p.vx / speed) * p.maxSpeed
          p.vy = (p.vy / speed) * p.maxSpeed
        }

        p.x += p.vx / w
        p.y += p.vy / h
        p.rotation += p.rotSpeed

        // Bounce off centre exclusion zone
        const cx = 0.5,
          cy = 0.5,
          exclusionR = EXCLUSION_RADIUS
        const dxc = p.x - cx,
          dyc = p.y - cy
        const distC = Math.sqrt(dxc * dxc + dyc * dyc)
        if (distC < exclusionR && distC > 0) {
          const nx = dxc / distC,
            ny = dyc / distC
          p.x = cx + nx * exclusionR
          p.y = cy + ny * exclusionR
          // Reflect velocity outward
          const dot = p.vx * nx + p.vy * ny
          if (dot < 0) {
            p.vx -= 2 * dot * nx
            p.vy -= 2 * dot * ny
          }
        }

        if (p.x < -0.05) p.x = 1.05
        if (p.x > 1.05) p.x = -0.05
        if (p.y < -0.05) p.y = 1.05
        if (p.y > 1.05) p.y = -0.05

        const light = isLightBg(theme.bg)
        const lum = bgLuminance(theme.bg)
        const opacityBoost = 1 + lum * OPACITY_BOOST_FACTOR
        const pRgb = light ? '0,0,0' : hexToRgb(theme.primary)
        const sRgb = light ? '0,0,0' : hexToRgb(theme.secondary)
        drawParticle(ctx, p, p.x * w, p.y * h, pRgb, sRgb, opacityBoost)
      }

      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    return () => {
      running = false
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [initParticles, theme])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
}
