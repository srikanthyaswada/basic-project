const db = require('../config/db');

const Admin = {

  // Admin login
  findByEmail: async (email) => {
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );
    return rows[0]; 
  },

  // Admin register
  create: async (name, email, hashedPassword) => {
    const [result] = await db.execute(
      'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result.insertId; 
  },

};

module.exports = Admin;
