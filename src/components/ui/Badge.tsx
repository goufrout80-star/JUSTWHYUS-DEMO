import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'accent' | 'success' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--jwus-surface)] text-[var(--jwus-ink)] border-[var(--jwus-border)]',
  accent: 'bg-[var(--jwus-accent)]/10 text-[var(--jwus-accent)] border-[var(--jwus-accent)]/20',
  success: 'bg-[var(--jwus-success)]/10 text-[var(--jwus-success)] border-[var(--jwus-success)]/20',
  error: 'bg-[var(--jwus-error)]/10 text-[var(--jwus-error)] border-[var(--jwus-error)]/20',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-[12px] py-[4px]',
        'text-[12px] leading-[16px] font-medium',
        'rounded-[var(--radius-pill)] border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
