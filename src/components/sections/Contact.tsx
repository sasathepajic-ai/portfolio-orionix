import { useState } from 'react';
import { Container, Title, TextInput, Textarea, Select, Button, SimpleGrid, Box, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './Contact.module.css';

export function Contact() {
  const isMobile = useMediaQuery('(max-width: 48em)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      topic: '',
      message: '',
    },

    validate: {
      name: (value: string) => (value.trim().length < 2 ? 'Name is too short' : null),
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      topic: (value: string) => (value ? null : 'Please select a topic'),
      message: (value: string) => (value.trim().length < 10 ? 'Message is too short' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box id="contact" py={120} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(105deg, rgba(95, 124, 184, 0.05) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0,
      }} />

      <Container size="md" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title order={2} ta="center" mb="sm" c="white">
            Let's Build the Future
          </Title>
          <Text ta="center" c="dimmed" mb={60}>
            Ready to start your AI journey? Get in touch with us today.
          </Text>

          <Box
            component="form"
            onSubmit={form.onSubmit(handleSubmit)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              padding: '40px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="Name"
                placeholder="Your name"
                variant="filled"
                size="md"
                {...form.getInputProps('name')}
                classNames={{ input: classes.input }}
                styles={{
                  input: { backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'transparent', color: 'white' },
                  label: { color: '#909296' }
                }}
              />
              <TextInput
                label="Email"
                placeholder="your@email.com"
                variant="filled"
                size="md"
                {...form.getInputProps('email')}
                classNames={{ input: classes.input }}
                styles={{
                  input: { backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'transparent', color: 'white' },
                  label: { color: '#909296' }
                }}
              />
            </SimpleGrid>

            <Select
              mt="md"
              label="Topic"
              placeholder="Select a topic"
              data={['AI Consulting', 'Development', 'Partnership', 'Other']}
              variant="filled"
              size="md"
              {...form.getInputProps('topic')}
              classNames={{ 
                option: classes.option,
                input: classes.input 
              }}
              styles={{
                input: { backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'transparent', color: 'white' },
                dropdown: { backgroundColor: '#1A1B1E', borderColor: '#2C2E33' },
                label: { color: '#909296' }
              }}
            />

            <Textarea
              mt="md"
              label="Message"
              placeholder="Please describe your project goals, timeline, and any specific challenges you're facing."
              autosize
              minRows={10}
              variant="filled"
              size="md"
              {...form.getInputProps('message')}
              classNames={{ input: classes.input }}
              styles={{
                input: { backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'transparent', color: 'white' },
                label: { color: '#909296' }
              }}
            />

            <Group justify="center" mt="xl" style={{ flexDirection: 'column', width: '100%' }}>
              <Button
                type="submit"
                size="lg"
                fullWidth={isMobile}
                loading={isSubmitting}
                color="brandEmerald.8"
                rightSection={<IconSend size={18} />}
              >
                Send Message
              </Button>

              {submitStatus === 'success' && (
                <Text c="green.4" size="sm" ta="center">
                  Message sent successfully! We'll get back to you soon.
                </Text>
              )}

              {submitStatus === 'error' && (
                <Text c="red.4" size="sm" ta="center">
                  {errorMessage}
                </Text>
              )}
            </Group>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
