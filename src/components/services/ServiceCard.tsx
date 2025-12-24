import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Text, Group, ThemeIcon, rem } from '@mantine/core';

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
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      onClick={handleCardClick}
      style={{ cursor: 'pointer', height: '100%' }}
    >
      <Card.Section>
        {/* Optional image */}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <ThemeIcon size={40} radius="md" variant="light" color="blue">
          {/* We need to clone the icon to add styles if needed, or just wrap it */}
          <div style={{ width: rem(20), height: rem(20), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>
        </ThemeIcon>
      </Group>

      <Text fw={500} size="lg" mt="md">
        {service.title}
      </Text>

      <Text size="sm" c="dimmed" mt="sm">
        {service.description}
      </Text>
    </Card>
  );
};

export default ServiceCard;
