const { db } = require('../server');

// Récupérer toutes les réservations
async function getAllReservations() {
  return db.reservations;
}

// Récupérer une réservation par ID
async function getReservationById(id) {
  return db.reservations.find(reservation => reservation.id === id);
}

// Créer une nouvelle réservation
async function createReservation(data) {
  const { userId, name, email, phone, date, time, guests, tableId, status, specialRequests } = data;
  const newReservation = {
    id: db.reservations.length > 0 ? Math.max(...db.reservations.map(r => r.id)) + 1 : 1,
    userId,
    name,
    email,
    phone,
    date,
    time,
    guests,
    tableId,
    status: status || 'pending',
    specialRequests: specialRequests || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.reservations.push(newReservation);
  return newReservation;
}

// Mettre à jour une réservation
async function updateReservation(id, data) {
  const reservationIndex = db.reservations.findIndex(reservation => reservation.id === id);
  if (reservationIndex === -1) {
    return null;
  }
  const reservation = db.reservations[reservationIndex];
  const updatedReservation = {
    ...reservation,
    userId: data.userId || reservation.userId,
    name: data.name || reservation.name,
    email: data.email || reservation.email,
    phone: data.phone || reservation.phone,
    date: data.date || reservation.date,
    time: data.time || reservation.time,
    guests: data.guests || reservation.guests,
    tableId: data.tableId || reservation.tableId,
    status: data.status || reservation.status,
    specialRequests: data.specialRequests || reservation.specialRequests,
    updatedAt: new Date().toISOString(),
  };
  db.reservations[reservationIndex] = updatedReservation;
  return updatedReservation;
}

// Supprimer une réservation
async function deleteReservation(id) {
  const initialLength = db.reservations.length;
  db.reservations = db.reservations.filter(reservation => reservation.id !== id);
  return db.reservations.length < initialLength; // Return true if reservation was deleted
}

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};
