import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineSearch, HiOutlineLightBulb, HiOutlineChartSquareBar } from 'react-icons/hi';

const ProcessSection = styled.section`
  padding: 120px 24px;
  background: #000000;
  overflow: hidden;
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

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(0, 82, 204, 0.3), 
      rgba(54, 179, 126, 0.3), 
      rgba(0, 82, 204, 0.3)
    );
    z-index: 0;
    
    @media (max-width: 992px) {
      display: none;
    }
  }
`;

const ProcessCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  z-index: 1;

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

const StepNumber = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.2;
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
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

const ProcessTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 16px;
  font-weight: 500;
`;

const ProcessDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 24px;
`;

const StepsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StepItem = styled.li`
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

const Process = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const processes = [
    {
      icon: <HiOutlineSearch />,
      number: "01",
      title: "Анализируем ваш бизнес",
      description: "Проводим комплексный аудит для выявления потенциала роста",
      steps: [
        "Анализ текущих процессов",
        "Оценка эффективности",
        "Выявление узких мест",
        "Определение возможностей"
      ]
    },
    {
      icon: <HiOutlineLightBulb />,
      number: "02",
      title: "Разрабатываем стратегию",
      description: "Создаем пошаговый план развития вашего бизнеса",
      steps: [
        "Постановка четких целей",
        "Разработка KPI",
        "Планирование ресурсов",
        "Определение сроков"
      ]
    },
    {
      icon: <HiOutlineChartSquareBar />,
      number: "03",
      title: "Внедряем изменения",
      description: "Помогаем реализовать стратегию и достичь результатов",
      steps: [
        "Поэтапное внедрение",
        "Обучение команды",
        "Контроль показателей",
        "Корректировка действий"
      ]
    }
  ];

  return (
    <ProcessSection id="process" ref={ref}>
      <Container>
        <SectionBadge>
          <span>Process</span>
        </SectionBadge>
        <Title>Как мы работаем</Title>
        <Subtitle>
          Комплексный подход к развитию вашего бизнеса
        </Subtitle>
        <ProcessGrid>
          {processes.map((process, index) => (
            <ProcessCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <StepNumber>{process.number}</StepNumber>
              <IconContainer>
                {process.icon}
              </IconContainer>
              <ProcessTitle>{process.title}</ProcessTitle>
              <ProcessDescription>{process.description}</ProcessDescription>
              <StepsList>
                {process.steps.map((step, idx) => (
                  <StepItem key={idx}>
                    {step}
                  </StepItem>
                ))}
              </StepsList>
            </ProcessCard>
          ))}
        </ProcessGrid>
      </Container>
    </ProcessSection>
  );
};

export default Process; 