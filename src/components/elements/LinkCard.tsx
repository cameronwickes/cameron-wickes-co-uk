/**
 * LinkCard — clickable card linking to an external resource.
 *
 * Displays an optional subtitle (e.g. year), title, description,
 * and an arrow indicator. Used for whitepapers and similar content.
 */
import ScrollReveal from '../effects/ScrollReveal'

interface LinkCardProps {
  /** External URL to link to. */
  href: string
  /** Card heading. */
  title: string
  /** Optional small text above the title (e.g. date or category). */
  subtitle?: string
  /** Card body text. */
  description: string
  /** Animation stagger delay in ms. */
  delay?: number
}

export default function LinkCard({ href, title, subtitle, description, delay = 0 }: LinkCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-terminal-surface border border-terminal-border rounded-xl p-6 transition-all duration-500 hover:border-terminal-cyan/30 group"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {subtitle && <div className="text-xs text-terminal-green mb-2">{subtitle}</div>}
            <h3 className="text-base font-semibold text-terminal-text group-hover:text-terminal-green transition-colors mb-2">
              {title}
            </h3>
            <p className="text-xs text-terminal-dim">{description}</p>
          </div>
          <span className="text-terminal-dim group-hover:text-terminal-green transition-colors shrink-0 mt-1">↗</span>
        </div>
      </a>
    </ScrollReveal>
  )
}
