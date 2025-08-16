import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Container } from '../styles/GlobalStyles';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AboutSection = styled(Section)`
  background: ${({ theme }) => theme.colors.primary.black};
  position: relative;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.primary.white};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.02) 100%);
    opacity: 0.1;
    pointer-events: none;
  }
`;

const AboutContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

const ContentWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[16]};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[12]};
    text-align: center;
  }
`;

const StorySection = styled(motion.div)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 2;
  }
`;

const ContactSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary.white};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing[2]};
    left: 0;
    width: 80px;
    height: 3px;
    background: ${({ theme }) => theme.colors.gradients.gold};
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: center;
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`;

const StoryText = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.neutrals[200]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const HighlightText = styled.span`
  color: ${({ theme }) => theme.colors.gold.champagne};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const InstagramCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.gradients.gold};
  }
`;

const InstagramIcon = styled(motion.div)`
  font-size: ${({ theme }) => theme.typography.sizes['5xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.gradients.gold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(212, 175, 55, 0.3));
`;

const InstagramTitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary.white};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const InstagramHandle = styled(motion.div)`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.gold.champagne};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-family: 'monospace';
`;

const InstagramDescription = styled(motion.p)`
  color: ${({ theme }) => theme.colors.neutrals[300]};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const InstagramButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.gradients.gold};
  color: ${({ theme }) => theme.colors.primary.black};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  transition: all ${({ theme }) => theme.transitions.base};
  border: 2px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.white};
    border-color: ${({ theme }) => theme.colors.gold.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
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

const FloatingAccent = styled(motion.div)<{ size: number }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ theme }) => theme.colors.gold.primary};
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(1px);
`;

const About: React.FC = () => {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 6,
        repeat: Infinity
      }
    }
  };

  return (
    <AboutSection id="about" ref={ref}>
      <FloatingElements>
        {[...Array(6)].map((_, i) => (
          <FloatingAccent
            key={i}
            size={12 + Math.random() * 20}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: i * 0.8 }}
          />
        ))}
      </FloatingElements>

      <AboutContainer>
        <ContentWrapper
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <StorySection>
            <SectionTitle variants={itemVariants}>
              About Nakhakala
            </SectionTitle>
            
            <StoryText variants={itemVariants}>
              Welcome to <HighlightText>Nakhakala</HighlightText>, where artistry meets luxury 
              in the world of nail design. Our name reflects our dedication to creating 
              <HighlightText> exquisite nail art</HighlightText> that transforms your hands 
              into canvases of beauty and self-expression.
            </StoryText>

            <StoryText variants={itemVariants}>
              Each design is <HighlightText>meticulously crafted</HighlightText> using premium 
              materials and innovative techniques. We believe that nail art is not just a 
              service, it's a <HighlightText>personalized luxury experience</HighlightText> that 
              reflects your unique style and personality.
            </StoryText>

            <StoryText variants={itemVariants}>
              From <HighlightText>classic elegance</HighlightText> to 
              <HighlightText> avant-garde designs</HighlightText>, we specialize in creating 
              nail art that makes a statement. Every visit is an opportunity to discover new 
              possibilities and express your individual aesthetic.
            </StoryText>
          </StorySection>

          <ContactSection>
            <InstagramCard
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)"
              }}
            >
              <InstagramIcon variants={itemVariants}>
                📸
              </InstagramIcon>
              
              <InstagramTitle variants={itemVariants}>
                Follow Our Journey
              </InstagramTitle>
              
              <InstagramHandle variants={itemVariants}>
                @nakhakala
              </InstagramHandle>
              
              <InstagramDescription variants={itemVariants}>
                Discover our latest creations, behind-the-scenes moments, and 
                nail art inspiration. Connect with us for bookings, consultations, 
                and to stay updated on our exclusive designs.
              </InstagramDescription>
              
              <InstagramButton
                href="https://instagram.com/nakhakala"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>✨</span>
                Visit Our Instagram
                <span>📱</span>
              </InstagramButton>
            </InstagramCard>
          </ContactSection>
        </ContentWrapper>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;