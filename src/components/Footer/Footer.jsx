import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';

const FooterSection = styled.footer`
  padding: 48px 24px;
  background: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;
  flex-wrap: wrap;
`;

const LogoSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
    border-radius: 6px;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
    
    svg {
      transform: scale(1.1);
    }
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const DevelopedBy = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #36B37E;
  }

  @media (max-width: 768px) {
    margin-top: 8px;
  }
`;

const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <TopSection>
          <LogoSection>
            <Logo>Komek</Logo>
            <Description>
              Мы — команда экспертов с опытом развития бизнеса в Казахстане. 
              Наша миссия — помочь микробизнесам выйти на новый уровень через улучшение 
              финансовой и маркетинговой грамотности.
            </Description>
            <SocialLinks>
              <SocialLink 
                href="https://instagram.com/komek.business" 
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiInstagram />
              </SocialLink>
              <SocialLink 
                href="https://t.me/komekclub" 
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTelegramPlane />
              </SocialLink>
            </SocialLinks>
          </LogoSection>
        </TopSection>
        <BottomSection>
          <Copyright>
            © {new Date().getFullYear()} Komek Business Club. Все права защищены.
          </Copyright>
          <DevelopedBy href="https://jpg.agency/" target="_blank" rel="noopener noreferrer">
            Разработано jpg.agency
          </DevelopedBy>
        </BottomSection>
      </Container>
    </FooterSection>
  );
};

export default Footer; 