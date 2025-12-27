'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonVariant = 'default' | 'ghost';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  'aria-label': string;
}

const sizeStyles: Record<IconButtonSize, string> = {
  sm: 'w-[36px] h-[36px]',
  md: 'w-[44px] h-[44px]',
  lg: 'w-[52px] h-[52px]',
};

const iconSizes: Record<IconButtonSize, string> = {
  sm: '[&>svg]:w-[16px] [&>svg]:h-[16px]',
  md: '[&>svg]:w-[20px] [&>svg]:h-[20px]',
  lg: '[&>svg]:w-[24px] [&>svg]:h-[24px]',
};

const variantStyles: Record<IconButtonVariant, string> = {
  default: `
    bg-[var(--jwus-surface)] border border-[var(--jwus-border)]
    hover:bg-[var(--jwus-surface-hover)] hover:border-[var(--jwus-border-hover)]
  `,
  ghost: `
    bg-transparent
    hover:bg-[var(--jwus-surface)]
  `,
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'md', variant = 'default', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-[var(--radius-card)]',
          'text-[var(--jwus-ink)]',
          'transition-all duration-[var(--dur-fast)] ease-[var(--ease)]',
          'focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[var(--jwus-focus)] focus-visible:ring-offset-[2px] focus-visible:ring-offset-[var(--jwus-bg)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'active:scale-[0.95]',
          sizeStyles[size],
          iconSizes[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
