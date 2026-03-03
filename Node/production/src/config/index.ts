import 'dotenv/config';
import Joi from 'joi';

/* ----------------------------------
 * ENV TYPES
 * ---------------------------------- */
interface EnvVars {
  ENVIRONMENT: 'production' | 'development' | 'test';
  PORT: number;

  SESSION_SECRET: string;
  SESSION_EXPIRATION_DAYS: number;

  JWT_SECRET: string;
  JWT_EXPIRATION_DAYS: number;

  KEEP_LOG_DAYS: number;

  OAUTH_CLIENT_ID: string;
  OAUTH_CLIENT_SECRET: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;

  BASE_URL: string;
  SWAGGER_USER?: string;
  SWAGGER_PASSWORD?: string;
  SWAGGER_URL?: string;
}

/* ----------------------------------
 * ENV VALIDATION SCHEMA
 * ---------------------------------- */
const envVarsSchema = Joi.object({
  ENVIRONMENT: Joi.string()
    .valid('production', 'development', 'test')
    .required(),

  PORT: Joi.number().default(3001),

  SESSION_SECRET: Joi.string().required(),
  SESSION_EXPIRATION_DAYS: Joi.number().default(30),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_DAYS: Joi.number().default(30),

  KEEP_LOG_DAYS: Joi.number().required(),

  OAUTH_CLIENT_ID: Joi.string().required(),
  OAUTH_CLIENT_SECRET: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),

  BASE_URL: Joi.string().required(),

  SWAGGER_USER: Joi.string().optional(),
  SWAGGER_PASSWORD: Joi.string().optional(),
  SWAGGER_URL: Joi.string().optional()
}).unknown();

/* ----------------------------------
 * VALIDATE ENV
 * ---------------------------------- */
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env) as { value: EnvVars; error?: Error };

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

/* ----------------------------------
 * FINAL CONFIG OBJECT
 * ---------------------------------- */
const config = {
  env: envVars.ENVIRONMENT,
  port: envVars.PORT,
  baseUrl: envVars.BASE_URL,

  sessionSecret: envVars.SESSION_SECRET,
  sessionExpirationDays: envVars.SESSION_EXPIRATION_DAYS,

  jwtSecret: envVars.JWT_SECRET,
  jwtExpirationDays: envVars.JWT_EXPIRATION_DAYS,

  keepLogDays: envVars.KEEP_LOG_DAYS,

  oAuthClientId: envVars.OAUTH_CLIENT_ID,
  oAuthClientSecret: envVars.OAUTH_CLIENT_SECRET,

  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbName: envVars.DB_NAME,
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,

  swaggerUser: envVars.SWAGGER_USER,
  swaggerPassword: envVars.SWAGGER_PASSWORD,
  swaggerUrl: envVars.SWAGGER_URL
};

export default config;
