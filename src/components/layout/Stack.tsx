'use client';

import { cn } from '@/lib/utils';

interface StackProps {
  children: React.ReactNode;
  className?: string;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  direction?: 'vertical' | 'horizontal';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
}

export function Stack({ 
  children, 
  className,
  gap = 4,
  direction = 'vertical',
  align = 'stretch',
  justify = 'start'
}: StackProps) {
  const gapClass = {
    0: 'gap-0',
    1: 'gap-[var(--space-1)]',
    2: 'gap-[var(--space-2)]',
    3: 'gap-[var(--space-3)]',
    4: 'gap-[var(--space-4)]',
    5: 'gap-[var(--space-5)]',
    6: 'gap-[var(--space-6)]',
    7: 'gap-[var(--space-7)]',
    8: 'gap-[var(--space-8)]',
  }[gap];

  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }[align];

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }[justify];

  return (
    <div 
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gapClass,
        alignClass,
        justifyClass,
        className
      )}
    >
      {children}
    </div>
  );
}
