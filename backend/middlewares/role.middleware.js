// Middleware pour vérifier si l'utilisateur est un membre du staff ou un administrateur
exports.staffAdminMiddleware = (req, res, next) => {
  if (req.user && (req.user.role === 'staff' || req.user.role === 'admin')) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Accès refusé. Vous devez être membre du personnel ou administrateur'
  });
};

// Middleware pour vérifier si l'utilisateur est un administrateur
exports.adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Accès refusé. Vous devez être administrateur'
  });
};
