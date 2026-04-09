/** About — bio card with terminal chrome and headshot. */
import ScrollReveal from '../effects/ScrollReveal'
import Section from '../elements/Section'
import TerminalCard from '../elements/TerminalCard'
import { ABOUT } from '../../static/data/profile'

export default function About() {
  return (
    <Section id="about" title="About Me" headingGap="mb-12">
      <div className="grid md:grid-cols-[5fr_2fr] gap-12">
        <ScrollReveal delay={200} className="h-full">
          <TerminalCard filename={ABOUT.filename} className="h-full">
            <div className="text-sm leading-relaxed space-y-3">
              {ABOUT.paragraphs.map((segments, i) => (
                <p key={i}>
                  {segments.map((seg, j) =>
                    seg.color ? (
                      <span key={j} className={seg.color}>
                        {seg.text}
                      </span>
                    ) : (
                      <span key={j}>{seg.text}</span>
                    ),
                  )}
                </p>
              ))}
            </div>
          </TerminalCard>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <img src={ABOUT.headshot} alt="Cameron Wickes" className="w-full max-w-[300px] mx-auto" />
        </ScrollReveal>
      </div>
    </Section>
  )
}
