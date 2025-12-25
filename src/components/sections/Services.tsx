import { Container, Title, Text, Grid, Card, ThemeIcon, rem, Button, Group, Box } from '@mantine/core';
import { IconBrain, IconRobot, IconSettings, IconCloud, IconLanguage, IconDatabase, IconArrowRight, IconReportAnalytics, IconDeviceAnalytics, IconWriting, IconFileText } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getServicesForDisplay } from '../../utils/dataLoader';
import { textGradient } from '../../theme';

const services = getServicesForDisplay();

const iconMap: Record<string, React.ElementType> = {
  FaBrain: IconBrain,
  FaRobot: IconRobot,
  FaCogs: IconSettings,
  FaCloud: IconCloud,
  FaLanguage: IconLanguage,
  FaDatabase: IconDatabase,
  IconReportAnalytics: IconReportAnalytics,
  IconDeviceAnalytics: IconDeviceAnalytics,
  IconWriting: IconWriting,
  IconFileText: IconFileText,
};

export function Services() {
  const navigate = useNavigate();

  return (
    <Box id="services" py={120} style={{ position: 'relative', zIndex: 1 }}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title order={2} ta="center" mb="xl">
            <Text component="span" c="white">Our </Text>
            <Text 
              component="span" 
              style={{
                backgroundImage: textGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Expertise
            </Text>
          </Title>
          <Text ta="center" c="dimmed" maw={600} mx="auto" mb={80} size="lg">
            Comprehensive AI solutions tailored to drive your business forward.
          </Text>
        </motion.div>

        <Grid gutter="xl">
          {services.map((service: { id: string; icon: string; title: string; description: string }, index: number) => {
            const Icon = iconMap[service.icon] || IconBrain;
            
            return (
              <Grid.Col key={service.id} span={{ base: 12, md: 6, lg: 4 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    padding="xl"
                    radius="lg"
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                    }}
                    className="service-card"
                  >
                    <Group align="flex-start" justify="space-between" mb="md">
                      <ThemeIcon
                        size={50}
                        radius="md"
                        variant="filled"
                        color="brandEmerald.8"
                      >
                        <Icon style={{ width: rem(28), height: rem(28) }} />
                      </ThemeIcon>
                    </Group>

                    <Title order={3} size="h4" mb="sm" c="white">
                      {service.title}
                    </Title>
                    
                    <Text c="dimmed" size="sm" mb="xl" lineClamp={4} style={{ flex: 1 }}>
                      {service.description}
                    </Text>

                    <Button 
                      variant="light" 
                      color="brandEmerald" 
                      fullWidth
                      rightSection={<IconArrowRight size={16} />}
                      onClick={() => navigate(`/services/${service.id}`)}
                      style={{ marginTop: 'auto' }}
                    >
                      View Details
                    </Button>
                  </Card>
                </motion.div>
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
