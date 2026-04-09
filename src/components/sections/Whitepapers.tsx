/** Whitepapers — published research papers driven by static data. */
import Section from '../elements/Section'
import LinkCard from '../elements/LinkCard'
import { WHITEPAPERS } from '../../static/data/whitepapers'

export default function Whitepapers() {
  return (
    <Section title="Whitepapers">
      <div className="space-y-4">
        {WHITEPAPERS.map((paper, i) => (
          <LinkCard
            key={paper.title}
            href={paper.link}
            title={paper.title}
            subtitle={paper.year}
            description={paper.summary}
            delay={i * 150}
          />
        ))}
      </div>
    </Section>
  )
}
