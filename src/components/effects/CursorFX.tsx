'use client';

import { useEffect, useRef } from 'react';

const CURSOR_SIZE = 8;
const CURSOR_SIZE_HOVER = 12;

export function CursorFX() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const labelText = useRef('');
  const isVisible = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    // Check if desktop with fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isFinePointer || prefersReducedMotion) {
      cursor.style.display = 'none';
      label.style.display = 'none';
      return;
    }

    // Direct DOM manipulation for 60fps - no React state updates
    const updateDOM = () => {
      const { x, y } = mousePos.current;
      const hovering = isHovering.current;
      const visible = isVisible.current;
      
      // Use left/top with transform for pixel-perfect positioning
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
      cursor.style.opacity = visible ? '1' : '0';
      cursor.style.width = (hovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE) + 'px';
      cursor.style.height = (hovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE) + 'px';
      
      label.style.left = (x + 16) + 'px';
      label.style.top = (y + 16) + 'px';
      label.style.opacity = visible && hovering && labelText.current ? '1' : '0';
    };

    // Mouse move - update position immediately, no throttling
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      isVisible.current = true;
      updateDOM();
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      updateDOM();
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      updateDOM();
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      isHovering.current = !!interactive;
      
      if (interactive) {
        const customLabel = interactive.getAttribute('data-cursor-label');
        const tagName = interactive.tagName.toLowerCase();
        if (customLabel) {
          labelText.current = customLabel;
        } else if (tagName === 'a') {
          labelText.current = 'LINK';
        } else if (tagName === 'button' || interactive.getAttribute('role') === 'button') {
          labelText.current = 'CLICK';
        } else if (tagName === 'input' || tagName === 'textarea') {
          labelText.current = 'TYPE';
        } else {
          labelText.current = 'SELECT';
        }
        label.textContent = labelText.current;
      } else {
        labelText.current = '';
      }
      updateDOM();
    };

    // Add listeners with passive for better performance
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pixel-cursor"
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className="pixel-cursor-label"
        aria-hidden="true"
      />
    </>
  );
}
