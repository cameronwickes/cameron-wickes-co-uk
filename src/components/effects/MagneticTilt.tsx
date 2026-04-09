/**
 * MagneticTilt — 3D perspective tilt effect that follows the cursor.
 *
 * On hover, the element tilts toward the cursor position with a slight
 * scale-up. On mouse leave, it smoothly resets to neutral. Used on
 * certification badges and other interactive cards.
 */
import { useRef, useState, type ReactNode, type MouseEvent } from 'react'

/** Perspective distance for the 3D transform (px). */
const PERSPECTIVE = 600
/** Maximum tilt angle in degrees. */
const TILT_DEGREES = 12
/** Scale factor applied on hover. */
const HOVER_SCALE = 1.02
/** Transition speed while the cursor is moving. */
const MOVE_TRANSITION = 'transform 0.15s ease-out'
/** Transition speed when the cursor leaves (slower for smooth reset). */
const LEAVE_TRANSITION = 'transform 0.4s ease-out'

const RESET_TRANSFORM = `perspective(${PERSPECTIVE}px) rotateY(0deg) rotateX(0deg) scale(1)`

export function MagneticTilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  /** Calculate tilt based on cursor position relative to element centre. */
  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(${PERSPECTIVE}px) rotateY(${x * TILT_DEGREES}deg) rotateX(${-y * TILT_DEGREES}deg) scale(${HOVER_SCALE})`,
      transition: MOVE_TRANSITION,
    })
  }

  /** Reset to neutral position on mouse leave. */
  const handleLeave = () => {
    setStyle({ transform: RESET_TRANSFORM, transition: LEAVE_TRANSITION })
  }

  return (
    <div ref={ref} className={className} style={style} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}
