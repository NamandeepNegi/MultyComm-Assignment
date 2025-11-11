const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { sendEnquiryEmail } = require('../services/mailer');

// POST /api/enquiries
router.post('/', async (req, res) => {
    try {
        const { name, company, gender, age, email, contactNumber, query, disposition } = req.body;

        // Basic validation
        if (!name || !email || !disposition) {
            return res.status(400).json({ message: 'name, email and disposition are required' });
        }

        const newEnquiry = new Enquiry({
            name, company, gender, age, email, contactNumber, query, disposition
        });

        const saved = await newEnquiry.save();

        // Email logic
        try {
            const mailResult = await sendEnquiryEmail(saved);
            return res.status(201).json({ saved, mail: mailResult });
        } catch (mailErr) {
            // Email failed but DB saved
            console.error('Email error:', mailErr);
            return res.status(201).json({ saved, mailError: mailErr.message || mailErr.toString() });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
