import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Container } from '../styles/GlobalStyles';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const InstagramSection = styled(Section)`
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
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.02) 100%);
    pointer-events: none;
  }
`;

const InstagramContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing[12]};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary.black};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  position: relative;
  font-family: ${({ theme }) => theme.typography.fonts.display};
  letter-spacing: -0.01em;

  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing[3]};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold.primary};
    border-radius: 1px;
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

const InstagramEmbed = styled(motion.div)`
  background: ${({ theme }) => theme.colors.primary.white};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing[8]};
  margin: 0 auto;
  max-width: 600px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[6]};
    margin: 0 ${({ theme }) => theme.spacing[4]};
  }
`;

const InstagramFrame = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.neutrals[50]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 500px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 400px;
  }
`;

const InstagramIcon = styled(motion.div)`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FollowButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  color: ${({ theme }) => theme.colors.primary.white};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  transition: all ${({ theme }) => theme.transitions.base};
  margin-top: ${({ theme }) => theme.spacing[6]};
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(240, 148, 51, 0.4);
  }
`;

const LoadingPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  color: ${({ theme }) => theme.colors.neutrals[500]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 500px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 400px;
  }
`;

const Gallery: React.FC = () => {
  const { ref, inView } = useScrollAnimation();

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
    <InstagramSection id="gallery" ref={ref}>
      <InstagramContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionHeader variants={itemVariants}>
            <SectionTitle>✨ Follow Our Journey</SectionTitle>
            <SectionSubtitle>
              Stay updated with our latest nail art creations, behind-the-scenes moments, 
              and inspiration. Follow us on Instagram for daily doses of nail artistry.
            </SectionSubtitle>
          </SectionHeader>

          <InstagramEmbed
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <InstagramIcon variants={itemVariants}>
              📸
            </InstagramIcon>
            
            {/* Instagram Embed */}
            <blockquote 
              className="instagram-media" 
              data-instgrm-permalink="https://www.instagram.com/nakhakala/" 
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: 0,
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: 0,
                width: 'calc(100% - 2px)'
              }}
            >
              <div style={{ padding: '16px' }}>
                <LoadingPlaceholder>
                  <InstagramIcon>📱</InstagramIcon>
                  <p>Loading Instagram feed...</p>
                  <p style={{ fontSize: '0.9rem', color: '#999' }}>
                    If this doesn't load, visit us directly on Instagram
                  </p>
                </LoadingPlaceholder>
              </div>
            </blockquote>

            <FollowButton
              href="https://instagram.com/nakhakala"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>📱</span>
              Follow @nakhakala
              <span>✨</span>
            </FollowButton>
          </InstagramEmbed>
        </motion.div>
      </InstagramContainer>
    </InstagramSection>
  );
};

export default Gallery;