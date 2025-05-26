const express = require('express');
const router = express.Router();
const menuModel = require('../models/menu-item.model');

router.get('/', async (req, res) => {
  try {
    let menuItems = await menuModel.getAllMenuItems();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Erreur lors de la récupération du menu:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du menu',
      error: error.message
    });
  }
});

module.exports = router;
