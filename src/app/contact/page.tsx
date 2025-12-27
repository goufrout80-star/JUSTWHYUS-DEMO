'use client';

import { useState } from 'react';
import { Container, Section, Grid } from '@/components/layout';
import { ScrollReveal, GlassCard, AmbientGlow } from '@/components/effects';
import { Button, Input, Select, Textarea } from '@/components/ui';

const budgetOptions = [
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-250k', label: '$100,000 - $250,000' },
  { value: '250k+', label: '$250,000+' },
];

const timelineOptions = [
  { value: '1month', label: 'Within 1 month' },
  { value: '1-3months', label: '1-3 months' },
  { value: '3-6months', label: '3-6 months' },
  { value: '6months+', label: '6+ months' },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    whatsapp: '',
    website: '',
    instagram: '',
    businessType: '',
    kpiGoal: '',
    bottleneck: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Section variant="hero" className="min-h-[60vh] flex items-center">
        <Container>
          <div className="max-w-[600px] mx-auto text-center">
            <ScrollReveal>
              <div className="w-16 h-16 rounded-full bg-[var(--jwus-accent)]/20 flex items-center justify-center mx-auto mb-[var(--space-6)]">
                <svg className="w-8 h-8 text-[var(--jwus-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-h1 text-[var(--jwus-ink)] mb-[var(--space-4)]">
                Application Received
              </h1>
              <p className="text-body text-[var(--jwus-deep)]">
                If aligned, response within 48 hours.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <Section variant="hero" className="relative overflow-hidden">
        <AmbientGlow className="top-0 right-1/4" size="md" />
        <Container className="relative z-10">
          <Grid cols={2} className="gap-[var(--space-11)]">
            <div>
              <ScrollReveal>
                <span className="text-small text-[var(--jwus-accent)] mb-[var(--space-2)] block">Apply</span>
                <h1 className="text-h1 text-[var(--jwus-ink)] mb-[var(--space-5)]">
                  Request a Private Consult
                </h1>
                <p className="text-body text-[var(--jwus-deep)] prose-max mb-[var(--space-7)]">
                  We work with a limited number of clients each quarter. 
                  This form helps us understand if there&apos;s alignment before a conversation.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <GlassCard className="p-[var(--space-6)]">
                  <h3 className="text-h3 text-[var(--jwus-ink)] mb-[var(--space-4)]">What to Expect</h3>
                  <ul className="space-y-[var(--space-3)] text-body text-[var(--jwus-deep)]">
                    <li className="flex gap-[var(--space-3)]">
                      <span className="text-[var(--jwus-accent)]">01</span>
                      <span>Application review within 48 hours</span>
                    </li>
                    <li className="flex gap-[var(--space-3)]">
                      <span className="text-[var(--jwus-accent)]">02</span>
                      <span>If aligned, private strategy call</span>
                    </li>
                    <li className="flex gap-[var(--space-3)]">
                      <span className="text-[var(--jwus-accent)]">03</span>
                      <span>Custom proposal within one week</span>
                    </li>
                  </ul>
                </GlassCard>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-[24px]">
                <div className="grid grid-cols-2 gap-[24px]">
                  <Input
                    label="Name *"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                  <Input
                    label="Email *"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                  />
                </div>

                <Input
                  label="WhatsApp"
                  name="whatsapp"
                  type="tel"
                  value={formState.whatsapp}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                />

                <div className="grid grid-cols-2 gap-[24px]">
                  <Input
                    label="Website"
                    name="website"
                    type="url"
                    value={formState.website}
                    onChange={handleChange}
                    placeholder="https://"
                  />
                  <Input
                    label="Instagram"
                    name="instagram"
                    value={formState.instagram}
                    onChange={handleChange}
                    placeholder="@handle"
                  />
                </div>

                <Input
                  label="Business Type *"
                  name="businessType"
                  required
                  value={formState.businessType}
                  onChange={handleChange}
                  placeholder="e.g., E-commerce, SaaS, Agency"
                />

                <Input
                  label="Primary KPI Goal *"
                  name="kpiGoal"
                  required
                  value={formState.kpiGoal}
                  onChange={handleChange}
                  placeholder="What metric matters most?"
                />

                <Input
                  label="Current Bottleneck *"
                  name="bottleneck"
                  required
                  value={formState.bottleneck}
                  onChange={handleChange}
                  placeholder="What's blocking growth?"
                />

                <div className="grid grid-cols-2 gap-[24px]">
                  <Select
                    label="Budget Range *"
                    name="budget"
                    required
                    value={formState.budget}
                    onChange={handleChange}
                    options={budgetOptions}
                    placeholder="Select range"
                  />
                  <Select
                    label="Timeline *"
                    name="timeline"
                    required
                    value={formState.timeline}
                    onChange={handleChange}
                    options={timelineOptions}
                    placeholder="Select timeline"
                  />
                </div>

                <Textarea
                  label={`Message (${charCount}/500)`}
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  maxLength={500}
                  rows={4}
                  placeholder="Tell us more about your situation..."
                />

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Submit Application
                </Button>
              </form>
            </ScrollReveal>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
