/** Timeline — alternating left/right timeline with role progression dots. */
import ScrollReveal from '../effects/ScrollReveal'
import type { Role } from '../../static/data/career'

/** Visual style per role tag type. */
const TAG_STYLES: Record<Role['tag'], string> = {
  promotion: 'bg-terminal-amber shadow-terminal-amber/50',
  'role-change': 'bg-terminal-cyan shadow-terminal-cyan/50',
  start: 'bg-terminal-green shadow-terminal-green/50',
}

/** Stagger delay between timeline entries (ms). */
const ENTRY_STAGGER = 80

export interface TimelineEntry {
  heading: string
  roles: Role[]
}

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-terminal-border" />

      {entries.map((entry, i) => {
        const isLeft = i % 2 === 0
        return (
          <ScrollReveal key={i} delay={i * ENTRY_STAGGER}>
            <div className={`relative flex items-start mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-terminal-green rounded-full -translate-x-1/2 mt-2 z-10 shadow-[0_0_10px_rgba(0,255,159,0.5)]" />

              <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="bg-terminal-surface border border-terminal-border rounded-xl p-5 transition-all duration-300 hover:border-terminal-green/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,255,159,0.07)]">
                  <h3 className="text-base font-semibold text-terminal-cyan mb-4">{entry.heading}</h3>

                  <div
                    className={`relative mb-4 border-l border-terminal-border pl-5 space-y-3 ${
                      isLeft ? 'md:border-l-0 md:border-r md:pl-0 md:pr-5 md:text-right' : ''
                    }`}
                  >
                    {entry.roles.map((role, j) => (
                      <div key={j} className="relative">
                        <div
                          className={`absolute top-1.5 w-2 h-2 rounded-full shadow-[0_0_6px] ${TAG_STYLES[role.tag]} ${
                            isLeft ? '-left-[23px] md:left-auto md:-right-[23px]' : '-left-[23px]'
                          }`}
                        />
                        <div className={`flex items-center gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                          <span className="text-sm text-terminal-text font-medium">{role.title}</span>
                        </div>
                        <span className="text-xs text-terminal-dim">
                          {role.from} — {role.to}
                        </span>
                        <p className="text-xs text-terminal-dim mt-1 whitespace-pre-line">{role.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
