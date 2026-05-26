const Student = require("../models/Student");

// ── GET ALL STUDENTS ──────────────────────────────────────────────────────────
// GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json({ message: "Students fetched.", data: students });
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ── GET ONE STUDENT ───────────────────────────────────────────────────────────
// GET /api/students/:id
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({ message: "Student fetched.", data: student });
  } catch (error) {
    console.error("Get student error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ── CREATE STUDENT ────────────────────────────────────────────────────────────
// POST /api/students
const createStudent = async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const studentId = await Student.create(name, email, phone, course);

    res.status(201).json({ message: "Student created.", studentId });
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ── UPDATE STUDENT ────────────────────────────────────────────────────────────
// PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const { name, email, phone, course } = req.body;
    await Student.update(req.params.id, name, email, phone, course);

    res.json({ message: "Student updated." });
  } catch (error) {
    console.error("Update student error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ── DELETE STUDENT ────────────────────────────────────────────────────────────
// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    await Student.delete(req.params.id);
    res.json({ message: "Student deleted." });
  } catch (error) {
    console.error("Delete student error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
