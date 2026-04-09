/** Contact — social links driven by static data. */
import Section from '../elements/Section'
import SocialLinks from '../elements/SocialLinks'
import ScrollReveal from '../effects/ScrollReveal'
import { CONTACT, SOCIAL_LINKS } from '../../static/data/profile'

export default function Contact() {
  return (
    <Section id="contact" title={CONTACT.title} alt maxWidth="max-w-3xl" centered>
      <ScrollReveal>
        <p className="text-terminal-dim mb-10 text-sm -mt-10">{CONTACT.summary}</p>
      </ScrollReveal>
      <SocialLinks links={SOCIAL_LINKS} />
    </Section>
  )
}
