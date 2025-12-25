import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Projects } from '../components/sections/Projects';
import { Testimonials } from '../components/sections/Testimonials';
import { RoiCalculator } from '../components/sections/RoiCalculator';
import { Contact } from '../components/sections/Contact';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  return (
    <>
      <SEO />
      <Hero />
      <Services />
      <Projects />
      <RoiCalculator />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
};
