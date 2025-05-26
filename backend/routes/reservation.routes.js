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
const { staffAdminMiddleware } = require('../middlewares/role.middleware');

// Routes publiques
router.get('/availability', checkAvailability);
router.post('/', createReservation); // <-- Add this line

// Routes protégées pour tous les utilisateurs (protected by global JWT middleware in server.js)
router.get('/me', getUserReservations);
router.get('/:id', getReservation);
router.put('/:id', updateReservation);
router.delete('/:id', cancelReservation);

// Routes protégées pour le staff et les administrateurs (protected by global JWT middleware in server.js)
// router.get('/', staffAdminMiddleware, getAllReservations);
router.get('/', getAllReservations);

module.exports = router;
