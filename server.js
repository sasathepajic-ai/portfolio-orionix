import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Add a root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API Server is running!',
    endpoints: ['/api/contact', '/api/chat']
  });
});

// Add a test endpoint to check configuration
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working',
    env: {
      EMAIL_USER: !!process.env.EMAIL_USER,
      EMAIL_PASS: !!process.env.EMAIL_PASS,
      EMAIL_TO: !!process.env.EMAIL_TO,
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      NODE_ENV: process.env.NODE_ENV
    }
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is missing');
      return res.status(500).json({ message: 'Chat service not configured' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Using gemini-flash-latest as it appears in your available models list
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: `
You are the AI Assistant for Pragmatic Labs AI, a company specializing in making AI approachable, intuitive, and powerful for businesses.
Your goal is to help visitors understand our services and how we can help them achieve their business goals.

Our Core Services:
1. Intelligent Document Processing: Automating data extraction from invoices, contracts, and forms to reduce manual entry and errors.
2. Conversational AI & Chatbots: 24/7 intelligent customer support agents that understand context and nuance.
3. Automated Reporting: Turning raw data into executive-ready reports automatically, saving hours of manual work.
4. Intelligent Analysis: AI-powered analytics that allow users to ask questions about their data in natural language.
5. Marketing Content Creation: Scaling content production (blogs, social, email) while maintaining brand voice.
6. Document Summarization: Getting concise summaries of long reports, meetings, and research.

Guidelines:
- Tone: Professional, helpful, concise, and approachable. Avoid overly complex jargon.
- Length: Keep answers short and easy to read (2-3 sentences usually).
- Technical Depth: Explain concepts at a high level (business value). If a user asks for specific code implementations, deep technical architecture, or "how to build this myself", politely decline and suggest they contact us for a consultation.
- Call to Action: If a user seems interested in a service, encourage them to use the "Contact Us" form or "Let's Talk" button to schedule a discussion.
- Identity: You are an AI assistant, not a human. You do not have a personal name, just "Pragmatic Labs Assistant".

If you don't know the answer, say: "I'm not sure about that specific detail. It would be best to contact our team directly for more information."
`
    });

    // Convert history to Gemini format
    // Note: Gemini history shouldn't include the current message we are about to send
    // and roles should be 'user' or 'model'
    let chatHistory = history.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Gemini requires history to start with 'user'
    // Remove any leading model messages (like the welcome message)
    while (chatHistory.length > 0 && chatHistory[0].role === 'model') {
      chatHistory.shift();
    }

    console.log('Processed Chat History:', JSON.stringify(chatHistory, null, 2));

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ message: text });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ message: 'Failed to generate response' });
  }
});

app.post('/api/contact', async (req, res) => {
  console.log('=== Contact API Called ===');
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  try {
    const { name, email, topic, message } = req.body;

    // Validate required fields with detailed logging
    const missingFields = [];
    if (!name?.trim()) missingFields.push('name');
    if (!email?.trim()) missingFields.push('email');
    if (!topic?.trim()) missingFields.push('topic');
    if (!message?.trim()) missingFields.push('message');

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Check environment variables with detailed logging
    console.log('Checking environment variables...');
    console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
    console.log('EMAIL_TO exists:', !!process.env.EMAIL_TO);
    
    // More detailed environment check
    console.log('Environment check:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
    console.log('EMAIL_TO:', process.env.EMAIL_TO ? 'SET' : 'NOT SET');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      const error = 'Missing email configuration - check .env.local file';
      console.error(error);
      return res.status(500).json({ 
        message: error,
        success: false,
        debug: {
          EMAIL_USER: !!process.env.EMAIL_USER,
          EMAIL_PASS: !!process.env.EMAIL_PASS
        }
      });
    }

    if (!process.env.EMAIL_TO) {
      const error = 'Missing EMAIL_TO configuration';
      console.error(error);
      return res.status(500).json({ 
        message: error,
        success: false 
      });
    }

    // Create transporter with error handling
    console.log('Creating email transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter with better error handling
    console.log('Verifying email transporter...');
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully');
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      return res.status(500).json({ 
        message: 'Email service configuration error',
        error: verifyError instanceof Error ? verifyError.message : 'Unknown verification error'
      });
    }

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Message from ${name} - ${topic}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${topic}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    };

    // Send email with better error handling
    console.log('Sending email...');
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);

      return res.status(200).json({ 
        message: 'Email sent successfully',
        success: true 
      });
    } catch (sendError) {
      console.error('Email sending failed:', sendError);
      return res.status(500).json({ 
        message: 'Failed to send email',
        error: sendError instanceof Error ? sendError.message : 'Unknown sending error',
        success: false
      });
    }

  } catch (error) {
    console.error('=== CRITICAL ERROR ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Full error object:', error);
    
    return res.status(500).json({ 
      message: 'Server error occurred',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      success: false,
      debug: process.env.NODE_ENV === 'development' ? {
        stack: error instanceof Error ? error.stack : null
      } : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
