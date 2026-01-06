const { body } = require('express-validator');

const createCategoryValidator = [
  body('name')
    .notEmpty().withMessage('Le nom est requis')
    .isLength({ min: 3 }).withMessage('Le nom doit faire au moins 3 caractères'),
  body('description')
    .optional()
    .isString().withMessage('La description doit être une chaîne de caractères')
];

module.exports = { createCategoryValidator };
