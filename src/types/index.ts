// Type definitions for Nakhakala project

// Type definitions for Nakhakala project

export interface Theme {
  colors: {
    primary: {
      black: string;
      softBlack: string;
      charcoal: string;
      white: string;
      offWhite: string;
      cream: string;
    };
    gold: {
      primary: string;
      light: string;
      dark: string;
      rose: string;
      champagne: string;
      bronze: string;
    };
    neutrals: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    gradients: {
      primary: string;
      gold: string;
      luxury: string;
      soft: string;
      hero: string;
      premium: string;
      glass: string;
      glassDark: string;
    };
  };
  glass: {
    clear: string;
    frost: string;
  };
  typography: {
    fonts: {
      primary: string;
      display: string;
      mono: string;
    };
    sizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
      '7xl': string;
      '8xl': string;
      '9xl': string;
    };
    weights: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;

    };
    lineHeights: {
      tight: number;
      snug: number;
      normal: number;
      relaxed: number;
      loose: number;
    };
  };
  spacing: Record<string, string>;
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
  transitions: {
    fast: string;
    base: string;
    smooth: string;
    slow: string;
    easing: Record<string, string>;
  };
  zIndex: Record<string, number | string>;
}

export interface NavItem {
  id: string;
  label: string;
  href?: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  description: string;
  categories: string[];
  featured?: boolean;
}

export interface Service {
  title: string;
  description: string;
  duration: string;
  price: string | number;
}

export interface ServiceCategory {
  icon: string;
  title: string;
  description: string;
  services: Service[];
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}
