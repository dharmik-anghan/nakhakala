import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Container } from '../styles/GlobalStyles';

const FooterSection = styled(Section)`
  background: ${({ theme }) => theme.colors.primary.black};
  color: ${({ theme }) => theme.colors.primary.white};
  padding: ${({ theme }) => theme.spacing[16]} 0 ${({ theme }) => theme.spacing[8]} 0;
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

const FooterContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

const FooterContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[12]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
    text-align: center;
  }
`;

const BrandSection = styled(motion.div)`
  max-width: 300px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: none;
  }
`;

const BrandName = styled(motion.h3)`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.gold.primary};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const BrandDescription = styled(motion.p)`
  color: ${({ theme }) => theme.colors.neutrals[300]};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.neutrals[800]};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.primary.white};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  transition: all ${({ theme }) => theme.transitions.smooth};

  &:hover {
    background: ${({ theme }) => theme.colors.gold.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }
`;

const FooterColumn = styled(motion.div)``;

const ColumnTitle = styled(motion.h4)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary.white};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing[2]};
    left: 0;
    width: 30px;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold.primary};
    border-radius: 1px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterLinks = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled(motion.li)`
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  a {
    color: ${({ theme }) => theme.colors.neutrals[300]};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.base};

    &:hover {
      color: ${({ theme }) => theme.colors.gold.primary};
    }
  }
`;

const ContactInfo = styled(motion.div)`
  color: ${({ theme }) => theme.colors.neutrals[300]};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};

  strong {
    color: ${({ theme }) => theme.colors.primary.white};
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  a {
    color: ${({ theme }) => theme.colors.gold.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    transition: color ${({ theme }) => theme.transitions.base};

    &:hover {
      color: ${({ theme }) => theme.colors.gold.light};
    }
  }
`;

const FooterBottom = styled(motion.div)`
  border-top: 1px solid ${({ theme }) => theme.colors.neutrals[700]};
  padding-top: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals[400]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const Copyright = styled(motion.p)`
  margin: 0;
`;

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <FooterSection>
      <FooterContainer>
        <FooterContent
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <BrandSection variants={itemVariants}>
            <BrandName>Nakhakala</BrandName>
            <BrandDescription>
              Where elegance meets artistry. Experience premium press-on nails 
              that feel like extensions, last up to a month, and turn heads wherever you go.
            </BrandDescription>
            <SocialLinks>
              <SocialLink
                href="https://instagram.com/nakhakala"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                📸
              </SocialLink>
            </SocialLinks>
          </BrandSection>

          <FooterColumn variants={itemVariants}>
            <ColumnTitle>Quick Links</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="#home">Home</a></FooterLink>
              <FooterLink><a href="#features">Features</a></FooterLink>
              <FooterLink><a href="#services">Services</a></FooterLink>
              <FooterLink><a href="#gallery">Gallery</a></FooterLink>
              <FooterLink><a href="#about">About</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn variants={itemVariants}>
            <ColumnTitle>Services</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="#services">Custom Designs</a></FooterLink>
              <FooterLink><a href="#services">Press-On Nails</a></FooterLink>
              <FooterLink><a href="#services">Nail Art</a></FooterLink>
              <FooterLink><a href="#services">Premium Collection</a></FooterLink>
              <FooterLink><a href="#services">Consultation</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn variants={itemVariants}>
            <ColumnTitle>Connect</ColumnTitle>
            <ContactInfo>
              <strong>Follow Us</strong>
              📸 <a href="https://instagram.com/nakhakala" target="_blank" rel="noopener noreferrer">@nakhakala</a><br />
              ✨ Daily nail art inspiration<br />
              💅 Book through Instagram DM<br />
              🎨 Behind-the-scenes content
            </ContactInfo>
          </FooterColumn>
        </FooterContent>

        <FooterBottom
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Copyright>
            © 2024 Nakhakala. All rights reserved. | Crafted with ❤️ for nail art enthusiasts
          </Copyright>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;