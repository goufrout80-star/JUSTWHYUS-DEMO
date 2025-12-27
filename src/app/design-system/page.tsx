'use client';

import { Container, Section, Grid } from '@/components/layout';
import { ScrollReveal, GlassCard } from '@/components/effects';
import { 
  Button, 
  Input, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio, 
  Switch, 
  Badge,
  QuoteCard,
  TimelineCard,
  ThemeToggle
} from '@/components/ui';

const colorSwatches = [
  { name: 'Background', var: '--jwus-bg' },
  { name: 'Surface', var: '--jwus-surface' },
  { name: 'Ink', var: '--jwus-ink' },
  { name: 'Deep', var: '--jwus-deep' },
  { name: 'Accent', var: '--jwus-accent' },
  { name: 'Border', var: '--jwus-border' },
  { name: 'Error', var: '--jwus-error' },
  { name: 'Success', var: '--jwus-success' },
];

const spacingScale = [0, 4, 8, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160, 200];

const typographyScale = [
  { name: 'Hero', size: '32/40', class: 'text-hero' },
  { name: 'H1', size: '24/32', class: 'text-h1' },
  { name: 'H2', size: '20/28', class: 'text-h2' },
  { name: 'H3', size: '16/24', class: 'text-h3' },
  { name: 'Body', size: '14/24', class: 'text-body' },
  { name: 'Small', size: '10/16', class: 'text-small' },
];

const timelineSteps = [
  { number: '01', title: 'Discovery', description: 'Understanding your brand and objectives.' },
  { number: '02', title: 'Strategy', description: 'Developing positioning frameworks.' },
  { number: '03', title: 'Execution', description: 'Implementing identity systems.' },
];

