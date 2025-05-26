const { db } = require('../config/db');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
  console.log('Seeding database...');

  // Clear existing data
  db.users = [];
  db.menuItems = [];
  db.reservations = [];
  db.tables = [];

  // Seed Users
  const hashedPassword = await bcrypt.hash('password123', 10);
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', password: hashedPassword, phone: '123-456-7890', role: 'admin', createdAt: new Date().toISOString() },
    { id: 2, name: 'Client User', email: 'client@example.com', password: hashedPassword, phone: '098-765-4321', role: 'client', createdAt: new Date().toISOString() },
  ];
  db.users.push(...users);

  // Seed Menu Items
  const menuItems = [
    { id: 1, name: 'Croissant', description: 'Freshly baked butter croissant', price: 2.50, category: 'Pastries', imageUrl: 'croissant.jpg', isAvailable: true, isSpecial: false, allergens: ['gluten', 'dairy'] },
    { id: 2, name: 'Café au Lait', description: 'Coffee with steamed milk', price: 3.00, category: 'Drinks', imageUrl: 'cafeaulait.jpg', isAvailable: true, isSpecial: false, allergens: ['dairy'] },
    { id: 3, name: 'Quiche Lorraine', description: 'Savory tart with bacon and cheese', price: 8.50, category: 'Main Course', imageUrl: 'quiche.jpg', isAvailable: true, isSpecial: true, allergens: ['gluten', 'dairy', 'eggs'] },
  ];
  db.menuItems.push(...menuItems);

  // Seed Tables
  const tables = [
    { id: 1, number: 1, capacity: 2, location: 'Indoor', isAvailable: true, description: 'Small table by the window' },
    { id: 2, number: 2, capacity: 4, location: 'Indoor', isAvailable: true, description: 'Standard four-person table' },
    { id: 3, number: 3, capacity: 6, location: 'Outdoor', isAvailable: true, description: 'Large table on the terrace' },
  ];
  db.tables.push(...tables);

  // Seed Reservations
  const reservations = [
    { id: 1, userId: 2, name: 'Client User', email: 'client@example.com', phone: '098-765-4321', date: '2025-06-01', time: '19:00', guests: 2, tableId: 1, status: 'confirmed', specialRequests: 'Window seat', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];
  db.reservations.push(...reservations);

  console.log('Database seeded successfully!');
  console.log('Current DB State:', db);
}

seedDatabase().catch(error => {
  console.error('Failed to seed database:', error);
  process.exit(1);
});
