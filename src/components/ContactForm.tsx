import React, { useState } from "react";
import { TextInput, Textarea, Select, Button, Group, Container, Title, Paper, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSend } from '@tabler/icons-react';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      topic: '',
      projectType: '',
      timeline: '',
      budget: '',
      message: '',
    },

    validate: {
      name: (value: string) => (value.trim().length < 2 ? 'Name is too short' : null),
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      topic: (value: string) => (value ? null : 'Please select a topic'),
      projectType: (value: string) => (value ? null : 'Please select a project type'),
      timeline: (value: string) => (value ? null : 'Please select a timeline'),
      budget: (value: string) => (value ? null : 'Please select a budget'),
      message: (value: string) => (value.trim().length < 10 ? 'Message is too short' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting form data:', values);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      form.reset();
      alert("Message sent successfully!");
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container size="sm" py={80}>
      <Title order={2} ta="center" mb="xl">Get in Touch</Title>
      <Paper shadow="md" radius="lg" p="xl" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              label="Name"
              placeholder="Your name"
              required
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps('email')}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
            <Select
              label="Service Interest"
              placeholder="Select a service"
              data={[
                'AI Consulting',
                'Document Processing',
                'Conversational AI',
                'NLP Solutions',
                'Infrastructure',
                'Other'
              ]}
              required
              {...form.getInputProps('topic')}
            />
            <Select
              label="Project Type"
              placeholder="Select project type"
              data={[
                'New Project',
                'Existing Project',
                'Consultation',
                'Team Training'
              ]}
              required
              {...form.getInputProps('projectType')}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
            <Select
              label="Timeline"
              placeholder="Expected timeline"
              data={[
                'Immediate (< 1 month)',
                'Short term (1-3 months)',
                'Medium term (3-6 months)',
                'Long term (6+ months)'
              ]}
              required
              {...form.getInputProps('timeline')}
            />
            <Select
              label="Budget Range"
              placeholder="Estimated budget"
              data={[
                '<$10k',
                '$10k - $50k',
                '$50k - $100k',
                '$100k+'
              ]}
              required
              {...form.getInputProps('budget')}
            />
          </SimpleGrid>

          <Textarea
            mt="md"
            label="Message"
            placeholder="Tell us about your project..."
            minRows={4}
            required
            {...form.getInputProps('message')}
          />

          <Group justify="flex-end" mt="xl">
            <Button type="submit" size="md" loading={isSubmitting} leftSection={<IconSend size={18} />}>
              Send Message
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactForm;
