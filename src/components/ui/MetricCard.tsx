'use client';

import { ScrollReveal } from '@/components/effects';

interface MetricCardProps {
  value: string;
  label: string;
  index?: number;
}

export function MetricCard({ value, label, index = 0 }: MetricCardProps) {
  return (
    <ScrollReveal delay={index * 0.15}>
      <div className="text-center">
        <span className="text-hero text-[var(--jwus-accent)] font-medium block">
          {value}
        </span>
        <span className="text-body text-[var(--jwus-deep)]">
          {label}
        </span>
      </div>
    </ScrollReveal>
  );
}
