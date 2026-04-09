/** Experience — career timeline driven by static data. */
import Section from '../elements/Section'
import Timeline from '../elements/Timeline'
import { CAREER } from '../../static/data/career'

export default function Experience() {
  const entries = CAREER.map((org) => ({
    heading: org.company,
    roles: org.roles,
  }))

  return (
    <Section title="Experience" alt>
      <Timeline entries={entries} />
    </Section>
  )
}
