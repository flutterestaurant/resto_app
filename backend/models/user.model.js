const { db } = require('../server');
const bcrypt = require('bcryptjs');

// Récupérer tous les utilisateurs
async function getAllUsers() {
  return db.users;
}

// Récupérer un utilisateur par ID
async function getUserById(id) {
  return db.users.find(user => user.id === id);
}

// Récupérer un utilisateur par email
async function getUserByEmail(email) {
  return db.users.find(user => user.email === email);
}

// Créer un nouvel utilisateur
async function createUser(data) {
  const { name, email, password, phone, role } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
    name,
    email,
    password: hashedPassword,
    phone,
    role: role || 'client',
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  return newUser;
}

// Vérifier le mot de passe
async function comparePassword(user, password) {
  return await bcrypt.compare(password, user.password);
}

// Mettre à jour un utilisateur
async function updateUser(id, data) {
  const userIndex = db.users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  const user = db.users[userIndex];
  const { name, email, password, phone, role } = data;
  let hashedPassword = user.password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const updatedUser = {
    ...user,
    name: name || user.name,
    email: email || user.email,
    password: hashedPassword,
    phone: phone || user.phone,
    role: role || user.role,
  };
  db.users[userIndex] = updatedUser;
  return updatedUser;
}

// Supprimer un utilisateur
async function deleteUser(id) {
  const initialLength = db.users.length;
  db.users = db.users.filter(user => user.id !== id);
  return db.users.length < initialLength; // Return true if user was deleted
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
