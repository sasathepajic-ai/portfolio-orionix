import React, { useState } from "react";
import { FaRocket, FaLightbulb, FaChartLine, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';
import styles from "../styles/ContactForm.module.scss";

interface FormData {
  name: string;
  email: string;
  topic: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  topic?: string;
  projectType?: string;
  timeline?: string;
  budget?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    topic: "",
    projectType: "",
    timeline: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.topic) {
      newErrors.topic = "Please select a service";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }

    if (!formData.timeline) {
      newErrors.timeline = "Please select a timeline";
    }

    if (!formData.budget) {
      newErrors.budget = "Please select a budget range";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const result = await response.json();
      console.log('Response data:', result);

      if (!response.ok) {
        console.error('Server error:', result);
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", topic: "", projectType: "", timeline: "", budget: "", message: "" });
      } else {
        console.error('Submission failed:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contactForm}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Let's Build Something Together</h1>
          <p className={styles.heroSubtitle}>
            We help businesses implement AI solutions that actually work. 
            Tell us about your challenges, and we'll show you what's possible.
          </p>
          <div className={styles.heroFeatures}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
                <FaRocket />
              </span>
              <span>Quick Start</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
                <FaLightbulb />
              </span>
              <span>Tailored Approach</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
                <FaChartLine />
              </span>
              <span>Measurable Impact</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contactContainer}>
        {/* Contact Information Sidebar */}
        <div className={styles.contactInfo}>
          <h3>Get in Touch</h3>
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <FaEnvelope />
              </span>
              <div>
                <strong>Email</strong>
                <p>sasa@example.com</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <FaPhone />
              </span>
              <div>
                <strong>Phone</strong>
                <p>Available upon request</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <FaClock />
              </span>
              <div>
                <strong>Response Time</strong>
                <p>Usually within a day</p>
              </div>
            </div>
          </div>

          <div className={styles.benefits}>
            <h4>How We Work</h4>
            <ul>
              <li>No-pressure initial chat</li>
              <li>Clear project breakdown</li>
              <li>Upfront pricing</li>
              <li>Support when you need it</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit}>
            <h2>Tell Us About Your Project</h2>
            
            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? styles.error : ''}
                  disabled={isSubmitting}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? styles.error : ''}
                  disabled={isSubmitting}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <select 
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  className={errors.topic ? styles.error : ''}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Select a Service</option>
                  <option value="ai-consulting">AI Consulting & Implementation</option>
                  <option value="document-processing">Intelligent Document Processing</option>
                  <option value="conversational-ai">Conversational AI & Chatbots</option>
                  <option value="nlp-text-processing">Advanced NLP & Text Intelligence</option>
                  <option value="ai-infrastructure">AI Application Infrastructure</option>
                  <option value="other">Other</option>
                </select>
                {errors.topic && <span className={styles.errorText}>{errors.topic}</span>}
              </div>

              <div className={styles.inputGroup}>
                <select 
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className={errors.projectType ? styles.error : ''}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Project Type</option>
                  <option value="new-implementation">New AI implementation</option>
                  <option value="existing-improvement">Improve existing system</option>
                  <option value="consulting-only">Consulting and strategy only</option>
                  <option value="proof-of-concept">Proof of concept</option>
                  <option value="full-solution">Complete end-to-end solution</option>
                </select>
                {errors.projectType && <span className={styles.errorText}>{errors.projectType}</span>}
              </div>

              <div className={styles.inputGroup}>
                <select 
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className={errors.timeline ? styles.error : ''}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Timeline</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-months-plus">6+ months</option>
                  <option value="flexible">Timeline is flexible</option>
                </select>
                {errors.timeline && <span className={styles.errorText}>{errors.timeline}</span>}
              </div>

              <div className={styles.inputGroup}>
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={errors.budget ? styles.error : ''}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Budget Range</option>
                  <option value="under-25k">Under $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="250k-plus">$250,000+</option>
                  <option value="discuss">Let's discuss</option>
                </select>
                {errors.budget && <span className={styles.errorText}>{errors.budget}</span>}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <textarea 
                name="message"
                placeholder="What are you trying to solve? The more details, the better we can help."
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? styles.error : ''}
                disabled={isSubmitting}
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
