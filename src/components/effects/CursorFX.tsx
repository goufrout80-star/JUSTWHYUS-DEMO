'use client';

import { useEffect, useRef } from 'react';

export function CursorFX() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Only show on desktop with fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) {
      cursor.style.display = 'none';
      return;
    }

    // Simple cursor follow - no labels, no hover detection
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    const onMouseEnter = () => {
      cursor.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        backgroundColor: 'var(--jwus-accent)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-100px, -100px)',
        marginLeft: '-4px',
        marginTop: '-4px',
        clipPath: 'polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)',
      }}
    />
  );
}
