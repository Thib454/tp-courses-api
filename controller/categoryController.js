const { validationResult } = require('express-validator');
const categoryService = require('../service/categoryService');

const categoryController = {

  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) return res.status(404).json({ message: 'Catégorie non trouvée' });
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  createCategory: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const newCategory = await categoryService.createCategory(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

};

module.exports = categoryController;
