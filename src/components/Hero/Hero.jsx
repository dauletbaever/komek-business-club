import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollTo';

const HeroSection = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 120px 24px;
  background: linear-gradient(180deg, 
    #0A1F44 0%,
    #0A1F44 20%,
    #061025 60%,
    #000000 100%
  );

  @media (max-width: 768px) {
    padding: 24px 20px;
    min-height: 100dvh;
    justify-content: flex-start;
    text-align: left;
    align-items: flex-start;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top center, 
      rgba(0, 82, 204, 0.15) 0%,
      rgba(0, 82, 204, 0.05) 40%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 1;
  }
`;

const StarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 768px) {
    opacity: 0.6;
  }
`;

const Star = styled.div`
  position: absolute;
  background: #FFFFFF;
  border-radius: 50%;
  animation: twinkle ${props => props.duration}s infinite;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  opacity: ${props => props.initialOpacity};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size}px rgba(255, 255, 255, 0.3);
  will-change: transform, opacity;
  
  @media (max-width: 768px) {
    &::after {
      display: none;
    }
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: ${props => props.initialOpacity};
      transform: scale(1);
    }
    50% {
      opacity: ${props => props.initialOpacity * 0.3};
      transform: scale(0.7);
    }
  }
`;

const Badge = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 8px 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  position: relative;
  z-index: 2;
  
  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
    border-radius: 6px;
  }
  
  span {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    align-self: flex-start;
    margin-bottom: 32px;
    padding: 8px 16px;
    
    &::before {
      width: 18px;
      height: 18px;
    }
    
    span {
      font-size: 0.9rem;
    }
  }
`;

const Content = styled.div`
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    text-align: left;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  color: white;
  margin-bottom: 24px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
    line-height: 1.1;
    max-width: 90%;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin: 0 0 40px;
    max-width: 85%;
    line-height: 1.5;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding-bottom: 40px;
    margin-top: auto;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &::after {
    content: '→';
    font-size: 1.2em;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 18px 24px;
    justify-content: space-between;
    font-size: 1.125rem;
    height: 64px;
    font-weight: 600;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    padding: 18px 24px;
    font-size: 1.125rem;
    height: 64px;
    font-weight: 500;
  }
`;

const generateStars = (count) => {
  const stars = [];
  const isMobile = window.innerWidth <= 768;
  const starCount = isMobile ? Math.floor(count / 3) : count;
  
  for (let i = 0; i < starCount; i++) {
    stars.push({
      size: Math.random() * (isMobile ? 2 : 2.5) + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 2 + 2,
      initialOpacity: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * 360
    });
  }
  return stars;
};

const mobileAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

const Hero = () => {
  const [stars] = React.useState(() => generateStars(150));
  const isMobile = window.innerWidth <= 768;

  const handleConsultationClick = () => {
    scrollToSection('#contact');
  };

  const handleLearnMoreClick = () => {
    scrollToSection('#process');
  };

  return (
    <HeroSection>
      <StarBackground>
        {stars.map((star, index) => (
          <Star
            key={index}
            size={star.size}
            top={star.top}
            left={star.left}
            duration={star.duration}
            initialOpacity={star.initialOpacity}
            rotation={star.rotation}
          />
        ))}
      </StarBackground>
      
      <Content>
        <Badge
          {...(isMobile ? mobileAnimationProps : {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 }
          })}
        >
          <span>Komek Business Club</span>
        </Badge>
        
        <Title
          {...(isMobile ? mobileAnimationProps : {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.2 }
          })}
        >
          Мы повышаем бизнес-грамотность Казахстана
        </Title>
        
        <Subtitle
          {...(isMobile ? mobileAnimationProps : {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.4 }
          })}
        >
          Помогаем микробизнесам расти, увеличивать прибыль и избегать типичных ошибок
        </Subtitle>
        
        <ButtonGroup
          {...(isMobile ? mobileAnimationProps : {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.6 }
          })}
        >
          <PrimaryButton
            onClick={handleConsultationClick}
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={isMobile ? { scale: 0.98 } : { scale: 0.95 }}
          >
            Получить консультацию
          </PrimaryButton>
          <SecondaryButton
            onClick={handleLearnMoreClick}
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={isMobile ? { scale: 0.98 } : { scale: 0.95 }}
          >
            Узнать больше
          </SecondaryButton>
        </ButtonGroup>
      </Content>
    </HeroSection>
  );
};

export default Hero;
