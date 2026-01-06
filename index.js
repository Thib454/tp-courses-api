require('dotenv').config();

const express = require('express');
const db = require('./config/database');
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const categoryRouter = require('./router/categoryRouter');
const courseRouter = require('./router/courseRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/courses', courseRouter);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const initDatabase = async () => {
  try {
    require('./config/associations');

    await db.sync();

    console.log('Base de données prête');

    app.listen(PORT, () => {
      console.log(`Serveur : http://localhost:${PORT}`);
      console.log(`Swagger : http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Erreur DB:', error);
  }
};


initDatabase();

module.exports = app;
