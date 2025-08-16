import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const LogoContainer = styled(motion.div)`
  display: block;
  max-width: 400px;
  width: 100%;
  height: 120px;
  margin: ${({ theme }) => theme.spacing[4]} 0;
  background: transparent;
  transition: all ${({ theme }) => theme.transitions.smooth};
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    transform: scale(1.03);
    filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.4));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 350px;
    height: 100px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 300px;
    height: 90px;
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 260px;
    height: 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 220px;
    height: 70px;
  }
`;

const LogoImage = styled.img`
  height: 100%;
  width: auto;
  max-width: 100%;
  display: block;
  object-fit: contain;
  background: transparent;
  transition: all ${({ theme }) => theme.transitions.smooth};

  &:hover {
    filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.3));
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

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold.primary};
    outline-offset: 2px;
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

  // Array of all your nail art images (memoized to prevent recreating on every render)
  const heroImages = useMemo(() => [
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
  ], []);

  // Navigation functions (memoized to prevent recreating on every render)
  const goToSlide = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex(currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1);
  }, [currentImageIndex, heroImages.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex(currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1);
  }, [currentImageIndex, heroImages.length]);

  // Image preloading for smooth transitions
  useEffect(() => {
    heroImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, [heroImages]);

  // Auto-slide functionality with pause on focus/hover
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).closest('[data-carousel="true"]')) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrevious();
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
        if (e.key >= '1' && e.key <= '8') {
          e.preventDefault();
          const index = parseInt(e.key) - 1;
          if (index < heroImages.length) {
            goToSlide(index);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [heroImages.length, goToPrevious, goToNext, goToSlide]);

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
            <LogoContainer
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogoImage
                src="/nakhakala-logo-transparent.png"
                alt="Nakhakala - Premium Nail Artistry"
              />
            </LogoContainer>
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
            <CarouselContainer data-carousel="true" tabIndex={0}>
              {/* Screen reader announcement */}
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                Image {currentImageIndex + 1} of {heroImages.length}: {heroImages[currentImageIndex].title}
              </div>
              
              <AnimatePresence mode="wait">
                <HeroImage
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex].src}
                  alt={heroImages[currentImageIndex].alt}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  role="img"
                />
              </AnimatePresence>
              
              {/* Carousel Controls */}
              <CarouselControls role="group" aria-label="Carousel navigation">
                <CarouselButton
                  onClick={goToPrevious}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous nail art image"
                  title="Previous image (Left arrow key)"
                >
                  ←
                </CarouselButton>
                <CarouselButton
                  onClick={goToNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next nail art image"
                  title="Next image (Right arrow key)"
                >
                  →
                </CarouselButton>
              </CarouselControls>

              {/* Carousel Indicators */}
              <CarouselIndicators role="group" aria-label="Choose slide">
                {heroImages.map((image, index) => (
                  <Indicator
                    key={index}
                    active={index === currentImageIndex}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    role="button"
                    aria-label={`Go to slide ${index + 1}: ${image.title}`}
                    aria-pressed={index === currentImageIndex}
                    title={`Slide ${index + 1}: ${image.title} (Press ${index + 1} key)`}
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