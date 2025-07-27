import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Container } from '../styles/GlobalStyles';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ServicesSection = styled(Section)`
  background: ${({ theme }) => theme.colors.gradients.soft};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.08) 50%, transparent 100%);
    pointer-events: none;
  }
`;

const ServicesContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing[16]};
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
    width: 80px;
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

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
  margin-top: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

const ServiceCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.primary.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.base};
  border: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  transition: all ${({ theme }) => theme.transitions.smooth};
  overflow: hidden;
  position: relative;

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

const ServiceHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[100]};
`;

const ServiceIcon = styled(motion.div)`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gradients.soft};
  border-radius: 50%;
  width: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing[4]};
  box-shadow: ${({ theme }) => theme.shadows.base};
  transition: all ${({ theme }) => theme.transitions.smooth};

  ${ServiceCard}:hover & {
    background: ${({ theme }) => theme.colors.gradients.gold};
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }
`;

const ServiceTitle = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary.black};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  transition: color ${({ theme }) => theme.transitions.base};

  ${ServiceCard}:hover & {
    color: ${({ theme }) => theme.colors.gold.primary};
  }
`;

const ServicePrice = styled(motion.div)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.gold.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ServiceDescription = styled(motion.p)`
  color: ${({ theme }) => theme.colors.neutrals[600]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0;
`;

const ServiceFeatures = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[8]};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.neutrals[700]};

  &::before {
    content: '✨';
    margin-right: ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.typography.sizes.base};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const BookingSection = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.gradients.soft};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gold.champagne};
`;

const BookingTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary.black};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

const BookingMethod = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.primary.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.base};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const BookingIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  min-width: 24px;
`;

const BookingText = styled.div`
  flex: 1;
  
  strong {
    color: ${({ theme }) => theme.colors.primary.black};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }
  
  a {
    color: ${({ theme }) => theme.colors.gold.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    
    &:hover {
      color: ${({ theme }) => theme.colors.gold.dark};
    }
  }
`;

const BookingNote = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`;

interface Service {
  icon: string;
  title: string;
  price: string;
  description: string;
  features: string[];
}

const Services: React.FC = () => {
  const { ref, inView } = useScrollAnimation();
  
  const services: Service[] = [
    {
      icon: '💅',
      title: 'Gel Polish on Natural Nails',
      price: '₹399',
      description: 'Professional gel polish application on your natural nails for long-lasting shine',
      features: [
        'Nail preparation and cuticle care',
        'Base coat application',
        'Premium gel polish',
        'Top coat for extra shine',
        'Lasts 2-3 weeks'
      ]
    },
    {
      icon: '🦶',
      title: 'Gel Polish (Feet)',
      price: '₹299',
      description: 'Beautiful gel polish application for your feet with professional finish',
      features: [
        'Foot nail preparation',
        'Cuticle care and shaping',
        'Long-lasting gel polish',
        'Professional application',
        'Perfect for sandal season'
      ]
    },
    {
      icon: '✨',
      title: 'Temporary Extensions',
      price: '₹550',
      description: 'Short-term nail extensions for special occasions and events',
      features: [
        'Custom length extensions',
        'Perfect for events',
        'Professional shaping',
        'Gel polish included',
        'Easy removal process'
      ]
    },
    {
      icon: '👑',
      title: 'Press-On Nails',
      price: '₹499',
      description: 'Custom-fitted press-on nails for instant glamour and convenience',
      features: [
        'Custom size fitting',
        'Various designs available',
        'Easy application',
        'Reusable options',
        'Perfect for busy lifestyles'
      ]
    },
    {
      icon: '🌟',
      title: 'Gel Overlay',
      price: '₹799',
      description: 'Protective gel overlay to strengthen and enhance your natural nails',
      features: [
        'Strengthens natural nails',
        'Adds shine and protection',
        'Natural nail enhancement',
        'Long-lasting durability',
        'Healthy nail growth support'
      ]
    },
    {
      icon: '💎',
      title: 'Gel Extensions (Half Tips)',
      price: '₹899',
      description: 'Professional gel extensions using half tips for natural-looking length',
      features: [
        'Half tip application',
        'Custom length and shape',
        'Professional gel overlay',
        'Natural appearance',
        'Strong and durable'
      ]
    },
    {
      icon: '🎨',
      title: 'Polygel Extensions',
      price: '₹799',
      description: 'Modern polygel technology for lightweight, strong, and flexible extensions',
      features: [
        'Lightweight feel',
        'Flexible and strong',
        'No damage to natural nails',
        'Custom shapes available',
        'Latest nail technology'
      ]
    },
    {
      icon: '🧹',
      title: 'Removal Services',
      price: 'From ₹199',
      description: 'Safe and professional removal of all types of nail enhancements',
      features: [
        'Gel Polish Removal - ₹199',
        'Extension Removal - ₹299',
        'Gel Extension Removal - ₹399',
        'Safe removal process',
        'Nail care included'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <ServicesSection id="services" ref={ref}>
      <ServicesContainer>
        <SectionHeader
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            💅 Service Menu
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Professional nail services with transparent pricing. From gel polish to extensions, 
            we offer premium quality treatments for every nail need.
          </SectionSubtitle>
        </SectionHeader>

        <ServicesGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ServiceHeader>
                <ServiceIcon variants={itemVariants}>
                  {service.icon}
                </ServiceIcon>
                <ServiceTitle variants={itemVariants}>
                  {service.title}
                </ServiceTitle>
                <ServicePrice variants={itemVariants}>
                  {service.price}
                </ServicePrice>
                <ServiceDescription variants={itemVariants}>
                  {service.description}
                </ServiceDescription>
              </ServiceHeader>

              <ServiceFeatures>
                <FeatureList>
                  {service.features.map((feature, featureIndex) => (
                    <FeatureItem
                      key={featureIndex}
                      variants={featureVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      {feature}
                    </FeatureItem>
                  ))}
                </FeatureList>
              </ServiceFeatures>
            </ServiceCard>
          ))}
        </ServicesGrid>

        {/* Single Booking Section for All Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ marginTop: '4rem' }}
        >
          <BookingSection variants={itemVariants}>
            <BookingTitle>✅ How to Book Any Service</BookingTitle>
            
            <BookingMethod
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <BookingIcon>💬</BookingIcon>
              <BookingText>
                <strong>DM on Instagram:</strong> <a href="https://instagram.com/nakhakala" target="_blank" rel="noopener noreferrer">@nakhakala</a>
              </BookingText>
            </BookingMethod>

            <BookingMethod
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <BookingIcon>📱</BookingIcon>
              <BookingText>
                <strong>WhatsApp:</strong> <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noopener noreferrer">Click to chat</a>
              </BookingText>
            </BookingMethod>

            <BookingNote>
              📸 <strong>Please share:</strong><br />
              • Preferred date & time<br />
              • Your inspo picture<br />
              • Any specific nail design or length you have in mind
            </BookingNote>
          </BookingSection>
        </motion.div>
      </ServicesContainer>
    </ServicesSection>
  );
};

export default Services;