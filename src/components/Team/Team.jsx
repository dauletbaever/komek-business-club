import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';

const TeamSection = styled.section`
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
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.125rem;
  margin-bottom: 64px;
  max-width: 600px;

  @media (max-width: 768px) {
    margin-bottom: 48px;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const TeamCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-8px);
  }
`;

const MemberImage = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 24px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: all 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, 
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
`;

const MemberName = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 8px;
  font-weight: 500;
`;

const MemberPosition = styled.p`
  color: #36B37E;
  font-size: 1rem;
  margin-bottom: 16px;
  font-weight: 500;
`;

const MemberBio = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
    transform: translateY(-2px);
  }
`;

const Team = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const teamMembers = [
    {
      name: "Асхат Жумагулов",
      position: "CEO & Основатель",
      bio: "10+ лет опыта в развитии бизнеса. Эксперт по стратегическому планированию и масштабированию компаний.",
      linkedin: "https://linkedin.com/in/ashat-zhumagulov",
      telegram: "https://t.me/ashat_zh"
    },
    {
      name: "Айгуль Сатпаева",
      position: "Финансовый директор",
      bio: "Специалист по финансовому планированию и оптимизации бизнес-процессов. Опыт работы в крупных компаниях.",
      linkedin: "https://linkedin.com/in/aigul-satpayeva",
      telegram: "https://t.me/aigul_s"
    },
    {
      name: "Марат Искаков",
      position: "Директор по развитию",
      bio: "Эксперт по маркетингу и продажам. Помог более 30 компаниям увеличить прибыль в 2-3 раза.",
      linkedin: "https://linkedin.com/in/marat-iskakov",
      telegram: "https://t.me/marat_i"
    }
  ];

  return (
    <TeamSection id="team" ref={ref}>
      <Container>
        <Title>Наша команда</Title>
        <Subtitle>
          Познакомьтесь с экспертами, которые помогут вашему бизнесу достичь новых высот
        </Subtitle>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MemberImage>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0052CC 0%, #36B37E 100%)', opacity: 0.8 }} />
              </MemberImage>
              <MemberName>{member.name}</MemberName>
              <MemberPosition>{member.position}</MemberPosition>
              <MemberBio>{member.bio}</MemberBio>
              <SocialLinks>
                <SocialLink 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedinIn />
                </SocialLink>
                <SocialLink 
                  href={member.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTelegramPlane />
                </SocialLink>
              </SocialLinks>
            </TeamCard>
          ))}
        </TeamGrid>
      </Container>
    </TeamSection>
  );
};

export default Team; 