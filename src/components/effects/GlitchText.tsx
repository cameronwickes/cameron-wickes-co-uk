/**
 * GlitchText — scrambles characters before revealing the real text.
 * Used for the hero name animation on the homepage.
 */
import { useState, useEffect, useRef } from 'react'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
const REVEAL_SPEED = 0.6
const TICK_INTERVAL = 25

export default function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const iterations = useRef(0)

  useEffect(() => {
    iterations.current = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iterations.current) return text[i]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join(''),
      )
      iterations.current += REVEAL_SPEED
      if (iterations.current >= text.length) clearInterval(interval)
    }, TICK_INTERVAL)
    return () => clearInterval(interval)
  }, [text])

  return <span className={className}>{display}</span>
}
