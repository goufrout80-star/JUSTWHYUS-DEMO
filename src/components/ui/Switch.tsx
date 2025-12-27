'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start gap-[12px]">
        <label htmlFor={inputId} className="relative inline-flex cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-[44px] h-[24px] rounded-full',
              'bg-[var(--jwus-border)] peer-checked:bg-[var(--jwus-accent)]',
              'transition-colors duration-[var(--dur-fast)] ease-[var(--ease)]',
              'peer-focus:ring-[2px] peer-focus:ring-[var(--jwus-focus)]/20',
              'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
              className
            )}
          />
          <div
            className={cn(
              'absolute top-[2px] left-[2px] w-[20px] h-[20px] rounded-full',
              'bg-white shadow-sm',
              'transition-transform duration-[var(--dur-fast)] ease-[var(--ease)]',
              'peer-checked:translate-x-[20px]'
            )}
          />
        </label>
        {(label || hint) && (
          <div className="pt-[2px]">
            {label && (
              <span className="text-[16px] leading-[24px] text-[var(--jwus-ink)]">
                {label}
              </span>
            )}
            {hint && (
              <p className="text-[14px] leading-[20px] text-[var(--jwus-deep)] mt-[4px]">
                {hint}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
