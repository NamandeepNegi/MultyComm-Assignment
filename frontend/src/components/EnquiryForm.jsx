import React, { useState } from 'react';
import axios from 'axios';

const dispositions = [
    'Customer Support',
    'Consultant Support',
    'B2B Lead',
    'New Lead',
    'General Enquiry'
];

export default function EnquiryForm() {
    const [form, setForm] = useState({
        name: '',
        company: '',
        gender: '',
        age: '',
        email: '',
        contactNumber: '',
        query: '',
        disposition: dispositions[0]
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage(null);

        // Basic client validation
        if (!form.name || !form.email || !form.disposition) {
            setMessage({ type: 'error', text: 'Please fill name, email and disposition.' });
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/enquiries',
                form
            );
            setMessage({ type: 'success', text: 'Enquiry submitted successfully.' });
            setForm({
                name: '',
                company: '',
                gender: '',
                age: '',
                email: '',
                contactNumber: '',
                query: '',
                disposition: dispositions[0]
            });
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: err?.response?.data?.message || 'Submission failed' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Name*:
                <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
                Company:
                <input name="company" value={form.company} onChange={handleChange} />
            </label>
            <label>
                Gender:
                <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </label>
            <label>
                Age:
                <input name="age" type="number" value={form.age} onChange={handleChange} />
            </label>
            <label>
                Email*:
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
                Contact Number:
                <input name="contactNumber" value={form.contactNumber} onChange={handleChange} />
            </label>
            <label>
                Query:
                <textarea name="query" value={form.query} onChange={handleChange} />
            </label>
            <label>
                Disposition*:
                <select name="disposition" value={form.disposition} onChange={handleChange} required>
                    {dispositions.map(d => <option key={d}>{d}</option>)}
                </select>
            </label>

            <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>

            {message && (
                <div className={`msg ${message.type === 'error' ? 'error' : 'success'}`}>
                    {message.text}
                </div>
            )}
        </form>
    );
}
