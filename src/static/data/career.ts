/** Career data — work history and education with role progression. */
export interface Role {
  title: string
  from: string
  to: string
  tag: 'promotion' | 'role-change' | 'start'
  desc: string
}

export interface CareerEntry {
  company: string
  period: string
  roles: Role[]
}

export const CAREER: CareerEntry[] = [
  {
    company: 'Amazon Web Services',
    period: 'Mar 2023 — Present',
    roles: [
      {
        title: 'Software Development Engineer II',
        from: 'Apr 2025',
        to: 'Present',
        tag: 'promotion',
        desc: 'Working within the AWS Billing and Cost Management space to drive operational excellence at scale across 200+ sub-services from Metering to Invoicing.',
      },
      {
        title: 'Software Development Engineer I',
        from: 'Jul 2024',
        to: 'Apr 2025',
        tag: 'role-change',
        desc: 'Drove the concept-to-launch management of two full-stack cloud-native tools and engineered data processing pipelines to eliminate manual curation and ingestion effort for teams across AWS.',
      },
      {
        title: 'System Development Engineer I',
        from: 'Mar 2023',
        to: 'Jul 2024',
        tag: 'start',
        desc: 'Supported the launch of AWS services across three new regions, working to reduce build timelines from three months to two weeks through zero-touch automations.',
      },
    ],
  },
  {
    company: 'University of Warwick',
    period: '2020 — 2023',
    roles: [
      {
        title: 'BSc Cyber Security — First Class Honours',
        from: '2020',
        to: '2023',
        tag: 'start',
        desc: 'Dissertation: Performing MAC Address Deanonymisation By Passively Observing Device-Specific Wireless Characteristics.\n\nAreas of Study: Operating Systems, Networking, Information Management, Programming, Digital Forensics, Malware Analysis.',
      },
    ],
  },
]
