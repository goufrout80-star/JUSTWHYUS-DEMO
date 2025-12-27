'use client';

import { cn } from '@/lib/utils';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
}

export function Grid({ 
  children, 
  className,
  cols = 12
}: GridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  }[cols];

  return (
    <div 
      className={cn(
        'grid gap-[var(--grid-gutter)]',
        colsClass,
        className
      )}
    >
      {children}
    </div>
  );
}
