import express from 'express';
import cors from 'cors';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import session from 'express-session';
import basicAuth from 'express-basic-auth';
import requestIp from 'request-ip';
import rateLimit from 'express-rate-limit';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

/* ================= ESM CORE FIXES ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);



/* ================= COMMONJS PACKAGES ================= */
const { Pool } = require('pg');
const pgSessionStore = require('connect-pg-simple')(session);

/* ================= INTERNAL IMPORTS ================= */
import './db/index.js';
import config from './config/index.js';
import swaggerDocs from './config/swagger.js';
import accessLogGenerator from './middlewares/accessLogGenerator.js';
import handleError from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFound.js';
import routes from './routes/index.js';
import fs from 'node:fs';


/* ================= APP ================= */
const app = express();

/* ================= TRUST PROXY ================= */
app.set('trust proxy', 1);

/* ================= SECURITY ================= */
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
);

/* ================= RATE LIMIT ================= */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false
});

app.use(limiter);

/* ================= BODY PARSING ================= */
app.use(express.json({ limit: '700mb' }));
app.use(
    express.urlencoded({
        extended: true,
        limit: '500mb',
        parameterLimit: 100
    })
);

app.use(compression());
app.use(cookieParser());

/* ================= CORS ================= */
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://your-frontend-domain.com'
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Origin',
            'Content-Type',
            'Accept',
            'Authorization',
            'X-Requested-With',
            'api_key'
        ]
    })
);

/* ================= SESSION ================= */
const pool = new Pool({
    user: config.dbUser,
    host: config.dbHost,
    database: config.dbName,
    password: config.dbPassword,
    port: config.dbPort
});

const store = new pgSessionStore({
    pool,
    tableName: 'user_sessions',
    createTableIfMissing: true
});

app.use(
    session({
        name: 'leap-beyond',
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        // store,
        cookie: {
            maxAge: config.sessionExpirationDays * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: config.env === 'production',
            sameSite: 'lax'
        }
    })
);

app.use(flash());

/* ================= STATIC & VIEWS ================= */
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



/* ================= SWAGGER ================= */
if (config.env !== 'production') {
    app.use(
        '/api-docs',
        basicAuth({
            users: { [config.swaggerUser]: config.swaggerPassword },
            challenge: true
        }),
        swaggerUI.serve,
        swaggerUI.setup(swaggerDocs)
    );
}


/* ================= SWAGGER JSON EXPORT ================= */
const swaggerFilePath = path.join(__dirname, '../swagger/swagger.json');

fs.mkdirSync(path.dirname(swaggerFilePath), { recursive: true });
fs.writeFileSync(
    swaggerFilePath,
    JSON.stringify(swaggerDocs, null, 2),
    'utf-8'
);


/* ================= ROUTES & LOGS ================= */
app.use(requestIp.mw());
app.use('/', routes);

app.use(accessLogGenerator);

/* ================= FAVICON ================= */
app.get('/favicon.ico', (_req, res) => {
    res.status(204).end();
});

/* ================= ERROR HANDLING ================= */
app.use(notFoundHandler);
app.use(handleError);

/* ================= EXPORT ================= */
export default app;
