export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  tags: string[];
  year: string;
  oneMetric: {
    value: string;
    label: string;
  };
  resultBullets: string[];
  heroImage: string;
  context: string;
  intervention: string;
  gallery: string[];
}

export interface Asset {
  slug: string;
  name: string;
  positioning: string;
  description: string;
  metrics: { value: string; label: string }[];
  link?: string;
  status: 'active' | 'coming-soon' | 'private';
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'meridian-rebrand',
    title: 'Meridian Capital',
    client: 'Meridian Capital Partners',
    industry: 'Finance',
    tags: ['Brand Strategy', 'Identity', 'Digital'],
    year: '2024',
    oneMetric: { value: '340%', label: 'AUM Growth' },
    resultBullets: [
      'Complete brand repositioning from regional to global presence',
      'New identity system across 12 touchpoints',
      'Digital platform redesign with 4x engagement increase',
    ],
    heroImage: '/cases/meridian-hero.jpg',
    context: 'A mid-tier capital firm seeking to compete with established players needed differentiation beyond performance metrics.',
    intervention: 'We repositioned them as the "thinking partner" for sophisticated investors, creating an identity system that communicated intellectual rigor without pretension.',
    gallery: ['/cases/meridian-1.jpg', '/cases/meridian-2.jpg', '/cases/meridian-3.jpg'],
  },
  {
    slug: 'nova-launch',
    title: 'Nova Health',
    client: 'Nova Health Technologies',
    industry: 'Healthcare',
    tags: ['Launch Strategy', 'Brand', 'Growth'],
    year: '2024',
    oneMetric: { value: '$12M', label: 'Series A' },
    resultBullets: [
      'Pre-launch brand development and positioning',
      'Investor narrative and pitch materials',
      'Go-to-market strategy execution',
    ],
    heroImage: '/cases/nova-hero.jpg',
    context: 'A stealth-mode health tech startup needed to emerge with credibility typically reserved for established players.',
    intervention: 'Built brand architecture and narrative that positioned founders expertise while creating space for the product story to evolve.',
    gallery: ['/cases/nova-1.jpg', '/cases/nova-2.jpg', '/cases/nova-3.jpg'],
  },
  {
    slug: 'atlas-scale',
    title: 'Atlas Ventures',
    client: 'Atlas Ventures LLC',
    industry: 'Venture Capital',
    tags: ['Positioning', 'Content', 'Thought Leadership'],
    year: '2023',
    oneMetric: { value: '8x', label: 'Deal Flow' },
    resultBullets: [
      'Differentiated positioning in crowded VC landscape',
      'Thought leadership content strategy',
      'Founder community development',
    ],
    heroImage: '/cases/atlas-hero.jpg',
    context: 'A new fund struggled to attract quality deal flow against established competitors with longer track records.',
    intervention: 'Created a distinct voice and content engine that showcased unique operational expertise, attracting founders seeking hands-on partners.',
    gallery: ['/cases/atlas-1.jpg', '/cases/atlas-2.jpg', '/cases/atlas-3.jpg'],
  },
  {
    slug: 'prism-transform',
    title: 'Prism Analytics',
    client: 'Prism Analytics Inc.',
    industry: 'SaaS',
    tags: ['Rebrand', 'Product Marketing', 'Enterprise'],
    year: '2023',
    oneMetric: { value: '156%', label: 'Enterprise ARR' },
    resultBullets: [
      'Market repositioning from SMB to enterprise',
      'Complete brand and product narrative overhaul',
      'Sales enablement and collateral system',
    ],
    heroImage: '/cases/prism-hero.jpg',
    context: 'A successful SMB product needed to move upmarket but brand perception was anchored to small business use cases.',
    intervention: 'Rebuilt brand architecture to support enterprise narrative while maintaining product continuity for existing customers.',
    gallery: ['/cases/prism-1.jpg', '/cases/prism-2.jpg', '/cases/prism-3.jpg'],
  },
  {
    slug: 'cipher-identity',
    title: 'Cipher Security',
    client: 'Cipher Cybersecurity',
    industry: 'Cybersecurity',
    tags: ['Identity', 'Web', 'B2B'],
    year: '2023',
    oneMetric: { value: '94%', label: 'Win Rate' },
    resultBullets: [
      'New brand identity from stealth emergence',
      'Website and digital presence launch',
      'Sales narrative and competitive positioning',
    ],
    heroImage: '/cases/cipher-hero.jpg',
    context: 'An enterprise security company emerging from stealth needed to establish credibility in a trust-dependent market.',
    intervention: 'Developed identity and narrative that balanced technical authority with accessibility, supported by a digital presence that converted.',
    gallery: ['/cases/cipher-1.jpg', '/cases/cipher-2.jpg', '/cases/cipher-3.jpg'],
  },
  {
    slug: 'vertex-growth',
    title: 'Vertex Media',
    client: 'Vertex Media Group',
    industry: 'Media',
    tags: ['Growth Strategy', 'Brand', 'Digital'],
    year: '2022',
    oneMetric: { value: '2.4M', label: 'Subscribers' },
    resultBullets: [
      'Audience growth strategy and execution',
      'Brand refresh and content strategy',
      'Monetization framework development',
    ],
    heroImage: '/cases/vertex-hero.jpg',
    context: 'A digital media company with strong content needed strategic direction to scale audience and revenue.',
    intervention: 'Created growth framework combining brand positioning, content strategy, and audience development that tripled subscriber base.',
    gallery: ['/cases/vertex-1.jpg', '/cases/vertex-2.jpg', '/cases/vertex-3.jpg'],
  },
];

export const assets: Asset[] = [
  {
    slug: 'positioning-framework',
    name: 'Positioning Architecture',
    positioning: 'Strategic framework for market differentiation',
    description: 'A systematic approach to identifying and articulating competitive positioning that creates defensible market space.',
    metrics: [
      { value: '47', label: 'Companies deployed' },
      { value: '89%', label: 'Adoption rate' },
    ],
    status: 'active',
  },
  {
    slug: 'narrative-engine',
    name: 'Narrative Engine',
    positioning: 'Story system for consistent brand communication',
    description: 'Modular narrative framework that scales brand storytelling across touchpoints while maintaining coherence.',
    metrics: [
      { value: '12', label: 'Enterprise clients' },
      { value: '340%', label: 'Content efficiency' },
    ],
    status: 'active',
  },
  {
    slug: 'growth-diagnostic',
    name: 'Growth Diagnostic',
    positioning: 'Assessment tool for identifying growth barriers',
    description: 'Proprietary diagnostic that identifies specific constraints limiting brand and business growth.',
    metrics: [
      { value: '200+', label: 'Assessments' },
      { value: '4.2x', label: 'Avg. improvement' },
    ],
    status: 'active',
  },
  {
    slug: 'brand-os',
    name: 'Brand OS',
    positioning: 'Operating system for brand management',
    description: 'Integrated platform for managing brand assets, guidelines, and governance at scale.',
    metrics: [
      { value: '2025', label: 'Launch year' },
    ],
    status: 'coming-soon',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAsset(slug: string): Asset | undefined {
  return assets.find((a) => a.slug === slug);
}
