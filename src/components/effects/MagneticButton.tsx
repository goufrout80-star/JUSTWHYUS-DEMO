'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function MagneticButton({ 
  children, 
  className,
  href,
  onClick,
  variant = 'primary'
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || !buttonRef.current) return;

    const button = buttonRef.current;
    const strength = 0.3;

    const onMouseMove = (e: Event) => {
      const mouseEvent = e as globalThis.MouseEvent;
      const rect = button.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mousemove', onMouseMove);
    button.addEventListener('mouseleave', onMouseLeave);

    return () => {
      button.removeEventListener('mousemove', onMouseMove);
      button.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isDesktop]);

  const baseClasses = cn(
    'inline-flex items-center justify-center px-[var(--space-5)] py-[var(--space-3)] rounded-[var(--radius-pill)] font-medium text-[var(--text-body)] transition-all duration-[var(--dur)] ease-[var(--ease)]',
    {
      'bg-[var(--jwus-accent)] text-[var(--jwus-bg)] hover:brightness-110': variant === 'primary',
      'border border-[var(--jwus-ink)]/20 text-[var(--jwus-ink)] hover:border-[var(--jwus-ink)]/40 hover:bg-white/5': variant === 'secondary',
      'text-[var(--jwus-ink)] hover:text-[var(--jwus-accent)]': variant === 'ghost',
    },
    className
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
