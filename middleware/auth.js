const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // 1. Get token from header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token. Access denied or token invalid.' });
  }

  const token = authHeader.split(' ')[1]; 
  // 2. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; 
    next();              
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = protect;
