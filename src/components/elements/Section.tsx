/**
 * Section — reusable page section wrapper with heading and alternating background.
 *
 * Provides consistent padding, max-width, and a ScrollReveal-animated heading.
 * Use `alt` for the darker surface background on alternating sections.
 */
import ScrollReveal from '../effects/ScrollReveal'
import type { ReactNode } from 'react'

interface SectionProps {
  /** Optional HTML id for anchor linking (e.g. "about", "contact"). */
  id?: string
  /** Section heading text. */
  title: string
  /** Use the alternate (surface) background colour. */
  alt?: boolean
  /** Tailwind max-width class (default: max-w-6xl). */
  maxWidth?: string
  /** Centre-align all content. */
  centered?: boolean
  /** Tailwind margin-bottom class for the heading (default: mb-16). */
  headingGap?: string
  /** Section content. */
  children: ReactNode
}

export default function Section({
  id,
  title,
  alt,
  maxWidth = 'max-w-6xl',
  centered,
  headingGap = 'mb-16',
  children,
}: SectionProps) {
  return (
    <section id={id} className={`py-32 px-6 ${alt ? 'bg-terminal-surface/30' : 'bg-terminal-bg'}`}>
      <div className={`${maxWidth} mx-auto ${centered ? 'text-center' : ''}`}>
        <ScrollReveal>
          <h2 className={`text-3xl md:text-5xl font-bold text-terminal-text ${headingGap}`}>{title}</h2>
        </ScrollReveal>
        {children}
      </div>
    </section>
  )
}
