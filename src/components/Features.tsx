import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Container, Grid, Card } from '../styles/GlobalStyles';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FeaturesSection = styled(Section)`
  background: ${({ theme }) => theme.colors.primary.white};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.05) 50%, transparent 100%);
    pointer-events: none;
  }
`;

const FeaturesGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing[16]};
  position: relative;
  z-index: 1;
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.primary.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.base};
  border: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  transition: all ${({ theme }) => theme.transitions.smooth};
  text-align: center;
  padding: ${({ theme }) => theme.spacing[10]} ${({ theme }) => theme.spacing[8]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradients.gold};
    transform: scaleX(0);
    transition: transform ${({ theme }) => theme.transitions.smooth};
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.goldHover};
  }
`;

const FeatureIcon = styled(motion.div)`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gradients.soft};
  border-radius: 50%;
  width: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.base};
  transition: all ${({ theme }) => theme.transitions.smooth};

  ${FeatureCard}:hover & {
    background: ${({ theme }) => theme.colors.gradients.gold};
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }
`;

const FeatureTitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary.black};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  transition: color ${({ theme }) => theme.transitions.base};

  ${FeatureCard}:hover & {
    color: ${({ theme }) => theme.colors.gold.primary};
  }
`;

const FeatureDescription = styled(motion.p)`
  color: ${({ theme }) => theme.colors.neutrals[600]};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary.black};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing[2]};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.colors.gradients.gold};
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0;
`;

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const { ref, inView } = useScrollAnimation();
  
  const features: Feature[] = [
    {
      icon: '✨',
      title: 'Premium Quality',
      description: 'Only the finest materials and techniques for extraordinary results that exceed expectations'
    },
    {
      icon: '🎨',
      title: 'Artistic Excellence',
      description: 'Bespoke designs crafted by master nail artists with years of professional experience'
    },
    {
      icon: '👑',
      title: 'Luxury Experience',
      description: 'Indulge in our exclusive premium service experience tailored for discerning clients'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <FeaturesSection id="features" ref={ref}>
      <motion.div
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem' }}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <SectionHeader variants={itemVariants}>
          <SectionTitle>
            Why Choose Nakhakala
          </SectionTitle>
          <SectionSubtitle>
            Experience the perfect blend of artistry, quality, and luxury in every design
          </SectionSubtitle>
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <FeatureIcon
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
              >
                {feature.icon}
              </FeatureIcon>
              
              <FeatureTitle
                whileHover={{ scale: 1.02 }}
              >
                {feature.title}
              </FeatureTitle>
              
              <FeatureDescription>
                {feature.description}
              </FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </motion.div>
    </FeaturesSection>
  );
};

export default Features;