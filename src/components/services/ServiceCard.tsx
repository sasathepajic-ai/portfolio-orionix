import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Services.module.scss";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
  };
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, icon }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/services/${service.id}`);
  };

  return (
    <div 
      className={`${styles.card} ${styles.clickable}`}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${service.title}`}
    >
      <div className={styles.card__title}>
        {icon}
        <span>{service.title}</span>
      </div>
      <p className={styles.card__description}>{service.description}</p>
    </div>
  );
};

export default ServiceCard;
