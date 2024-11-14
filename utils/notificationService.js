require('dotenv').config();  // Load environment variables from .env file
const nodemailer = require('nodemailer');

const sendEmailNotification = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Using Gmail's SMTP server
        auth: {
            user: process.env.EMAIL_USER,  // Your Gmail email address
            pass: process.env.EMAIL_PASS   // Your 16-character app password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {
    sendEmailNotification,
};
