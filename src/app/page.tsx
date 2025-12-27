import Link from 'next/link';
import { Suspense } from 'react';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { PixelHero, AnimatedMetrics, AnimatedWorkSection, AnimatedAssets } from '@/components/effects';
import { caseStudies } from '@/data/case-studies';
import { assets } from '@/data/assets';

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
