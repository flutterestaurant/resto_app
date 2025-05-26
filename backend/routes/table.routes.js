const express = require('express');
const router = express.Router();
const tableModel = require('../models/table.model');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { staffAdminMiddleware, adminMiddleware } = require('../middlewares/role.middleware');

// Obtenir toutes les tables (accessible au personnel et admin)
router.get('/', authMiddleware, staffAdminMiddleware, async (req, res) => {
  try {
    let tables = await tableModel.getAllTables();
    if (req.query.location) {
      tables = tables.filter(t => t.location === req.query.location);
    }
    if (req.query.available !== undefined) {
      tables = tables.filter(t => t.isavailable === (req.query.available === 'true'));
    }
    if (req.query.minCapacity) {
      tables = tables.filter(t => t.capacity >= parseInt(req.query.minCapacity));
    }
    res.status(200).json({
      success: true,
      count: tables.length,
      data: tables
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des tables:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des tables',
      error: error.message
    });
  }
});

// Obtenir une table spécifique par ID (accessible au personnel et admin)
router.get('/:id', authMiddleware, staffAdminMiddleware, async (req, res) => {
  try {
    const table = await tableModel.getTableById(req.params.id);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Table non trouvée'
      });
    }
    res.status(200).json({
      success: true,
      data: table
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la table:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la table',
      error: error.message
    });
  }
});

// Ajouter une nouvelle table (admin uniquement)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { number, capacity, location, isAvailable, description } = req.body;
    // Vérifier si une table avec ce numéro existe déjà
    const tables = await tableModel.getAllTables();
    if (tables.find(t => t.number === number)) {
      return res.status(400).json({
        success: false,
        message: `Une table avec le numéro ${number} existe déjà`
      });
    }
    const newTable = await tableModel.createTable({ number, capacity, location, isAvailable, description });
    res.status(201).json({
      success: true,
      message: 'Table ajoutée avec succès',
      data: newTable
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la table:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout de la table',
      error: error.message
    });
  }
});

// Mettre à jour une table (personnel et admin)
router.put('/:id', authMiddleware, staffAdminMiddleware, async (req, res) => {
  try {
    const tableId = req.params.id;
    const { number, capacity, location, isAvailable, description } = req.body;
    const table = await tableModel.getTableById(tableId);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Table non trouvée'
      });
    }
    // Si le numéro est modifié, vérifier qu'il n'existe pas déjà
    if (number && number !== table.number) {
      const tables = await tableModel.getAllTables();
      if (tables.find(t => t.number === number)) {
        return res.status(400).json({
          success: false,
          message: `Une table avec le numéro ${number} existe déjà`
        });
      }
    }
    const updatedTable = await tableModel.updateTable(tableId, { number, capacity, location, isAvailable, description });
    res.status(200).json({
      success: true,
      message: 'Table mise à jour avec succès',
      data: updatedTable
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la table:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la table',
      error: error.message
    });
  }
});

// Supprimer une table (admin uniquement)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const tableId = req.params.id;
    const table = await tableModel.getTableById(tableId);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Table non trouvée'
      });
    }
    await tableModel.deleteTable(tableId);
    res.status(200).json({
      success: true,
      message: 'Table supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la table:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la table',
      error: error.message
    });
  }
});

module.exports = router;
