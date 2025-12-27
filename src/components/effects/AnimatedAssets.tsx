'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface Asset {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: 'Active' | 'In Development' | 'Coming Soon';
}

const STATUS_CONFIG = {
  'Active': { color: 'var(--jwus-success)', label: 'ONLINE', icon: '●' },
  'In Development': { color: 'var(--jwus-accent)', label: 'BUILDING', icon: '◐' },
  'Coming Soon': { color: 'var(--jwus-deep)', label: 'QUEUED', icon: '○' },
};

function PixelIcon({ index }: { index: number }) {
  const icons = [
    // Framework - grid pattern
    <svg key="0" viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="2" y="2" width="8" height="8" fill="currentColor" />
      <rect x="14" y="2" width="8" height="8" fill="currentColor" opacity="0.5" />
      <rect x="2" y="14" width="8" height="8" fill="currentColor" opacity="0.5" />
      <rect x="14" y="14" width="8" height="8" fill="currentColor" />
    </svg>,
    // Research - document
    <svg key="1" viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="4" y="2" width="16" height="20" fill="currentColor" opacity="0.3" />
      <rect x="6" y="6" width="8" height="2" fill="currentColor" />
      <rect x="6" y="10" width="12" height="2" fill="currentColor" />
      <rect x="6" y="14" width="10" height="2" fill="currentColor" />
      <rect x="6" y="18" width="6" height="2" fill="currentColor" />
    </svg>,
    // Guides - book
    <svg key="2" viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="2" y="4" width="20" height="16" fill="currentColor" opacity="0.3" />
      <rect x="11" y="4" width="2" height="16" fill="currentColor" />
      <rect x="4" y="7" width="5" height="2" fill="currentColor" />
      <rect x="4" y="11" width="5" height="2" fill="currentColor" />
      <rect x="15" y="7" width="5" height="2" fill="currentColor" />
      <rect x="15" y="11" width="5" height="2" fill="currentColor" />
    </svg>,
    // Templates - layers
    <svg key="3" viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="6" y="2" width="12" height="8" fill="currentColor" opacity="0.3" />
      <rect x="4" y="6" width="12" height="8" fill="currentColor" opacity="0.5" />
      <rect x="2" y="10" width="12" height="8" fill="currentColor" />
    </svg>,
  ];
  return icons[index % icons.length];
}

