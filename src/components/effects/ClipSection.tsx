'use client';

import { cn } from '@/lib/utils';

interface ClipSectionProps {
  children: React.ReactNode;
  className?: string;
  clipTop?: boolean;
  clipBottom?: boolean;
}

export function ClipSection({ 
  children, 
  className,
  clipTop = false,
  clipBottom = false
}: ClipSectionProps) {
  const clipPath = (() => {
    if (clipTop && clipBottom) {
      return 'polygon(0 40px, 100% 0, 100% calc(100% - 40px), 0 100%)';
    }
    if (clipTop) {
      return 'polygon(0 40px, 100% 0, 100% 100%, 0 100%)';
    }
    if (clipBottom) {
      return 'polygon(0 0, 100% 0, 100% calc(100% - 40px), 0 100%)';
    }
    return undefined;
  })();

  return (
    <div 
      className={cn('relative', className)}
      style={{ clipPath }}
    >
      {children}
    </div>
  );
}
