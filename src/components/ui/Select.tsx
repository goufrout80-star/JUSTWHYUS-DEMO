'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, id, options, placeholder, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[10px] leading-[16px] text-[var(--jwus-deep)] mb-[8px] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-[var(--btn-md)] px-[12px] pr-[36px]',
              'bg-[var(--jwus-bg)] text-[var(--jwus-ink)]',
              'border border-[var(--jwus-border)]',
              'text-[12px] leading-[20px]',
              'appearance-none cursor-pointer',
              'transition-all duration-[var(--dur-fast)]',
              'hover:border-[var(--jwus-border-hover)]',
              'focus:outline-none focus:border-[var(--jwus-accent)] focus:shadow-[0_0_0_2px_var(--jwus-accent)]',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--jwus-surface)]',
              error && 'border-[var(--jwus-error)] focus:border-[var(--jwus-error)] focus:shadow-[0_0_0_2px_var(--jwus-error)]',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Pixel arrow indicator */}
          <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-[var(--jwus-deep)]">
            <span className="block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-current" />
          </div>
        </div>
        {hint && !error && (
          <p className="mt-[6px] text-[10px] leading-[16px] text-[var(--jwus-deep)]">
            {hint}
          </p>
        )}
        {error && (
          <p className="mt-[6px] text-[10px] leading-[16px] text-[var(--jwus-error)] flex items-center gap-[4px]">
            <span className="inline-block w-[6px] h-[6px] bg-[var(--jwus-error)]" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
