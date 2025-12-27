'use client';

import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
}

export function Container({ 
  children, 
  className,
  as: Component = 'div' 
}: ContainerProps) {
  return (
    <Component 
      className={cn(
        'w-full max-w-[var(--container-max)] mx-auto px-[var(--page-padding)]',
        className
      )}
    >
      {children}
    </Component>
  );
}
