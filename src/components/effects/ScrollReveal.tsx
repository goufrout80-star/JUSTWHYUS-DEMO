'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function ScrollReveal({ 
  children, 
  className,
  delay = 0,
  direction = 'up'
}: ScrollRevealProps) {
  // Use transform instead of layout-affecting properties for CLS
  const directionOffset = {
    up: { y: 16, x: 0 },
    down: { y: -16, x: 0 },
    left: { y: 0, x: 16 },
    right: { y: 0, x: -16 },
    none: { y: 0, x: 0 },
  }[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={{ 
        opacity: 0, 
        transform: `translate3d(${directionOffset.x}px, ${directionOffset.y}px, 0)`
      }}
      whileInView={{ 
        opacity: 1, 
        transform: 'translate3d(0, 0, 0)'
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ 
        willChange: 'transform, opacity',
        contain: 'layout'
      }}
    >
      {children}
    </motion.div>
  );
}
