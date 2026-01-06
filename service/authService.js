const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const SALT_ROUNDS = 10; // pour bcrypt
const JWT_SECRET = process.env.JWT_SECRET || 'monsecret'; // mettre un vrai secret dans .env
const JWT_EXPIRES_IN = '24h';

/**
 * Enregistrer un nouvel utilisateur
 */
const registerUser = async ({ username, email, password, role }) => {
  // Vérifier si email ou username existe déjà
  const existingUser = await User.findOne({
    where: { email }
  });
  if (existingUser) {
    throw new Error('Email déjà utilisé');
  }

  const existingUsername = await User.findOne({
    where: { username }
  });
  if (existingUsername) {
    throw new Error('Nom d\'utilisateur déjà utilisé');
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Création utilisateur
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role
  });

  return newUser;
};

/**
 * Connexion utilisateur + génération JWT
 */
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Email ou mot de passe invalide');
  }

  // Vérifier mot de passe
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Email ou mot de passe invalide');
  }

  // Générer token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser
};
