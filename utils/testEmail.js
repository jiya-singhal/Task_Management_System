const { sendEmailNotification } = require('./notificationService.js');  // Adjust path if needed

(async () => {
    const recipient = 'jiyasinghal95@gmail.com'; // replace with the recipient email address
    const subject = 'Test Email';
    const message = 'This is a test email sent using nodemailer.';

    try {
        await sendEmailNotification(recipient, subject, message);
        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
})();
