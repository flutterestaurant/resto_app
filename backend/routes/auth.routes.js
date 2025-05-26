const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Routes publiques
router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
