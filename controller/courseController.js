const { validationResult } = require('express-validator');
const courseService = require('../service/courseService');

const courseController = {

  getAllCourses: async (req, res) => {
    try {
      const courses = await courseService.getAllCourses();
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const course = await courseService.getCourseById(req.params.id);
      if (!course) return res.status(404).json({ message: 'Cours non trouvé' });

      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  createCourse: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const newCourse = await courseService.createCourse(req.body);
      res.status(201).json(newCourse);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
      if (!updatedCourse) return res.status(404).json({ message: 'Cours non trouvé' });

      res.json(updatedCourse);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const deleted = await courseService.deleteCourse(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Cours non trouvé' });

      res.json({ message: 'Cours supprimé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }

};

module.exports = courseController;
