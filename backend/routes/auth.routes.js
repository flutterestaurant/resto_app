const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');

// Routes publiques
router.post('/register', register);
router.post('/login', login);

// Routes protégées (protected by global JWT middleware in server.js)
router.get('/profile', getProfile);

module.exports = router;
