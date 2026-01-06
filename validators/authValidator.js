const { body } = require('express-validator');

const registerValidator = [
  body('username')
    .notEmpty().withMessage('Le username est requis')
    .isLength({ min: 3 }).withMessage('Le username doit faire au moins 3 caractères'),
  body('email')
    .notEmpty().withMessage('L\'email est requis')
    .isEmail().withMessage('L\'email doit être valide'),
  body('password')
    .notEmpty().withMessage('Le mot de passe est requis')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
  body('role')
    .optional()
    .isIn(['admin', 'instructor']).withMessage('Le rôle doit être "admin" ou "instructor"')
];

const loginValidator = [
  body('username')
    .notEmpty().withMessage('Le username est requis'),
  body('password')
    .notEmpty().withMessage('Le mot de passe est requis')
];

module.exports = { registerValidator, loginValidator };
