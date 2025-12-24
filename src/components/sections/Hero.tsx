import { Container, Title, Text, Button, Group, Box, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { textGradient } from '../../theme';

export function Hero() {
  const isMobile = useMediaQuery('(max-width: 48em)');

  return (
    <Box
      id="hero"
      style={{
        position: 'relative',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(105deg, #1A1B1E 0%, #000000 100%)',
      }}
    >
      {/* Background Glow Effects */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle, rgba(95, 124, 184, 0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-10%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(4, 120, 87, 0.2) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Group justify="center" mb="xl">
            <Box
              style={{
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Text size="sm" fw={500} c="brandEmerald.2">
                Reimagining Business Intelligence
              </Text>
            </Box>
          </Group>

          <Title
            ta="center"
            style={{
              fontSize: 'clamp(3rem, 5vw + 1rem, 5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-2px',
              marginBottom: rem(24),
            }}
          >
            <Text component="span" c="white" inherit>The Future of </Text>
            <Text
              component="span"
              inherit
              style={{
                backgroundImage: textGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              AI Innovation
            </Text>
          </Title>

          <Text
            ta="center"
            size="xl"
            c="dimmed"
            maw={600}
            mx="auto"
            mb={50}
            style={{ fontSize: rem(20), lineHeight: 1.6 }}
          >
            We build intelligent systems that transform data into actionable insights. 
            Elevate your enterprise with next-generation AI solutions.
          </Text>

          <Group justify="center" gap="md">
            <motion.div
              style={{ width: isMobile ? '100%' : 'auto' }}
              whileHover={isMobile ? undefined : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="xl"
                fullWidth={isMobile}
                color="brandEmerald.8"
                rightSection={<IconArrowRight size={20} />}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Talk
              </Button>
            </motion.div>
          </Group>
        </motion.div>
      </Container>
    </Box>
  );
}
