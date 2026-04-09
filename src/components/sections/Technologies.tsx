/** Technologies — skill pills driven by static data. */
import Section from '../elements/Section'
import PillGrid from '../elements/PillGrid'
import { SKILLS } from '../../static/data/technologies'

export default function Technologies() {
  return (
    <Section title="Technologies">
      <PillGrid categories={SKILLS} />
    </Section>
  )
}
