declare module 'swagger-jsdoc' {
  import { OpenAPIV3 } from 'openapi-types';

  interface SwaggerOptions {
    definition: OpenAPIV3.Document;
    apis: string[];
  }

  function swaggerJsdoc(options: SwaggerOptions): OpenAPIV3.Document;

  export default swaggerJsdoc;
}
