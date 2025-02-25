import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TestimonialsSection = styled.section`
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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  width: 100%;
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

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

const QuoteIcon = styled.div`
  display: none;
`;

const TestimonialText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0 0 32px;
  flex-grow: 1;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  border-radius: 12px;
`;

const AuthorDetails = styled.div`
  h4 {
    color: white;
    font-size: 1.125rem;
    margin-bottom: 4px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
  }
`;

const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const testimonials = [
    {
      text: "Благодаря Komek Business Club мы смогли структурировать наши бизнес-процессы и увеличить прибыль на 73%. Профессиональный подход и отличные результаты!",
      author: "Асхат Жумагулов",
      position: "Директор, TechnoPlus"
    },
    {
      text: "Команда экспертов Komek помогла нам выявить слабые места в бизнесе и разработать эффективную стратегию развития. Теперь мы уверенно движемся к новым целям.",
      author: "Айгуль Сатпаева",
      position: "CEO, Marketing Pro"
    },
    {
      text: "Сотрудничество с Komek дало нам не только знания, но и практические инструменты для роста. Особенно ценны их рекомендации по финансовому планированию.",
      author: "Марат Искаков",
      position: "Основатель, Smart Solutions"
    }
  ];

  return (
    <TestimonialsSection id="testimonials" ref={ref}>
      <Container>
        <SectionBadge>
          <span>Testimonials</span>
        </SectionBadge>
        <Title>Что говорят наши клиенты</Title>
        <Subtitle>
          Узнайте, как наши решения помогают бизнесу развиваться и достигать новых высот
        </Subtitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <TestimonialText>
                {testimonial.text}
              </TestimonialText>
              <AuthorInfo>
                <AuthorAvatar />
                <AuthorDetails>
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.position}</p>
                </AuthorDetails>
              </AuthorInfo>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials; 