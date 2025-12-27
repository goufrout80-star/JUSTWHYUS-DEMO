// JUST WHY US - Design Tokens
// All values in pixels, mapped to CSS variables

export const tokens = {
  // 8pt spacing scale
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '16px',
    4: '24px',
    5: '32px',
    6: '40px',
    7: '48px',
    8: '64px',
    9: '80px',
    10: '96px',
    11: '120px',
    12: '160px',
    13: '200px',
  },
  layout: {
    container: '1200px',
    gridColumns: 12,
    gutter: '24px',
    pagePadding: {
      desktop: '96px',
      tablet: '40px',
      mobile: '24px',
    },
    sectionPadding: {
      desktop: '120px',
      desktopHero: '160px',
      mobile: '64px',
      mobileHero: '88px',
    },
  },
  colors: {
    light: {
      bg: '#fafafa',
      surface: '#ffffff',
      surfaceHover: '#f4f4f5',
      ink: '#0a0a0a',
      deep: '#71717a',
      muted: '#a1a1aa',
      accent: '#059669',
      accentHover: '#047857',
      border: '#e4e4e7',
      borderHover: '#d4d4d8',
      focus: '#059669',
      error: '#dc2626',
      success: '#16a34a',
    },
    dark: {
      bg: '#0a0a0a',
      surface: '#141414',
      surfaceHover: '#1f1f1f',
      ink: '#fafafa',
      deep: '#a1a1aa',
      muted: '#71717a',
      accent: '#4ade80',
      accentHover: '#22c55e',
      border: '#27272a',
      borderHover: '#3f3f46',
      focus: '#4ade80',
      error: '#f87171',
      success: '#4ade80',
    },
  },
  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans)',
      mono: 'var(--font-geist-mono)',
    },
    fontSize: {
      hero: ['64px', { lineHeight: '72px', letterSpacing: '-0.02em' }],
      h1: ['48px', { lineHeight: '56px', letterSpacing: '-0.02em' }],
      h2: ['36px', { lineHeight: '44px', letterSpacing: '-0.01em' }],
      h3: ['28px', { lineHeight: '36px', letterSpacing: '-0.01em' }],
      body: ['18px', { lineHeight: '28px' }],
      small: ['14px', { lineHeight: '20px' }],
    },
    maxWidth: '680px',
  },
  radii: {
    card: '12px',
    panel: '20px',
    pill: '999px',
  },
  borders: {
    default: '1px',
    focus: '2px',
  },
  shadows: {
    soft: '0 4px 24px -4px rgba(0, 0, 0, 0.08)',
    deep: '0 12px 48px -12px rgba(0, 0, 0, 0.24)',
    softDark: '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
    deepDark: '0 12px 48px -12px rgba(0, 0, 0, 0.6)',
  },
  blur: {
    sm: '8px',
    md: '12px',
  },
  button: {
    height: {
      sm: '36px',
      md: '44px',
      lg: '52px',
    },
    padding: {
      sm: '0 16px',
      md: '0 24px',
      lg: '0 32px',
    },
    iconSize: {
      sm: '16px',
      md: '20px',
      lg: '24px',
    },
  },
  cursor: {
    dotSize: '10px',
    ringSize: '32px',
    ringHover: '44px',
  },
  motion: {
    fast: '220ms',
    default: '360ms',
    slow: '850ms',
    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
} as const;

export type Tokens = typeof tokens;
