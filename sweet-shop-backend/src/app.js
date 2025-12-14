require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const sweetsRoutes = require('./routes/sweetsRoutes');

const app = express();
app.use(cors());  // Allow frontend requests
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

module.exports = app;