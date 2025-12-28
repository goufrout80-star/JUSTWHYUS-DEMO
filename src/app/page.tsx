import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Container, Section } from '@/components/layout';
import { ScrollReveal, AmbientGlow, PixelHero } from '@/components/effects';
import { Button } from '@/components/ui';
import { caseStudies } from '@/data/case-studies';
import { assets } from '@/data/assets';

// Dynamic imports for below-fold heavy components (improves LCP)
const AnimatedMetrics = dynamic(
  () => import('@/components/effects/AnimatedMetrics').then(mod => mod.AnimatedMetrics),
  { 
    ssr: true,
    loading: () => <MetricsPlaceholder />
  }
);

const AnimatedWorkSection = dynamic(
  () => import('@/components/effects/AnimatedWorkSection').then(mod => mod.AnimatedWorkSection),
  { 
    ssr: true,
    loading: () => <WorkPlaceholder />
  }
);

const AnimatedAssets = dynamic(
  () => import('@/components/effects/AnimatedAssets').then(mod => mod.AnimatedAssets),
  { ssr: true }
);

// Skeleton placeholders to prevent CLS
function MetricsPlaceholder() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]" style={{ minHeight: '120px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} className="h-[100px] bg-[var(--jwus-surface)] animate-pulse" />
      ))}
    </div>
  );
}

function WorkPlaceholder() {
  return (
    <div className="py-[80px]" style={{ minHeight: '600px' }}>
      <div className="max-w-[1200px] mx-auto px-[24px]">
        <div className="h-[40px] w-[200px] bg-[var(--jwus-surface)] animate-pulse mb-[48px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="h-[200px] bg-[var(--jwus-surface)] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

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
      {/* PIXEL HERO - Above fold, loads immediately */}
      <PixelHero />

      {/* ANIMATED METRICS - Reserve space to prevent CLS */}
      <section 
        className="py-[64px] border-y border-[var(--jwus-border)]/20 bg-[var(--jwus-surface)]"
        style={{ minHeight: '200px', contain: 'layout' }}
      >
        <div className="max-w-[1200px] mx-auto px-[24px]">
          <AnimatedMetrics metrics={metrics} />
        </div>
      </section>

      {/* ANIMATED WORK SECTION - Reserve space */}
      <div style={{ minHeight: '800px', contain: 'layout' }}>
        <AnimatedWorkSection works={workItems} />
      </div>

      {/* ANIMATED ASSETS */}
      <div style={{ minHeight: '500px', contain: 'layout' }}>
        <AnimatedAssets assets={assets} />
      </div>

      {/* CLOSING CTA */}
      <Section variant="closing" className="relative overflow-hidden">
        <AmbientGlow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" intensity="medium" />
        <Container className="relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-h1 text-[var(--jwus-ink)] max-w-[800px] mx-auto mb-[var(--space-7)]">
              Ready to build something that lasts?
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <Link href="/contact">
              <Button variant="primary" size="lg">Request a Private Consult</Button>
            </Link>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
