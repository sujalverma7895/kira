// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint to send email
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service here
    auth: {
      user: 'your-email@gmail.com', // Your email
      pass: 'your-email-password' // Your email password or app password
    }
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'your-email@gmail.com', // Your email where you want to receive the details
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error while sending email');
    }
    res.status(200).send('Email sent successfully!');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
