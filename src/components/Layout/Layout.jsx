import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LayoutWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #000000;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  position: relative;
`;

const MainContent = styled(motion.main)`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(0, 82, 204, 0.1), transparent 50%);
    pointer-events: none;
    z-index: -1;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <MainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout; 