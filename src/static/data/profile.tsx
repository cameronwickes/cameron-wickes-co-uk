/** Static profile data — hero content, about metadata, contact info, and social links. */
import LinkedInIcon from '../../components/icons/LinkedIn'
import GitHubIcon from '../../components/icons/GitHub'
import type { ReactNode } from 'react'

export const HERO = {
  badge: 'Software Engineer // London',
  firstName: 'Cameron',
  lastName: 'Wickes',
  tagline: 'cloud · software · automation · security',
}

export const ABOUT = {
  filename: 'about.md',
  headshot: '/images/profile/headshot.png',
  paragraphs: [
    [
      { text: 'Software Development Engineer at ' },
      { text: 'Amazon Web Services', color: 'text-terminal-cyan' },
      { text: ' with a background in Cyber Security from the ' },
      { text: 'University of Warwick', color: 'text-terminal-cyan' },
      { text: '.' },
    ],
    [
      { text: "I care about building software that's " },
      { text: 'reliable', color: 'text-terminal-amber' },
      { text: ', ' },
      { text: 'secure', color: 'text-terminal-amber' },
      { text: ', and ' },
      { text: 'easy to maintain', color: 'text-terminal-amber' },
      {
        text: ". I believe in owning what you ship and knowing why you're doing it.",
      },
    ],
    [
      {
        text: "At AWS, I'm focused on launching software in new regions, engineering",
      },
      { text: ' CI/CD pipelines', color: 'text-terminal-green' },
      { text: ', modelling' },
      { text: ' infrastructure-as-code', color: 'text-terminal-green' },
      { text: ', and building' },
      { text: ' full-stack applications', color: 'text-terminal-green' },
      { text: ' on cloud-native infrastructure.' },
    ],
  ],
}

export interface SocialLink {
  label: string
  href: string
  icon: ReactNode
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/cameronwickes',
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/cameronwickes',
    icon: <GitHubIcon />,
  },
]

export const CONTACT = {
  title: 'Get in Touch',
  summary: 'Open to opportunities, collaborations, or just a friendly hello!',
}
