import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = styled.section`
  padding: 120px 24px;
  background: #000000;
  position: relative;

  @media (max-width: 768px) {
    padding: 80px 16px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: white;
  margin-bottom: 16px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #36B37E;
  font-size: 1.25rem;
  margin-bottom: 48px;
  font-weight: 500;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const AboutText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  
  p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 24px;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Highlights = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
`;

const HighlightCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const HighlightTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background: linear-gradient(135deg, #0052CC, #36B37E);
  }
`;

const HighlightText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StatItem = styled(motion.div)`
  h3 {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #0052CC, #36B37E);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
  }
`;

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const highlights = [
    {
      title: "Наша миссия",
      text: "Помогаем микробизнесам Казахстана выйти на новый уровень через улучшение финансовой и маркетинговой грамотности"
    },
    {
      title: "Наш подход",
      text: "Сочетаем современные бизнес-стратегии с глубоким пониманием местного рынка для достижения максимальных результатов"
    },
    {
      title: "Наши ценности",
      text: "Прозрачность, профессионализм и измеримые результаты — основа нашей работы с каждым клиентом"
    }
  ];

  const stats = [
    { number: "5+", label: "Лет опыта" },
    { number: "50+", label: "Успешных проектов" },
    { number: "73%", label: "Средний рост прибыли" },
    { number: "100%", label: "Гарантия результата" }
  ];

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <Title>О Komek Business Club</Title>
        <Subtitle>Развиваем бизнес в Казахстане с 2019 года</Subtitle>
        <ContentGrid>
          <AboutText>
            <p>
              Мы — команда экспертов с многолетним опытом развития бизнеса в Казахстане. 
              Наш опыт охватывает различные сферы: от маркетинга и продаж до финансового 
              планирования и операционного управления.
            </p>
            <p>
              За 5 лет работы мы помогли более чем 50 компаниям увеличить их прибыль 
              и масштабировать бизнес. Наши клиенты — это предприниматели, которые 
              стремятся к росту и готовы внедрять современные решения.
            </p>
            <StatsContainer>
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </StatItem>
              ))}
            </StatsContainer>
          </AboutText>
          <Highlights>
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <HighlightTitle>{highlight.title}</HighlightTitle>
                <HighlightText>{highlight.text}</HighlightText>
              </HighlightCard>
            ))}
          </Highlights>
        </ContentGrid>
      </Container>
    </AboutSection>
  );
};

export default About; 