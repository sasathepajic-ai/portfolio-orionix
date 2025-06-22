import React from "react";
import { FaBrain, FaRobot, FaCloud, FaCogs, FaLanguage, FaDatabase } from "react-icons/fa";
import ServiceCard from "./services/ServiceCard";
import { getServicesForDisplay } from "../utils/dataLoader";
import styles from "../styles/Services.module.scss";

const Services: React.FC = () => {
  const services = getServicesForDisplay();
  
  const iconMap: { [key: string]: React.ReactNode } = {
    FaBrain: <FaBrain className={styles.icon} />,
    FaRobot: <FaRobot className={styles.icon} />,
    FaCogs: <FaCogs className={styles.icon} />,
    FaCloud: <FaCloud className={styles.icon} />,
    FaLanguage: <FaLanguage className={styles.icon} />,
    FaDatabase: <FaDatabase className={styles.icon} />,
  };

  return (
    <section id="services" className={styles.services}>
      <h2>Next-Gen Capabilities for a Smarter Future</h2>
      <div className={styles.carousel}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            icon={iconMap[service.icon]}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
