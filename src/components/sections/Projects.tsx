import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Box, Image, AspectRatio } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { textGradient } from '../../theme';

const projects = [
  {
    title: 'PS Pulse™',
    description: 'A dedicated team analytics module within the ABL S.A.F.E.T.Y.™ Platform. PS Pulse™ enables organizations to track psychological safety trends over time through anonymous surveys. The system aggregates data to provide actionable insights on team dynamics, helping leaders foster a culture of high performance and trust.',
    tags: ['Team Analytics', 'Psychological Safety', 'Trend Analysis', 'Data Visualization'],
    link: 'https://ablsafety.com',
    image: '/pulse.png'
  },
  {
    title: 'ABL S.A.F.E.T.Y.™ Platform',
    description: 'The core platform hosting the S.A.F.E.T.Y.™ Assessment—a neuroscience-backed tool that reveals individual behavioral drivers. We modernized the legacy infrastructure to support enterprise-scale delivery of personalized profiles across five critical domains: Security, Autonomy, Fairness, Esteem, and Trust.',
    tags: ['Digital Transformation', 'React', 'Individual Assessment', 'Neuroscience'],
    link: 'https://ablsafety.com',
    image: '/safety.png'
  },
  {
    title: 'ABL S.A.F.E.T.Y.™ Assistant',
    description: 'A specialized Generative AI assistant for safety professionals. We developed an intelligent agent that automates complex content workflows—generating marketing plans, email drip campaigns, and technical blog posts. This tool transforms hours of manual writing into seconds of AI-generated precision. (Internal Enterprise Tool)',
    tags: ['Generative AI', 'LLM Integration', 'Content Automation', 'Streamlit', 'Python'],
    link: 'https://ai.brainleadership.com/',
    image: '/ai.brainleadership.com.png'
  }
];

export function Projects() {
  return (
    <Box id="projects" py={120} style={{ backgroundColor: '#0A0B0D' }}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title order={2} mb="xl" ta="center">
            <Text component="span" c="white">Featured </Text>
            <Text 
              component="span" 
              style={{
                backgroundImage: textGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Work
            </Text>
          </Title>
          
          <Text c="dimmed" ta="center" maw={600} mx="auto" mb={60}>
            Real-world solutions delivering tangible business impact.
          </Text>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  padding="xl" 
                  radius="lg" 
                  style={{ 
                    backgroundColor: '#141517', 
                    border: '1px solid #2C2E33',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  withBorder
                >
                  <Card.Section style={{ overflow: 'hidden' }}>
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fit="cover"
                        style={{ 
                          objectPosition: 'top',
                          transform: 'scale(1.01) translateY(-2px)',
                          transformOrigin: 'top center',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    </AspectRatio>
                  </Card.Section>

                  <Group justify="space-between" mt="xl" mb="md">
                    <Text fw={700} c="white" size="xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {project.title}
                    </Text>
                  </Group>

                  <Text size="sm" c="dimmed" mb="lg" style={{ lineHeight: 1.6, flex: 1 }}>
                    {project.description}
                  </Text>

                  <Group gap="xs" mb="xl">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        color="gray" 
                        style={{ 
                          borderColor: '#2C2E33', 
                          color: '#909296',
                          textTransform: 'none',
                          fontWeight: 500
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </Group>

                  <Button 
                    component="a" 
                    href={project.link} 
                    target="_blank" 
                    variant="light" 
                    color="violet" 
                    fullWidth 
                    rightSection={<IconExternalLink size={16} />}
                    styles={{
                      root: {
                        backgroundColor: 'rgba(126, 34, 206, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(126, 34, 206, 0.2)',
                        }
                      }
                    }}
                  >
                    Visit Project
                  </Button>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>
      </Container>
    </Box>
  );
}