export default function DesignSystemPage() {
  return (
    <>
      <Section variant="hero">
        <Container>
          <ScrollReveal>
            <div className="max-w-[800px] mb-[var(--space-11)]">
              <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-2)] block">System</span>
              <h1 className="text-h1 text-[var(--jwus-ink)] mb-[var(--space-5)]">
                Design System
              </h1>
              <p className="text-body text-[var(--jwus-deep)] prose-max">
                Visual tokens, spacing, typography, and components powering the JUST WHY US brand.
                Pixel-perfect by design.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Colors */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-7)]">Colors</h2>
          </ScrollReveal>
          
          <Grid cols={3} className="lg:grid-cols-5">
            {colorSwatches.map((color, i) => (
              <ScrollReveal key={color.name} delay={i * 0.05}>
                <div className="space-y-[12px]">
                  <div 
                    className="aspect-square rounded-[var(--radius-card)] border border-[var(--jwus-border)]"
                    style={{ backgroundColor: `var(${color.var})` }}
                  />
                  <div>
                    <p className="text-body text-[var(--jwus-ink)]">{color.name}</p>
                    <p className="text-small text-[var(--jwus-deep)]">{color.var}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Typography */}
      <Section>
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-7)]">Typography</h2>
          </ScrollReveal>
          
          <div className="space-y-[var(--space-6)]">
            {typographyScale.map((type, i) => (
              <ScrollReveal key={type.name} delay={i * 0.05}>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-[var(--space-4)]">
                  <span className={`${type.class} text-[var(--jwus-ink)]`}>
                    {type.name}
                  </span>
                  <span className="text-small text-[var(--jwus-deep)]">
                    {type.size}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Spacing */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-7)]">Spacing Scale (8pt)</h2>
          </ScrollReveal>
          
          <div className="flex flex-wrap gap-[var(--space-4)]">
            {spacingScale.map((size, i) => (
              <ScrollReveal key={size} delay={i * 0.03}>
                <div className="flex flex-col items-center gap-[var(--space-2)]">
                  <div 
                    className="bg-[var(--jwus-accent)]/20 border border-[var(--jwus-accent)]/40"
                    style={{ width: Math.max(size, 4), height: Math.max(size, 4) }}
                  />
                  <span className="text-small text-[var(--jwus-deep)]">{size}px</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* PIXEL Radii */}
      <Section>
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-7)]">PIXEL RADII</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[24px]">Hard edges only. No rounded corners in pixel UI.</p>
          </ScrollReveal>
          
          <Grid cols={2}>
            <ScrollReveal>
              <div className="space-y-[var(--space-3)]">
                <div className="w-32 h-32 bg-[var(--jwus-surface)] border border-[var(--jwus-border)]" />
                <p className="text-body text-[var(--jwus-ink)]">Default</p>
                <p className="text-small text-[var(--jwus-deep)]">0px - Hard pixel edges</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-[var(--space-3)]">
                <div className="w-32 h-32 pixel-card" />
                <p className="text-body text-[var(--jwus-ink)]">Pixel Card</p>
                <p className="text-small text-[var(--jwus-deep)]">With corner marks on hover</p>
              </div>
            </ScrollReveal>
          </Grid>
        </Container>
      </Section>

      {/* Buttons - All Variants and Sizes */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-4)]">Buttons</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">Three variants × three sizes × all states</p>
          </ScrollReveal>
          
          <div className="space-y-[48px]">
            {/* Primary */}
            <div>
              <p className="text-small text-[var(--jwus-accent)] mb-[16px]">Primary</p>
              <div className="flex flex-wrap items-center gap-[16px]">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" isLoading>Loading</Button>
              </div>
            </div>
            
            {/* Secondary */}
            <div>
              <p className="text-small text-[var(--jwus-accent)] mb-[16px]">Secondary</p>
              <div className="flex flex-wrap items-center gap-[16px]">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Medium</Button>
                <Button variant="secondary" size="lg">Large</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="secondary" isLoading>Loading</Button>
              </div>
            </div>
            
            {/* Ghost */}
            <div>
              <p className="text-small text-[var(--jwus-accent)] mb-[16px]">Ghost</p>
              <div className="flex flex-wrap items-center gap-[16px]">
                <Button variant="ghost" size="sm">Small</Button>
                <Button variant="ghost" size="md">Medium</Button>
                <Button variant="ghost" size="lg">Large</Button>
                <Button variant="ghost" disabled>Disabled</Button>
              </div>
            </div>

            {/* Theme Toggle */}
            <div>
              <p className="text-small text-[var(--jwus-accent)] mb-[16px]">Theme Toggle</p>
              <div className="flex flex-wrap items-center gap-[16px]">
                <ThemeToggle />
                <span className="text-small text-[var(--jwus-deep)]">← Click to switch themes</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Form Components */}
      <Section>
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-4)]">Form Components</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">Complete form UI kit with all states</p>
          </ScrollReveal>
          
          <Grid cols={2} className="gap-[48px]">
            <div className="space-y-[24px]">
              <Input label="Text Input" placeholder="Enter your name" />
              <Input label="With Hint" placeholder="Enter email" hint="We'll never share your email" />
              <Input label="With Error" placeholder="Enter value" error="This field is required" />
              <Input label="Disabled" placeholder="Cannot edit" disabled />
            </div>
            
            <div className="space-y-[24px]">
              <Textarea label="Textarea" placeholder="Tell us about your project..." />
              <Select 
                label="Select" 
                placeholder="Choose an option"
                options={[
                  { value: 'strategy', label: 'Brand Strategy' },
                  { value: 'identity', label: 'Identity Design' },
                  { value: 'growth', label: 'Growth Infrastructure' },
                ]}
              />
            </div>
          </Grid>
          
          <div className="mt-[48px] space-y-[24px]">
            <p className="text-small text-[var(--jwus-accent)] mb-[16px]">Selection Controls</p>
            <div className="flex flex-wrap gap-[32px]">
              <Checkbox label="Checkbox" hint="Optional hint text" />
              <Checkbox label="Checked" defaultChecked />
              <Checkbox label="Disabled" disabled />
            </div>
            
            <div className="flex flex-wrap gap-[32px]">
              <Radio name="demo" label="Option A" defaultChecked />
              <Radio name="demo" label="Option B" />
              <Radio name="demo" label="Disabled" disabled />
            </div>
            
            <div className="flex flex-wrap gap-[32px]">
              <Switch label="Switch Off" />
              <Switch label="Switch On" defaultChecked />
              <Switch label="Disabled" disabled />
            </div>
          </div>
        </Container>
      </Section>

      {/* Badges */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-7)]">Badges</h2>
          </ScrollReveal>
          
          <div className="flex flex-wrap gap-[16px]">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </Container>
      </Section>

      {/* Pixel Cards */}
      <Section>
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-7)]">Pixel Cards</h2>
          </ScrollReveal>
          
          <Grid cols={2}>
            <ScrollReveal>
              <GlassCard className="p-[24px]">
                <h3 className="text-h3 text-[var(--jwus-ink)] mb-[12px]">Pixel Card</h3>
                <p className="text-body text-[var(--jwus-deep)]">
                  Hard edges, 1px border, corner marks on hover.
                  No blur in pixel UI.
                </p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GlassCard className="p-[24px]">
                <h3 className="text-h3 text-[var(--jwus-ink)] mb-[12px]">Hover Effect</h3>
                <p className="text-body text-[var(--jwus-deep)]">
                  Cards translate -1px on hover with accent border.
                  Corner marks appear.
                </p>
              </GlassCard>
            </ScrollReveal>
          </Grid>
        </Container>
      </Section>

      {/* Widgets */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-7)]">Widgets</h2>
          </ScrollReveal>
          
          <Grid cols={2} className="gap-[48px]">
            <QuoteCard 
              quote="They don't just understand brand—they understand business."
              author="Sarah Chen"
              role="CEO, Nova Health"
            />
            <div>
              <p className="text-small text-[var(--jwus-accent)] mb-[24px]">Timeline</p>
              <TimelineCard steps={timelineSteps} />
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Motion */}
      <Section>
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-7)]">PIXEL MOTION</h2>
          </ScrollReveal>
          
          <Grid cols={3}>
            <ScrollReveal>
              <div className="space-y-[8px]">
                <p className="text-h3 text-[var(--jwus-ink)]">Fast</p>
                <p className="text-body text-[var(--jwus-deep)]">150ms</p>
                <p className="text-small text-[var(--jwus-deep)]">Hover states, toggles</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-[8px]">
                <p className="text-h3 text-[var(--jwus-ink)]">Default</p>
                <p className="text-body text-[var(--jwus-deep)]">250ms</p>
                <p className="text-small text-[var(--jwus-deep)]">Standard transitions</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="space-y-[8px]">
                <p className="text-h3 text-[var(--jwus-ink)]">Slow</p>
                <p className="text-body text-[var(--jwus-deep)]">500ms</p>
                <p className="text-small text-[var(--jwus-deep)]">Page reveals</p>
              </div>
            </ScrollReveal>
          </Grid>
          
          <ScrollReveal className="mt-[48px]">
            <div className="space-y-[8px]">
              <p className="text-h3 text-[var(--jwus-ink)]">Easing</p>
              <p className="text-body text-[var(--jwus-deep)]">steps(4, end)</p>
              <p className="text-small text-[var(--jwus-deep)]">Stepped animation for pixel aesthetic</p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Pixel Cursor Demo */}
      <Section className="bg-[var(--jwus-surface)]">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--jwus-ink)] mb-[var(--space-4)]">PIXEL CURSOR</h2>
            <p className="text-body text-[var(--jwus-deep)] mb-[var(--space-7)]">
              Desktop only. 8px crosshair → 12px square on hover. Shows context label.
            </p>
          </ScrollReveal>
          
          <div className="flex flex-wrap gap-[24px] items-center">
            <Button variant="primary" data-cursor-label="SUBMIT">Hover for CLICK</Button>
            <Button variant="secondary" data-cursor-label="VIEW">Custom Label</Button>
            <a href="#" className="text-[var(--jwus-accent)] border-b border-[var(--jwus-accent)]">Link → LINK</a>
            <Input placeholder="Input → TYPE" className="max-w-[200px]" />
          </div>
          
          <hr className="pixel-divider my-[32px]" />
          
          <p className="text-small text-[var(--jwus-deep)]">
            Cursor disabled on touch devices and when prefers-reduced-motion is set.
          </p>
        </Container>
      </Section>
    </>
  );
}
