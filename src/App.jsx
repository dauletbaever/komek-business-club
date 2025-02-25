import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Process from './components/Process/Process';
import Benefits from './components/Benefits/Benefits';
import Services from './components/Services/Services';
import Team from './components/Team/Team';
import Testimonials from './components/Testimonials/Testimonials';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    scroll-padding-top: 100px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    background: #000000;
    
    /* Плавный скролл для современных браузеров */
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    
    /* Настройки скролла */
    &::-webkit-scrollbar {
      width: 10px;
      @media (max-width: 768px) {
        width: 6px;
      }
    }

    &::-webkit-scrollbar-track {
      background: #000000;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #0052CC 0%, #36B37E 100%);
      border-radius: 5px;
      border: 2px solid #000000;
      
      &:hover {
        background: linear-gradient(135deg, #36B37E 0%, #0052CC 100%);
      }
    }
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #ffffff;
    line-height: 1.5;
    position: relative;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::selection {
    background: #0052CC;
    color: white;
  }

  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
    
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  /* Улучшения для сенсорных устройств */
  @media (hover: none) {
    button:active,
    a:active {
      transform: scale(0.96);
    }
  }

  /* Медиа-запросы для адаптивности */
  @media (max-width: 768px) {
    section {
      padding: 60px 16px !important;
    }

    h1 {
      font-size: 2.5rem !important;
    }

    h2 {
      font-size: 2rem !important;
    }

    h3 {
      font-size: 1.5rem !important;
    }

    p {
      font-size: 1rem !important;
    }
  }

  /* Улучшения для складных устройств */
  @media (max-width: 320px) {
    html {
      font-size: 12px;
    }
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header />
        <Hero />
        <About />
        <Process />
        <Benefits />
        <Services />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </Layout>
    </>
  );
};

export default App; 