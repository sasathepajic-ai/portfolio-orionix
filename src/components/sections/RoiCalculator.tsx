import { useState } from 'react';
import { Container, Title, Text, Paper, Slider, Group, Stack, SimpleGrid, Box, RingProgress, Center, Grid } from '@mantine/core';
import { IconTrendingUp } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { textGradient } from '../../theme';

export function RoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [employeeCount, setEmployeeCount] = useState(5);

  // Calculate "Automation Opportunity Score" (0-100)
  // We normalize each input to a 0-1 scale relative to its min/max range, then apply weights.
  // This ensures the score strictly stays between 0 and 100.
  
  // 1. Volume (Hours): 1-40 range. Weight: 40%
  const hoursScore = ((hoursPerWeek - 1) / (40 - 1)) * 40;
  
  // 2. Cost (Rate): 15-200 range. Weight: 30%
  const rateScore = ((hourlyRate - 15) / (200 - 15)) * 30;
  
  // 3. Scale (Employees): 1-50 range. Weight: 30%
  const empScore = ((employeeCount - 1) / (50 - 1)) * 30;

  const opportunityScore = Math.round(hoursScore + rateScore + empScore);

  // Efficiency gain is derived from the opportunity score
  // Base efficiency 20%, max efficiency 80%
  const efficiency = 20 + (opportunityScore * 0.6);

  const weeklyCost = hoursPerWeek * hourlyRate * employeeCount;
  const annualCost = weeklyCost * 52;
  const aiSavings = annualCost * (efficiency / 100);

  return (
    <Box id="roi-calculator" py={120} style={{ backgroundColor: '#0e0f11' }}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title order={2} mb="xl" ta="center">
            <Text component="span" c="white">Calculate Your </Text>
            <Text 
              component="span" 
              style={{
                backgroundImage: textGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              AI Savings
            </Text>
          </Title>
          
          <Text c="dimmed" ta="center" maw={600} mx="auto" mb={60}>
            See how much your business could save by automating repetitive tasks with our AI solutions.
          </Text>

          <Paper p={0} radius="md" style={{ backgroundColor: '#141517', border: '1px solid #2C2E33', overflow: 'hidden' }}>
            <Grid gutter={0}>
              <Grid.Col span={{ base: 12, md: 7 }} p="xl">
                <Stack gap="lg" justify="center" h="100%">
                  <div>
                    <Group justify="space-between" mb="xs">
                      <Text c="white" fw={500}>Hours spent on manual tasks (per week/person)</Text>
                      <Text c="violet" fw={700}>{hoursPerWeek}h</Text>
                    </Group>
                    <Slider 
                      value={hoursPerWeek} 
                      onChange={setHoursPerWeek} 
                      min={1} 
                      max={40} 
                      color="violet"
                    />
                  </div>

                  <div>
                    <Group justify="space-between" mb="xs">
                      <Text c="white" fw={500}>Average Hourly Rate</Text>
                      <Text c="violet" fw={700}>${hourlyRate}/hr</Text>
                    </Group>
                    <Slider 
                      value={hourlyRate} 
                      onChange={setHourlyRate} 
                      min={15} 
                      max={200} 
                      step={5}
                      color="violet"
                    />
                  </div>

                  <div>
                    <Group justify="space-between" mb="xs">
                      <Text c="white" fw={500}>Number of Employees</Text>
                      <Text c="violet" fw={700}>{employeeCount}</Text>
                    </Group>
                    <Slider 
                      value={employeeCount} 
                      onChange={setEmployeeCount} 
                      min={1} 
                      max={50} 
                      color="violet"
                    />
                  </div>
                  
                  <Text size="xs" c="dimmed" mt="sm">
                    * The chart represents your <b>Automation Opportunity Score</b>. Higher costs and manual workload indicate a greater potential for high-impact AI integration.
                  </Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 5 }} style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                <Stack gap="xl" align="center" justify="center" h="100%" p="xl">
                  <RingProgress
                    size={220}
                    thickness={20}
                    sections={[{ value: opportunityScore, color: 'violet' }]}
                    label={
                      <Center>
                        <Stack gap={0} align="center">
                          <IconTrendingUp size={40} color="#7e22ce" />
                          <Text c="dimmed" size="xs" fw={700} tt="uppercase">
                            Potential Savings
                          </Text>
                          <Text c="white" fw={900} size="xl">
                            ${aiSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </Text>
                          <Text c="dimmed" size="xs">
                            per year
                          </Text>
                        </Stack>
                      </Center>
                    }
                  />
                  
                  <SimpleGrid cols={2} w="100%">
                    <Box style={{ textAlign: 'center' }}>
                      <Text c="dimmed" size="sm">Current Annual Cost</Text>
                      <Text c="white" fw={700} size="lg">${annualCost.toLocaleString()}</Text>
                    </Box>
                    <Box style={{ textAlign: 'center' }}>
                      <Text c="dimmed" size="sm">Hours Saved</Text>
                      <Text c="white" fw={700} size="lg">{(hoursPerWeek * employeeCount * 52 * (efficiency / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}h</Text>
                    </Box>
                  </SimpleGrid>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
