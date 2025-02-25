import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const scrollToSection = (sectionId) => {
  const element = document.querySelector(sectionId);
  if (element) {
    // Разный отступ для мобильных и десктопа
    const isMobile = window.innerWidth <= 768;
    const offset = isMobile ? 80 : 100;

    // Находим форму внутри секции
    const form = element.querySelector('form');
    const targetElement = form || element;

    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    // Используем GSAP для более плавной анимации
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: offsetPosition,
        autoKill: false,
        ease: "power2.inOut"
      },
      onComplete: () => {
        // Добавляем подсветку формы
        gsap.fromTo(targetElement, 
          { 
            borderColor: "#36B37E",
            boxShadow: "0 0 0 4px rgba(54, 179, 126, 0.2)"
          },
          { 
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "none",
            duration: 0.8,
            ease: "power2.out"
          }
        );
      }
    });
  }
}; 