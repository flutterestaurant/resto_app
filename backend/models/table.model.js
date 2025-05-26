const pool = require('../config/db');

// Récupérer toutes les tables
async function getAllTables() {
  const { rows } = await pool.query('SELECT * FROM tables');
  return rows;
}

// Récupérer une table par ID
async function getTableById(id) {
  const { rows } = await pool.query('SELECT * FROM tables WHERE id = $1', [id]);
  return rows[0];
}

// Créer une nouvelle table
async function createTable(data) {
  const { number, capacity, location, isAvailable, description } = data;
  const { rows } = await pool.query(
    `INSERT INTO tables (number, capacity, location, isAvailable, description)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [number, capacity, location, isAvailable, description]
  );
  return rows[0];
}

// Mettre à jour une table
async function updateTable(id, data) {
  const { number, capacity, location, isAvailable, description } = data;
  const { rows } = await pool.query(
    `UPDATE tables SET number=$1, capacity=$2, location=$3, isAvailable=$4, description=$5 WHERE id=$6 RETURNING *`,
    [number, capacity, location, isAvailable, description, id]
  );
  return rows[0];
}

// Supprimer une table
async function deleteTable(id) {
  await pool.query('DELETE FROM tables WHERE id = $1', [id]);
}

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable
};
