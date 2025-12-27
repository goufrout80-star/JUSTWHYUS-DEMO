import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, Grid } from '@/components/layout';
import { ScrollReveal, AmbientGlow, GlassCard } from '@/components/effects';
import { Button } from '@/components/ui';
import { caseStudies, getCaseStudy } from '@/data/case-studies';

export function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return { title: 'Not Found' };
  
  return {
    title: `${caseStudy.title} | JUST WHY US`,
    description: caseStudy.context.slice(0, 160),
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  
  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <Section variant="hero" className="relative overflow-hidden">
        <AmbientGlow className="top-0 right-0" size="lg" />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-[var(--space-4)] mb-[var(--space-5)]">
              <span className="text-small text-[var(--jwus-accent)]">{caseStudy.category}</span>
              <span className="text-small text-[var(--jwus-deep)]">{caseStudy.year}</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="text-hero text-[var(--jwus-ink)] mb-[var(--space-5)]">
              {caseStudy.title}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-h3 text-[var(--jwus-deep)] max-w-[700px]">
              {caseStudy.client}
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Hero Image */}
      <Section className="py-0">
        <Container>
          <ScrollReveal>
            <div 
              className="aspect-[21/9] rounded-[var(--radius-panel)] bg-[var(--jwus-surface)] overflow-hidden"
              style={{
                backgroundImage: `url(${caseStudy.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </ScrollReveal>
        </Container>
      </Section>

      {/* Context */}
      <Section>
        <Container>
          <Grid cols={2} className="gap-[var(--space-11)]">
            <ScrollReveal>
              <div>
                <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-3)] block">Context</span>
                <p className="text-body text-[var(--jwus-ink)] prose-max">
                  {caseStudy.context}
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div>
                <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-3)] block">Intervention</span>
                <p className="text-body text-[var(--jwus-ink)] prose-max">
                  {caseStudy.intervention}
                </p>
              </div>
            </ScrollReveal>
          </Grid>
        </Container>
      </Section>

      {/* Gallery */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-6)] block">Output</span>
          </ScrollReveal>
          
          <Grid cols={3}>
            {caseStudy.gallery.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div 
                  className="aspect-[4/3] rounded-[var(--radius-card)] bg-[var(--jwus-bg)]"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </ScrollReveal>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Impact */}
      <Section>
        <Container>
          <ScrollReveal>
            <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-6)] block">Impact</span>
          </ScrollReveal>
          
          <Grid cols={3}>
            {caseStudy.impact.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlassCard className="p-[var(--space-6)] text-center">
                  <span className="text-hero text-[var(--jwus-accent)] font-medium block mb-[var(--space-2)]">
                    {item.value}
                  </span>
                  <span className="text-h3 text-[var(--jwus-ink)] block mb-[var(--space-2)]">
                    {item.metric}
                  </span>
                  <p className="text-small text-[var(--jwus-deep)]">
                    {item.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="closing" className="text-center">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-6)]">
              Ready to create similar results?
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
