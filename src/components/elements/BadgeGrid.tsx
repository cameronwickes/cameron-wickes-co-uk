/**
 * BadgeGrid — responsive grid of image badges with magnetic tilt effect.
 *
 * Each badge links to an external URL (e.g. Credly) and displays
 * an image, year, name, and issuer. Uses MagneticTilt for the
 * 3D hover interaction.
 */
import ScrollReveal from '../effects/ScrollReveal'
import { MagneticTilt } from '../effects/MagneticTilt'

/** Stagger delay between badge animations (ms). */
const BADGE_STAGGER = 50

interface Badge {
  name: string
  issuer: string
  year: string
  badge: string
  url: string
}

export default function BadgeGrid({ badges }: { badges: Badge[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {badges.map((item, i) => (
        <ScrollReveal key={item.name} delay={i * BADGE_STAGGER}>
          <MagneticTilt className="h-full">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-terminal-surface border border-terminal-border rounded-xl p-6 transition-all duration-300 hover:border-terminal-green/30 h-full flex flex-col items-center text-center block"
            >
              <img src={item.badge} alt={item.name} className="w-16 h-16 mb-4" />
              <div className="text-xs text-terminal-green mb-2">{item.year}</div>
              <h3 className="text-sm font-semibold text-terminal-text mb-2">{item.name}</h3>
              <div className="text-xs text-terminal-cyan">{item.issuer}</div>
            </a>
          </MagneticTilt>
        </ScrollReveal>
      ))}
    </div>
  )
}
