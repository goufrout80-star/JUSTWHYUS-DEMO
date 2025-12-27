import Link from 'next/link';
import { Container, Section, Grid } from '@/components/layout';
import { ScrollReveal, AmbientGlow, PixelHero, AnimatedMetrics, AnimatedWorkSection } from '@/components/effects';
import { Button, AssetCard } from '@/components/ui';
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
  metric: cs.metrics?.[0]?.value,
}));

export default function Home() {
  return (
    <>
      {/* PIXEL HERO */}
      <PixelHero />

      {/* ANIMATED METRICS */}
      <section className="py-[64px] border-y border-[var(--jwus-border)]/20 bg-[var(--jwus-surface)]">
        <div className="max-w-[1200px] mx-auto px-[24px]">
          <AnimatedMetrics metrics={metrics} />
        </div>
      </section>

      {/* ANIMATED WORK SECTION */}
      <AnimatedWorkSection works={workItems} />

      {/* ASSETS */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <div className="mb-[var(--space-9)]">
              <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-2)] block">Owned Assets</span>
              <h2 className="text-h1 text-[var(--jwus-ink)]">Proprietary Frameworks</h2>
            </div>
          </ScrollReveal>
          
          <Grid cols={2}>
            {assets.map((asset, i) => (
              <AssetCard key={asset.slug} asset={asset} index={i} />
            ))}
          </Grid>
        </Container>
      </Section>

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
