import React from 'react';
import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, rem } from '@mantine/core';
import { IconBulb, IconTools, IconUserCheck } from '@tabler/icons-react';

const AboutUs: React.FC = () => {
  return (
    <Container size="lg" py={80}>
      <Title order={2} ta="center" mb="xl">Why "Pragmatic"?</Title>
      
      <Text ta="center" size="lg" maw={800} mx="auto" mb={50}>
        Because we focus on real-world results. We cut through the hype surrounding AI to deliver tools that solve concrete business problems. Our approach is grounded in practicality, usability, and delivering tangible value to our clients. We build AI that works, simply and effectively.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <ThemeIcon size={50} radius="md" variant="light" color="brandEmerald.6" mb="md">
            <IconBulb style={{ width: rem(25), height: rem(25) }} />
          </ThemeIcon>
          
          <Text fw={500} size="lg" mt="md" mb="xs">
            Demystify AI
          </Text>
          
          <Text size="sm" c="dimmed">
            We translate complex AI capabilities into simple, effective tools. You don't need to be a machine learning expert to leverage the power of AI for your business.
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <ThemeIcon size={50} radius="md" variant="light" color="brandEmerald.6" mb="md">
            <IconUserCheck style={{ width: rem(25), height: rem(25) }} />
          </ThemeIcon>
          
          <Text fw={500} size="lg" mt="md" mb="xs">
            Intuitive Interfaces
          </Text>
          
          <Text size="sm" c="dimmed">
            Our solutions are GUI-driven, meaning you interact with user-friendly visual interfaces, not cumbersome command-line prompts or complex code.
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <ThemeIcon size={50} radius="md" variant="light" color="brandEmerald.8" mb="md">
            <IconTools style={{ width: rem(25), height: rem(25) }} />
          </ThemeIcon>
          
          <Text fw={500} size="lg" mt="md" mb="xs">
            Seamless Integration
          </Text>
          
          <Text size="sm" c="dimmed">
            We build tools that connect with your existing business data and files, making it easy to integrate AI into your current workflows without disruption.
          </Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default AboutUs;
