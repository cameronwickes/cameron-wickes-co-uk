/** Certifications data — Credly badges with links. */
export interface Cert {
  name: string
  issuer: string
  year: string
  badge: string
  url: string
}

export const CERTIFICATIONS: Cert[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: 'October 2023',
    badge: '/images/certificates/aws-saa.png',
    url: 'https://www.credly.com/badges/14b1a035-8005-46e1-93ec-59bf3eec3fd2',
  },
  {
    name: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    year: 'October 2023',
    badge: '/images/certificates/aws-dva.png',
    url: 'https://www.credly.com/badges/7906295b-3114-4d44-b78d-bb985762fbbd',
  },
  {
    name: 'AWS Certified SysOps Administrator – Associate',
    issuer: 'Amazon Web Services',
    year: 'May 2023',
    badge: '/images/certificates/aws-soa.png',
    url: 'https://www.credly.com/badges/f959bed9-671e-4d2b-a112-68a2dc19f1a5',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: 'May 2023',
    badge: '/images/certificates/aws-ccp.png',
    url: 'https://www.credly.com/badges/5676072f-2fe2-425a-a803-609b23809a23',
  },
  {
    name: 'GIAC Security Essentials (GSEC)',
    issuer: 'Global Information Assurance Certification',
    year: 'February 2022',
    badge: '/images/certificates/giac-gsec.png',
    url: 'https://www.credly.com/badges/81495ea3-162e-43fd-beb0-9b78448dc34f',
  },
  {
    name: 'GIAC Certified Intrusion Analyst (GCIA)',
    issuer: 'Global Information Assurance Certification',
    year: 'September 2020',
    badge: '/images/certificates/giac-gcia.png',
    url: 'https://www.credly.com/badges/4bc7a008-325f-4e66-ad2c-0106c3e69371',
  },
  {
    name: 'GIAC Certified Incident Handler (GCIH)',
    issuer: 'Global Information Assurance Certification',
    year: 'August 2019',
    badge: '/images/certificates/giac-gcih.png',
    url: 'https://www.credly.com/badges/89a28169-e3b5-42bc-b2ee-2f8c6dd5ef9c',
  },
  {
    name: 'GIAC Advisory Board',
    issuer: 'Global Information Assurance Certification',
    year: 'August 2019',
    badge: '/images/certificates/giac-advisory.png',
    url: 'https://www.credly.com/badges/6880b675-9489-4420-89d5-97befb1de018',
  },
]
