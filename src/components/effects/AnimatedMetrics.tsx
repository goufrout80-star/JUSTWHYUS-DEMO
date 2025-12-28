'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.floor(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return display.on('change', (latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

interface MetricItemProps {
  value: string;
  label: string;
  index: number;
}

function parseValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^(\$)?(\d+(?:\.\d+)?)(.*?)$/);
  if (match) {
    return {
      prefix: match[1] || '',
      num: parseFloat(match[2]),
      suffix: match[3] || '',
    };
  }
  return { prefix: '', num: 0, suffix: value };
}

function MetricItem({ value, label, index }: MetricItemProps) {
  const { num, prefix, suffix } = parseValue(value);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.2, 0.8, 0.2, 1]
      }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-[var(--jwus-accent)]/0 group-hover:bg-[var(--jwus-accent)]/5 transition-colors duration-500" />
      
      {/* Corner accents */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.3 }}
        className="absolute top-0 left-0 w-[12px] h-[12px] border-t-2 border-l-2 border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.3 }}
        className="absolute top-0 right-0 w-[12px] h-[12px] border-t-2 border-r-2 border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.3 }}
        className="absolute bottom-0 left-0 w-[12px] h-[12px] border-b-2 border-l-2 border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.3 }}
        className="absolute bottom-0 right-0 w-[12px] h-[12px] border-b-2 border-r-2 border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity"
      />
      
      <div className="relative p-[24px] text-center">
        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
          className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[var(--jwus-accent)]/50 to-transparent"
        />
        
        {/* Number */}
        <div className="text-[clamp(32px,6vw,48px)] text-[var(--jwus-ink)] mb-[8px] font-normal">
          <AnimatedCounter value={num} prefix={prefix} suffix={suffix} duration={2 + index * 0.3} />
        </div>
        
        {/* Label with typing effect */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.8 }}
          className="text-[11px] uppercase tracking-[0.2em] text-[var(--jwus-deep)]"
        >
          {label}
        </motion.p>
        
        {/* Pulse dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 1 }}
          className="absolute bottom-[8px] left-1/2 -translate-x-1/2"
        >
          <span className="flex h-[6px] w-[6px]">
            <span className="animate-ping absolute inline-flex h-full w-full bg-[var(--jwus-accent)] opacity-75" />
            <span className="relative inline-flex h-[6px] w-[6px] bg-[var(--jwus-accent)]" />
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface AnimatedMetricsProps {
  metrics: Array<{ value: string; label: string }>;
}

export function AnimatedMetrics({ metrics }: AnimatedMetricsProps) {
  return (
    <div className="relative">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--jwus-accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--jwus-accent) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Scanning line effect */}
      <motion.div
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--jwus-accent)]/30 to-transparent pointer-events-none"
      />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-[12px] mb-[32px] px-[24px]"
      >
        <div className="w-[8px] h-[8px] bg-[var(--jwus-success)]" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--jwus-deep)]">
          [ LIVE METRICS ]
        </span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--jwus-border)] to-transparent" />
      </motion.div>
      
      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[var(--jwus-border)]/20">
        {metrics.map((metric, i) => (
          <MetricItem key={metric.label} value={metric.value} label={metric.label} index={i} />
        ))}
      </div>
      
      {/* Footer status */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
        className="flex items-center justify-between mt-[24px] px-[24px] text-[10px] text-[var(--jwus-deep)]"
      >
        <span>LAST UPDATED: REAL-TIME</span>
        <span className="flex items-center gap-[8px]">
          <span className="w-[6px] h-[6px] bg-[var(--jwus-success)] animate-pulse" />
          TRACKING ACTIVE
        </span>
      </motion.div>
    </div>
  );
}
