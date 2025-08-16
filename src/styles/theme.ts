import { Theme } from '../types';

// Enhanced Theme System with Modern Color Grading
export const theme: Theme = {
  colors: {
    // Primary Palette - Sophisticated Black & White with Rich Accents
    primary: {
      black: '#0A0A0A',
      softBlack: '#1A1A1A',
      charcoal: '#2A2A2A',
      white: '#FFFFFF',
      offWhite: '#FAFAFA',
      cream: '#F8F6F3'
    },
    
    // Luxury Gold Gradient System
    gold: {
      primary: '#D4AF37',
      light: '#E6C76B',
      dark: '#B8941F',
      rose: '#E8B86D',
      champagne: '#F7E7CE',
      bronze: '#CD7F32'
    },
    
    // Sophisticated Neutral Gradients
    neutrals: {
      50: '#FAFAFA',
      100: '#F5F5F5', 
      200: '#E8E8E8',
      300: '#D3D3D3',
      400: '#A8A8A8',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    },
    
    // Gradient Definitions
    gradients: {
      primary: 'linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 100%)',
      gold: 'linear-gradient(135deg, #D4AF37 0%, #E6C76B 50%, #B8941F 100%)',
      luxury: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(212, 175, 55, 0.2) 100%)',
      soft: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
      hero: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F3 30%, #F5F5F5 100%)',
      premium: 'linear-gradient(135deg, #0A0A0A 0%, #D4AF37 30%, #B8941F 60%, #0A0A0A 100%)'
    }
  },
  
  // Enhanced Typography Scale
  typography: {
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "'Playfair Display', Georgia, serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace"
    },
    
    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
      '9xl': '8rem'       // 128px
    },
    
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },
  
  // Spacing System (8px base)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem'     // 256px
  },
  
  // Responsive Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px'
  },
  
  // Shadow System
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    
    // Luxury Shadows with Gold Accents
    gold: '0 10px 30px rgba(212, 175, 55, 0.3)',
    goldHover: '0 20px 40px rgba(212, 175, 55, 0.4)',
    premium: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.1)'
  },
  
  // Border Radius System
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  
  // Animation & Transition System
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '700ms cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Custom Easing Functions
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },
  
  // Z-Index System
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
};

// Utility functions for theme usage
export const getColor = (colorPath: string): string => {
  const keys = colorPath.split('.');
  return keys.reduce((obj: any, key) => obj?.[key], theme.colors) || '';
};

export const getSpacing = (size: string | number): string => {
  return typeof size === 'string' ? theme.spacing[size] || size : `${size}px`;
};

export const getBreakpoint = (size: keyof typeof theme.breakpoints): string => {
  return theme.breakpoints[size];
};

export default theme;