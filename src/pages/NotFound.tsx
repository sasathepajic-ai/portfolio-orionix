import { Container, Title, Text, Box, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <Box py={120} style={{ backgroundColor: '#0A0B0D', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container size="md" ta="center">
        <Title order={1} c="white" style={{ fontSize: '4rem' }} mb="md">404</Title>
        <Title order={2} c="white" mb="xl">Page Not Found</Title>
        <Text c="dimmed" size="lg" mb={40}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Text>
        <Button component={Link} to="/" size="lg" variant="gradient" gradient={{ from: 'violet', to: 'cyan' }}>
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}
