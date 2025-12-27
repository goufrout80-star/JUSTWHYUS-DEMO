'use client';

import dynamic from 'next/dynamic';
import { Container, Section, Grid } from '@/components/layout';
import { 
  ScrollReveal, 
  GlassCard, 
  AmbientGlow,
  ParallaxShapes,
  CaseCardLensHover,
  SlowMarquee,
  ClipSection
} from '@/components/effects';
import { Button } from '@/components/ui';

const PixelControlScene = dynamic(
  () => import('@/components/three/PixelControlScene').then(mod => mod.PixelControlScene),
  { ssr: false }
);

export default function EffectsPage() {
  return (
    <>
      <Section variant="hero">
        <Container>
          <ScrollReveal>
            <div className="max-w-[800px] mb-[var(--space-11)]">
              <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-2)] block">Demo</span>
              <h1 className="text-h1 text-[var(--jwus-ink)] mb-[var(--space-5)]">
                Effects Library
              </h1>
              <p className="text-body text-[var(--jwus-deep)] prose-max">
                Interactive demonstrations of all motion and visual effects. 
                Controlled, minimal, never loud.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* 3D Scene */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-3)]">PixelControlScene</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">
              3D voxel-style scene with subtle float animation. Desktop only, respects reduced motion.
            </p>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="relative h-[400px] rounded-[var(--radius-panel)] overflow-hidden border border-white/10">
              <PixelControlScene className="absolute inset-0" />
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Ambient Glow */}
      <Section className="relative overflow-hidden">
        <AmbientGlow className="top-1/2 left-1/4 -translate-y-1/2" size="lg" />
        <AmbientGlow className="top-1/4 right-1/4" size="md" color="white" />
        <Container className="relative z-10">
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-3)]">AmbientGlow</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">
              Soft radial gradients for atmospheric depth. Use sparingly.
            </p>
          </ScrollReveal>
          
          <Grid cols={3}>
            <ScrollReveal>
              <GlassCard className="p-[var(--space-6)] text-center">
                <p className="text-body text-[var(--jwus-ink)]">Accent / Large</p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GlassCard className="p-[var(--space-6)] text-center">
                <p className="text-body text-[var(--jwus-ink)]">White / Medium</p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <GlassCard className="p-[var(--space-6)] text-center">
                <p className="text-body text-[var(--jwus-ink)]">Intensity: Low/Medium</p>
              </GlassCard>
            </ScrollReveal>
          </Grid>
        </Container>
      </Section>

      {/* Parallax Shapes */}
      <Section className="relative bg-[var(--jwus-surface)] min-h-[60vh]">
        <ParallaxShapes />
        <Container className="relative z-10">
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-3)]">ParallaxShapes</h2>
            <p className="text-body text-[var(--jwus-deep)] prose-max">
              Minimal geometric elements that respond to scroll. 
              Adds depth without distraction. Scroll to see effect.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Lens Hover */}
      <Section>
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-3)]">CaseCardLensHover</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">
              3D perspective tilt on hover. Subtle depth cue for interactive cards.
            </p>
          </ScrollReveal>
          
          <Grid cols={3}>
            {[1, 2, 3].map((i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <CaseCardLensHover>
                  <GlassCard className="p-[var(--space-7)] text-center">
                    <p className="text-h2 text-[var(--jwus-accent)] mb-[var(--space-2)]">0{i}</p>
                    <p className="text-body text-[var(--jwus-ink)]">Hover to tilt</p>
                  </GlassCard>
                </CaseCardLensHover>
              </ScrollReveal>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Buttons */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-3)]">Button Component</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">
              Three variants with consistent hover and focus states. Custom cursor expands on hover.
            </p>
          </ScrollReveal>
          
          <div className="flex flex-wrap gap-[24px] justify-center">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="ghost">Ghost Action</Button>
          </div>
        </Container>
      </Section>

      {/* Slow Marquee */}
      <Section>
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-3)]">SlowMarquee</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">
              Continuous horizontal scroll. 40s duration. Use once only per page.
            </p>
          </ScrollReveal>
        </Container>
        
        <SlowMarquee className="py-[var(--space-6)] border-y border-white/5">
          <span className="text-h1 text-[var(--jwus-deep)]">Strategic Positioning</span>
          <span className="text-h1 text-[var(--jwus-accent)]">•</span>
          <span className="text-h1 text-[var(--jwus-deep)]">Identity Systems</span>
          <span className="text-h1 text-[var(--jwus-accent)]">•</span>
          <span className="text-h1 text-[var(--jwus-deep)]">Growth Infrastructure</span>
          <span className="text-h1 text-[var(--jwus-accent)]">•</span>
        </SlowMarquee>
      </Section>

      {/* Clip Section */}
      <ClipSection clipTop clipBottom className="bg-[var(--jwus-accent)] py-[var(--space-12)]">
        <Container>
          <div className="text-center py-[var(--space-8)]">
            <h2 className="text-h1 text-[var(--jwus-bg)]">ClipSection</h2>
            <p className="text-body text-[var(--jwus-bg)]/70 mt-[var(--space-4)]">
              Angled clip paths for visual breaks. Use rarely.
            </p>
          </div>
        </Container>
      </ClipSection>

      {/* Scroll Reveal */}
      <Section>
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-3)]">ScrollReveal</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">
              Framer Motion whileInView animation. Configurable direction and delay.
            </p>
          </ScrollReveal>
          
          <Grid cols={4}>
            <ScrollReveal direction="up">
              <GlassCard className="p-[var(--space-5)] text-center">
                <p className="text-small text-[var(--jwus-deep)]">Direction</p>
                <p className="text-body text-[var(--jwus-ink)]">Up</p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal direction="down" delay={0.1}>
              <GlassCard className="p-[var(--space-5)] text-center">
                <p className="text-small text-[var(--jwus-deep)]">Direction</p>
                <p className="text-body text-[var(--jwus-ink)]">Down</p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2}>
              <GlassCard className="p-[var(--space-5)] text-center">
                <p className="text-small text-[var(--jwus-deep)]">Direction</p>
                <p className="text-body text-[var(--jwus-ink)]">Left</p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.3}>
              <GlassCard className="p-[var(--space-5)] text-center">
                <p className="text-small text-[var(--jwus-deep)]">Direction</p>
                <p className="text-body text-[var(--jwus-ink)]">Right</p>
              </GlassCard>
            </ScrollReveal>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
