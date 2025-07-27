import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset & Base Styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fonts.primary};
    font-size: ${({ theme }) => theme.typography.sizes.base};
    font-weight: ${({ theme }) => theme.typography.weights.normal};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    color: ${({ theme }) => theme.colors.primary.black};
    background-color: ${({ theme }) => theme.colors.primary.white};
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
  }

  /* Enhanced Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fonts.display};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    color: ${({ theme }) => theme.colors.primary.black};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.sizes['6xl']};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: ${({ theme }) => theme.typography.sizes['5xl']};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.sizes['4xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.sizes['4xl']};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.sizes['3xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.sizes.xl};
    }
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.neutrals[700]};
    line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  }

  a {
    color: ${({ theme }) => theme.colors.gold.primary};
    text-decoration: none;
    transition: all ${({ theme }) => theme.transitions.base};
    
    &:hover {
      color: ${({ theme }) => theme.colors.gold.dark};
      text-decoration: underline;
    }
  }

  /* Enhanced Button Styles */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${({ theme }) => theme.transitions.base};
    
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.gold.primary};
      outline-offset: 2px;
    }
  }

  /* Enhanced Image Styles */
  img {
    display: block;
    max-width: 100%;
    height: auto;
    transition: opacity ${({ theme }) => theme.transitions.base};
  }

  /* Enhanced Form Styles */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: 1px solid ${({ theme }) => theme.colors.neutrals[300]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    transition: all ${({ theme }) => theme.transitions.base};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.gold.primary};
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.neutrals[400]};
    }
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutrals[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutrals[300]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    
    &:hover {
      background: ${({ theme }) => theme.colors.gold.primary};
    }
  }

  /* Selection Styles */
  ::selection {
    background-color: ${({ theme }) => theme.colors.gold.champagne};
    color: ${({ theme }) => theme.colors.primary.black};
  }

  /* Loading Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes goldShimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  @keyframes logoFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes luxuryGlow {
    0%, 100% {
      box-shadow: ${({ theme }) => theme.shadows.gold};
    }
    50% {
      box-shadow: ${({ theme }) => theme.shadows.goldHover};
    }
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .fade-in {
    animation: fadeIn 0.6s ${({ theme }) => theme.transitions.easing.easeOut} forwards;
  }

  .slide-up {
    animation: slideUp 0.8s ${({ theme }) => theme.transitions.easing.luxury} forwards;
  }

  .luxury-glow {
    animation: luxuryGlow 3s ${({ theme }) => theme.transitions.easing.easeInOut} infinite;
  }

  /* Focus Management */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    html {
      scroll-behavior: auto;
    }
  }
`;

// Styled Components Utilities
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.spacing[4]};
  }
`;

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[20]} 0;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[16]} 0;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[12]} 0;
  }
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface GridProps {
  gap?: string;
  columns?: string;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  gap: ${({ gap, theme }) => theme.spacing[gap || '6']};
  grid-template-columns: ${({ columns }) => columns || 'repeat(auto-fit, minmax(300px, 1fr))'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ size, theme }) => {
    switch (size) {
      case 'sm': return `${theme.spacing[2]} ${theme.spacing[4]}`;
      case 'lg': return `${theme.spacing[4]} ${theme.spacing[8]}`;
      default: return `${theme.spacing[3]} ${theme.spacing[6]}`;
    }
  }};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'sm': return theme.typography.sizes.sm;
      case 'lg': return theme.typography.sizes.lg;
      default: return theme.typography.sizes.base;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: 1;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  border: none;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.gradients.gold};
          color: ${theme.colors.primary.white};
          box-shadow: ${theme.shadows.gold};
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.goldHover};
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return `
          background: transparent;
          color: ${theme.colors.primary.black};
          border: 2px solid ${theme.colors.primary.black};
          
          &:hover {
            background: ${theme.colors.primary.black};
            color: ${theme.colors.primary.white};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.gold.primary};
          border: 1px solid ${theme.colors.gold.primary};
          
          &:hover {
            background: ${theme.colors.gold.champagne};
            color: ${theme.colors.primary.black};
          }
        `;
      default:
        return `
          background: ${theme.colors.gradients.gold};
          color: ${theme.colors.primary.white};
          box-shadow: ${theme.shadows.gold};
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

interface CardProps {
  featured?: boolean;
}

export const Card = styled.div<CardProps>`
  background: ${({ theme }) => theme.colors.primary.white};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.base};
  transition: all ${({ theme }) => theme.transitions.smooth};
  border: 1px solid ${({ theme }) => theme.colors.neutrals[100]};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.gold.champagne};
  }
  
  ${({ featured, theme }) => featured && `
    border: 2px solid ${theme.colors.gold.primary};
    box-shadow: ${theme.shadows.gold};
    
    &:hover {
      box-shadow: ${theme.shadows.goldHover};
    }
  `}
`;

export default GlobalStyles;