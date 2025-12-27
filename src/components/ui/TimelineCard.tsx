import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/effects';

interface TimelineStep {
  number: string;
  title: string;
  description: string;
}

interface TimelineCardProps {
  steps: TimelineStep[];
  className?: string;
}

export function TimelineCard({ steps, className }: TimelineCardProps) {
  return (
    <div className={cn('space-y-[32px]', className)}>
      {steps.map((step, index) => (
        <ScrollReveal key={step.number} delay={index * 0.1}>
          <div className="flex gap-[24px]">
            <div className="flex flex-col items-center">
              <div className="w-[48px] h-[48px] rounded-full bg-[var(--jwus-accent)]/10 border border-[var(--jwus-accent)]/20 flex items-center justify-center">
                <span className="text-[18px] font-medium text-[var(--jwus-accent)]">
                  {step.number}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-[1px] flex-1 bg-[var(--jwus-border)] mt-[16px]" />
              )}
            </div>
            <div className="pb-[32px]">
              <h3 className="text-[20px] leading-[28px] font-medium text-[var(--jwus-ink)] mb-[8px]">
                {step.title}
              </h3>
              <p className="text-[16px] leading-[24px] text-[var(--jwus-deep)]">
                {step.description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
