import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Contact } from '../components/sections/Contact';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Contact />
    </>
  );
};
