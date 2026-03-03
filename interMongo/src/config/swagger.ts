import swaggerJsDoc from 'swagger-jsdoc';
import config from './index.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SyncTalk API',
      version: '1.0.0',
      description: 'API documentation for SyncTalk backend'
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      }
    },
    security: [{ Bearer: [] }],
    servers: [
      {
        url: `${config.baseUrl}:${config.port}/api`,
        description: `${config.env} server`
      }
    ]
  },
  apis: ['./src/modules/**/*.swagger.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
