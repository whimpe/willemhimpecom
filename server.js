import express from 'express';
import sgMail from '@sendgrid/mail';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(express.json());

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const msg = {
    to: 'willem@relivo.io',
    from: 'noreply@relivo.io', // Must be a verified sender in SendGrid
    replyTo: email,
    subject: `[${subject}] from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('SendGrid error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// API endpoint for fetching podcast RSS feed
app.get('/api/podcast-feed', async (req, res) => {
  try {
    const response = await fetch('https://anchor.fm/s/d4838a40/podcast/rss');
    const text = await response.text();
    res.set('Content-Type', 'application/xml');
    res.send(text);
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error);
    res.status(500).json({ error: 'Failed to fetch podcast feed' });
  }
});

// SPA fallback - serve index.html for all other routes (with no-cache headers)
app.get('*', (req, res) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

