import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollTo';

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 24px 32px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 16px 32px;
  height: 80px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    height: 60px;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1001;
  
  &::before {
    content: '';
    display: block;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
    border-radius: 8px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
    
    &::before {
      width: 24px;
      height: 24px;
    }
  }
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.2s ease;
    padding: 8px 0;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
      transition: width 0.2s ease;
    }

    &:hover {
      color: white;
      
      &::after {
        width: 100%;
      }
    }
  }
`;

const GetInTouch = styled(motion.button)`
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  color: white;
  border: none;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  
  &::after {
    content: '→';
    font-size: 1.2em;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  padding: 8px;
  margin: -8px;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
  }

  span {
    width: 24px;
    height: 2px;
    background: white;
    margin: 2px 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    position: absolute;
    left: 8px;

    &:nth-child(1) {
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'translateY(-6px)'};
    }

    &:nth-child(2) {
      transform: ${props => props.isOpen ? 'scaleX(0)' : 'none'};
      opacity: ${props => props.isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'translateY(6px)'};
    }
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.98) 0%, rgba(10, 31, 68, 0.98) 100%);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 24px;
    z-index: 1000;
  }
`;

const MobileNavList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  width: 100%;
`;

const MobileNavItem = styled(motion.li)`
  margin: 24px 0;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 1.75rem;
    font-weight: 500;
    display: block;
    padding: 12px;
    transition: all 0.3s ease;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 8px;
      left: 50%;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    &:hover::after {
      width: 30%;
    }
  }
`;

const MobileGetInTouch = styled(motion.button)`
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 1.125rem;
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;
  margin-top: 32px;
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &::after {
    content: '→';
    font-size: 1.2em;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const menuItems = [
    { title: 'О нас', href: '#about' },
    { title: 'Услуги', href: '#services' },
    { title: 'Отзывы', href: '#testimonials' },
    { title: 'FAQ', href: '#faq' },
    { title: 'Контакты', href: '#contact' }
  ];

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
    handleMenuItemClick();
  };

  const handleGetInTouch = () => {
    scrollToSection('#contact');
    handleMenuItemClick();
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <HeaderWrapper>
      <HeaderContainer isScrolled={isScrolled}>
        <Logo>Komek</Logo>
        <Nav>
          <NavList>
            {menuItems.map((item, index) => (
              <NavItem key={index}>
                <a href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
                  {item.title}
                </a>
              </NavItem>
            ))}
          </NavList>
        </Nav>
        <GetInTouch
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetInTouch}
        >
          Оставить заявку
        </GetInTouch>
        <MobileMenuButton
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </MobileMenuButton>
      </HeaderContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <MobileNavList>
              {menuItems.map((item, index) => (
                <MobileNavItem
                  key={index}
                  variants={menuItemVariants}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.title}
                  </a>
                </MobileNavItem>
              ))}
            </MobileNavList>
            <MobileGetInTouch
              variants={menuItemVariants}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetInTouch}
            >
              Оставить заявку
            </MobileGetInTouch>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderWrapper>
  );
};

export default Header; 