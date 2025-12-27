'use client';

import { cn } from '@/lib/utils';

interface GridLinesProps {
  className?: string;
}

export function GridLines({ className }: GridLinesProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--jwus-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--jwus-border) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.3,
        }}
      />
    </div>
  );
}
