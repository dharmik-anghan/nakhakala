import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradients.gold};
  border: none;
  color: ${({ theme }) => theme.colors.primary.white};
  font-size: 20px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.goldHover};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.smooth};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold.primary};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: 16px;
    left: 16px;
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
`;

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20
    }
  } as const;

  return (
    <AnimatePresence>
      {isVisible && (
        <BackToTopButton
          onClick={scrollToTop}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </BackToTopButton>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;