'use client';

import { useTheme } from '@/components/theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="
        flex items-center gap-[8px] px-[12px] py-[6px]
        border border-[var(--jwus-border)] bg-[var(--jwus-surface)]
        text-[var(--jwus-ink)] text-[10px] uppercase tracking-wider
        hover:border-[var(--jwus-accent)] hover:text-[var(--jwus-accent)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--jwus-accent)]
        transition-colors
      "
      data-cursor-label="TOGGLE"
    >
      {/* Pixel icon indicator */}
      <span 
        className="w-[8px] h-[8px] border border-current"
        style={{
          background: theme === 'dark' ? 'currentColor' : 'transparent',
        }}
      />
      <span>{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
    </button>
  );
}
