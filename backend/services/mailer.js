const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const dispositionMap = {
    "Customer Support": "ayan@multycomm.com",
    "Consultant Support": "akash@multycomm.com",
    "B2B Lead": "deepak@multycomm.com",
    "New Lead": "aveek@multycomm.com",
    "General Enquiry": null
};

async function sendEnquiryEmail(enquiry) {
    const targetEmail = dispositionMap[enquiry.disposition];
    if (!targetEmail) {
        // General Enquiry - do not send email
        return { skipped: true };
    }

    const mailOptions = {
        from: `"${process.env.FROM_NAME || 'MultyComm Form'}" <${process.env.FROM_EMAIL}>`,
        to: targetEmail,
        subject: 'New Client Enquiry from MultyComm Form',
        text:
            `Greetings!

We have received an inquiry for the client detailed below. Please provide them with the necessary assistance.

Client/Caller Name: ${enquiry.name}
Company: ${enquiry.company || '-'}
Gender: ${enquiry.gender || '-'}
Age: ${enquiry.age || '-'}
Email: ${enquiry.email}
Query: ${enquiry.query || '-'}

Thank You!`
    };

    const info = await transporter.sendMail(mailOptions);
    return { skipped: false, info };
}

module.exports = { sendEnquiryEmail };
