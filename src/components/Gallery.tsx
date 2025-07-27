import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Container } from '../styles/GlobalStyles';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  galleryImages, 
  getImagesByCategory, 
  getImagePath, 
  galleryCategories,
  GalleryImage as GalleryImageData
} from '../data/galleryData';
import ImageWithFallback from './ImageWithFallback';

const GallerySection = styled(Section)`
  background: ${({ theme }) => theme.colors.neutrals[50]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.03) 50%, transparent 100%);
    pointer-events: none;
  }
`;

const GalleryContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 600px;
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

const FilterTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const FilterTab = styled(motion.button)<{ active?: boolean }>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border: 2px solid ${({ theme, active }) => 
    active ? theme.colors.gold.primary : theme.colors.neutrals[300]};
  background: ${({ theme, active }) => 
    active ? theme.colors.gold.primary : 'transparent'};
  color: ${({ theme, active }) => 
    active ? theme.colors.primary.white : theme.colors.neutrals[700]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold.primary};
    color: ${({ theme, active }) => 
      active ? theme.colors.primary.white : theme.colors.gold.primary};
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing[6]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.smooth};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.goldHover};
  }
`;

// Removed GalleryImage styled component - now using ImageWithFallback

const GalleryOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.gradients.luxury};
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]};
  transition: all ${({ theme }) => theme.transitions.smooth};

  ${GalleryItem}:hover & {
    opacity: 0.9;
  }
`;

const OverlayTitle = styled(motion.h3)`
  color: ${({ theme }) => theme.colors.primary.white};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const OverlayDescription = styled(motion.p)`
  color: ${({ theme }) => theme.colors.gold.champagne};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin: 0;
`;

const ViewMoreButton = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing[12]};
`;

const Button = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.gradients.gold};
  color: ${({ theme }) => theme.colors.primary.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.goldHover};
  }
`;

// Modal Components
const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const ModalContent = styled(motion.div)`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
`;

// Removed ModalImage styled component - now using ImageWithFallback

const CloseButton = styled(motion.button)`
  position: absolute;
  top: -${({ theme }) => theme.spacing[12]};
  right: 0;
  background: ${({ theme }) => theme.colors.gold.primary};
  color: ${({ theme }) => theme.colors.primary.white};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Using GalleryImageData interface from galleryData.ts

const Gallery: React.FC = () => {
  const { ref, inView } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImageData | null>(null);
  const [visibleItems, setVisibleItems] = useState(6);

  // Get filtered gallery items from dynamic data
  const filteredItems = getImagesByCategory(activeFilter);
  const displayItems = filteredItems.slice(0, visibleItems);

  // Use dynamic categories from galleryData
  const filters = galleryCategories;

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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <GallerySection id="gallery" ref={ref}>
      <GalleryContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionHeader variants={itemVariants}>
            <SectionTitle>Our Masterpiece Gallery</SectionTitle>
            <SectionSubtitle>
              Discover our stunning collection of premium nail art designs, 
              each piece crafted with meticulous attention to detail
            </SectionSubtitle>
          </SectionHeader>

          <FilterTabs variants={itemVariants}>
            {filters.map(filter => (
              <FilterTab
                key={filter.value}
                active={activeFilter === filter.value}
                onClick={() => {
                  setActiveFilter(filter.value);
                  setVisibleItems(6); // Reset visible items when filter changes
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.label}
              </FilterTab>
            ))}
          </FilterTabs>

          <GalleryGrid
            variants={containerVariants}
            layout
          >
            <AnimatePresence mode="wait">
              {displayItems.map((item, index) => (
                <GalleryItem
                  key={`${activeFilter}-${item.id}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ delay: index * 0.1 }}
                  layout
                  onClick={() => setSelectedImage(item)}
                  whileHover={{ y: -8 }}
                >
                  <ImageWithFallback
                    src={getImagePath(item.filename)}
                    alt={item.title}
                    title={item.title}
                    loading="lazy"
                  />
                  <GalleryOverlay>
                    <OverlayTitle
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.title}
                    </OverlayTitle>
                    <OverlayDescription
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.description}
                    </OverlayDescription>
                  </GalleryOverlay>
                </GalleryItem>
              ))}
            </AnimatePresence>
          </GalleryGrid>

          {displayItems.length < filteredItems.length && (
            <ViewMoreButton variants={itemVariants}>
              <Button
                onClick={() => setVisibleItems(prev => prev + 6)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Load More Designs
              </Button>
            </ViewMoreButton>
          )}
        </motion.div>
      </GalleryContainer>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Modal
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedImage(null)}
          >
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
            >
              <CloseButton
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </CloseButton>
              <ImageWithFallback
                src={getImagePath(selectedImage.filename)}
                alt={selectedImage.title}
                title={selectedImage.title}
                loading="eager"
              />
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GallerySection>
  );
};

export default Gallery;