import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ServiceDetail from "./components/services/ServiceDetail";

const HomePage: React.FC = () => {
  return (
    <>
      <section id="intro">
        <Intro />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="about-us">
        <AboutUs />
      </section>
      <section id="contact">
        <ContactForm />
      </section>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <section id="navbar">
          <Navbar />
        </section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
        </Routes>
        <section id="footer">
          <Footer />
        </section>
      </div>
    </Router>
  );
};

export default App;
