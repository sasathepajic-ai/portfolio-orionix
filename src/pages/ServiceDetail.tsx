import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Title, Text, Button, Group, ThemeIcon, SimpleGrid, Card, List, rem, Stack, Box, Divider, Breadcrumbs, Anchor, Grid } from '@mantine/core';
import { IconArrowLeft, IconCheck, IconBrain, IconRobot, IconSettings, IconCloud, IconLanguage, IconDatabase, IconTrendingUp, IconReportAnalytics, IconDeviceAnalytics, IconWriting, IconFileText } from '@tabler/icons-react';
import { getServiceById, getServicesForDisplay } from '../utils/dataLoader';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';

export const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 62em)'); // lg breakpoint
  
  const service = serviceId ? getServiceById(serviceId) : null;
  const allServices = getServicesForDisplay();
  const otherServices = allServices.filter(s => s.id !== serviceId).slice(0, 3);

  const iconMap: { [key: string]: React.ReactNode } = {
    FaBrain: <IconBrain style={{ width: rem(32), height: rem(32) }} />,
    FaRobot: <IconRobot style={{ width: rem(32), height: rem(32) }} />,
    FaCogs: <IconSettings style={{ width: rem(32), height: rem(32) }} />,
    FaCloud: <IconCloud style={{ width: rem(32), height: rem(32) }} />,
    FaLanguage: <IconLanguage style={{ width: rem(32), height: rem(32) }} />,
    FaDatabase: <IconDatabase style={{ width: rem(32), height: rem(32) }} />,
    IconReportAnalytics: <IconReportAnalytics style={{ width: rem(32), height: rem(32) }} />,
    IconDeviceAnalytics: <IconDeviceAnalytics style={{ width: rem(32), height: rem(32) }} />,
    IconWriting: <IconWriting style={{ width: rem(32), height: rem(32) }} />,
    IconFileText: <IconFileText style={{ width: rem(32), height: rem(32) }} />,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <Container size="lg" py={100}>
        <Title order={2} mb="md" c="white">Service not found</Title>
        <Button leftSection={<IconArrowLeft size={18} />} onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/#services' },
    { title: service.title, href: '#' },
  ].map((item, index) => (
    <Anchor 
      component={Link} 
      to={item.href} 
      key={index} 
      c={index === 2 ? 'brandEmerald.4' : 'dimmed'}
      size="sm"
      fw={500}
      style={{ pointerEvents: index === 2 ? 'none' : 'auto' }}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <Box style={{ minHeight: '100vh', background: '#101113' }}>
      {/* Hero Header */}
      <Box 
        py={80} 
        style={{ 
          background: 'radial-gradient(circle at top right, rgba(95, 124, 184, 0.1) 0%, rgba(16, 17, 19, 0) 50%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <Container size="xl">
          <Breadcrumbs separator="→" mb="xl">{items}</Breadcrumbs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box>
              <Group align="center" mb="md">
                <ThemeIcon 
                  size={60} 
                  radius="md" 
                  variant="light" 
                  color="brandEmerald.8"
                >
                  {iconMap[service.icon] || <IconBrain style={{ width: rem(32), height: rem(32) }} />}
                </ThemeIcon>
                <Title order={1} size={48} c="white" style={{ lineHeight: 1.1 }}>{service.title}</Title>
              </Group>
              <Text size="xl" c="dimmed" maw={800}>{service.description}</Text>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container size="xl" py={80}>
        <Grid gutter={60}>
          
          {/* Main Content - Spans 8 columns (2/3) */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Title order={2} mb="lg" c="white">Overview</Title>
              <Text size="lg" c="dimmed" style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                {service.fullDescription}
              </Text>

              <Divider my={60} color="dark.6" />

              <Title order={2} mb="xl" c="white">Key Benefits</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb={60}>
                {service.benefits.map((benefit, index) => (
                  <Card 
                    key={index} 
                    padding="lg" 
                    radius="md" 
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <Group align="flex-start" wrap="nowrap">
                      <ThemeIcon color="brandEmerald" variant="light" radius="md">
                        <IconTrendingUp size={20} />
                      </ThemeIcon>
                      <Text fw={500} c="white" style={{ lineHeight: 1.4 }}>{benefit}</Text>
                    </Group>
                  </Card>
                ))}
              </SimpleGrid>

              <Title order={2} mb="xl" c="white">Features & Capabilities</Title>
              <List
                spacing="lg"
                size="lg"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl" variant="light">
                    <IconCheck style={{ width: rem(14), height: rem(14) }} />
                  </ThemeIcon>
                }
              >
                {service.features.map((feature, index) => (
                  <List.Item key={index} style={{ color: 'var(--mantine-color-dimmed)' }}>
                    <Text span c="gray.3">{feature}</Text>
                  </List.Item>
                ))}
              </List>
            </motion.div>
          </Grid.Col>

          {/* Sidebar - Spans 4 columns (1/3) */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="xl" style={{ position: isMobile ? 'static' : 'sticky', top: 100 }}>
              
              {/* CTA Card */}
              <Card 
                padding="xl" 
                radius="lg" 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(95, 124, 184, 0.15) 0%, rgba(59, 226, 140, 0.15) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Stack align="flex-start" gap="md">
                  <Title order={3} size="h3" c="white">Ready to start?</Title>
                  <Text size="md" c="dimmed">
                    Let's discuss how we can implement {service.title} for your business.
                  </Text>
                  <Button 
                    fullWidth
                    size="lg" 
                    mt="sm" 
                    variant="filled"
                    color="brandEmerald.8"
                    onClick={() => navigate('/#contact')}
                  >
                    Get in Touch
                  </Button>
                </Stack>
              </Card>

            </Stack>
          </Grid.Col>

        </Grid>

        <Divider my={80} color="dark.6" />

        <Box>
          <Title order={2} mb="xl" c="white">Explore Other Solutions</Title>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
            {otherServices.map((otherService) => {
              const Icon = iconMap[otherService.icon] || <IconBrain style={{ width: rem(24), height: rem(24) }} />;
              return (
                <Card 
                  key={otherService.id}
                  padding="lg" 
                  radius="md" 
                  component={Link}
                  to={`/services/${otherService.id}`}
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  className="service-card-hover"
                >
                  <Group mb="md">
                    <ThemeIcon color="brandEmerald.8" variant="light" radius="md">
                      {Icon}
                    </ThemeIcon>
                    <Text fw={600} c="white" lineClamp={1}>{otherService.title}</Text>
                  </Group>
                  <Text size="sm" c="dimmed" lineClamp={2}>
                    {otherService.description}
                  </Text>
                </Card>
              );
            })}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};
