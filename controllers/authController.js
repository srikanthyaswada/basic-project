const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const Admin  = require('../models/Admin');

// ── REGISTER ──────────────────────────────────────────────────────────────────
// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 2. Check if email already exists
    const existing = await Admin.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // 3. Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Plain password:', password);
    console.log('Hashed password:', hashedPassword); 
    // 4. Save admin to database
    const adminId = await Admin.create(name, email, hashedPassword);

    res.status(201).json({
      message: 'Admin registered successfully.',
      adminId,
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────
// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 2. Find admin by email
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 3. Compare password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },  
      process.env.JWT_SECRET,               
      { expiresIn: '1d' }                    
    );

    res.json({
      message: 'Login successful.',
      token,
      admin: {
        id:    admin.id,
        name:  admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { register, login };
