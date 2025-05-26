const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Récupérer tous les utilisateurs
async function getAllUsers() {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
}

// Récupérer un utilisateur par ID
async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
}

// Récupérer un utilisateur par email
async function getUserByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
}

// Créer un nouvel utilisateur
async function createUser(data) {
  const { name, email, password, phone, role } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password, phone, role, createdAt)
     VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
    [name, email, hashedPassword, phone, role || 'client']
  );
  return rows[0];
}

// Vérifier le mot de passe
async function comparePassword(user, password) {
  return await bcrypt.compare(password, user.password);
}

// Mettre à jour un utilisateur
async function updateUser(id, data) {
  const { name, email, password, phone, role } = data;
  let hashedPassword = password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const { rows } = await pool.query(
    `UPDATE users SET name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6 RETURNING *`,
    [name, email, hashedPassword, phone, role, id]
  );
  return rows[0];
}

// Supprimer un utilisateur
async function deleteUser(id) {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  comparePassword,
  updateUser,
  deleteUser
};
