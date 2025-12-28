'use client';

import { useEffect, useRef, useCallback } from 'react';

const CURSOR_SIZE = 8;
const CURSOR_SIZE_HOVER = 12;

export function CursorFX() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const stateRef = useRef({ isVisible: false, isHovering: false, label: '' });
  const isDesktopRef = useRef(false);

  // Single RAF loop for smooth updates
  const updateCursor = useCallback(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    
    if (cursor) {
      // Direct GPU-accelerated transform
      cursor.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`;
      cursor.style.opacity = stateRef.current.isVisible ? '1' : '0';
      
      const size = stateRef.current.isHovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
      cursor.style.clipPath = stateRef.current.isHovering 
        ? 'none' 
        : 'polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)';
    }
    
    if (label) {
      label.style.transform = `translate3d(${targetRef.current.x + 16}px, ${targetRef.current.y + 16}px, 0)`;
      label.style.opacity = stateRef.current.isVisible && stateRef.current.isHovering ? '1' : '0';
      label.textContent = stateRef.current.label;
    }
    
    rafRef.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    // Check if desktop with fine pointer
    const checkDesktop = () => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const noReducedMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      isDesktopRef.current = isFinePointer && noReducedMotion;
    };
    
    checkDesktop();
    
    if (!isDesktopRef.current) return;

    // Start RAF loop
    rafRef.current = requestAnimationFrame(updateCursor);

    // Passive event listeners for better scroll performance
    const onMouseMove = (e: MouseEvent) => {
      stateRef.current.isVisible = true;
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onMouseLeave = () => {
      stateRef.current.isVisible = false;
    };

    const onMouseEnter = () => {
      stateRef.current.isVisible = true;
    };

    // Throttled hover detection
    let lastHoverCheck = 0;
    const onMouseOver = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastHoverCheck < 50) return; // Throttle to 20fps
      lastHoverCheck = now;
      
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      stateRef.current.isHovering = !!interactive;
      
      if (interactive) {
        const customLabel = interactive.getAttribute('data-cursor-label');
        const tagName = interactive.tagName.toLowerCase();
        if (customLabel) {
          stateRef.current.label = customLabel;
        } else if (tagName === 'a') {
          stateRef.current.label = 'LINK';
        } else if (tagName === 'button' || interactive.getAttribute('role') === 'button') {
          stateRef.current.label = 'CLICK';
        } else if (tagName === 'input' || tagName === 'textarea') {
          stateRef.current.label = 'TYPE';
        } else {
          stateRef.current.label = 'SELECT';
        }
      } else {
        stateRef.current.label = '';
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [updateCursor]);

  // Check desktop on client only
  if (typeof window === 'undefined') return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="pixel-cursor"
        style={{ willChange: 'transform, opacity' }}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className="pixel-cursor-label"
        style={{ willChange: 'transform, opacity' }}
        aria-hidden="true"
      />
    </>
  );
}