function AssetCard({ asset, index }: { asset: Asset; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const status = STATUS_CONFIG[asset.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/assets/${asset.slug}`}>
        <div className="relative border border-[var(--jwus-border)] bg-[var(--jwus-bg)] overflow-hidden transition-all duration-300 hover:border-[var(--jwus-accent)]">
          {/* Scan effect on hover */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={isHovered ? { y: '100%' } : { y: '-100%' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--jwus-accent)]/10 to-transparent pointer-events-none"
          />

          <div className="relative p-[24px] flex gap-[24px]">
            {/* Icon */}
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="w-[64px] h-[64px] flex-shrink-0 text-[var(--jwus-accent)] bg-[var(--jwus-surface)] p-[12px]"
            >
              <PixelIcon index={index} />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header row */}
              <div className="flex items-start justify-between gap-[12px] mb-[8px]">
                <div className="overflow-hidden">
                  <motion.h3
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    className="text-[16px] text-[var(--jwus-ink)] group-hover:text-[var(--jwus-accent)] transition-colors truncate"
                  >
                    {asset.title}
                  </motion.h3>
                </div>
                
                {/* Status indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="flex items-center gap-[6px] flex-shrink-0"
                >
                  <motion.span
                    animate={asset.status === 'Active' ? { opacity: [1, 0.5, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ color: status.color }}
                    className="text-[12px]"
                  >
                    {status.icon}
                  </motion.span>
                  <span className="text-[9px] uppercase tracking-wider" style={{ color: status.color }}>
                    {status.label}
                  </span>
                </motion.div>
              </div>

              {/* Category */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-[10px] uppercase tracking-[0.2em] text-[var(--jwus-deep)] mb-[12px]"
              >
                [{asset.category}]
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="text-[12px] text-[var(--jwus-deep)] leading-relaxed line-clamp-2"
              >
                {asset.description}
              </motion.p>

              {/* Access indicator */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                className="mt-[16px] pt-[12px] border-t border-[var(--jwus-border)]/50 flex items-center justify-between"
              >
                <span className="text-[10px] text-[var(--jwus-deep)] uppercase tracking-wider">
                  {asset.status === 'Active' ? 'REQUEST ACCESS' : 'NOTIFY ME'}
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[var(--jwus-accent)] text-[12px]"
                >
                  →
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-[12px] h-[12px] border-t-2 border-l-2 border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-[12px] h-[12px] border-t-2 border-r-2 border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-[12px] h-[12px] border-b-2 border-l-2 border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-[12px] h-[12px] border-b-2 border-r-2 border-[var(--jwus-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Index number */}
          <div className="absolute bottom-[8px] right-[12px] text-[10px] font-mono text-[var(--jwus-border)]">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FloatingPixels() {
  const pixels = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 4,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pixels.map((pixel) => (
        <motion.div
          key={pixel.id}
          className="absolute bg-[var(--jwus-accent)]"
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            width: pixel.size,
            height: pixel.size,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [0, -30],
          }}
          transition={{
            duration: pixel.duration,
            delay: pixel.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

interface AnimatedAssetsProps {
  assets: Asset[];
}

export function AnimatedAssets({ assets }: AnimatedAssetsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div ref={containerRef} className="relative py-[80px] bg-[var(--jwus-surface)] overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-[0.02]"
      >
        <div
          style={{
            backgroundImage: `
              linear-gradient(var(--jwus-accent) 1px, transparent 1px),
              linear-gradient(90deg, var(--jwus-accent) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            width: '100%',
            height: '120%',
          }}
        />
      </motion.div>

      <FloatingPixels />

      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-[24px] mb-[48px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-[24px]"
        >
          <div>
            {/* Label with terminal style */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              viewport={{ once: true }}
              className="flex items-center gap-[12px] mb-[16px] overflow-hidden"
            >
              <span className="text-[var(--jwus-accent)] text-[12px]">$</span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-[10px] uppercase tracking-[0.3em] text-[var(--jwus-deep)]"
              >
                ls -la /assets
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-[8px] h-[14px] bg-[var(--jwus-accent)]"
              />
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[clamp(24px,4vw,36px)] text-[var(--jwus-ink)]"
              >
                Proprietary Frameworks
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-[12px] text-[var(--jwus-deep)] mt-[8px]"
            >
              Internal tools and systems. Select items available by request.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex gap-[24px]"
          >
            <div className="text-center">
              <div className="text-[24px] text-[var(--jwus-accent)]">{assets.filter(a => a.status === 'Active').length}</div>
              <div className="text-[9px] uppercase tracking-wider text-[var(--jwus-deep)]">ACTIVE</div>
            </div>
            <div className="w-[1px] bg-[var(--jwus-border)]" />
            <div className="text-center">
              <div className="text-[24px] text-[var(--jwus-ink)]">{assets.length}</div>
              <div className="text-[9px] uppercase tracking-wider text-[var(--jwus-deep)]">TOTAL</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Assets grid */}
      <div className="max-w-[1200px] mx-auto px-[24px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
          {assets.map((asset, i) => (
            <AssetCard key={asset.slug} asset={asset} index={i} />
          ))}
        </div>
      </div>

      {/* Footer decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-[1200px] mx-auto mt-[48px] px-[24px]"
      >
        <div className="flex items-center gap-[16px]">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--jwus-accent)]/50 to-transparent" />
          <span className="text-[10px] text-[var(--jwus-deep)] uppercase tracking-wider">EOF</span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-[var(--jwus-accent)]/50 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
