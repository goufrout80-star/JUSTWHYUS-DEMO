'use client';

import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ 
  children, 
  className,
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        'pixel-card p-[16px]',
        className
      )}
    >
      {children}
    </div>
  );
}
