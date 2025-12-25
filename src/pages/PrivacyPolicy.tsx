import { Container, Title, Text, Box, List, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export function PrivacyPolicy() {
  return (
    <Box py={120} style={{ backgroundColor: '#0A0B0D', minHeight: '100vh' }}>
      <Container size="md">
        <Title order={1} c="white" mb="xl">Privacy Policy</Title>
        <Text c="dimmed" mb="xl">Last updated: December 24, 2025</Text>

        <Text c="white" mb="md">
          At Pragmatic Labs AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </Text>

        <Title order={3} c="white" mt="xl" mb="md">1. Information We Collect</Title>
        <Text c="dimmed" mb="md">
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </Text>
        <List
          spacing="sm"
          size="sm"
          center
          icon={
            <ThemeIcon color="violet" size={20} radius="xl">
              <IconCheck size={12} />
            </ThemeIcon>
          }
        >
          <List.Item><Text c="dimmed">Personal Data: Name, email address, and other contact details you voluntarily provide.</Text></List.Item>
          <List.Item><Text c="dimmed">Derivative Data: Information our servers automatically collect when you access the Site, such as your IP address, browser type, and operating system.</Text></List.Item>
        </List>

        <Title order={3} c="white" mt="xl" mb="md">2. Use of Your Information</Title>
        <Text c="dimmed" mb="md">
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </Text>
        <List
          spacing="sm"
          size="sm"
          center
          icon={
            <ThemeIcon color="violet" size={20} radius="xl">
              <IconCheck size={12} />
            </ThemeIcon>
          }
        >
          <List.Item><Text c="dimmed">Respond to your inquiries and provide customer support.</Text></List.Item>
          <List.Item><Text c="dimmed">Send you a newsletter or marketing information (if you opted in).</Text></List.Item>
          <List.Item><Text c="dimmed">Improve the efficiency and operation of the Site.</Text></List.Item>
        </List>

        <Title order={3} c="white" mt="xl" mb="md">3. Disclosure of Your Information</Title>
        <Text c="dimmed" mb="md">
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </Text>
        <Text c="dimmed" mb="md">
          <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
        </Text>

        <Title order={3} c="white" mt="xl" mb="md">4. Contact Us</Title>
        <Text c="dimmed">
          If you have questions or comments about this Privacy Policy, please contact us via our contact form.
        </Text>
      </Container>
    </Box>
  );
}
