const reservationModel = require('../models/reservation.model');
const tableModel = require('../models/table.model');

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;
    // Chercher les tables disponibles
    let tables = await tableModel.getAllTables();
    tables = tables.filter(t => t.isavailable && t.capacity >= guests);
    tables.sort((a, b) => a.capacity - b.capacity);
    if (tables.length === 0) {
      return res.status(400).json({ success: false, message: 'Aucune table disponible pour ce nombre de personnes' });
    }
    // Chercher les réservations existantes à cette date et heure
    const allReservations = await reservationModel.getAllReservations();
    const reservedTableIds = allReservations.filter(r =>
      r.date.toISOString().slice(0,10) === date &&
      r.time === time &&
      ['pending','confirmed'].includes(r.status)
    ).map(r => r.tableid);
    const availableTable = tables.find(t => !reservedTableIds.includes(t.id));
    if (!availableTable) {
      return res.status(400).json({ success: false, message: 'Désolé, aucune table disponible à cette date et heure' });
    }
    // Créer la réservation
    const newReservation = await reservationModel.createReservation({
      userId: req.user ? req.user.id : null,
      name,
      email,
      phone,
      date,
      time,
      guests,
      tableId: availableTable.id,
      status: 'pending',
      specialRequests
    });
    res.status(201).json({ success: true, message: 'Réservation créée avec succès', data: newReservation });
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la création de la réservation', error: error.message });
  }
};

// Obtenir toutes les réservations (staff/admin)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationModel.getAllReservations();
    res.status(200).json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des réservations', error: error.message });
  }
};

// Obtenir les réservations de l'utilisateur connecté
exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await reservationModel.getAllReservations();
    const userReservations = reservations.filter(r => r.userid === req.user.id);
    res.status(200).json({ success: true, data: userReservations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des réservations', error: error.message });
  }
};

// Obtenir une réservation par ID
exports.getReservation = async (req, res) => {
  try {
    const reservation = await reservationModel.getReservationById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération de la réservation', error: error.message });
  }
};

// Mettre à jour une réservation
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await reservationModel.getReservationById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }
    const updated = await reservationModel.updateReservation(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Réservation mise à jour', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de la réservation', error: error.message });
  }
};

// Annuler une réservation (suppression)
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await reservationModel.getReservationById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }
    await reservationModel.deleteReservation(req.params.id);
    res.status(200).json({ success: true, message: 'Réservation annulée' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de l\'annulation de la réservation', error: error.message });
  }
};

// Vérifier la disponibilité d'une table (GET /availability)
exports.checkAvailability = async (req, res) => {
  try {
    const { date, time, guests } = req.query;
    let tables = await tableModel.getAllTables();
    tables = tables.filter(t => t.isavailable && t.capacity >= guests);
    const allReservations = await reservationModel.getAllReservations();
    const reservedTableIds = allReservations.filter(r =>
      r.date.toISOString().slice(0,10) === date &&
      r.time === time &&
      ['pending','confirmed'].includes(r.status)
    ).map(r => r.tableid);
    const availableTables = tables.filter(t => !reservedTableIds.includes(t.id));
    res.status(200).json({ success: true, data: availableTables });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la vérification de disponibilité', error: error.message });
  }
};
