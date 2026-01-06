const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TP Courses API',
      version: '1.0.0',
      description: 'API pour gérer les utilisateurs, catégories et cours'
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./router/*.js', './model/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
