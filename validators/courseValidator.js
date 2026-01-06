const { body } = require('express-validator');

const createCourseValidator = [
  body('title')
    .notEmpty().withMessage('Le titre est requis')
    .isLength({ min: 3 }).withMessage('Le titre doit faire au moins 3 caractères'),
  body('description')
    .notEmpty().withMessage('La description est requise')
    .isLength({ min: 10 }).withMessage('La description doit faire au moins 10 caractères'),
  body('duration')
    .notEmpty().withMessage('La durée est requise')
    .isInt({ min: 1 }).withMessage('La durée doit être un entier positif'),
  body('level')
    .notEmpty().withMessage('Le niveau est requis')
    .isIn(['débutant', 'intermédiaire', 'avancé']).withMessage('Le niveau doit être débutant, intermédiaire ou avancé'),
  body('price')
    .notEmpty().withMessage('Le prix est requis')
    .isFloat({ min: 0 }).withMessage('Le prix doit être positif ou 0'),
  body('instructor')
    .notEmpty().withMessage('Le nom de l\'instructeur est requis'),
  body('categoryId')
    .notEmpty().withMessage('L\'ID de la catégorie est requis')
    .isInt().withMessage('L\'ID de la catégorie doit être un entier')
];

const updateCourseValidator = [
  body('title')
    .optional()
    .isLength({ min: 3 }).withMessage('Le titre doit faire au moins 3 caractères'),
  body('description')
    .optional()
    .isLength({ min: 10 }).withMessage('La description doit faire au moins 10 caractères'),
  body('duration')
    .optional()
    .isInt({ min: 1 }).withMessage('La durée doit être un entier positif'),
  body('level')
    .optional()
    .isIn(['débutant', 'intermédiaire', 'avancé']).withMessage('Le niveau doit être débutant, intermédiaire ou avancé'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Le prix doit être positif ou 0'),
  body('instructor')
    .optional(),
  body('categoryId')
    .optional()
    .isInt().withMessage('L\'ID de la catégorie doit être un entier')
];

module.exports = { createCourseValidator, updateCourseValidator };
