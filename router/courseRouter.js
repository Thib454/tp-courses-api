const express = require('express');
const courseController = require('../controller/courseController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { createCourseValidator, updateCourseValidator } = require('../validators/courseValidator');
const { validationResult } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Gestion des cours
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupérer tous les cours publiés
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Liste des cours
 */
router.get('/', courseController.getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Récupérer un cours par son ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Cours trouvé
 *       404:
 *         description: Cours non trouvé
 */
router.get('/:id', courseController.getCourseById);

/**
 * @swagger
 * components:
 *   schemas:
 *     CourseInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - duration
 *         - level
 *         - price
 *         - instructor
 *         - categoryId
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *         description:
 *           type: string
 *           minLength: 10
 *         duration:
 *           type: integer
 *           minimum: 1
 *         level:
 *           type: string
 *           enum: ["débutant", "intermédiaire", "avancé"]
 *         price:
 *           type: number
 *           minimum: 0
 *         instructor:
 *           type: string
 *         categoryId:
 *           type: integer
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Créer un cours (instructor ou admin)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       201:
 *         description: Cours créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 */
router.post(
  '/',
  authenticateToken,
  authorizeRole('instructor', 'admin'),
  createCourseValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    courseController.createCourse(req, res, next);
  }
);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Modifier un cours (instructor ou admin)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       200:
 *         description: Cours mis à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Cours non trouvé
 */
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('instructor', 'admin'),
  updateCourseValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    courseController.updateCourse(req, res, next);
  }
);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Supprimer un cours (admin seulement)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Cours supprimé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Cours non trouvé
 */
router.delete('/:id', authenticateToken, authorizeRole('admin'), courseController.deleteCourse);

module.exports = router;
