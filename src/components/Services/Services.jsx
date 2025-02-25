import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineChartBar, HiOutlineLightningBolt, HiOutlineAcademicCap } from 'react-icons/hi';
import { scrollToSection } from '../../utils/scrollTo';
import { gsap } from 'gsap';

const ServicesSection = styled.section`
  padding: 120px 24px;
  background: #000000;
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

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
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
    
    ${props => props.popular && `
      border-color: #36B37E;
    `}
  }

  ${props => props.popular && `
    border-color: #36B37E;
    &::after {
      content: 'Популярный';
      position: absolute;
      top: 16px;
      right: 16px;
      background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.8rem;
      color: white;
    }
  `}
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
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin: 24px 0 16px;
  font-weight: 500;
`;

const ServicePrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 16px;
  
  span {
    &:first-child {
      font-size: 2rem;
      font-weight: 600;
      color: white;
    }
    
    &:last-child {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 24px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
`;

const Feature = styled.li`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #36B37E;
    border-radius: 50%;
  }
`;

const ActionButton = styled(motion.button)`
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.primary && `
    background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
    border: none;
  `}

  &:hover {
    background: ${props => props.primary ? 
      'linear-gradient(135deg, #0052CC 0%, #36B37E 100%)' : 
      'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }
`;

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handlePackageSelect = (packageId) => {
    // Сохраняем выбранный пакет в sessionStorage
    sessionStorage.setItem('selectedPackage', packageId);

    // Анимируем прокрутку к форме
    scrollToSection('#contact');

    // После прокрутки обновляем значение в форме
    gsap.delayedCall(1, () => {
      const packageSelect = document.querySelector('#selectedPackage');
      if (packageSelect) {
        packageSelect.value = packageId;
        // Создаем и диспатчим событие change для обновления состояния формы
        const event = new Event('change', { bubbles: true });
        packageSelect.dispatchEvent(event);

        // Добавляем анимацию подсветки для select
        gsap.fromTo(packageSelect,
          { 
            borderColor: "#36B37E",
            boxShadow: "0 0 0 4px rgba(54, 179, 126, 0.2)"
          },
          { 
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "none",
            duration: 1.5,
            ease: "power2.out"
          }
        );
      }
    });
  };

  const services = [
    {
      id: 'consultation',
      icon: <HiOutlineChartBar />,
      title: "Индивидуальная консультация",
      price: "50 000",
      description: "Персональная встреча с экспертом для анализа вашего бизнеса",
      features: [
        "Аудит текущего состояния",
        "Выявление проблем",
        "План действий",
        "Отчет с рекомендациями"
      ]
    },
    {
      id: 'basic',
      icon: <HiOutlineLightningBolt />,
      title: "Базовый пакет",
      price: "100 000",
      description: "Стартовый набор для развития бизнеса",
      features: [
        "Финансовый аудит",
        "Маркетинговая стратегия",
        "Запуск рекламной кампании",
        "2 консультации в месяц"
      ],
      popular: true
    },
    {
      id: 'premium',
      icon: <HiOutlineAcademicCap />,
      title: "Премиум пакет",
      price: "200 000",
      description: "Комплексное решение для активного роста",
      features: [
        "Все из базового пакета",
        "Ведение Instagram аккаунта",
        "3 рекламных креатива",
        "Еженедельные консультации"
      ]
    }
  ];

  return (
    <ServicesSection id="services" ref={ref}>
      <Container>
        <SectionBadge>
          <span>Services</span>
        </SectionBadge>
        <Title>Наши услуги</Title>
        <Subtitle>
          Выберите оптимальное решение для развития вашего бизнеса
        </Subtitle>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              popular={service.popular}
            >
              <IconContainer>
                {service.icon}
              </IconContainer>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServicePrice>
                <span>{service.price}</span>
                <span>₸</span>
              </ServicePrice>
              <ServiceDescription>{service.description}</ServiceDescription>
              <FeaturesList>
                {service.features.map((feature, idx) => (
                  <Feature key={idx}>{feature}</Feature>
                ))}
              </FeaturesList>
              <ActionButton
                primary={service.popular}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePackageSelect(service.id)}
              >
                Выбрать пакет
              </ActionButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services; 