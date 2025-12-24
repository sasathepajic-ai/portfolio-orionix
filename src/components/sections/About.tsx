import { Container, Title, Text, SimpleGrid, ThemeIcon, rem, Stack, Box, Group } from '@mantine/core';
import { IconBulb, IconTools, IconUserCheck, IconRocket } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { textGradient } from '../../theme';

const features = [
  {
    icon: IconBulb,
    title: 'Strategic Innovation',
    description: 'We don’t just build software; we craft strategies that position you as a market leader.',
  },
  {
    icon: IconTools,
    title: 'Cutting-Edge Tech',
    description: 'Leveraging the latest in Generative AI, LLMs, and Neural Networks to solve complex problems.',
  },
  {
    icon: IconUserCheck,
    title: 'Client-Centric',
    description: 'Your success is our metric. We work closely with your team to ensure seamless integration.',
  },
  {
    icon: IconRocket,
    title: 'Rapid Deployment',
    description: 'Agile methodologies ensure we deliver value quickly without compromising on quality.',
  },
];

export function About() {
  return (
    <Box id="about" py={120} style={{ backgroundColor: '#0e0f11' }}>
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Title order={2} mb="xl">
              <Text component="span" c="white">Why Choose </Text>
              <Text 
                component="span" 
                style={{
                  backgroundImage: textGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Pragmatic Labs?
              </Text>
            </Title>
            <Text c="dimmed" size="lg" mb="xl" style={{ lineHeight: 1.6 }}>
              At Pragmatic Labs, we bridge the gap between theoretical AI potential and practical business application. 
              Our team of experts combines deep technical knowledge with industry experience to deliver solutions that matter.
            </Text>
            <Text c="dimmed" size="lg" style={{ lineHeight: 1.6 }}>
              We believe in transparent, ethical, and impactful AI development. Whether you are a startup looking to disrupt 
              or an enterprise aiming to optimize, we are your partners in innovation.
            </Text>
          </motion.div>

          <Stack gap="xl">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Group align="flex-start">
                  <ThemeIcon
                    size={50}
                    radius="md"
                    variant="light"
                    color="brandEmerald.8"
                    style={{ backgroundColor: 'rgba(6, 78, 59, 0.2)' }}
                  >
                    <feature.icon style={{ width: rem(26), height: rem(26) }} />
                  </ThemeIcon>
                  <Box style={{ flex: 1 }}>
                    <Text size="xl" fw={700} c="white" mb="xs">{feature.title}</Text>
                    <Text c="dimmed">{feature.description}</Text>
                  </Box>
                </Group>
              </motion.div>
            ))}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
