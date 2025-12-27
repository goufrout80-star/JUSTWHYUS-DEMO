'use client';

import { cn } from '@/lib/utils';

interface AmbientGlowProps {
  className?: string;
  color?: 'accent' | 'white';
  size?: 'sm' | 'md' | 'lg';
  intensity?: 'low' | 'medium';
}

export function AmbientGlow({ 
  className,
  color = 'accent',
  size = 'md',
  intensity = 'low'
}: AmbientGlowProps) {
  const sizeClass = {
    sm: 'w-[200px] h-[200px]',
    md: 'w-[400px] h-[400px]',
    lg: 'w-[600px] h-[600px]',
  }[size];

  const colorValue = color === 'accent' ? 'var(--jwus-accent)' : '#ffffff';
  const opacityValue = intensity === 'low' ? '0.15' : '0.25';

  return (
    <div 
      className={cn(
        'pointer-events-none absolute rounded-full blur-[100px]',
        sizeClass,
        className
      )}
      style={{
        background: `radial-gradient(circle, ${colorValue} 0%, transparent 70%)`,
        opacity: opacityValue,
      }}
      aria-hidden="true"
    />
  );
}
