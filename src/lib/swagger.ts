import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API',
      version: '1.0.0',
      description: 'API documentation for the FOBOH pricing challenge',
    },
  },
  apis: ['./pages/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
