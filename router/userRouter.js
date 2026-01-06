const express = require('express');
const userController = require('../controller/userController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRole('admin'), userController.getUsers);

module.exports = router;
