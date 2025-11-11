const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String },
    gender: { type: String },
    age: { type: Number },
    email: { type: String, required: true },
    contactNumber: { type: String },
    query: { type: String },
    disposition: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
