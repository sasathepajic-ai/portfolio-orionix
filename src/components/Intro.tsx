import React from "react";
import { Container, Text, Button, Group, ThemeIcon, rem } from '@mantine/core';
import { IconRocket, IconBrain, IconChartDots } from '@tabler/icons-react';

const Intro: React.FC = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container size="lg" py={100}>
      <Group justify="center" align="center" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <div>
          <Text
            component="h1"
            size="clamp(2.5rem, 5vw, 3.75rem)"
            fw={900}
            mb="md"
            variant="gradient"
            gradient={{ from: 'brandPurple.6', to: 'brandEmerald.6', deg: 135 }}
          >
            Making AI Approachable, Intuitive, and Powerful for Your Business
          </Text>
          
          <Text size="xl" c="dimmed" mb={30} maw={800} mx="auto">
            We translate complex AI capabilities into simple, effective tools, removing the need for deep technical expertise.
          </Text>

          <Text size="lg" mb={50} maw={800} mx="auto">
            Pragmatic Labs AI bridges the gap between cutting-edge technology and everyday business needs through intuitive design and user-centric solutions.
          </Text>

          <Group justify="center" gap="md">
            <Button size="xl" variant="filled" color="brandEmerald.8" onClick={scrollToServices}>
              Explore Our Solutions
            </Button>
            <Button size="xl" variant="default" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Us
            </Button>
          </Group>

          <Group mt={80} justify="center" gap={50}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ThemeIcon size={60} radius="md" variant="light" color="brandEmerald.8">
                <IconBrain style={{ width: rem(30), height: rem(30) }} />
              </ThemeIcon>
              <Text mt="sm" fw={500}>Practical AI</Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ThemeIcon size={60} radius="md" variant="light" color="cyan">
                <IconRocket style={{ width: rem(30), height: rem(30) }} />
              </ThemeIcon>
              <Text mt="sm" fw={500}>Accessible Solutions</Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ThemeIcon size={60} radius="md" variant="light" color="teal">
                <IconChartDots style={{ width: rem(30), height: rem(30) }} />
              </ThemeIcon>
              <Text mt="sm" fw={500}>Real Results</Text>
            </div>
          </Group>
        </div>
      </Group>
    </Container>
  );
};

export default Intro;
