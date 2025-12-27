'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxShapesProps {
  className?: string;
}

export function ParallaxShapes({ className }: ParallaxShapesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <div ref={ref} className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <motion.div
        className="absolute right-[10%] top-[20%] h-1 w-1 rounded-full bg-[var(--jwus-accent)]/40"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute left-[15%] top-[40%] h-px w-16 bg-gradient-to-r from-transparent via-[var(--jwus-deep)]/30 to-transparent"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute right-[20%] top-[60%] h-2 w-2 rotate-45 border border-[var(--jwus-deep)]/20"
        style={{ y: y3 }}
      />
    </div>
  );
}
