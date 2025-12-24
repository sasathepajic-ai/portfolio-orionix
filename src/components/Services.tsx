import React from "react";
import { FaBrain, FaRobot, FaCloud, FaCogs, FaLanguage, FaDatabase } from "react-icons/fa";
import { Container, Title, SimpleGrid } from '@mantine/core';
import ServiceCard from "./services/ServiceCard";
import { getServicesForDisplay } from "../utils/dataLoader";

const Services: React.FC = () => {
  const services = getServicesForDisplay();
  
  const iconMap: { [key: string]: React.ReactNode } = {
    FaBrain: <FaBrain />,
    FaRobot: <FaRobot />,
    FaCogs: <FaCogs />,
    FaCloud: <FaCloud />,
    FaLanguage: <FaLanguage />,
    FaDatabase: <FaDatabase />,
  };

  return (
    <Container size="lg" py={80}>
      <Title order={2} ta="center" mb={50}>Next-Gen Capabilities for a Smarter Future</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            icon={iconMap[service.icon]}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Services;
