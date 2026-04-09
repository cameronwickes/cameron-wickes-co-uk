/** ScrollReveal — fade-in-up animation triggered by intersection observer. */
import { useEffect, useRef, useState, type ReactNode } from 'react'

/** How much of the element must be visible before triggering (0–1). */
const OBSERVER_THRESHOLD = 0.1

/** Inset from viewport bottom before element is considered visible. */
const OBSERVER_MARGIN = '0px 0px -30px 0px'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Delay in ms before the animation starts after entering the viewport. */
  delay?: number
}

export default function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: OBSERVER_THRESHOLD, rootMargin: OBSERVER_MARGIN },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      {children}
    </div>
  )
}
