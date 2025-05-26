const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getUserReservations,
  getReservation,
  updateReservation,
  cancelReservation,
  checkAvailability
} = require('../controllers/reservation.controller');
const { authMiddleware, optionalAuthMiddleware } = require('../middlewares/auth.middleware');
const { staffAdminMiddleware } = require('../middlewares/role.middleware');

// Routes publiques
router.get('/availability', checkAvailability);

// Routes avec authentification optionnelle
router.post('/', optionalAuthMiddleware, createReservation);

// Routes protégées pour tous les utilisateurs
router.get('/me', authMiddleware, getUserReservations);
router.get('/:id', authMiddleware, getReservation);
router.put('/:id', authMiddleware, updateReservation);
router.delete('/:id', authMiddleware, cancelReservation);

// Routes protégées pour le staff et les administrateurs
router.get('/', authMiddleware, staffAdminMiddleware, getAllReservations);

module.exports = router;
