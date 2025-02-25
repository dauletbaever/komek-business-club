import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock, HiChevronDown } from 'react-icons/hi';
import { sendToTelegram, sendTelegramMessage } from '../../api/telegram';
import gsap from 'gsap';

const ContactSection = styled.section`
  padding: 120px 24px;
  background: #000000;
  overflow: hidden;
  scroll-margin-top: 120px;

  @media (max-width: 768px) {
    padding: 80px 16px;
    scroll-margin-top: 80px;
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const InfoCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 16px;
    border-radius: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(124, 58, 237, 0.1), transparent 50%);
    pointer-events: none;
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
    border-radius: 10px;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;

const InfoContent = styled.div`
  h3 {
    color: white;
    font-size: 1.25rem;
    margin-bottom: 8px;

    @media (max-width: 768px) {
      font-size: 1.125rem;
      margin-bottom: 4px;
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 24px;
    gap: 20px;
    border-radius: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(124, 58, 237, 0.1), transparent 50%);
    pointer-events: none;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
  
  label {
    color: white;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 4px;
    
    span {
      color: #36B37E;
    }

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }
  
  input, textarea, select {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 12px 16px;
    color: white;
    font-size: 1rem;
    font-family: inherit;
    
    @media (max-width: 768px) {
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 16px; // Предотвращает зум на iOS
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: #36B37E;
    }
  }

  select {
    appearance: none;
    cursor: pointer;
    background-image: linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.5) 50%),
                      linear-gradient(135deg, rgba(255, 255, 255, 0.5) 50%, transparent 50%);
    background-position: calc(100% - 20px) calc(1em + 2px),
                         calc(100% - 15px) calc(1em + 2px);
    background-size: 5px 5px,
                    5px 5px;
    background-repeat: no-repeat;

    option {
      background: #1A1A1A;
      color: white;
      padding: 12px;
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
      background-position: calc(100% - 16px) calc(1em + 2px),
                          calc(100% - 11px) calc(1em + 2px);
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;

    @media (max-width: 768px) {
      min-height: 100px;
    }
  }
`;

const RequiredMark = styled.span`
  color: #36B37E;
  margin-left: 4px;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
  border: none;
  border-radius: 12px;
  padding: 16px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 14px;
    border-radius: 10px;
    font-size: 16px; // Предотвращает зум на iOS
  }
  
  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(54, 179, 126, 0.1);
  border: 1px solid #36B37E;
  border-radius: 12px;
  padding: 16px;
  color: #36B37E;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid #FF3B30;
  border-radius: 12px;
  padding: 16px;
  color: #FF3B30;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LoadingOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  z-index: 10;
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  background-color: ${props => props.success ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.success ? '#2e7d32' : '#c62828'};
`;

const Select = styled.select`
  width: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    border-color: rgba(0, 82, 204, 0.5);
    box-shadow: 0 0 0 2px rgba(0, 82, 204, 0.2);
  }

  option {
    background: #0A1F44;
    color: white;
    padding: 12px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 16px;
  }
