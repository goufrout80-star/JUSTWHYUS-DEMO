import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/effects';

interface QuoteCardProps {
  quote: string;
  author?: string;
  role?: string;
  className?: string;
}

export function QuoteCard({ quote, author, role, className }: QuoteCardProps) {
  return (
    <ScrollReveal>
      <blockquote
        className={cn(
          'p-[32px] rounded-[var(--radius-panel)]',
          'bg-[var(--jwus-surface)] border border-[var(--jwus-border)]',
          className
        )}
      >
        <p className="text-[24px] leading-[36px] text-[var(--jwus-ink)] font-medium mb-[24px]">
          &ldquo;{quote}&rdquo;
        </p>
        {(author || role) && (
          <footer className="flex items-center gap-[8px]">
            {author && (
              <cite className="text-[16px] leading-[24px] text-[var(--jwus-ink)] not-italic font-medium">
                {author}
              </cite>
            )}
            {author && role && (
              <span className="text-[var(--jwus-muted)]">·</span>
            )}
            {role && (
              <span className="text-[14px] leading-[20px] text-[var(--jwus-deep)]">
                {role}
              </span>
            )}
          </footer>
        )}
      </blockquote>
    </ScrollReveal>
  );
}
