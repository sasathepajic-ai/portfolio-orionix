import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Intro.module.scss";

const Intro: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      
      if (element) {
        // Calculate the shrunken navbar height using actual SCSS values
        // $spacing-sm = 0.5rem = 8px, so shrunken padding = 8px top + 8px bottom = 16px
        const shrunkPadding = 8; // 8px top + 8px bottom when fully scrolled
        const shrunkFontSize = 1.1 * 0.68; // 0.748rem when fully scrolled
        const shrunkIconSize = 32; // 32px when fully scrolled
        const lineHeight = 1.2; // More accurate line height
        
        // Calculate actual shrunken height (convert rem to px with 16px base)
        const textHeight = shrunkFontSize * 16 * lineHeight;
        const estimatedShrunkHeight = Math.max(textHeight, shrunkIconSize) + (shrunkPadding * 2);
        
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - estimatedShrunkHeight - 10; // Reduced extra padding
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
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
    <section id="intro" className={styles.intro}>
      {/* Add SVG filter for glass distortion */}
      <svg className={styles.glassFilter} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.008 0.008" 
              numOctaves="2" 
              seed="92" 
              result="noise" 
            />
            <feGaussianBlur 
              in="noise" 
              stdDeviation="2" 
              result="blurred" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="blurred" 
              scale="50" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>
      
      {/* Floating Elements */}
      <div className={styles.floatingElements}>
        <div className={styles.floatingIcon} style={{ '--delay': '0s', '--duration': '6s' } as React.CSSProperties}>
          <span>●</span>
        </div>
        <div className={styles.floatingIcon} style={{ '--delay': '2s', '--duration': '8s' } as React.CSSProperties}>
          <span>◆</span>
        </div>
        <div className={styles.floatingIcon} style={{ '--delay': '4s', '--duration': '7s' } as React.CSSProperties}>
          <span>▲</span>
        </div>
        <div className={styles.floatingIcon} style={{ '--delay': '1s', '--duration': '9s' } as React.CSSProperties}>
          <span>■</span>
        </div>
        <div className={styles.floatingIcon} style={{ '--delay': '3s', '--duration': '6.5s' } as React.CSSProperties}>
          <span>◯</span>
        </div>
      </div>

      {/* Decorative Border Frame */}
      <div className={styles.decorativeFrame}>
        <div className={styles.corner} data-corner="top-left"></div>
        <div className={styles.corner} data-corner="top-right"></div>
        <div className={styles.corner} data-corner="bottom-left"></div>
        <div className={styles.corner} data-corner="bottom-right"></div>
      </div>

      <div className={styles.background}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          Welcome to 
          <span className={styles.highlight}> Orionix AI</span>
        </h1>
        
        <p className={styles.tagline}>
          Building intelligent solutions for real problems
        </p>
        
        <div className={styles.descriptionContainer}>
          <div className={styles.quoteMark}>"</div>
          <p className={styles.description}>
        We develop AI systems that actually solve problems. No buzzwords, no magic tricks – just practical artificial intelligence that helps businesses work smarter. Our team focuses on understanding your specific challenges and building custom solutions that deliver measurable results.
          </p>
        </div>
        
        <div className={styles.valuesContainer}>
          <div className={styles.heartIcon}>●</div>
          <p className={styles.values}>
        Quality engineering and clear communication. That's how we approach every project.
          </p>
        </div>
        
        <div className={styles.ctaContainer}>
          <div className={styles.ctaAccent}></div>
          <button 
            className={styles.ctaButton}
            onClick={() => handleNavigation('services')}
          >
            View Our Work
            <span className={styles.buttonArrow}>→</span>
          </button>
        </div>
      </div>

      {/* Pulse Animation Elements */}
      <div className={styles.pulseElements}>
        <div className={styles.pulse} style={{ '--delay': '0s' } as React.CSSProperties}></div>
        <div className={styles.pulse} style={{ '--delay': '2s' } as React.CSSProperties}></div>
        <div className={styles.pulse} style={{ '--delay': '4s' } as React.CSSProperties}></div>
      </div>
    </section>
  );
};

export default Intro;
