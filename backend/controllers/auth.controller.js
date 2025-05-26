const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
    }
    // Créer un nouvel utilisateur
    const newUser = await userModel.createUser({ name, email, password, phone, role: 'client' });
    // Générer le token JWT
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'inscription', error: error.message });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }
    const isMatch = await userModel.comparePassword(user, password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la connexion', error: error.message });
  }
};

// Récupérer le profil de l'utilisateur connecté
exports.getProfile = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération du profil', error: error.message });
  }
};
