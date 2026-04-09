/** Certifications — Credly badge grid driven by static data. */
import Section from '../elements/Section'
import BadgeGrid from '../elements/BadgeGrid'
import { CERTIFICATIONS } from '../../static/data/certifications'

export default function Certifications() {
  return (
    <Section title="Certifications" alt>
      <BadgeGrid badges={CERTIFICATIONS} />
    </Section>
  )
}
