import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box } from '@mantine/core';
import { Chatbot } from '../chatbot/Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', overflowX: 'hidden', position: 'relative' }}>
      <Header />
      <Box style={{ flex: 1, width: '100%' }}>
        {children}
      </Box>
      <Footer />
      <Chatbot />
    </Box>
  );
};
