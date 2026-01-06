const express = require('express');
const courseController = require('../controller/courseController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { body, param } = require('express-validator');

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
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - duration
 *               - level
 *               - price
 *               - instructor
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               level:
 *                 type: string
 *                 enum: [débutant, intermédiaire, avancé]
 *               price:
 *                 type: number
 *               published:
 *                 type: boolean
 *               instructor:
 *                 type: string
 *               categoryId:
 *                 type: integer
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
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 10 }),
  body('duration').isInt({ min: 1 }),
  body('level').isIn(['débutant', 'intermédiaire', 'avancé']),
  body('price').isFloat({ min: 0 }),
  body('instructor').notEmpty(),
  body('categoryId').isInt(),
  courseController.createCourse
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               level:
 *                 type: string
 *                 enum: [débutant, intermédiaire, avancé]
 *               price:
 *                 type: number
 *               published:
 *                 type: boolean
 *               instructor:
 *                 type: string
 *               categoryId:
 *                 type: integer
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
router.put('/:id', authenticateToken, authorizeRole('instructor','admin'), courseController.updateCourse);

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
