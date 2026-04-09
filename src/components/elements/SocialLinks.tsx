/**
 * SocialLinks — row of external link buttons with icons.
 *
 * Each link renders as a glassmorphism-styled button with an icon,
 * label, and external arrow. Used in the Contact section.
 */
import ScrollReveal from '../effects/ScrollReveal'
import type { ReactNode } from 'react'

interface SocialLink {
  /** Display label (e.g. "LinkedIn"). */
  label: string
  /** External URL. */
  href: string
  /** Icon component rendered before the label. */
  icon: ReactNode
}

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <ScrollReveal delay={200}>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-terminal-border rounded-lg text-sm text-terminal-dim backdrop-blur-md bg-terminal-surface/30 hover:border-terminal-green/50 hover:text-terminal-green hover:bg-terminal-surface/50 hover:shadow-[0_0_20px_rgba(0,255,159,0.06)] transition-all duration-300"
          >
            {link.icon}
            {link.label} ↗
          </a>
        ))}
      </div>
    </ScrollReveal>
  )
}
