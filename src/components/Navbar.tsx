import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import styles from "../styles/Navbar.module.scss";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [scrollScale, setScrollScale] = useState(1);
  const [navbarCenter, setNavbarCenter] = useState(32); // Default fallback
  const navRef = useRef<HTMLElement>(null);

  // Check if we're on a service detail page
  const isServiceDetailPage = location.pathname.startsWith('/services/');

  useEffect(() => {
    const updateNavbarCenter = () => {
      if (navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const navCenter = navRect.top + (navRect.height / 2);
        setNavbarCenter(navCenter);
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const startTransition = 150; // Delay before transition starts
      const maxScroll = 300; // Distance over which to transition
      
      if (scrollTop < startTransition) {
        setScrollOpacity(isServiceDetailPage ? 1 : 0); // Full opacity on service pages
        setScrollScale(1);
      } else {
        const adjustedScroll = scrollTop - startTransition;
        const progress = Math.min(adjustedScroll / maxScroll, 1);
        setScrollOpacity(1); // Always full opacity when scrolled
        // Scale from 1 to 0.68 (0.75rem / 1.1rem = 0.68)
        setScrollScale(1 - (progress * 0.32));
      }
      
      // Update navbar center position on scroll
      updateNavbarCenter();
    };

    // Set initial state based on page type
    if (isServiceDetailPage) {
      setScrollOpacity(1);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateNavbarCenter);
    handleScroll(); // Call immediately to set initial state
    updateNavbarCenter(); // Set initial navbar center
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavbarCenter);
    };
  }, [isServiceDetailPage]);
  const handleNavigation = (sectionId: string) => {
    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
    };

    if (location.pathname !== '/') {
      // If not on home page, navigate to home first then scroll
      navigate('/', { replace: true });
      setTimeout(scrollToSection, 200);
    } else {
      // If on home page, just scroll to section
      scrollToSection();
    }
  };

  return (
    <>
      <div 
        className={styles.brandText}
        style={{
          opacity: scrollOpacity,
          fontSize: `${1.5 * (0.8 + (scrollOpacity * 0.2))}rem`,
          top: `${navbarCenter}px`
        }}
      >
        OrionixAI
      </div>

      <nav 
        ref={navRef}
        className={styles.navbar}
        style={{
          backgroundColor: `rgba(0, 71, 171, ${scrollOpacity * 0.95})`,
          padding: `${16 - (scrollScale < 1 ? 8 * (1 - scrollScale) : 0)}px ${48 - (scrollScale < 1 ? 16 * (1 - scrollScale) : 0)}px`
        }}
      >
        <div className={styles.navbarContent}>
          <ul 
            className={styles.navLinks}
            style={{
              gap: `${32 - (scrollScale < 1 ? 16 * (1 - scrollScale) : 0)}px`
            }}
          >
            <li style={{ fontSize: `${1.1 * scrollScale}rem` }}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('intro'); }}>Home</a>
            </li>
            <li style={{ fontSize: `${1.1 * scrollScale}rem` }}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('services'); }}>Services</a>
            </li>
            <li style={{ fontSize: `${1.1 * scrollScale}rem` }}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}>Contact</a>
            </li>
          </ul>
          <div 
            className={styles.socialIcons}
            style={{
              gap: `${16 - (scrollScale < 1 ? 8 * (1 - scrollScale) : 0)}px`
            }}
          >
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
              style={{
                fontSize: `${1.2 * scrollScale}rem`,
                width: `${40 - (scrollScale < 1 ? 8 * (1 - scrollScale) : 0)}px`,
                height: `${40 - (scrollScale < 1 ? 8 * (1 - scrollScale) : 0)}px`
              }}
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
              style={{
                fontSize: `${1.2 * scrollScale}rem`,
                width: `${40 - (scrollScale < 1 ? 8 * (1 - scrollScale) : 0)}px`,
                height: `${40 - (scrollScale < 1 ? 8 * (1 - scrollScale) : 0)}px`
              }}
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
              style={{
                fontSize: `${1.2 * scrollScale}rem`,
                width: `${40 - (scrollScale < 1 ? 8 * (1 - scrollScale) : 0)}px`,
                height: `${40 - (scrollScale < 1 ? 8 * (1 - scrollScale) : 0)}px`
              }}
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
