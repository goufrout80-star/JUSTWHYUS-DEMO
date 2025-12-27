'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SlowMarqueeProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right';
}

export function SlowMarquee({ 
  children, 
  className,
  direction = 'left'
}: SlowMarqueeProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="flex gap-[var(--space-8)] whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, '-50%'] : ['-50%', 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 40,
            ease: 'linear',
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
