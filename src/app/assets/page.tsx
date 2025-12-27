import Link from 'next/link';
import { Container, Section, Grid } from '@/components/layout';
import { ScrollReveal, AmbientGlow } from '@/components/effects';
import { AssetCard, Button } from '@/components/ui';
import { assets } from '@/data/assets';

export const metadata = {
  title: 'Assets | JUST WHY US',
  description: 'Proprietary frameworks, research, and tools developed through years of brand operations.',
};

export default function AssetsPage() {
  return (
    <>
      <Section variant="hero" className="relative overflow-hidden">
        <AmbientGlow className="top-1/4 -left-1/4" size="lg" />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="max-w-[800px] mb-[var(--space-11)]">
              <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-2)] block">Owned Assets</span>
              <h1 className="text-h1 text-[var(--jwus-ink)] mb-[var(--space-5)]">
                Proprietary Frameworks
              </h1>
              <p className="text-body text-[var(--jwus-deep)] prose-max">
                Tools and methodologies developed through years of brand operations. 
                These assets power our client work and are selectively available for licensing.
              </p>
            </div>
          </ScrollReveal>

          <Grid cols={2}>
            {assets.map((asset, i) => (
              <AssetCard key={asset.slug} asset={asset} index={i} />
            ))}
          </Grid>
        </Container>
      </Section>

      <Section variant="closing" className="text-center bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-4)]">
              Interested in our frameworks?
            </h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">
              Asset licensing and custom implementation available for qualified partners.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <Link href="/contact">
              <Button variant="primary" size="lg">Inquire About Assets</Button>
            </Link>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
