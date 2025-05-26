const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Importer les routes
const authRoutes = require('./routes/auth.routes');
const reservationRoutes = require('./routes/reservation.routes');
const menuRoutes = require('./routes/menu.routes');
const tableRoutes = require('./routes/table.routes');

// Initialiser l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/tables', tableRoutes);

//test

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API du restaurant Le Gourmet Français!' });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port: ${PORT}`);
});
