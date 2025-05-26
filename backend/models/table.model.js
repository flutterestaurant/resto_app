const { db } = require('../server');

// Récupérer toutes les tables
async function getAllTables() {
  return db.tables;
}

// Récupérer une table par ID
async function getTableById(id) {
  return db.tables.find(table => table.id === id);
}

// Créer une nouvelle table
async function createTable(data) {
  const { number, capacity, location, isAvailable, description } = data;
  const newTable = {
    id: db.tables.length > 0 ? Math.max(...db.tables.map(t => t.id)) + 1 : 1,
    number,
    capacity,
    location,
    isAvailable: isAvailable || true,
    description: description || '',
  };
  db.tables.push(newTable);
  return newTable;
}

// Mettre à jour une table
async function updateTable(id, data) {
  const tableIndex = db.tables.findIndex(table => table.id === id);
  if (tableIndex === -1) {
    return null;
  }
  const table = db.tables[tableIndex];
  const updatedTable = {
    ...table,
    number: data.number || table.number,
    capacity: data.capacity || table.capacity,
    location: data.location || table.location,
    isAvailable: data.isAvailable !== undefined ? data.isAvailable : table.isAvailable,
    description: data.description || table.description,
  };
  db.tables[tableIndex] = updatedTable;
  return updatedTable;
}

// Supprimer une table
async function deleteTable(id) {
  const initialLength = db.tables.length;
  db.tables = db.tables.filter(table => table.id !== id);
  return db.tables.length < initialLength; // Return true if table was deleted
}

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable
};
