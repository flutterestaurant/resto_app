const pool = require('../config/db');

// Récupérer toutes les réservations
async function getAllReservations() {
  const { rows } = await pool.query('SELECT * FROM reservations');
  return rows;
}

// Récupérer une réservation par ID
async function getReservationById(id) {
  const { rows } = await pool.query('SELECT * FROM reservations WHERE id = $1', [id]);
  return rows[0];
}

// Créer une nouvelle réservation
async function createReservation(data) {
  const { userId, name, email, phone, date, time, guests, tableId, status, specialRequests } = data;
  const { rows } = await pool.query(
    `INSERT INTO reservations (userId, name, email, phone, date, time, guests, tableId, status, specialRequests, createdAt, updatedAt)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) RETURNING *`,
    [userId, name, email, phone, date, time, guests, tableId, status || 'pending', specialRequests]
  );
  return rows[0];
}

// Mettre à jour une réservation
async function updateReservation(id, data) {
  const { userId, name, email, phone, date, time, guests, tableId, status, specialRequests } = data;
  const { rows } = await pool.query(
    `UPDATE reservations SET userId=$1, name=$2, email=$3, phone=$4, date=$5, time=$6, guests=$7, tableId=$8, status=$9, specialRequests=$10, updatedAt=NOW() WHERE id=$11 RETURNING *`,
    [userId, name, email, phone, date, time, guests, tableId, status, specialRequests, id]
  );
  return rows[0];
}

// Supprimer une réservation
async function deleteReservation(id) {
  await pool.query('DELETE FROM reservations WHERE id = $1', [id]);
}

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};
