import https from 'node:https';
import fs from 'node:fs';

import config from './config/index.js';
import { consoleLogger } from './config/log.config.js';
import app from './app.js';

let server;

/* ================= SERVER SETUP ================= */
if (config.env === 'production') {
    const credentials = {
        key: fs.readFileSync(
            '/etc/letsencrypt/live/lb.tezcommerce.com/privkey.pem'
        ),
        cert: fs.readFileSync(
            '/etc/letsencrypt/live/lb.tezcommerce.com/fullchain.pem'
        )
    };

    server = https.createServer(credentials, app);
} else {
    server = app;
}

/* ================= START SERVER ================= */
server.listen(config.port, () => {
    consoleLogger.info(
        `Server running at ${config.baseUrl}:${config.port}`
    );
});

/* ================= GRACEFUL SHUTDOWN ================= */
process.on('SIGTERM', () => {
    consoleLogger.info('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    consoleLogger.info('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

export { };
