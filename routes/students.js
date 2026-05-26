const express = require('express');
const router  = express.Router();

const protect = require('../middleware/auth');

const {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

router.get('/',      protect, getAllStudents);   
router.get('/student/:id',   protect, getStudent);       
router.post('/',     protect, createStudent);   
router.put('/student/:id',   protect, updateStudent);    
router.delete('/student/:id',protect, deleteStudent);    

module.exports = router;
