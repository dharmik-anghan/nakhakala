import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../hooks/useNavigation';
import { NavItem } from '../types';

const NavigationContainer = styled(motion.nav)<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: ${({ scrolled, theme }) => 
    scrolled 
      ? 'rgba(255, 255, 255, 0.98)' 
      : 'rgba(255, 255, 255, 0.95)'
  };
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  transition: all ${({ theme }) => theme.transitions.smooth};
  box-shadow: ${({ scrolled, theme }) => 
    scrolled ? theme.shadows.lg : 'none'
  };
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: relative;
`;

const BrandContainer = styled(motion.div)`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all ${({ theme }) => theme.transitions.smooth};
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.3));
  }
`;

const BrandLogo = styled.img`
  height: 45px;
  width: auto;
  max-width: 120px;
  object-fit: contain;
  transition: all ${({ theme }) => theme.transitions.smooth};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 40px;
    max-width: 100px;
  }
`;

const DesktopNavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: ${({ theme }) => theme.spacing[8]};
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavMenu = styled(motion.ul)`
  display: none;
  list-style: none;
  gap: ${({ theme }) => theme.spacing[4]};
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.primary.white};
    padding: ${({ theme }) => theme.spacing[6]};
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-top: 1px solid ${({ theme }) => theme.colors.neutrals[200]};
  }
`;

const NavItemContainer = styled.li`
  position: relative;
`;

const NavLink = styled(motion.button)<{ active: boolean }>`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ active, theme }) => 
    active ? theme.colors.gold.primary : theme.colors.primary.black
  };
  cursor: pointer;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.base};

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0%'};
    height: 2px;
    background: ${({ theme }) => theme.colors.gold.primary};
    transition: width ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.gold.primary};
    
    &::after {
      width: 100%;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    padding: ${({ theme }) => theme.spacing[3]} 0;
  }
`;

const HamburgerButton = styled(motion.button)`
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  gap: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const HamburgerLine = styled(motion.span)`
  width: 25px;
  height: 2px;
  background: ${({ theme }) => theme.colors.primary.black};
  border-radius: 2px;
  transform-origin: center;
`;

const menuVariants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  closed: { opacity: 0, y: -10 },
  open: { opacity: 1, y: 0 }
};

const hamburgerTop = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 }
};

const hamburgerMiddle = {
  closed: { opacity: 1 },
  open: { opacity: 0 }
};

const hamburgerBottom = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 }
};

const Navigation: React.FC = () => {
  const {
    activeSection,
    isMenuOpen,
    scrolled,
    scrollToSection,
    toggleMenu,
    closeMenu
  } = useNavigation();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'gallery', label: 'Instagram' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <NavigationContainer
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <NavContent>
        {/* Brand Logo */}
        <BrandContainer
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection('home')}
        >
          <BrandLogo
            src="/nakhakala-logo-transparent.png"
            alt="Nakhakala - Premium Nail Artistry"
          />
        </BrandContainer>

        {/* Desktop Menu */}
        <DesktopNavMenu>
          {navItems.map((item, index) => (
            <NavItemContainer key={`desktop-${item.id}`}>
              <NavLink
                active={activeSection === item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.label}
              </NavLink>
            </NavItemContainer>
          ))}
        </DesktopNavMenu>

        {/* Mobile Hamburger */}
        <HamburgerButton
          onClick={toggleMenu}
          animate={isMenuOpen ? "open" : "closed"}
          whileTap={{ scale: 0.95 }}
        >
          <HamburgerLine variants={hamburgerTop} />
          <HamburgerLine variants={hamburgerMiddle} />
          <HamburgerLine variants={hamburgerBottom} />
        </HamburgerButton>
      </NavContent>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileNavMenu
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {navItems.map((item) => (
              <NavItemContainer key={item.id}>
                <NavLink
                  variants={itemVariants}
                  active={activeSection === item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                </NavLink>
              </NavItemContainer>
            ))}
          </MobileNavMenu>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 80,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: -1,
            }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </NavigationContainer>
  );
};

export default Navigation;