import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Add a root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API Server is running!',
    endpoints: ['/api/contact']
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
      NODE_ENV: process.env.NODE_ENV
    }
  });
});

app.post('/api/contact', async (req, res) => {
  console.log('=== Contact API Called ===');
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  try {
    const { name, email, topic, projectType, timeline, budget, message } = req.body;

    // Validate required fields with detailed logging
    const missingFields = [];
    if (!name?.trim()) missingFields.push('name');
    if (!email?.trim()) missingFields.push('email');
    if (!topic?.trim()) missingFields.push('topic');
    if (!projectType?.trim()) missingFields.push('projectType');
    if (!timeline?.trim()) missingFields.push('timeline');
    if (!budget?.trim()) missingFields.push('budget');
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            
            <h3 style="color: #555; margin-top: 25px;">Project Details</h3>
            <p><strong>Service:</strong> ${topic}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <p><strong>Budget Range:</strong> ${budget}</p>
            
            <h3 style="color: #555; margin-top: 25px;">Message</h3>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
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
