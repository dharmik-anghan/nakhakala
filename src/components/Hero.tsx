import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Container, Button } from '../styles/GlobalStyles';
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
    background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[16]};
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
  font-size: ${({ theme }) => theme.typography.sizes['7xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: ${({ theme }) => theme.typography.sizes['6xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.sizes['5xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  }
`;

const TitleMain = styled(motion.span)`
  display: block;
  background: ${({ theme }) => theme.colors.gradients.premium};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 300% 300%;
  animation: gradientShift 4s ease-in-out infinite;

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const TitleSubtitle = styled(motion.span)`
  display: block;
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.gold.primary};
  margin-top: ${({ theme }) => theme.spacing[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  max-width: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: none;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};

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

const ImageWrapper = styled(motion.div)`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  transition: all ${({ theme }) => theme.transitions.smooth};

  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.goldHover};
  }
`;

const HeroImage = styled(motion.img)`
  width: 100%;
  height: auto;
  max-width: 500px;
  display: block;
  transition: all ${({ theme }) => theme.transitions.smooth};
`;

const ImageOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.gradients.luxury};
  opacity: 0;
  transition: all ${({ theme }) => theme.transitions.smooth};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.white};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.medium};

  ${ImageWrapper}:hover & {
    opacity: 0.8;
  }
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

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
          <HeroTitle>
            <TitleMain
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              Nakhakala
            </TitleMain>
            <TitleSubtitle variants={itemVariants}>
              Premium Press-On Nails
            </TitleSubtitle>
          </HeroTitle>

          <HeroDescription variants={itemVariants}>
            Where elegance meets artistry. Experience premium press-on nails that feel like extensions, 
            last up to a month, and turn heads wherever you go. Your vision, our masterpiece.
          </HeroDescription>

          <HeroButtons variants={itemVariants}>
            <Button
              variant="primary"
              as={motion.button}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToFeatures}
            >
              Explore Features
            </Button>
            <Button
              variant="secondary"
              as={motion.button}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open('https://instagram.com/nakhakala', '_blank')}
            >
              Order Now
            </Button>
          </HeroButtons>
        </HeroContent>

        <HeroImageContainer variants={itemVariants}>
          <ImageWrapper
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <HeroImage
              src="public/image.jpeg"
              alt="Premium Nail Art"
              loading="eager"
            />
            <ImageOverlay>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Luxury Craftsmanship
              </motion.span>
            </ImageOverlay>
          </ImageWrapper>
        </HeroImageContainer>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;