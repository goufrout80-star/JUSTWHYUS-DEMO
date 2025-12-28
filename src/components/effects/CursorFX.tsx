'use client';

import { useEffect, useRef, useState } from 'react';

const CURSOR_SIZE = 8;
const CURSOR_SIZE_HOVER = 12;

export function CursorFX() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkDesktop = () => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const noReducedMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktop(isFinePointer && noReducedMotion);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      posRef.current = { x: e.clientX, y: e.clientY };
      
      // Direct position update for pixel-perfect movement
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      if (label) {
        label.style.left = `${e.clientX + 16}px`;
        label.style.top = `${e.clientY + 16}px`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setIsHovering(!!interactive);
      
      // Get label from data attribute or element text
      if (interactive) {
        const customLabel = interactive.getAttribute('data-cursor-label');
        const tagName = interactive.tagName.toLowerCase();
        if (customLabel) {
          setHoverLabel(customLabel);
        } else if (tagName === 'a') {
          setHoverLabel('LINK');
        } else if (tagName === 'button' || interactive.getAttribute('role') === 'button') {
          setHoverLabel('CLICK');
        } else if (tagName === 'input' || tagName === 'textarea') {
          setHoverLabel('TYPE');
        } else {
          setHoverLabel('SELECT');
        }
      } else {
        setHoverLabel(null);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Pixel Crosshair Cursor */}
      <div
        ref={cursorRef}
        className="pixel-cursor"
        style={{
          width: isHovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE,
          height: isHovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE,
          opacity: isVisible ? 1 : 0,
          clipPath: isHovering ? 'none' : 'polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />
      {/* Hover Label */}
      {hoverLabel && (
        <div
          ref={labelRef}
          className="pixel-cursor-label"
          style={{
            opacity: isVisible && isHovering ? 1 : 0,
          }}
          aria-hidden="true"
        >
          {hoverLabel}
        </div>
      )}
    </>
  );
}
