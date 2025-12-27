import Link from 'next/link';
import { Container, Section, Grid } from '@/components/layout';
import { ScrollReveal, AmbientGlow } from '@/components/effects';
import { Button, CaseCard, MetricCard, AssetCard } from '@/components/ui';
import { PixelSceneClient } from '@/components/three/PixelSceneClient';
import { caseStudies } from '@/data/case-studies';
import { assets } from '@/data/assets';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <Section variant="hero" className="relative overflow-hidden">
        <AmbientGlow className="top-1/4 -right-1/4" size="lg" />
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-[64px] items-center min-h-[70vh]">
            <div className="max-w-[600px]">
              <ScrollReveal>
                <h1 className="text-hero text-[var(--jwus-ink)] mb-[32px]">
                  Quiet Power Partner Behind Brands
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={0.1}>
                <p className="text-body text-[var(--jwus-deep)] max-w-[680px] mb-[48px]">
                  Strategic positioning, identity systems, and growth infrastructure for brands that prefer proof over noise.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div className="flex flex-wrap gap-[16px]">
                  <Link href="/contact">
                    <Button variant="primary" size="lg">Request a Private Consult</Button>
                  </Link>
                  <Link href="/case-studies">
                    <Button variant="ghost" size="lg">View Case Studies</Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="relative h-[400px] lg:h-[500px] hidden md:block">
              <PixelSceneClient className="absolute inset-0" />
            </div>
          </div>
        </Container>
      </Section>

      {/* PROOF STRIP */}
      <Section className="border-y border-white/5 bg-[var(--jwus-surface)]">
        <Container>
          <Grid cols={3} className="py-[var(--space-4)]">
            <MetricCard value="$2.4B+" label="Client Revenue Influenced" index={0} />
            <MetricCard value="340%" label="Average Growth Rate" index={1} />
            <MetricCard value="94%" label="Client Retention" index={2} />
          </Grid>
        </Container>
      </Section>

      {/* SELECTED WORK */}
      <Section>
        <Container>
          <ScrollReveal>
            <div className="flex justify-between items-end mb-[80px]">
              <div>
                <span className="text-small text-[var(--jwus-accent)] mb-[8px] block">Selected Work</span>
                <h2 className="text-h1 text-[var(--jwus-ink)]">Proof Over Promise</h2>
              </div>
              <Link href="/case-studies">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>
          </ScrollReveal>
          
          <Grid cols={2}>
            {caseStudies.slice(0, 6).map((cs, i) => (
              <CaseCard key={cs.slug} caseStudy={cs} index={i} />
            ))}
          </Grid>
        </Container>
      </Section>

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
