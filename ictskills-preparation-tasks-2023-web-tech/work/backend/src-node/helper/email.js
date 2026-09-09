const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false,
});

/**
 * Send an email.
 * @param to {string} receiver email address
 * @param subject {string} email subject
 * @param html {string} email html body
 * @returns {Promise<*>}
 */
async function sendEmail(to, subject, html) {
    return transporter.sendMail({from: 'swissskills@test.local', to, subject, html}, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendEmail
};
