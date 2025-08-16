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

const PopularBadge = styled(motion.div)`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.gradients.gold};
  color: ${({ theme }) => theme.colors.primary.white};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${({ theme }) => theme.shadows.base};
  z-index: 2;
  
  &::before {
    content: '⭐';
    margin-right: ${({ theme }) => theme.spacing[1]};
  }
`;

const ServiceImageHeader = styled.div<{ hasImage?: boolean }>`
  ${({ hasImage }) => hasImage ? `
    width: 100%;
    height: 240px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    }
  ` : ''}
`;

const ServiceHeader = styled.div<{ hasImage?: boolean }>`
  padding: ${({ theme, hasImage }) => hasImage ? 
    `${theme.spacing[6]} ${theme.spacing[8]} ${theme.spacing[6]}` : 
    `${theme.spacing[8]} ${theme.spacing[8]} ${theme.spacing[6]}`
  };
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[100]};
`;

const ServiceIcon = styled(motion.div)<{ hasImage?: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  height: 80px;
  display: ${({ hasImage }) => hasImage ? 'none' : 'flex'};
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
  margin-top: ${({ theme }) => theme.spacing[12]};
  padding: ${({ theme }) => theme.spacing[10]};
  background: ${({ theme }) => theme.colors.primary.white};
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.premium};
  border: 1px solid ${({ theme }) => theme.colors.gold.champagne};
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
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[8]};
    margin-top: ${({ theme }) => theme.spacing[8]};
  }
`;

const BookingHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const BookingTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary.black};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing[3]};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.colors.gradients.gold};
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }
`;

const BookingSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`;

const BookingCTA = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const PrimaryBookingButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[10]};
  background: ${({ theme }) => theme.colors.gradients.gold};
  color: ${({ theme }) => theme.colors.primary.white};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.goldHover};
  transition: all ${({ theme }) => theme.transitions.smooth};
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;

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

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
    font-size: ${({ theme }) => theme.typography.sizes.base};
  }
`;

const BookingSteps = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[5]};
  margin-top: ${({ theme }) => theme.spacing[8]};
  padding-top: ${({ theme }) => theme.spacing[8]};
  border-top: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
`;

const StepCard = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[5]};
  background: ${({ theme }) => theme.colors.gradients.soft};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  transition: all ${({ theme }) => theme.transitions.smooth};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.gold.champagne};
    box-shadow: ${({ theme }) => theme.shadows.base};
  }
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.gradients.gold};
  color: ${({ theme }) => theme.colors.primary.white};
  border-radius: 50%;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary.black};
  margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
`;

const StepDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`;

interface Service {
  icon: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  image?: string;
  popular?: boolean;
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
      ],
      image: '/assets/images/services/gel-polish-natural-nails.png'
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
      ],
      image: '/assets/images/services/gel-polish-feet.png'
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
      ],
      image: '/assets/images/services/temporary-extensions.png'
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
        'Stays up to 15-20 days'
      ],
      image: '/assets/images/services/press-on-nails.png',
      popular: true
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
      ],
      image: '/assets/images/services/gel-overlay.png'
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
      ],
      image: '/assets/images/services/gel-extensions-half-tips.png'
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
      ],
      image: '/assets/images/services/polygel-extensions.png'
    },
    {
      icon: '💫',
      title: 'Soft Gel-X Extensions',
      price: '₹899',
      description: 'Premium Soft Gel-X extensions for natural-looking, flexible, and durable nail enhancement',
      features: [
        'Soft and flexible feel',
        'Natural nail appearance',
        'Lightweight extensions',
        'Long-lasting durability',
        'Professional application'
      ],
      image: '/assets/images/services/soft-gel-x-extensions.png'
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
      ],
      image: '/assets/images/services/removal-service.png'
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
              {service.popular && (
                <PopularBadge
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  Popular Choice
                </PopularBadge>
              )}
              {service.image && (
                <ServiceImageHeader 
                  hasImage={true}
                  style={{ backgroundImage: `url(${service.image})` }}
                />
              )}
              <ServiceHeader hasImage={!!service.image}>
                <ServiceIcon hasImage={!!service.image} variants={itemVariants}>
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
            <BookingHeader>
              <BookingTitle>Ready to Book Your Appointment?</BookingTitle>
              <BookingSubtitle>
                Start your nail transformation journey with us. Easy booking through Instagram.
              </BookingSubtitle>
            </BookingHeader>

            <BookingCTA variants={itemVariants}>
              <PrimaryBookingButton
                href="https://instagram.com/nakhakala"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>📸</span>
                Book Now on Instagram
                <span>✨</span>
              </PrimaryBookingButton>
            </BookingCTA>

            <BookingSteps>
              <StepCard
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <StepNumber>1</StepNumber>
                <StepContent>
                  <StepTitle>Follow & Message</StepTitle>
                  <StepDescription>
                    Follow @nakhakala on Instagram and send us a DM with your booking request
                  </StepDescription>
                </StepContent>
              </StepCard>

              <StepCard
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <StepNumber>2</StepNumber>
                <StepContent>
                  <StepTitle>Share Your Vision</StepTitle>
                  <StepDescription>
                    Send inspiration photos, preferred dates, nail length, and any special requests
                  </StepDescription>
                </StepContent>
              </StepCard>

              <StepCard
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <StepNumber>3</StepNumber>
                <StepContent>
                  <StepTitle>Confirm & Enjoy</StepTitle>
                  <StepDescription>
                    We'll confirm your appointment details and you're all set for your nail transformation!
                  </StepDescription>
                </StepContent>
              </StepCard>
            </BookingSteps>
          </BookingSection>
        </motion.div>
      </ServicesContainer>
    </ServicesSection>
  );
};

export default Services;