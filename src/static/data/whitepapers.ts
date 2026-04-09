/** Whitepapers data — published SANS research papers. */
export interface Whitepaper {
  title: string
  year: string
  description: string
  link: string
}

export const WHITEPAPERS: Whitepaper[] = [
  {
    title: 'Enter The Matrix: Automating Secure Communication Infrastructure at the Organizational Level',
    year: 'July 2022',
    description:
      'Explores how Matrix infrastructure can be remotely set up and automated in a containerized environment using Ansible and Podman, enabling security-first communication channels integrated into existing business environments.',
    link: 'https://www.sans.org/white-papers/enter-the-matrix-automating-secure-communication-infrastructure-at-the-organizational-level',
  },
  {
    title: 'In Data We Trust: Leveraging Large Scale Analytics for Intrusion Detection',
    year: 'November 2021',
    description:
      'Introduces and explores large-scale data analysis and machine learning tools within intrusion detection, addressing the limitations of traditional signature-based IDS and first-generation SIEM systems.',
    link: 'https://www.sans.org/white-papers/in-data-we-trust-leveraging-large-scale-analytics-for-intrusion-detection',
  },
]
