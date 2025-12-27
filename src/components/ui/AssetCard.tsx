'use client';

import { GlassCard, ScrollReveal } from '@/components/effects';
import { cn } from '@/lib/utils';
import type { Asset } from '@/data/assets';

interface AssetCardProps {
  asset: Asset;
  index?: number;
}

export function AssetCard({ asset, index = 0 }: AssetCardProps) {
  const statusColor = {
    'Active': 'text-[var(--jwus-accent)]',
    'In Development': 'text-amber-400',
    'Coming Soon': 'text-[var(--jwus-deep)]',
  }[asset.status];

  return (
    <ScrollReveal delay={index * 0.1}>
      <GlassCard className="p-[var(--space-6)] h-full group hover:border-white/20 transition-all duration-[var(--dur)]">
        <div className="flex items-start justify-between mb-[var(--space-4)]">
          <span className="text-small text-[var(--jwus-deep)]">{asset.category}</span>
          <span className={cn('text-small', statusColor)}>{asset.status}</span>
        </div>
        
        <h3 className="text-h3 text-[var(--jwus-ink)] mb-[var(--space-3)]">
          {asset.title}
        </h3>
        
        <p className="text-body text-[var(--jwus-deep)] prose-max">
          {asset.description}
        </p>
      </GlassCard>
    </ScrollReveal>
  );
}
