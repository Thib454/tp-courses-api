require('dotenv').config();

const express = require('express');
const db = require('./config/database');
const authRouter = require('./router/authRouter');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/auth', authRouter);

// Swagger (à activer une fois swagger.js créé)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const initDatabase = async () => {
  try {
    await db.sync({ alter: true });
    console.log('Base de données initialisée');

    app.listen(PORT, () => {
      console.log(`Serveur démarre sur http://localhost:${PORT}`);
      console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la DB:', error);
  }
};

initDatabase();

module.exports = app;
