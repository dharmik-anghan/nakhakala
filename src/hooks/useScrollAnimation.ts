import { useInView } from 'react-intersection-observer';
import { AnimationOptions } from '../types';

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (options: AnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const { ref, inView, entry } = useInView({
    threshold,
    rootMargin,
    triggerOnce
  });

  return { ref, inView, entry };
};

// Hook for scroll progress
export const useScrollProgress = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px'
  });

  return { ref, inView };
};