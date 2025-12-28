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
  const directionOffset = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { y: 0, x: 24 },
    right: { y: 0, x: -24 },
    none: { y: 0, x: 0 },
  }[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={{ 
        opacity: 0, 
        y: directionOffset.y,
        x: directionOffset.x 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0
      }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.2, 0.8, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
