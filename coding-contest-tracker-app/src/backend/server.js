const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for all routes
console.log(process.env.GMAIL_PASSWORD)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vqakkms@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
    },
});

app.post('/send-email', (req, res) => {
    const { email, subject, message } = req.body;

    const mailOptions = {
        from: 'vqakkms@gmail.com',
        to: email,
        subject: subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(process.env.GMAIL_PASSWORD)
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
