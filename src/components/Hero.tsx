import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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
  background-size: 200% 200%;
  animation: subtleGradientShift 6s ease-in-out infinite;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  letter-spacing: -0.02em;

  @keyframes subtleGradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const TitleSubtitle = styled(motion.span)`
  display: block;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin-top: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: 0.95rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.85rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.neutrals[700]};
  margin-bottom: ${({ theme }) => theme.spacing[10]};
  max-width: 480px;
  font-weight: ${({ theme }) => theme.typography.weights.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: none;
    text-align: center;
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
  width: 100%;
  max-width: 500px;
  height: 400px;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.goldHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 300px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
`;

const HeroImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const Indicator = styled(motion.div)<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active, theme }) => 
    active ? theme.colors.gold.primary : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.gold.light};
  }
`;

const CarouselControls = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
`;

const CarouselButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.black};
  font-size: 18px;
  font-weight: bold;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.white};
    transform: scale(1.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of all your nail art images
  const heroImages = [
    {
      src: '/assets/images/gallery/elegant-french-tips.jpeg',
      alt: 'Elegant French Tips - Premium nail art',
      title: 'Elegant French Tips'
    },
    {
      src: '/assets/images/gallery/luxury-gold-accent.jpeg',
      alt: 'Luxury Gold Accents - Sophisticated nail design',
      title: 'Luxury Gold Accents'
    },
    {
      src: '/assets/images/gallery/artistic-floral-design.jpeg',
      alt: 'Artistic Floral Design - Hand-painted nail art',
      title: 'Artistic Floral Design'
    },
    {
      src: '/assets/images/gallery/modern-geometric-pattern.jpeg',
      alt: 'Modern Geometric Pattern - Contemporary nail style',
      title: 'Modern Geometric'
    },
    {
      src: '/assets/images/gallery/classic-nude-elegance.jpeg',
      alt: 'Classic Nude Elegance - Timeless nail beauty',
      title: 'Classic Nude Elegance'
    },
    {
      src: '/assets/images/gallery/bold-statement-nails.jpeg',
      alt: 'Bold Statement Nails - Eye-catching design',
      title: 'Bold Statement'
    },
    {
      src: '/assets/images/gallery/glamorous-sparkle.jpeg',
      alt: 'Glamorous Sparkle - Dazzling nail finish',
      title: 'Glamorous Sparkle'
    },
    {
      src: '/assets/images/gallery/premium-ombre-design.jpeg',
      alt: 'Premium Ombré Design - Professional blending',
      title: 'Premium Ombré'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1);
  };

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
          <HeroTitle>
            <TitleSubtitle variants={itemVariants}>
              Premium Nail Artistry
            </TitleSubtitle>
            <TitleMain
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              Nakhakala
            </TitleMain>
          </HeroTitle>

          <HeroDescription variants={itemVariants}>
            Where elegance meets artistry. Experience premium press-on nails that feel like extensions, 
            last up to a month, and turn heads wherever you go. Your vision, our masterpiece.
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
          <ImageWrapper
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <CarouselContainer>
              <AnimatePresence mode="wait">
                <HeroImage
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex].src}
                  alt={heroImages[currentImageIndex].alt}
                  loading="eager"
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                />
              </AnimatePresence>
              
              {/* Carousel Controls */}
              <CarouselControls>
                <CarouselButton
                  onClick={goToPrevious}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </CarouselButton>
                <CarouselButton
                  onClick={goToNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </CarouselButton>
              </CarouselControls>

              {/* Carousel Indicators */}
              <CarouselIndicators>
                {heroImages.map((_, index) => (
                  <Indicator
                    key={index}
                    active={index === currentImageIndex}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </CarouselIndicators>

              <ImageOverlay>
                <motion.span
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {heroImages[currentImageIndex].title}
                </motion.span>
              </ImageOverlay>
            </CarouselContainer>
          </ImageWrapper>
        </HeroImageContainer>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;