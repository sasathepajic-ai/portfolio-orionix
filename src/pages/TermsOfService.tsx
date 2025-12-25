import { Container, Title, Text, Box } from '@mantine/core';

export function TermsOfService() {
  return (
    <Box py={120} style={{ backgroundColor: '#0A0B0D', minHeight: '100vh' }}>
      <Container size="md">
        <Title order={1} c="white" mb="xl">Terms of Service</Title>
        <Text c="dimmed" mb="xl">Last updated: December 24, 2025</Text>

        <Title order={3} c="white" mt="xl" mb="md">1. Agreement to Terms</Title>
        <Text c="dimmed" mb="md">
          These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Pragmatic Labs AI (“we,” “us” or “our”), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
        </Text>

        <Title order={3} c="white" mt="xl" mb="md">2. Intellectual Property Rights</Title>
        <Text c="dimmed" mb="md">
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
        </Text>

        <Title order={3} c="white" mt="xl" mb="md">3. User Representations</Title>
        <Text c="dimmed" mb="md">
          By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
        </Text>

        <Title order={3} c="white" mt="xl" mb="md">4. Prohibited Activities</Title>
        <Text c="dimmed" mb="md">
          You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
        </Text>

        <Title order={3} c="white" mt="xl" mb="md">5. Governing Law</Title>
        <Text c="dimmed" mb="md">
          These Terms shall be governed by and defined following the laws of the jurisdiction in which Pragmatic Labs AI is established. Pragmatic Labs AI and yourself irrevocably consent that the courts of that jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
        </Text>

        <Title order={3} c="white" mt="xl" mb="md">6. Contact Us</Title>
        <Text c="dimmed">
          In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us via our contact form.
        </Text>
      </Container>
    </Box>
  );
}
