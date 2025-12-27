'use client';

import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'closing';
  id?: string;
}

export function Section({ 
  children, 
  className,
  variant = 'default',
  id
}: SectionProps) {
  const paddingClass = variant === 'hero' || variant === 'closing' 
    ? 'py-[var(--section-py-hero)]' 
    : 'py-[var(--section-py)]';

  return (
    <section 
      id={id}
      className={cn(paddingClass, className)}
    >
      {children}
    </section>
  );
}
