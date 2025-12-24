import { Container, Group, Anchor, Text, ActionIcon, rem, Stack, Divider, Box } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

export function Footer() {
  const isMobile = useMediaQuery('(max-width: 48em)');

  return (
    <Box component="footer" style={{ backgroundColor: '#0A0B0D', borderTop: '1px solid #2C2E33' }} py={60} pb={isMobile ? 100 : 60}>
      <Container size="xl">
        <Group justify="space-between" align="start">
          <Stack gap="md" maw={300}>
            <Group gap="xs">
              <div
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: '#10b981',
                  maskImage: 'url(/logo.svg)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url(/logo.svg)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  transform: 'scaleX(-1) rotate(180deg)',
                }}
              />
              <Text 
                size="lg" 
                fw={900} 
                style={{ 
                  fontFamily: 'Space Grotesk',
                }}
              >
                <span style={{ color: '#7e22ce' }}>PRAGMATIC</span> <span style={{ color: '#10b981' }}>LABS</span>
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              Making AI Approachable, Intuitive, and Powerful for Your Business.
            </Text>
          </Stack>

          <Group gap={60} align="start">
            <Stack gap="sm">
              <Text size="lg" fw={700} c="white">Services</Text>
              <Anchor component={Link} to="/services/intelligent-analysis" c="dimmed" size="sm" underline="never">Intelligent Analysis</Anchor>
              <Anchor component={Link} to="/services/automated-reporting" c="dimmed" size="sm" underline="never">Automated Reporting</Anchor>
              <Anchor component={Link} to="/services/document-processing" c="dimmed" size="sm" underline="never">Document Processing</Anchor>
              <Anchor component={Link} to="/services/conversational-ai" c="dimmed" size="sm" underline="never">Conversational AI</Anchor>
              <Anchor component={Link} to="/services/marketing-content" c="dimmed" size="sm" underline="never">Marketing Content</Anchor>
              <Anchor component={Link} to="/services/document-summarization" c="dimmed" size="sm" underline="never">Document Summarization</Anchor>
            </Stack>
            
            <Stack gap="sm">
              <Text size="lg" fw={700} c="white">Company</Text>
              <Anchor component={Link} to="/#about" c="dimmed" size="sm" underline="never">About Us</Anchor>
              <Anchor component={Link} to="/#contact" c="dimmed" size="sm" underline="never">Contact</Anchor>
            </Stack>
          </Group>
        </Group>

        <Divider my="xl" color="dark.6" />

        <Group justify={isMobile ? "center" : "space-between"} style={{ flexDirection: isMobile ? 'column-reverse' : 'row', gap: isMobile ? rem(20) : undefined }}>
          <Text c="dimmed" size="sm" ta={isMobile ? 'center' : 'left'}>
            © {new Date().getFullYear()} Pragmatic Labs AI. All rights reserved.
          </Text>

          <Group gap="lg">
            <ActionIcon 
              size="lg" 
              variant="subtle" 
              color="gray"
              component="a"
              href="https://www.linkedin.com/company/pragmatic-labs-ai/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
