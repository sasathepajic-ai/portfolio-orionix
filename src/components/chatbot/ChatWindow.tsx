import React, { useRef, useEffect, useState } from 'react';
import { IconSend, IconX, IconRobot, IconCalendar } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { useChat } from './hooks/useChat';
import styles from './styles/Chatbot.module.css';

export const ChatWindow: React.FC = () => {
  const { isOpen, toggleChat, messages, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 48em)');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleContactClick = () => {
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    if (isMobile) {
      toggleChat();
    }
  };

  const shouldShowContactButton = (content: string) => {
    const lower = content.toLowerCase();
    return lower.includes("let's talk") || 
           lower.includes("contact us") || 
           lower.includes("schedule a discussion") ||
           lower.includes("contact form");
  };

  return (
    <div className={styles.chatContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={styles.window}
          >
            <div className={styles.header}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: 600 }}>
                <IconRobot size={20} color="#10b981" />
                <span>Pragmatic Assistant</span>
              </div>
              <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: '#909296', cursor: 'pointer' }}>
                <IconX size={18} />
              </button>
            </div>

            <div className={styles.messages}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                  {msg.role === 'assistant' && shouldShowContactButton(msg.content) && (
                    <button className={styles.actionButton} onClick={handleContactClick}>
                      <IconCalendar size={16} />
                      Book a Call
                    </button>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.message} ${styles.assistantMessage}`}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputArea}>
              <input
                type="text"
                className={styles.input}
                placeholder="Ask about our services..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
              <button 
                className={styles.sendButton} 
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
              >
                <IconSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={styles.toggleButton}
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <IconX size={28} /> : <IconRobot size={28} />}
      </motion.button>
    </div>
  );
};
