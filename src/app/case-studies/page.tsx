import { Container, Section, Grid } from '@/components/layout';
import { ScrollReveal } from '@/components/effects';
import { CaseCard } from '@/components/ui';
import { caseStudies } from '@/data/case-studies';

export const metadata = {
  title: 'Case Studies | JUST WHY US',
  description: 'Selected work showcasing strategic positioning, identity systems, and growth infrastructure.',
};

export default function CaseStudiesPage() {
  return (
    <Section variant="hero">
      <Container>
        <ScrollReveal>
          <div className="max-w-[800px] mb-[var(--space-11)]">
            <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-2)] block">Selected Work</span>
            <h1 className="text-h1 text-[var(--jwus-ink)] mb-[var(--space-5)]">
              Proof Over Promise
            </h1>
            <p className="text-body text-[var(--jwus-deep)] prose-max">
              Each engagement begins with understanding, not proposing. 
              These case studies represent outcomes, not outputs.
            </p>
          </div>
        </ScrollReveal>

        <Grid cols={2}>
          {caseStudies.map((cs, i) => (
            <CaseCard key={cs.slug} caseStudy={cs} index={i} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
