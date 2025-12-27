'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start gap-[12px]">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            className={cn(
              'peer w-[20px] h-[20px] appearance-none cursor-pointer',
              'bg-[var(--jwus-surface)] border border-[var(--jwus-border)] rounded-full',
              'transition-all duration-[var(--dur-fast)] ease-[var(--ease)]',
              'hover:border-[var(--jwus-border-hover)]',
              'focus:outline-none focus:ring-[2px] focus:ring-[var(--jwus-focus)]/20 focus:border-[var(--jwus-focus)]',
              'checked:border-[var(--jwus-accent)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          <div className="absolute w-[10px] h-[10px] rounded-full bg-[var(--jwus-accent)] pointer-events-none scale-0 peer-checked:scale-100 transition-transform duration-[var(--dur-fast)]" />
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

Radio.displayName = 'Radio';
