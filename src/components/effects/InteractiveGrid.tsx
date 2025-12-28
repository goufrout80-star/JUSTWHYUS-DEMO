'use client';

import { useEffect, useRef } from 'react';

export function InteractiveGrid() {
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ mx: 0.5, my: 0.5 });

  useEffect(() => {
    // Check for touch device or reduced motion
    const isTouchDevice = 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) return;

    // Throttled update using RAF
    let lastUpdate = 0;
    const updateCSS = () => {
      const now = performance.now();
      if (now - lastUpdate > 50) { // Max 20fps for CSS updates
        document.documentElement.style.setProperty('--mx', targetRef.current.mx.toFixed(3));
        document.documentElement.style.setProperty('--my', targetRef.current.my.toFixed(3));
        lastUpdate = now;
      }
      rafRef.current = requestAnimationFrame(updateCSS);
    };
    rafRef.current = requestAnimationFrame(updateCSS);

    // Passive listener just stores values
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.mx = e.clientX / window.innerWidth;
      targetRef.current.my = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="interactive-grid gpu-accelerated"
      aria-hidden="true"
    >
      <div className="scanner-light" />
      <div className="scanlines" />
    </div>
  );
}
