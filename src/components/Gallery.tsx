import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, Container } from '../styles/GlobalStyles';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import OptimizedImage from './OptimizedImage';

// Instagram embed window interface
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

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
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.premium};
  padding: ${({ theme }) => theme.spacing[10]};
  margin: 0 auto;
  max-width: 800px;
  text-align: center;
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
    margin: 0 ${({ theme }) => theme.spacing[4]};
    max-width: 100%;
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
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[10]};
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  color: ${({ theme }) => theme.colors.primary.white};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  transition: all ${({ theme }) => theme.transitions.smooth};
  margin-top: ${({ theme }) => theme.spacing[8]};
  border: 2px solid transparent;
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
    box-shadow: 0 12px 30px rgba(240, 148, 51, 0.5);
    
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

const LocalGallery = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;


const GalleryImageContainer = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.neutrals[100]};
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
  text-align: center;
  padding: ${({ theme }) => theme.spacing[4]};

  ${GalleryImageContainer}:hover & {
    opacity: 0.9;
  }
`;

const FallbackMessage = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.neutrals[50]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
`;

const Gallery: React.FC = () => {
  const { ref, inView } = useScrollAnimation();
  const [instagramLoaded, setInstagramLoaded] = useState(false);
  const [showLocalGallery, setShowLocalGallery] = useState(false);
  const [localImages] = useState([
    {
      src: '/assets/images/gallery/elegant-french-tips.jpeg',
      alt: 'Elegant French Tips - Classic nail design',
      title: 'Elegant French Tips'
    },
    {
      src: '/assets/images/gallery/luxury-gold-accent.jpeg',
      alt: 'Luxury Gold Accents - Premium nail art',
      title: 'Luxury Gold Accents'
    },
    {
      src: '/assets/images/gallery/artistic-floral-design.jpeg',
      alt: 'Artistic Floral Design - Hand-painted nails',
      title: 'Artistic Floral Design'
    },
    {
      src: '/assets/images/gallery/modern-geometric-pattern.jpeg',
      alt: 'Modern Geometric Pattern - Contemporary style',
      title: 'Modern Geometric'
    },
    {
      src: '/assets/images/gallery/classic-nude-elegance.jpeg',
      alt: 'Classic Nude Elegance - Timeless beauty',
      title: 'Classic Nude Elegance'
    },
    {
      src: '/assets/images/gallery/bold-statement-nails.jpeg',
      alt: 'Bold Statement Nails - Eye-catching design',
      title: 'Bold Statement'
    }
  ]);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';

    // Set timeout to show local gallery if Instagram doesn't load
    const fallbackTimer = setTimeout(() => {
      if (!instagramLoaded) {
        setShowLocalGallery(true);
      }
    }, 8000); // Increased timeout to 8 seconds

    // Check if Instagram script loads successfully
    script.onload = () => {
      setInstagramLoaded(true);
      clearTimeout(fallbackTimer);

      // Process any Instagram embeds
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    script.onerror = () => {
      setShowLocalGallery(true);
      clearTimeout(fallbackTimer);
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (!existingScript) {
      document.body.appendChild(script);
    } else {
      setInstagramLoaded(true);
      clearTimeout(fallbackTimer);
    }

    return () => {
      clearTimeout(fallbackTimer);
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [instagramLoaded]);

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
            <SectionTitle>💎 Latest Nail Art Showcase</SectionTitle>
            <SectionSubtitle>
              Discover our stunning nail art portfolio and get inspired by our latest creations.
              Follow @nakhakala on Instagram for daily nail inspiration and behind-the-scenes content.
            </SectionSubtitle>
          </SectionHeader>

          {/* Show local gallery if Instagram doesn't load */}
          {showLocalGallery ? (
            <motion.div variants={itemVariants}>
              <FallbackMessage variants={itemVariants}>
                <InstagramIcon>📸</InstagramIcon>
                <h3 style={{ margin: '16px 0 8px 0', color: '#D4AF37' }}>Our Latest Work</h3>
                <p style={{ margin: '0 0 16px 0', color: '#666' }}>
                  Check out our stunning nail art creations below, or visit our Instagram for more!
                </p>
              </FallbackMessage>

              <LocalGallery
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {localImages.map((image: any, index: number) => (
                  <GalleryImageContainer
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      onError={() => {
                        console.log(`Failed to load image: ${image.title}`);
                      }}
                    />
                    <ImageOverlay>
                      <span>{image.title}</span>
                    </ImageOverlay>
                  </GalleryImageContainer>
                ))}
              </LocalGallery>

              <FollowButton
                href="https://instagram.com/nakhakala"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ marginTop: '32px', display: 'inline-flex' }}
              >
                <span>📸</span>
                Follow @nakhakala for More
                <span>✨</span>
              </FollowButton>
            </motion.div>
          ) : (
            <InstagramEmbed
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <InstagramIcon variants={itemVariants}>
                📸
              </InstagramIcon>

              {/* Enhanced Instagram Profile Embed */}
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '24px',
                border: '1px solid #dbdbdb'
              }}>
                <iframe
                  src="https://www.instagram.com/nakhakala/embed/"
                  width="100%"
                  height="800"
                  frameBorder="0"
                  scrolling="yes"
                  allowTransparency={true}
                  style={{
                    border: 'none',
                    borderRadius: '12px'
                  }}
                  title="Nakhakala Instagram Feed"
                />
              </div>


              <FollowButton
                href="https://instagram.com/nakhakala"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>📸</span>
                Follow @nakhakala
                <span>✨</span>
              </FollowButton>
            </InstagramEmbed>
          )}
        </motion.div>
      </InstagramContainer>
    </InstagramSection>
  );
};

export default Gallery;