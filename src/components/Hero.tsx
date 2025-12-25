import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    top: -20%;
    right: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -10%;
    width: 40vw;
    height: 40vw;
    background: radial-gradient(circle, rgba(232, 196, 160, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
`;

const GlassContainer = styled(motion.div)`
  ${({ theme }) => theme.glass.frost};
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  padding: ${({ theme }) => theme.spacing[8]};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[12]};
  align-items: center;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[10]};
    padding: ${({ theme }) => theme.spacing[6]};
    text-align: center;
  }
`;

const HeroContent = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing[6]};
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 2;
    padding: ${({ theme }) => theme.spacing[2]};
  }
`;

const Badge = styled(motion.span)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.gradients.gold};
  color: ${({ theme }) => theme.colors.primary.white};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.gold};
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.sizes['7xl']};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.primary.black};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  
  span {
    display: block;
    background: linear-gradient(135deg, #2C2C2C 0%, #525252 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  i {
    font-style: italic;
    font-weight: ${({ theme }) => theme.typography.weights.light};
    color: ${({ theme }) => theme.colors.gold.dark};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.gold.dark};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: ${({ theme }) => theme.typography.sizes['6xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.sizes['5xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin-bottom: ${({ theme }) => theme.spacing[10]};
  max-width: 500px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ImageGrid = styled(motion.div)`
  position: relative;
  height: 600px;
  width: 100%;
  perspective: 1000px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 400px;
    order: 1;
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 300px;
  }
`;

const FloatingCard = styled(motion.div) <{ top: string; left: string; width: string; z: number }>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: ${({ width }) => width};
  aspect-ratio: 3/4;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.premium};
  border: 4px solid ${({ theme }) => theme.colors.primary.white};
  z-index: ${({ z }) => z};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DecorativeCircle = styled(motion.div) <{ size: string; color: string; top?: string; right?: string; bottom?: string; left?: string }>`
  position: absolute;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  background: ${({ color }) => color};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  filter: blur(40px);
  z-index: -1;
  opacity: 0.6;
`;

const Hero: React.FC = () => {
  const { ref, inView } = useScrollAnimation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);
  const y3 = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <HeroSection id="home" ref={ref}>
      <GlassContainer
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <HeroContent>
          <Badge
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            Premium Collection 2025
          </Badge>

          <HeroTitle
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span>Luxury at Your</span>
            <i>Fingertips</i>
          </HeroTitle>

          <HeroDescription
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Experience the perfect blend of artistry and elegance. Our handcrafted press-on nails
            deliver salon-quality perfection in minutes, designed for the modern muse who refuses to compromise.
          </HeroDescription>

          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              $variant="primary"
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://instagram.com/nakhakala', '_blank')}
            >
              Shop Collection
            </Button>
            <Button
              $variant="outline"
              as={motion.button}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('gallery');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              View Gallery
            </Button>
          </ButtonGroup>
        </HeroContent>

        <ImageGrid>
          <DecorativeCircle size="300px" color="#F4E4D6" top="-50px" right="-50px" />
          <DecorativeCircle size="200px" color="#E8C4A0" bottom="50px" left="50px" />

          <FloatingCard
            top="5%"
            left="5%"
            width="45%"
            z={3}
            style={{ y: y1 }}
            initial={{ opacity: 0, rotate: -5 }}
            animate={inView ? { opacity: 1, rotate: -5 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <img src="/assets/images/gallery/elegant-french-tips.jpeg" alt="Elegant French Tips" />
          </FloatingCard>

          <FloatingCard
            top="15%"
            left="45%"
            width="50%"
            z={2}
            style={{ y: y2 }}
            initial={{ opacity: 0, rotate: 5 }}
            animate={inView ? { opacity: 1, rotate: 5 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <img src="/assets/images/gallery/luxury-gold-accent.jpeg" alt="Luxury Gold" />
          </FloatingCard>

          <FloatingCard
            top="55%"
            left="20%"
            width="40%"
            z={4}
            style={{ y: y3 }}
            initial={{ opacity: 0, rotate: -2 }}
            animate={inView ? { opacity: 1, rotate: -2 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <img src="/assets/images/gallery/artistic-floral-design.jpeg" alt="Floral Design" />
          </FloatingCard>
        </ImageGrid>
      </GlassContainer>
    </HeroSection>
  );
};

export default Hero;