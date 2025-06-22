import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBrain, FaRobot, FaCloud, FaCogs, FaLanguage, FaDatabase, FaArrowLeft } from "react-icons/fa";
import { getServiceById } from "../../utils/dataLoader";
import styles from "../../styles/ServiceDetail.module.scss";

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  
  // Debug logging
  console.log('ServiceDetail - serviceId from params:', serviceId);
  
  const service = serviceId ? getServiceById(serviceId) : null;
  
  // Debug logging
  console.log('ServiceDetail - service found:', service);
  console.log('ServiceDetail - service exists:', !!service);

  const iconMap: { [key: string]: React.ReactNode } = {
    FaBrain: <FaBrain />,
    FaRobot: <FaRobot />,
    FaCogs: <FaCogs />,
    FaCloud: <FaCloud />,
    FaLanguage: <FaLanguage />,
    FaDatabase: <FaDatabase />,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const handleBackToHome = () => {
    navigate('/', { replace: true });
  };

  const handleContactClick = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRelatedServiceClick = (relatedServiceId: string) => {
    navigate(`/services/${relatedServiceId}`);
  };

  if (!service) {
    return (
      <div className={styles.container}>
        <h1>Service not found</h1>
        <p>Looking for service with ID: {serviceId}</p>
        <p>Please check if the service exists or try going back to the home page.</p>
        <button onClick={handleBackToHome} className={styles.backButton}>
          <FaArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container} key={serviceId}>
      <button onClick={handleBackToHome} className={styles.backButton}>
        <FaArrowLeft /> Back to Home
      </button>
      
      <div className={styles.serviceHeader}>
        <div className={styles.iconWrapper}>
          {iconMap[service.icon]}
        </div>
        <h1>{service.title}</h1>
        <p className={styles.subtitle}>{service.description}</p>
      </div>

      <div className={styles.content}>
        <section className={styles.description}>
          <h2>Overview</h2>
          <p>{service.fullDescription}</p>
        </section>

        <section className={styles.features}>
          <h2>Key Features</h2>
          <ul>
            {service.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className={styles.benefits}>
          <h2>Benefits</h2>
          <div className={styles.benefitGrid}>
            {service.benefits.map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                {benefit}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.useCases}>
          <h2>Success Stories</h2>
          <div className={styles.caseList}>
            {service.useCases.map((useCase, index) => (
              <div key={index} className={styles.caseItem}>
                <span className={styles.caseNumber}>{index + 1}</span>
                <p>{useCase}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.technologies}>
          <h2>Technologies We Use</h2>
          <div className={styles.techGrid}>
            {service.technologies.map((tech, index) => {
              const techLink = service.technologyLinks?.[tech];
              
              if (techLink) {
                return (
                  <a 
                    key={index} 
                    href={techLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.techBadge}
                  >
                    {tech}
                  </a>
                );
              } else {
                return (
                  <span key={index} className={styles.techBadge}>
                    {tech}
                  </span>
                );
              }
            })}
          </div>
        </section>

        {service.pricingTiers && (
          <section className={styles.pricing}>
            <h2>Pricing Plans</h2>
            <div className={styles.pricingGrid}>
              {Object.entries(service.pricingTiers).map(([key, tier]) => (
                <div key={key} className={styles.pricingCard}>
                  <h3>{tier.name}</h3>
                  <div className={styles.price}>{tier.price}</div>
                  <div className={styles.duration}>Duration: {tier.duration}</div>
                  <h4>Deliverables:</h4>
                  <ul>
                    {tier.deliverables.map((deliverable, index) => (
                      <li key={index}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {service.testimonials && service.testimonials.length > 0 && (
          <section className={styles.testimonials}>
            <h2>Client Testimonials</h2>
            <div className={styles.testimonialGrid}>
              {service.testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <blockquote>"{testimonial.quote}"</blockquote>
                  <div className={styles.testimonialAuthor}>
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.position}</span>
                    <span>{testimonial.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {service.timeline && (
          <section className={styles.timeline}>
            <h2>Project Timeline</h2>
            <div className={styles.timelineList}>
              {Object.entries(service.timeline).map(([phase, duration], index) => (
                <div key={phase} className={styles.timelineItem}>
                  <div className={styles.timelineNumber}>{index + 1}</div>
                  <div className={styles.timelineContent}>
                    <h4>{phase.charAt(0).toUpperCase() + phase.slice(1)}</h4>
                    <span>{duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(service.industries || service.prerequisites || service.successMetrics) && (
          <section className={styles.compactSection}>
            {service.industries && service.industries.length > 0 && (
              <div className={styles.sectionBlock}>
                <h3>Industries We Serve</h3>
                <div className={styles.industryGrid}>
                  {service.industries.map((industry, index) => (
                    <span key={index} className={styles.industryBadge}>
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {service.prerequisites && service.prerequisites.length > 0 && (
              <div className={styles.sectionBlock}>
                <h3>Prerequisites</h3>
                <ul className={styles.prerequisitesList}>
                  {service.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.successMetrics && service.successMetrics.length > 0 && (
              <div className={styles.sectionBlock}>
                <h3>Success Metrics</h3>
                <div className={styles.metricsGrid}>
                  {service.successMetrics.map((metric, index) => (
                    <div key={index} className={styles.metricCard}>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {service.relatedServices && service.relatedServices.length > 0 && (
          <section className={styles.relatedServices}>
            <h2>Related Services</h2>
            <div className={styles.relatedGrid}>
              {service.relatedServices.map((relatedServiceId, index) => {
                const relatedService = getServiceById(relatedServiceId);
                return (
                  <button 
                    key={index} 
                    className={styles.relatedButton}
                    onClick={() => handleRelatedServiceClick(relatedServiceId)}
                  >
                    {relatedService ? relatedService.title : relatedServiceId.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <section className={styles.cta}>
          <h2>Ready to Get Started?</h2>
          <p>Contact us to discuss how this service can benefit your business.</p>
          <button className={styles.contactButton} onClick={handleContactClick}>
            Get in Touch
          </button>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetail;