`;

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    selectedPackage: ''
  });

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const packages = [
    { id: 'consultation', name: 'Индивидуальная консультация', price: '50 000 ₸' },
    { id: 'basic', name: 'Базовый пакет', price: '100 000 ₸' },
    { id: 'advanced', name: 'Продвинутый пакет', price: '200 000 ₸' },
    { id: 'premium', name: 'Премиум пакет', price: '500 000 ₸' }
  ];

  useEffect(() => {
    // Получаем выбранный пакет из sessionStorage при монтировании
    const selectedPackage = sessionStorage.getItem('selectedPackage');
    if (selectedPackage) {
      const packageInfo = packages.find(pkg => pkg.id === selectedPackage);
      if (packageInfo) {
        setFormData(prev => ({
          ...prev,
          selectedPackage: selectedPackage,
          message: `Интересует пакет: ${packageInfo.name} - ${packageInfo.price}`
        }));

        // Добавляем анимацию для select и textarea
        const packageSelect = document.querySelector('#selectedPackage');
        const messageTextarea = document.querySelector('#message');

        if (packageSelect) {
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

        if (messageTextarea) {
          gsap.fromTo(messageTextarea,
            { 
              borderColor: "#36B37E",
              boxShadow: "0 0 0 4px rgba(54, 179, 126, 0.2)"
            },
            { 
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "none",
              duration: 1.5,
              ease: "power2.out",
              delay: 0.2
            }
          );
        }
      }
    }
  }, []);

  // Добавляем слушатель изменений для select и textarea
  useEffect(() => {
    const handleSelectChange = (e) => {
      if (e.target.id === 'selectedPackage') {
        const packageInfo = packages.find(pkg => pkg.id === e.target.value);
        if (packageInfo) {
          setFormData(prev => ({
            ...prev,
            selectedPackage: e.target.value,
            message: `Интересует пакет: ${packageInfo.name}`
          }));
        }
      }
    };

    const packageSelect = document.querySelector('#selectedPackage');
    if (packageSelect) {
      packageSelect.addEventListener('change', handleSelectChange);
    }

    return () => {
      if (packageSelect) {
        packageSelect.removeEventListener('change', handleSelectChange);
      }
    };
  }, [packages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, isSuccess: false, error: null });

    try {
      const selectedPackage = packages.find(pkg => pkg.id === formData.selectedPackage);
      const formDataWithPackageName = {
        ...formData,
        package: selectedPackage ? `${selectedPackage.name} - ${selectedPackage.price}` : formData.selectedPackage
      };

      await sendToTelegram(formDataWithPackageName);

      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null
      });

      // Очищаем форму после успешной отправки
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        selectedPackage: ''
      });

      // Скрываем сообщение об успехе через 5 секунд
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }));
      }, 5000);

      sessionStorage.removeItem('selectedPackage');

    } catch (error) {
      console.error('Error sending message:', error);
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.'
      });

      // Скрываем сообщение об ошибке через 5 секунд
      setTimeout(() => {
        setFormState(prev => ({ ...prev, error: null }));
      }, 5000);
    }
  };

  return (
    <ContactSection id="contact" ref={ref}>
      <Container>
        <SectionBadge>
          <span>Contact</span>
        </SectionBadge>
        <Title>Свяжитесь с нами</Title>
        <Subtitle>
          Готовы обсудить ваш проект? Оставьте заявку, и мы свяжемся с вами в ближайшее время
        </Subtitle>
        <ContactGrid>
          <ContactInfo>
            <InfoCard
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <IconWrapper>
                <HiOutlineLocationMarker />
              </IconWrapper>
              <InfoContent>
                <h3>Адрес</h3>
                <p>ул. Достык 123/4, Алматы</p>
              </InfoContent>
            </InfoCard>
            <InfoCard
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <IconWrapper>
                <HiOutlinePhone />
              </IconWrapper>
              <InfoContent>
                <h3>Телефон</h3>
                <p>+7 (777) 123-45-67</p>
              </InfoContent>
            </InfoCard>
            <InfoCard
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <IconWrapper>
                <HiOutlineMail />
              </IconWrapper>
              <InfoContent>
                <h3>Email</h3>
                <p>info@komekclub.kz</p>
              </InfoContent>
            </InfoCard>
            <InfoCard
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <IconWrapper>
                <HiOutlineClock />
              </IconWrapper>
              <InfoContent>
                <h3>Время работы</h3>
                <p>Пн-Пт: 9:00 - 18:00</p>
              </InfoContent>
            </InfoCard>
          </ContactInfo>
          <ContactForm
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            {formState.isSuccess && (
              <SuccessMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
              </SuccessMessage>
            )}

            {formState.error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {formState.error}
              </ErrorMessage>
            )}

            {formState.isSubmitting && (
              <LoadingOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Отправка...
              </LoadingOverlay>
            )}

            <FormGroup>
              <label htmlFor="name">
                Имя
                <RequiredMark>*</RequiredMark>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">
                Email
                <RequiredMark>*</RequiredMark>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Введите ваш email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="phone">
                Телефон
                <RequiredMark>*</RequiredMark>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="selectedPackage">
                Выберите пакет
                <RequiredMark>*</RequiredMark>
              </label>
              <Select
                id="selectedPackage"
                name="selectedPackage"
                value={formData.selectedPackage}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Выберите пакет услуг</option>
                {packages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.price}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="message">Сообщение</label>
              <textarea
                id="message"
                name="message"
                placeholder="Опишите ваш проект или задайте вопрос"
                value={formData.message}
                onChange={handleChange}
              />
            </FormGroup>
            <SubmitButton 
              type="submit" 
              disabled={formState.isSubmitting}
              style={{ opacity: formState.isSubmitting ? 0.7 : 1 }}
            >
              {formState.isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact; 