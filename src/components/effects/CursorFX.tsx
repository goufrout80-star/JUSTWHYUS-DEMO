'use client';

import { useEffect, useRef, useCallback } from 'react';

const CURSOR_SIZE = 8;
const CURSOR_SIZE_HOVER = 12;

export function CursorFX() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    x: 0,
    y: 0,
    isVisible: false,
    isHovering: false,
    label: '',
  });
  const rafRef = useRef<number>(0);
  const isDesktopRef = useRef(false);

  const updateCursor = useCallback(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    const state = stateRef.current;

    if (cursor) {
      cursor.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`;
      cursor.style.opacity = state.isVisible ? '1' : '0';
      cursor.style.width = `${state.isHovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE}px`;
      cursor.style.height = `${state.isHovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE}px`;
      cursor.style.clipPath = state.isHovering 
        ? 'none' 
        : 'polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)';
    }

    if (label) {
      label.style.transform = `translate3d(${state.x + 16}px, ${state.y + 16}px, 0)`;
      label.style.opacity = state.isVisible && state.isHovering && state.label ? '1' : '0';
      if (state.label) label.textContent = state.label;
    }
  }, []);

  useEffect(() => {
    const checkDesktop = () => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const noReducedMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      isDesktopRef.current = isFinePointer && noReducedMotion;
      
      if (cursorRef.current) {
        cursorRef.current.style.display = isDesktopRef.current ? 'block' : 'none';
      }
      if (labelRef.current) {
        labelRef.current.style.display = isDesktopRef.current ? 'block' : 'none';
      }
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onMouseMove = (e: MouseEvent) => {
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
      stateRef.current.isVisible = true;

      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateCursor();
          ticking = false;
        });
        ticking = true;
      }
    };

    const onMouseLeave = () => {
      stateRef.current.isVisible = false;
      updateCursor();
    };

    const onMouseEnter = () => {
      stateRef.current.isVisible = true;
      updateCursor();
    };

    const onMouseOver = (e: MouseEvent) => {
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
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateCursor]);

  return (
    <>
      <div
        ref={cursorRef}
        className="pixel-cursor"
        style={{ 
          willChange: 'transform, opacity',
          contain: 'layout style',
        }}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className="pixel-cursor-label"
        style={{ 
          willChange: 'transform, opacity',
          contain: 'layout style',
        }}
        aria-hidden="true"
      />
    </>
  );
}
