/**
 * PillGrid — categorised grid of pill-shaped tags with a shine hover effect.
 *
 * Each category gets a green heading with its items displayed as
 * bordered pills below. Used for the Technologies section.
 */
import ScrollReveal from '../effects/ScrollReveal'

/** Stagger delay between category groups (ms). */
const GROUP_STAGGER = 60

export default function PillGrid({ categories }: { categories: Record<string, string[]> }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Object.entries(categories).map(([category, items], i) => (
        <ScrollReveal key={category} delay={i * GROUP_STAGGER}>
          <div>
            <h3 className="text-sm font-semibold text-terminal-green mb-3">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="shine-card relative overflow-hidden select-none px-3.5 py-1.5 text-xs text-terminal-text bg-terminal-surface border border-terminal-border rounded-lg transition-colors duration-300 hover:border-terminal-green/40"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
