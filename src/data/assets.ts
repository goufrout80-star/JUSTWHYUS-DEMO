export interface Asset {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: 'Active' | 'In Development' | 'Coming Soon';
  thumbnail: string;
  link?: string;
}

export const assets: Asset[] = [
  {
    slug: 'brand-audit-framework',
    title: 'Brand Audit Framework',
    description: 'Proprietary diagnostic system for evaluating brand health across 47 dimensions. Used internally for all client engagements.',
    category: 'Framework',
    status: 'Active',
    thumbnail: '/assets/framework-thumb.jpg',
  },
  {
    slug: 'private-intelligence-briefs',
    title: 'Private Intelligence Briefs',
    description: 'Quarterly analysis of market movements, brand positioning trends, and strategic opportunities. Available to select clients.',
    category: 'Research',
    status: 'Active',
    thumbnail: '/assets/intel-thumb.jpg',
  },
  {
    slug: 'operator-playbooks',
    title: 'Operator Playbooks',
    description: 'Tactical guides for brand operators covering launch sequences, crisis protocols, and growth frameworks.',
    category: 'Guides',
    status: 'In Development',
    thumbnail: '/assets/playbook-thumb.jpg',
  },
  {
    slug: 'design-system-templates',
    title: 'Enterprise Design Systems',
    description: 'Scalable design system templates built for organizations requiring brand consistency at scale.',
    category: 'Templates',
    status: 'Coming Soon',
    thumbnail: '/assets/system-thumb.jpg',
  },
];
