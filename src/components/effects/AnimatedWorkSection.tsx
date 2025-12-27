'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';

interface WorkItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  metric?: string;
}

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.2, 0.8, 0.2, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/case-studies/${item.slug}`}>
        <div className="relative overflow-hidden border border-[var(--jwus-border)] bg-[var(--jwus-bg)] transition-all duration-300 hover:border-[var(--jwus-accent)]">
          {/* Glitch lines on hover */}
          <motion.div
            animate={isHovered ? { 
              scaleY: [1, 1.5, 1, 2, 1],
              opacity: [0, 0.5, 0, 0.3, 0]
            } : {}}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--jwus-accent) 2px, var(--jwus-accent) 4px)',
              opacity: 0,
            }}
          />

          {/* Content */}
          <div className="relative p-[32px]">
            {/* Index number */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="absolute top-[16px] left-[16px] text-[10px] text-[var(--jwus-accent)] font-mono"
            >
              [{String(index + 1).padStart(2, '0')}]
            </motion.div>

            {/* Category tag */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="inline-block px-[12px] py-[4px] bg-[var(--jwus-surface)] border border-[var(--jwus-border)] text-[10px] uppercase tracking-[0.2em] text-[var(--jwus-deep)] mb-[24px]"
            >
              {item.category}
            </motion.div>

            {/* Title with reveal effect */}
            <div className="overflow-hidden mb-[12px]">
              <motion.h3
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                className="text-[20px] text-[var(--jwus-ink)] group-hover:text-[var(--jwus-accent)] transition-colors"
              >
                {item.title}
              </motion.h3>
            </div>

            {/* Client */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="text-[12px] text-[var(--jwus-deep)] mb-[24px]"
            >
              {item.client}
            </motion.p>

            {/* Metric with animated bar */}
            {item.metric && (
              <div className="relative">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                  className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[var(--jwus-accent)] to-transparent origin-left"
                />
                <div className="pt-[16px] flex items-center justify-between">
                  <span className="text-[24px] text-[var(--jwus-accent)]">{item.metric}</span>
                  <motion.span
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                    className="text-[10px] uppercase tracking-wider text-[var(--jwus-deep)] group-hover:text-[var(--jwus-accent)] transition-colors"
                  >
                    VIEW CASE →
                  </motion.span>
                </div>
              </div>
            )}

            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-[24px] h-[24px] border-t border-r border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-[24px] h-[24px] border-b border-l border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Hover overlay */}
          <motion.div
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--jwus-accent) 0%, transparent 50%)',
              opacity: 0.03,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

interface AnimatedWorkSectionProps {
  works: WorkItem[];
  title?: string;
  subtitle?: string;
}

export function AnimatedWorkSection({ works, title = 'Selected Work', subtitle = 'Proof Over Promise' }: AnimatedWorkSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative py-[80px] overflow-hidden">
      {/* Animated background element */}
      <motion.div
        style={{ y: springY }}
        className="absolute right-[-10%] top-[20%] w-[300px] h-[300px] border border-[var(--jwus-accent)]/10 pointer-events-none"
      />
      <motion.div
        style={{ y: springY }}
        className="absolute right-[-8%] top-[22%] w-[280px] h-[280px] border border-[var(--jwus-accent)]/5 pointer-events-none"
      />

      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-[24px] mb-[64px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[24px]">
          <div>
            {/* Animated label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-[12px] mb-[16px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-[12px] h-[12px] border border-[var(--jwus-accent)]"
              />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--jwus-accent)]">
                {title}
              </span>
              <div className="w-[40px] h-[1px] bg-[var(--jwus-accent)]" />
            </motion.div>

            {/* Title with character animation */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className="text-[clamp(28px,5vw,40px)] text-[var(--jwus-ink)]"
              >
                {subtitle}
              </motion.h2>
            </div>
          </div>

          {/* View all button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-[12px] px-[20px] py-[12px] border border-[var(--jwus-border)] text-[11px] uppercase tracking-wider text-[var(--jwus-deep)] hover:border-[var(--jwus-accent)] hover:text-[var(--jwus-accent)] transition-all"
            >
              <span>View All</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Works grid */}
      <div className="max-w-[1200px] mx-auto px-[24px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {works.map((work, i) => (
            <WorkCard key={work.slug} item={work} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-[1200px] mx-auto mt-[64px] px-[24px]"
      >
        <div className="h-[1px] bg-gradient-to-r from-[var(--jwus-accent)]/50 via-[var(--jwus-border)] to-transparent" />
      </motion.div>
    </div>
  );
}
