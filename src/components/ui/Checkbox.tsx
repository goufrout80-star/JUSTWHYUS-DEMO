'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start gap-[12px]">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className={cn(
              'peer w-[20px] h-[20px] appearance-none cursor-pointer',
              'bg-[var(--jwus-surface)] border border-[var(--jwus-border)] rounded-[4px]',
              'transition-all duration-[var(--dur-fast)] ease-[var(--ease)]',
              'hover:border-[var(--jwus-border-hover)]',
              'focus:outline-none focus:ring-[2px] focus:ring-[var(--jwus-focus)]/20 focus:border-[var(--jwus-focus)]',
              'checked:bg-[var(--jwus-accent)] checked:border-[var(--jwus-accent)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          <svg
            className="absolute w-[12px] h-[12px] text-[var(--jwus-bg)] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {(label || hint) && (
          <div className="pt-[1px]">
            {label && (
              <label
                htmlFor={inputId}
                className="text-[16px] leading-[24px] text-[var(--jwus-ink)] cursor-pointer"
              >
                {label}
              </label>
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

Checkbox.displayName = 'Checkbox';
