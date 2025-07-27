import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Container } from '../styles/GlobalStyles';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const BrandSection = styled(Section)`
  background: ${({ theme }) => theme.colors.primary.white};
  position: relative;
  overflow: hidden;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background: ${({ theme }) => theme.colors.gradients.gold};
    border-radius: 50%;
    opacity: 0.05;
    pointer-events: none;
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.05;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 0.1;
    }
  }
`;

const BrandContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
`;

const TaglineContainer = styled(motion.div)`
  position: relative;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.primary.white};
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 2px solid ${({ theme }) => theme.colors.gold.champagne};
  backdrop-filter: blur(20px);
  max-width: 600px;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.gradients.soft};
    border-radius: ${({ theme }) => theme.borderRadius['3xl']};
    opacity: 0.7;
    z-index: -1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
    margin: 0 ${({ theme }) => theme.spacing[4]};
  }
`;

const Tagline = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-style: italic;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.gold.primary};
  letter-spacing: 1px;
  line-height: ${({ theme }) => theme.typography.lineHeights.snug};
  margin: 0;
  position: relative;
  background: ${({ theme }) => theme.colors.gradients.gold};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientFlow 3s ease-in-out infinite;

  &::before {
    content: '"';
    position: absolute;
    left: -${({ theme }) => theme.spacing[4]};
    top: -${({ theme }) => theme.spacing[2]};
    font-size: ${({ theme }) => theme.typography.sizes['4xl']};
    color: ${({ theme }) => theme.colors.gold.light};
    opacity: 0.6;
  }

  &::after {
    content: '"';
    position: absolute;
    right: -${({ theme }) => theme.spacing[4]};
    bottom: -${({ theme }) => theme.spacing[2]};
    font-size: ${({ theme }) => theme.typography.sizes['4xl']};
    color: ${({ theme }) => theme.colors.gold.light};
    opacity: 0.6;
  }

  @keyframes gradientFlow {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
`;

const FloatingAccents = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingAccent = styled(motion.div)<{ size: number }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ theme }) => theme.colors.gold.champagne};
  border-radius: 50%;
  opacity: 0.4;
`;

const Sparkle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.colors.gold.primary};
  border-radius: 50%;
  opacity: 0.8;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.gold.primary} 0%, transparent 70%);
  }
`;

const BrandFeature: React.FC = () => {
  const { ref, inView } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const taglineVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 2,
        repeat: Infinity
      },
    },
  };

  return (
    <BrandSection ref={ref}>
      <FloatingAccents>
        {/* Floating decorative elements */}
        {[...Array(8)].map((_, i) => (
          <FloatingAccent
            key={`accent-${i}`}
            size={15 + Math.random() * 25}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Sparkle effects */}
        {[...Array(12)].map((_, i) => (
          <Sparkle
            key={`sparkle-${i}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={sparkleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: 2 + Math.random() * 3
            }}
          />
        ))}
      </FloatingAccents>

      <BrandContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <TaglineContainer
          variants={taglineVariants}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)',
            transition: { duration: 0.3 }
          }}
        >
          <Tagline
            variants={taglineVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            Where Art Meets Your Fingertips
          </Tagline>
        </TaglineContainer>
      </BrandContainer>
    </BrandSection>
  );
};

export default BrandFeature;