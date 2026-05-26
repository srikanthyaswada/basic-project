const db = require('../config/db');

const Student = {

  // Get all students
  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM students ORDER BY created_at DESC');
    return rows;
  },

  // Get one student by ID
  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM students WHERE id = ?', [id]);
    return rows[0];
  },

  // Add a new student
  create: async (name, email, phone, course) => {
    const [result] = await db.execute(
      'INSERT INTO students (name, email, phone, course) VALUES (?, ?, ?, ?)',
      [name, email, phone, course]
    );
    return result.insertId;
  },

  // Update student by ID
  update: async (id, name, email, phone, course) => {
    await db.execute(
      'UPDATE students SET name = ?, email = ?, phone = ?, course = ? WHERE id = ?',
      [name, email, phone, course, id]
    );
  },

  // Delete student by ID
  delete: async (id) => {
    await db.execute('DELETE FROM students WHERE id = ?', [id]);
  },

};

module.exports = Student;
