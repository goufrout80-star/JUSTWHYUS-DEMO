'use client';

import { useEffect, useRef } from 'react';

export function InteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--mx', mx.toString());
      document.documentElement.style.setProperty('--my', my.toString());
    };

    // Check for touch device or reduced motion
    const isTouchDevice = 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isTouchDevice && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={gridRef}
      className="interactive-grid"
      aria-hidden="true"
    >
      {/* Scanner light that follows mouse */}
      <div className="scanner-light" />
      {/* Scanline animation */}
      <div className="scanlines" />
    </div>
  );
}
