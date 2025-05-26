const jwt = require('jsonwebtoken');

// Clé secrète pour JWT (à placer dans un fichier .env en production)
const JWT_SECRET = process.env.JWT_SECRET || 'votre_cle_secrete_jwt';

// Middleware d'authentification obligatoire
exports.authMiddleware = (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Accès non autorisé. Token non fourni'
      });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Ajouter les informations utilisateur à la requête
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(401).json({
      success: false,
      message: 'Accès non autorisé. Token invalide'
    });
  }
};

// Middleware d'authentification optionnelle
exports.optionalAuthMiddleware = (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      // Vérifier le token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Ajouter les informations utilisateur à la requête
      req.user = decoded;
    }

    next();
  } catch (error) {
    console.error('Erreur d\'authentification optionnelle:', error);
    // Continuer sans authentification en cas d'erreur
    next();
  }
};
