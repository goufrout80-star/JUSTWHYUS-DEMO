'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--jwus-accent)] text-[var(--jwus-bg)] border border-[var(--jwus-accent)]
    hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0_var(--jwus-accent)]
    active:translate-x-0 active:translate-y-0 active:shadow-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none
  `,
  secondary: `
    bg-[var(--jwus-surface)] text-[var(--jwus-ink)] border border-[var(--jwus-border)]
    hover:border-[var(--jwus-accent)] hover:text-[var(--jwus-accent)]
    hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0_var(--jwus-border)]
    active:translate-x-0 active:translate-y-0 active:shadow-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0
  `,
  ghost: `
    bg-transparent text-[var(--jwus-ink)] border border-transparent
    hover:border-[var(--jwus-border)] hover:bg-[var(--jwus-surface)]
    active:bg-[var(--jwus-surface-hover)]
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-[var(--btn-sm)] px-[12px] text-[10px] gap-[6px]',
  md: 'h-[var(--btn-md)] px-[16px] text-[12px] gap-[8px]',
  lg: 'h-[var(--btn-lg)] px-[24px] text-[14px] gap-[10px]',
};

const iconSizes: Record<ButtonSize, string> = {
  sm: 'w-[12px] h-[12px]',
  md: 'w-[14px] h-[14px]',
  lg: 'w-[16px] h-[16px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center uppercase tracking-wider',
          'transition-all duration-[var(--dur-fast)]',
          'focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[var(--jwus-focus)]',
          variantStyles[variant],
          sizeStyles[size],
          isLoading && 'pointer-events-none',
          className
        )}
        disabled={disabled || isLoading}
        data-cursor-label="CLICK"
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-[8px]">
            <span className="inline-block w-[8px] h-[8px] border border-current animate-pulse" />
            <span>LOADING</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className={iconSizes[size]}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={iconSizes[size]}>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
