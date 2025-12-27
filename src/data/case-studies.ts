export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  thumbnail: string;
  heroImage: string;
  context: string;
  intervention: string;
  gallery: string[];
  impact: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'heritage-atelier',
    title: 'Heritage Atelier',
    client: 'Heritage Atelier',
    category: 'Luxury Fashion',
    year: '2024',
    thumbnail: '/cases/heritage-thumb.jpg',
    heroImage: '/cases/heritage-hero.jpg',
    context: 'A heritage fashion house seeking to reposition for a new generation without losing its legacy. Their digital presence was outdated, and their retail experience was disconnected from modern expectations.',
    intervention: 'Complete brand system overhaul. New visual identity, e-commerce platform, and retail experience design. We unified physical and digital touchpoints under one cohesive narrative.',
    gallery: ['/cases/heritage-1.jpg', '/cases/heritage-2.jpg', '/cases/heritage-3.jpg'],
    impact: [
      { metric: 'Revenue Growth', value: '+340%', description: 'Year-over-year increase in online sales' },
      { metric: 'Brand Awareness', value: '+180%', description: 'Increase in organic search traffic' },
      { metric: 'Customer LTV', value: '+65%', description: 'Improved customer lifetime value' },
    ],
  },
  {
    slug: 'fintech-nova',
    title: 'Nova Finance',
    client: 'Nova Finance',
    category: 'Financial Technology',
    year: '2024',
    thumbnail: '/cases/nova-thumb.jpg',
    heroImage: '/cases/nova-hero.jpg',
    context: 'A fintech startup with strong technology but weak market positioning. They were losing deals to competitors with inferior products but better branding.',
    intervention: 'Strategic repositioning from "another fintech" to "the quiet infrastructure behind enterprise finance." Complete brand architecture, messaging framework, and investor materials.',
    gallery: ['/cases/nova-1.jpg', '/cases/nova-2.jpg', '/cases/nova-3.jpg'],
    impact: [
      { metric: 'Series B', value: '$42M', description: 'Raised within 6 months of rebrand' },
      { metric: 'Enterprise Clients', value: '+12', description: 'New enterprise contracts signed' },
      { metric: 'Deal Close Rate', value: '+85%', description: 'Improvement in sales conversion' },
    ],
  },
  {
    slug: 'wellness-collective',
    title: 'The Wellness Collective',
    client: 'TWC Holdings',
    category: 'Health & Wellness',
    year: '2023',
    thumbnail: '/cases/wellness-thumb.jpg',
    heroImage: '/cases/wellness-hero.jpg',
    context: 'A wellness brand expanding from single-location to national presence. Needed systems that could scale without losing the personal touch that made them successful.',
    intervention: 'Scalable brand system with flexible components. Digital booking platform, membership program design, and franchise-ready brand guidelines.',
    gallery: ['/cases/wellness-1.jpg', '/cases/wellness-2.jpg', '/cases/wellness-3.jpg'],
    impact: [
      { metric: 'Locations', value: '1→18', description: 'Expansion in 24 months' },
      { metric: 'Member Retention', value: '94%', description: 'Annual membership renewal rate' },
      { metric: 'Revenue Per Location', value: '+220%', description: 'Average increase after rebrand' },
    ],
  },
  {
    slug: 'architecture-studio',
    title: 'Meridian Architects',
    client: 'Meridian Studio',
    category: 'Architecture',
    year: '2023',
    thumbnail: '/cases/meridian-thumb.jpg',
    heroImage: '/cases/meridian-hero.jpg',
    context: 'An award-winning architecture firm invisible outside industry circles. They needed to attract high-value residential clients without compromising their reputation for serious work.',
    intervention: 'Dual-track brand strategy targeting both commercial clients and high-net-worth individuals. Portfolio reimagining, thought leadership program, and private client acquisition system.',
    gallery: ['/cases/meridian-1.jpg', '/cases/meridian-2.jpg', '/cases/meridian-3.jpg'],
    impact: [
      { metric: 'Private Commissions', value: '+400%', description: 'Increase in residential inquiries' },
      { metric: 'Project Value', value: '+180%', description: 'Average project budget increase' },
      { metric: 'Media Features', value: '24', description: 'Publications in first year' },
    ],
  },
  {
    slug: 'hospitality-group',
    title: 'Ember Hospitality',
    client: 'Ember Group',
    category: 'Hospitality',
    year: '2023',
    thumbnail: '/cases/ember-thumb.jpg',
    heroImage: '/cases/ember-hero.jpg',
    context: 'A hospitality group with five distinct properties struggling with brand coherence. Each property had its own identity, diluting the parent brand power.',
    intervention: 'Master brand architecture with flexible sub-brand system. Unified booking experience, loyalty program, and cross-property guest journey design.',
    gallery: ['/cases/ember-1.jpg', '/cases/ember-2.jpg', '/cases/ember-3.jpg'],
    impact: [
      { metric: 'Cross-Booking', value: '+340%', description: 'Guests booking multiple properties' },
      { metric: 'Direct Bookings', value: '+78%', description: 'Reduction in OTA dependency' },
      { metric: 'RevPAR', value: '+45%', description: 'Revenue per available room' },
    ],
  },
  {
    slug: 'tech-infrastructure',
    title: 'Stratum Systems',
    client: 'Stratum Inc.',
    category: 'Enterprise Technology',
    year: '2022',
    thumbnail: '/cases/stratum-thumb.jpg',
    heroImage: '/cases/stratum-hero.jpg',
    context: 'An infrastructure technology company with a $200M product and a $2M brand. Their visual identity and market positioning undermined the sophistication of their offering.',
    intervention: 'Enterprise-grade brand elevation. New visual system, product naming architecture, and executive thought leadership positioning.',
    gallery: ['/cases/stratum-1.jpg', '/cases/stratum-2.jpg', '/cases/stratum-3.jpg'],
    impact: [
      { metric: 'Deal Size', value: '+280%', description: 'Average contract value increase' },
      { metric: 'Sales Cycle', value: '-40%', description: 'Reduction in time to close' },
      { metric: 'Acquisition', value: '$380M', description: 'Strategic acquisition 18 months post-rebrand' },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
