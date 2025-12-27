import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { caseStudies } from '@/data/case-studies';
import { assets } from '@/data/assets';

// Lazy load heavy animated components below the fold
const PixelHero = dynamic(() => import('@/components/effects/PixelHero').then(mod => mod.PixelHero), {
  ssr: true,
  loading: () => (
    <div className="min-h-[100vh] flex items-center justify-center bg-[var(--jwus-bg)]">
      <div className="text-center px-[24px]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--jwus-deep)] mb-[16px]">
          [ INITIALIZING BRAND PROTOCOL ]
        </p>
        <h1 className="text-[clamp(32px,8vw,64px)] text-[var(--jwus-ink)] leading-[1.1] mb-[24px]">
          <span className="block">QUIET POWER</span>
          <span className="block">PARTNER FOR</span>
          <span className="block text-[var(--jwus-accent)]">BRANDS</span>
        </h1>
      </div>
    </div>
  ),
});

const AnimatedMetrics = dynamic(
  () => import('@/components/effects/AnimatedMetrics').then(mod => mod.AnimatedMetrics),
  { ssr: false, loading: () => <div className="h-[200px]" /> }
);

const AnimatedWorkSection = dynamic(
  () => import('@/components/effects/AnimatedWorkSection').then(mod => mod.AnimatedWorkSection),
  { ssr: false, loading: () => <div className="h-[600px]" /> }
);

const AnimatedAssets = dynamic(
  () => import('@/components/effects/AnimatedAssets').then(mod => mod.AnimatedAssets),
  { ssr: false, loading: () => <div className="h-[400px]" /> }
);

const metrics = [
  { value: '$2.4B+', label: 'Client Revenue Influenced' },
  { value: '340%', label: 'Average Growth Rate' },
  { value: '94%', label: 'Client Retention' },
];

const workItems = caseStudies.slice(0, 6).map(cs => ({
  slug: cs.slug,
  title: cs.title,
  client: cs.client,
  category: cs.category,
  metric: cs.impact?.[0]?.value,
}));

export default function Home() {
  return (
    <>
      {/* PIXEL HERO - SSR enabled for LCP */}
      <PixelHero />

      {/* ANIMATED METRICS - lazy loaded */}
      <section className="py-[64px] border-y border-[var(--jwus-border)]/20 bg-[var(--jwus-surface)]">
        <div className="max-w-[1200px] mx-auto px-[24px]">
          <AnimatedMetrics metrics={metrics} />
        </div>
      </section>

      {/* ANIMATED WORK SECTION - lazy loaded */}
      <AnimatedWorkSection works={workItems} />

      {/* ANIMATED ASSETS - lazy loaded */}
      <AnimatedAssets assets={assets} />

      {/* CLOSING CTA - simplified, no heavy effects */}
      <Section variant="closing" className="relative overflow-hidden">
        <Container className="relative z-10 text-center">
          <h2 className="text-h1 text-[var(--jwus-ink)] max-w-[800px] mx-auto mb-[var(--space-7)]">
            Ready to build something that lasts?
          </h2>
          <Link href="/contact">
            <Button variant="primary" size="lg">Request a Private Consult</Button>
          </Link>
        </Container>
      </Section>
    </>
  );
}
