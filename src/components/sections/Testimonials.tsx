import { Container, Title, Text, SimpleGrid, Paper, Avatar, Group, Box, Rating, ThemeIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconQuote } from '@tabler/icons-react';
import { textGradient } from '../../theme';

const testimonials = [
  {
    content: "This was all so seamless, and I really appreciate everything you have done to get us here.",
    author: "Executive Partner",
    role: "Leadership Team",
    company: "ABL Safety",
    rating: 5
  },
  {
    content: "Their professionalism, attention to detail, and communication have been nothing short of outstanding. I look forward to connecting in the new year to discuss next steps.",
    author: "Strategic Client",
    role: "Director",
    company: "Partner Organization",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <Box id="testimonials" py={120} style={{ backgroundColor: '#0e0f11', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 0% 50%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title order={2} mb="xl" ta="center">
            <Text component="span" c="white">Client </Text>
            <Text 
              component="span" 
              style={{
                backgroundImage: textGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Testimonials
            </Text>
          </Title>
          
          <Text c="dimmed" ta="center" maw={600} mx="auto" mb={60}>
            Don't just take our word for it. Here's what our partners say about working with us.
          </Text>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Paper 
                  p={40}
                  radius="lg" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                >
                  {/* Decorative Quote Icon */}
                  <IconQuote 
                    size={120} 
                    style={{ 
                      position: 'absolute', 
                      top: 20, 
                      right: 20, 
                      opacity: 0.05, 
                      color: 'var(--mantine-color-brandEmerald-6)',
                      transform: 'rotate(180deg)'
                    }} 
                  />

                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <Group mb="lg" align="center">
                      <Rating value={testimonial.rating} readOnly color="brandEmerald" size="sm" />
                      <Box 
                        style={{ 
                          height: 1, 
                          flex: 1, 
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%)' 
                        }} 
                      />
                    </Group>
                    
                    <Text c="white" size="xl" fw={300} style={{ lineHeight: 1.6, fontStyle: 'italic' }} mb="xl">
                      "{testimonial.content}"
                    </Text>
                  </div>
                  
                  <Group gap="md" style={{ position: 'relative', zIndex: 2, marginTop: 'auto' }}>
                    <Avatar 
                      radius="xl" 
                      size="lg" 
                      color="brandEmerald" 
                      variant="filled"
                      style={{
                        background: 'linear-gradient(135deg, var(--mantine-color-brandPurple-6) 0%, var(--mantine-color-brandEmerald-6) 100%)'
                      }}
                    >
                      {testimonial.author.charAt(0)}
                    </Avatar>
                    <div>
                      <Text fw={700} c="white" size="lg">{testimonial.author}</Text>
                      <Group gap={8}>
                        <Text size="sm" c="dimmed">{testimonial.role}</Text>
                        <Text size="sm" c="dimmed">•</Text>
                        <Text size="sm" c="brandEmerald" fw={500}>{testimonial.company}</Text>
                      </Group>
                    </div>
                  </Group>
                </Paper>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>
      </Container>
    </Box>
  );
}
