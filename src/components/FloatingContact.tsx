import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: 16px;
    right: 16px;
  }
`;

const MainButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradients.gold};
  border: none;
  color: ${({ theme }) => theme.colors.primary.white};
  font-size: 24px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.goldHover};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.smooth};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(212, 175, 55, 0.5);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold.primary};
    outline-offset: 4px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 56px;
    height: 56px;
    font-size: 20px;
  }
`;

const ContactOption = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.primary.white};
  color: ${({ theme }) => theme.colors.primary.black};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  white-space: nowrap;
  border: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.gold.primary};
    color: ${({ theme }) => theme.colors.gold.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }
`;

const ContactIcon = styled.span`
  font-size: 18px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

const ContactText = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const PulseIndicator = styled(motion.div)`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00ff00;
  box-shadow: 0 0 0 4px rgba(0, 255, 0, 0.3);
`;

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  const mainButtonVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <FloatingContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}
          >
            <ContactOption
              href="https://instagram.com/nakhakala"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ContactIcon>📸</ContactIcon>
              <ContactText>Instagram DM</ContactText>
            </ContactOption>

            <ContactOption
              href="https://instagram.com/nakhakala"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ContactIcon>💌</ContactIcon>
              <ContactText>Book Now</ContactText>
            </ContactOption>
          </motion.div>
        )}
      </AnimatePresence>

      <MainButton
        onClick={toggleOpen}
        variants={mainButtonVariants}
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close booking options" : "Open booking options"}
        aria-expanded={isOpen}
      >
        <PulseIndicator
          variants={pulseVariants}
          animate="pulse"
        />
        {isOpen ? '✕' : '📸'}
      </MainButton>
    </FloatingContainer>
  );
};

export default FloatingContact;