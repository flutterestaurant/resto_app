const pool = require('../config/db');

// Récupérer tous les items du menu
async function getAllMenuItems() {
  const { rows } = await pool.query('SELECT * FROM menu_items');
  return rows;
}

// Récupérer un item par ID
async function getMenuItemById(id) {
  const { rows } = await pool.query('SELECT * FROM menu_items WHERE id = $1', [id]);
  return rows[0];
}

// Créer un nouvel item
async function createMenuItem(data) {
  const { name, description, price, category, imageUrl, isAvailable, isSpecial, allergens } = data;
  const { rows } = await pool.query(
    `INSERT INTO menu_items (name, description, price, category, imageUrl, isAvailable, isSpecial, allergens)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, description, price, category, imageUrl, isAvailable, isSpecial, allergens]
  );
  return rows[0];
}

// Mettre à jour un item
async function updateMenuItem(id, data) {
  const { name, description, price, category, imageUrl, isAvailable, isSpecial, allergens } = data;
  const { rows } = await pool.query(
    `UPDATE menu_items SET name=$1, description=$2, price=$3, category=$4, imageUrl=$5, isAvailable=$6, isSpecial=$7, allergens=$8 WHERE id=$9 RETURNING *`,
    [name, description, price, category, imageUrl, isAvailable, isSpecial, allergens, id]
  );
  return rows[0];
}

// Supprimer un item
async function deleteMenuItem(id) {
  await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
}

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
