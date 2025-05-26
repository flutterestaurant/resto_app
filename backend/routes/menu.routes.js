const express = require('express');
const router = express.Router();
const menuModel = require('../models/menu-item.model');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { adminMiddleware } = require('../middlewares/role.middleware');

// Récupérer tous les éléments du menu (public)
router.get('/', async (req, res) => {
  try {
    let menuItems = await menuModel.getAllMenuItems();
    // Filtrage côté JS (à adapter en SQL si besoin)
    if (req.query.category) {
      menuItems = menuItems.filter(item => item.category === req.query.category);
    }
    if (!req.query.showAll) {
      menuItems = menuItems.filter(item => item.isavailable === true);
    }
    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du menu:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du menu',
      error: error.message
    });
  }
});

// Récupérer un élément du menu par ID (public)
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await menuModel.getMenuItemById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Élément du menu non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'élément du menu:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'élément du menu',
      error: error.message
    });
  }
});

// Ajouter un élément au menu (admin uniquement)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = await menuModel.createMenuItem(data);
    res.status(201).json({
      success: true,
      message: 'Élément du menu ajouté avec succès',
      data: newMenuItem
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'élément au menu:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout de l\'élément au menu',
      error: error.message
    });
  }
});

// Mettre à jour un élément du menu (admin uniquement)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const menuItemId = req.params.id;
    // Vérifier si l'élément existe
    const menuItem = await menuModel.getMenuItemById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Élément du menu non trouvé'
      });
    }
    const updatedMenuItem = await menuModel.updateMenuItem(menuItemId, req.body);
    res.status(200).json({
      success: true,
      message: 'Élément du menu mis à jour avec succès',
      data: updatedMenuItem
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'élément du menu:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'élément du menu',
      error: error.message
    });
  }
});

// Supprimer un élément du menu (admin uniquement)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const menuItemId = req.params.id;
    // Vérifier si l'élément existe
    const menuItem = await menuModel.getMenuItemById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Élément du menu non trouvé'
      });
    }
    await menuModel.deleteMenuItem(menuItemId);
    res.status(200).json({
      success: true,
      message: 'Élément du menu supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élément du menu:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'élément du menu',
      error: error.message
    });
  }
});

module.exports = router;
