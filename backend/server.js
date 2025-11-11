require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const enquiryRoutes = require('./routes/enquiries');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect DB
connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/multycomm');

// Routes
app.use('/api/enquiries', enquiryRoutes);

// Health check
app.get('/', (req, res) => res.send('MultyComm backend running'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
