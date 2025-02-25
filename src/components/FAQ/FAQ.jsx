import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FAQSection = styled.section`
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

const FAQContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQItem = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

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

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const FAQHeader = styled.button`
  width: 100%;
  padding: 24px 32px;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 1.125rem;
  font-weight: 500;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    color: #36B37E;
  }
`;

const FAQContent = styled(motion.div)`
  overflow: hidden;
  padding: 0;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

const FAQContentInner = styled(motion.div)`
  padding: 0 32px 24px;
`;

const Icon = styled(motion.div)`
  width: 24px;
  height: 24px;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: currentColor;
    border-radius: 2px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &::before {
    width: 16px;
    height: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  &::after {
    width: 2px;
    height: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) ${props => props.isOpen ? 'scaleY(0)' : 'scaleY(1)'};
  }
`;

const FAQ = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Как проходят консультации?",
      answer: "Консультации проводятся онлайн или офлайн в нашем офисе в Алматы. Длительность — 1.5 часа. В результате вы получаете подробный отчет и план действий."
    },
    {
      question: "Можно ли работать удаленно?",
      answer: "Да, мы работаем со всем Казахстаном онлайн. Все встречи проводятся через Zoom или Google Meet."
    },
    {
      question: "Какие гарантии вы предоставляете?",
      answer: "Мы заключаем официальный договор и гарантируем возврат средств, если не будет достигнут обговоренный результат."
    },
    {
      question: "Сколько времени нужно для получения результата?",
      answer: "Первые результаты видны через 2-3 недели работы. Значительные изменения происходят через 2-3 месяца системной работы."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98]
        },
        opacity: {
          duration: 0.25,
          delay: 0.15
        }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98]
        },
        opacity: {
          duration: 0.25
        }
      }
    }
  };

  return (
    <FAQSection id="faq" ref={ref}>
      <Container>
        <SectionBadge>
          <span>FAQ</span>
        </SectionBadge>
        <Title>Частые вопросы</Title>
        <Subtitle>
          Ответы на популярные вопросы о наших услугах и процессе работы
        </Subtitle>
        <FAQContainer
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              variants={itemVariants}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <FAQHeader>
                {faq.question}
                <Icon isOpen={openIndex === index} />
              </FAQHeader>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <FAQContent
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <FAQContentInner>
                      {faq.answer}
                    </FAQContentInner>
                  </FAQContent>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </FAQContainer>
      </Container>
    </FAQSection>
  );
};

export default FAQ;
