'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full min-h-[100px] px-[12px] py-[10px]',
            'bg-[var(--jwus-bg)] text-[var(--jwus-ink)]',
            'border border-[var(--jwus-border)]',
            'text-[12px] leading-[20px]',
            'placeholder:text-[var(--jwus-muted)]',
            'resize-y',
            'transition-all duration-[var(--dur-fast)]',
            'hover:border-[var(--jwus-border-hover)]',
            'focus:outline-none focus:border-[var(--jwus-accent)] focus:shadow-[0_0_0_2px_var(--jwus-accent)]',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--jwus-surface)]',
            error && 'border-[var(--jwus-error)] focus:border-[var(--jwus-error)] focus:shadow-[0_0_0_2px_var(--jwus-error)]',
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
