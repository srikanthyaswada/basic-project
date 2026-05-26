const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
const protect = require('./middleware/auth');
const adminRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
app.use('/api/auth', adminRoutes);
app.use('/api/students', protect, studentRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});