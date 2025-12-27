'use client';

import Link from 'next/link';
import { CaseCardLensHover, ScrollReveal } from '@/components/effects';
import { cn } from '@/lib/utils';
import type { CaseStudy } from '@/data/case-studies';

interface CaseCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export function CaseCard({ caseStudy, index = 0 }: CaseCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <Link href={`/case-studies/${caseStudy.slug}`}>
        <CaseCardLensHover className="group">
          <article className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--jwus-surface)] border border-white/5 hover:border-white/10 transition-all duration-[var(--dur)]">
            <div className="aspect-[4/3] overflow-hidden">
              <div 
                className="w-full h-full bg-gradient-to-br from-[var(--jwus-surface)] to-[var(--jwus-bg)] transition-transform duration-[var(--dur-slow)] group-hover:scale-105"
                style={{
                  backgroundImage: `url(${caseStudy.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            
            <div className="p-[var(--space-5)]">
              <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-3)]">
                <span className="text-small text-[var(--jwus-accent)]">{caseStudy.category}</span>
                <span className="text-small text-[var(--jwus-deep)]">{caseStudy.year}</span>
              </div>
              
              <h3 className="text-h3 text-[var(--jwus-ink)] mb-[var(--space-2)]">
                {caseStudy.title}
              </h3>
              
              <div className="flex gap-[var(--space-4)] mt-[var(--space-4)]">
                {caseStudy.impact.slice(0, 2).map((item, i) => (
                  <div key={i}>
                    <span className="text-h3 text-[var(--jwus-accent)] font-medium">{item.value}</span>
                    <p className="text-small text-[var(--jwus-deep)]">{item.metric}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </CaseCardLensHover>
      </Link>
    </ScrollReveal>
  );
}
