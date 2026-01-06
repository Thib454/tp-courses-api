const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'monsecret';

/**
 * Vérifie que le token est présent et valide
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // id, username, role
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalide' });
  }
};

/**
 * Vérifie le rôle de l'utilisateur
 */
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Non authentifié' });
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole
};
