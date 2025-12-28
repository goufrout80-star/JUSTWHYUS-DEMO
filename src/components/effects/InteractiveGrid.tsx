'use client';

import { useEffect, useRef, useCallback } from 'react';

export function InteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastUpdate = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle to 30fps for better INP
    const now = performance.now();
    if (now - lastUpdate.current < 33) return;
    lastUpdate.current = now;

    // Use RAF for smooth updates without blocking
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--mx', mx.toFixed(3));
      document.documentElement.style.setProperty('--my', my.toFixed(3));
    });
  }, []);

  useEffect(() => {
    // Check for touch device or reduced motion
    const isTouchDevice = 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isTouchDevice && !prefersReducedMotion) {
      // Passive listener for better INP score
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div 
      ref={gridRef}
      className="interactive-grid"
      aria-hidden="true"
      style={{ contain: 'layout style paint' }}
    >
      <div className="scanner-light" style={{ willChange: 'transform' }} />
      <div className="scanlines" />
    </div>
  );
}
