import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineChartBar, HiOutlineCube, HiOutlineLightningBolt } from 'react-icons/hi';

const BenefitsSection = styled.section`
  padding: 120px 24px;
  background: #000000;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionBadge = styled.div`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 8px 16px;
  display: inline-flex;
  margin-bottom: 24px;
  
  span {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: white;
  margin-bottom: 16px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.125rem;
  margin-bottom: 80px;
  max-width: 600px;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      rgba(0, 82, 204, 0.1) 0%,
      rgba(54, 179, 126, 0.1) 50%,
      rgba(0, 82, 204, 0.1) 100%
    );
    z-index: 0;
  }
`;

const BenefitCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
    
    ${props => props.isPopular && `
      border-image: linear-gradient(135deg, #0052CC, #36B37E) 1;
    `}
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(0, 82, 204, 0.1), transparent 50%);
    pointer-events: none;
  }
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  font-size: 1.8rem;
  color: white;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    filter: blur(20px);
    opacity: 0.3;
    z-index: -1;
  }
`;

const StatDisplay = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 24px;
`;

const StatNumber = styled(motion.div)`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: baseline;
  gap: 4px;

  span {
    font-size: 1.5rem;
    opacity: 0.7;
  }
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.125rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin: 24px 0 16px;
  font-weight: 500;
`;

const BenefitDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 24px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled(motion.li)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(8px);
  }

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #36B37E;
    border-radius: 50%;
  }
`;

const Benefits = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const benefits = [
    {
      icon: <HiOutlineChartBar />,
      title: "Опытная команда",
      stat: "50+",
      statLabel: "Успешных проектов",
      description: "Команда экспертов с опытом развития бизнеса в Казахстане",
      features: [
        "Более 50 успешных проектов",
        "Средний рост прибыли 73%",
        "Сертифицированные специалисты"
      ]
    },
    {
      icon: <HiOutlineCube />,
      title: "Комплексный подход",
      stat: "73",
      statSuffix: "%",
      statLabel: "Средний рост прибыли",
      description: "Работаем со всеми аспектами вашего бизнеса",
      features: [
        "Индивидуальные решения",
        "Поэтапное внедрение",
        "Полное сопровождение"
      ],
      isPopular: true
    },
    {
      icon: <HiOutlineLightningBolt />,
      title: "Измеримые результаты",
      stat: "100",
      statSuffix: "%",
      statLabel: "Гарантия результата",
      description: "Прозрачная отчетность и гарантированный результат",
      features: [
        "Регулярный анализ KPI",
        "Прозрачная отчетность",
        "Гарантия возврата средств"
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <BenefitsSection id="benefits" ref={ref}>
      <Container>
        <SectionBadge>
          <span>Benefits</span>
        </SectionBadge>
        <Title>Почему выбирают нас</Title>
        <Subtitle>
          Узнайте о преимуществах работы с командой профессионалов
        </Subtitle>
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              isPopular={benefit.isPopular}
            >
              <IconContainer>
                {benefit.icon}
              </IconContainer>
              <StatDisplay>
                <StatNumber
                  variants={numberVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                >
                  {benefit.stat}
                  {benefit.statSuffix && <span>{benefit.statSuffix}</span>}
                </StatNumber>
                <StatLabel>{benefit.statLabel}</StatLabel>
              </StatDisplay>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
              <FeaturesList>
                {benefit.features.map((feature, idx) => (
                  <Feature
                    key={idx}
                    variants={featureVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 + 0.5 }}
                  >
                    {feature}
                  </Feature>
                ))}
              </FeaturesList>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </Container>
    </BenefitsSection>
  );
};

export default Benefits; 