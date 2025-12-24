import { useState, useEffect } from 'react';
import { Container, Group, Burger, Text, UnstyledButton, Stack, Button, rem, useMantineTheme, Collapse, Box, Transition, Paper, Portal } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconChevronDown } from '@tabler/icons-react';

const links = [
  { link: '/', label: 'Home', sectionId: 'hero' },
  { 
    link: '/#services', 
    label: 'Services', 
    sectionId: 'services',
    subLinks: [
      { link: '/services/intelligent-analysis', label: 'Intelligent Analysis' },
      { link: '/services/automated-reporting', label: 'Automated Reporting' },
      { link: '/services/document-processing', label: 'Document Processing' },
      { link: '/services/conversational-ai', label: 'Conversational AI' },
      { link: '/services/marketing-content', label: 'Marketing Content' },
      { link: '/services/document-summarization', label: 'Document Summarization' },
    ]
  },
  { link: '/#about', label: 'About', sectionId: 'about' },
  { link: '/#contact', label: 'Contact', sectionId: 'contact' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMantineTheme();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 48em)');
  const [servicesOpened, setServicesOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [opened]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link: string, sectionId: string) => {
    close();
    if (location.pathname === '/' && !link.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (location.pathname === '/' && link.includes('#')) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    navigate(link);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10002, // Higher than Drawer (10001) and Chatbot (9999)
        height: isMobile ? rem(60) : rem(80),
        backgroundColor: scrolled || opened ? '#101113' : 'transparent', // Solid background when menu is open
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled || opened ? `1px solid ${theme.colors.dark[4]}` : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%">
          <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div
              style={{
                width: 32,
                height: 32,
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
              size="xl"
              fw={900}
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif', 
                letterSpacing: '-1px',
              }}
            >
              <span style={{ color: '#7e22ce' }}>PRAGMATIC</span> <span style={{ color: '#10b981' }}>LABS</span>
            </Text>
          </Group>

          <Group gap="xl" visibleFrom="sm">
            {links.map((link) => (
              <UnstyledButton
                key={link.label}
                onClick={() => handleNavClick(link.link, link.sectionId)}
                style={{
                  fontSize: rem(16),
                  fontWeight: 500,
                  color: theme.colors.gray[5],
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.white)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.gray[5])}
              >
                {link.label}
              </UnstyledButton>
            ))}
            <Button
              color="brandEmerald.8"
              onClick={() => handleNavClick('/#contact', 'contact')}
            >
              Get Started
            </Button>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
        </Group>
      </Container>

      <Portal>
        <Transition transition="slide-down" mounted={opened} duration={200}>
          {(styles) => (
            <Paper
              style={{
                ...styles,
                position: 'fixed',
                top: isMobile ? rem(60) : rem(80),
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10001,
                backgroundColor: '#101113',
                overflowY: 'auto',
                borderTop: `1px solid ${theme.colors.dark[4]}`,
              }}
              radius={0}
              hiddenFrom="sm"
            >
              <Stack gap="xl" align="flex-start" pt={rem(40)} px="md" pb={rem(100)}>
                {links.map((link) => {
                  if (link.subLinks) {
                    return (
                      <Box key={link.label} w="100%">
                        <Group justify="space-between" onClick={() => setServicesOpened((o) => !o)} style={{ cursor: 'pointer' }}>
                          <Text
                              style={{
                                fontSize: rem(32),
                                fontWeight: 900,
                                color: theme.white,
                                fontFamily: 'Space Grotesk, sans-serif',
                                letterSpacing: '-1px',
                              }}
                            >
                              {link.label}
                            </Text>
                            <IconChevronDown 
                              size={24} 
                              color={theme.white}
                              style={{ 
                                transform: servicesOpened ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.2s ease'
                              }} 
                            />
                        </Group>
                        <Collapse in={servicesOpened}>
                          <Stack gap="md" mt="sm" pl="md" style={{ borderLeft: '1px solid #333' }}>
                            {link.subLinks.map(sub => (
                              <UnstyledButton
                                key={sub.label}
                                onClick={() => handleNavClick(sub.link, '')}
                                style={{
                                  fontSize: rem(18),
                                  fontWeight: 500,
                                  color: theme.colors.gray[4],
                                  fontFamily: 'Space Grotesk, sans-serif',
                                }}
                              >
                                {sub.label}
                              </UnstyledButton>
                            ))}
                          </Stack>
                        </Collapse>
                      </Box>
                    );
                  }

                  return (
                    <UnstyledButton
                      key={link.label}
                      onClick={() => handleNavClick(link.link, link.sectionId)}
                      style={{
                        fontSize: rem(32),
                        fontWeight: 900,
                        color: theme.white,
                        textAlign: 'left',
                        letterSpacing: '-1px',
                        fontFamily: 'Space Grotesk, sans-serif',
                        width: '100%',
                      }}
                    >
                      {link.label}
                    </UnstyledButton>
                  );
                })}
                <Button
                  size="xl"
                  color="brandEmerald.8"
                  onClick={() => handleNavClick('/#contact', 'contact')}
                  mt="xl"
                  fullWidth
                  style={{ 
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: rem(20),
                    fontWeight: 700
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            </Paper>
          )}
        </Transition>
      </Portal>
    </header>
  );
}
