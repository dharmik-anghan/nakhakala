import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Button } from '../styles/GlobalStyles';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HeroSection = styled(Section)`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradients.hero};
  padding-top: 80px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(212, 165, 116, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[20]};
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[12]};
    text-align: center;
  }
`;

const HeroContent = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing[10]} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 2;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.sizes['6xl']};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.primary.black};
  font-family: ${({ theme }) => theme.typography.fonts.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: ${({ theme }) => theme.typography.sizes['5xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`;


const TitleSubtitle = styled(motion.span)`
  display: block;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  letter-spacing: 0.1em;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.8rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  max-width: 420px;
  font-weight: ${({ theme }) => theme.typography.weights.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: none;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const HeroImageContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
  }
`;

const CircularImageWrapper = styled(motion.div)`
  position: relative;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  transition: all ${({ theme }) => theme.transitions.smooth};
  margin: 0 auto;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.goldHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 350px;
    height: 350px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 280px;
    height: 280px;
  }
`;

const HeroImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;


const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)<{ size: number }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ theme }) => theme.colors.gold.champagne};
  border-radius: 50%;
  opacity: 0.6;
`;

const Hero: React.FC = () => {
  const { ref, inView } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    enter: {
      x: 100,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <HeroSection id="home" ref={ref}>
      <FloatingElements>
        {[...Array(6)].map((_, i) => (
          <FloatingElement
            key={i}
            size={20 + Math.random() * 40}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </FloatingElements>

      <HeroContainer
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <HeroContent variants={itemVariants}>
          <TitleSubtitle variants={itemVariants}>
            PREMIUM NAIL ARTISTRY
          </TitleSubtitle>
          
          <HeroTitle variants={itemVariants}>
            Elevate Your Style with Artistic Nails
          </HeroTitle>

          <HeroDescription variants={itemVariants}>
            Where elegance meets artistry. Experience premium press-on nails that feel like extensions, 
            last up to a month, and turn heads wherever you go.
          </HeroDescription>

          <HeroButtons variants={itemVariants}>
            <Button
              variant="primary"
              as={motion.button}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open('https://instagram.com/nakhakala', '_blank')}
            >
              Book Now
            </Button>
            <Button
              variant="secondary"
              as={motion.button}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const element = document.getElementById('gallery');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              View Our Work
            </Button>
          </HeroButtons>
        </HeroContent>

        <HeroImageContainer variants={itemVariants}>
          <CircularImageWrapper
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <HeroImage
              src="/assets/images/gallery/updated-hero-nail-art.png"
              alt="Premium Nail Art - Elegant nude and brown toned nails"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </CircularImageWrapper>
        </HeroImageContainer>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;