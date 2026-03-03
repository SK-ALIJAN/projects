import https from 'node:https';
import fs from 'node:fs';

import config from './config/index.js';
import { consoleLogger } from './config/log.config.js';
import app from './app.js';
import { initDatabase } from './db/index.js';

let server;

/* ================= SERVER SETUP ================= */
if (config.env === 'production') {
  const credentials = {
    key: fs.readFileSync('/etc/letsencrypt/live/domain/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/domain/fullchain.pem')
  };

  server = https.createServer(credentials, app);
} else {
  server = app;
}

/* ================= START SERVER AFTER DB ================= */
const startServer = async () => {
  try {
    await initDatabase();  // 🔥 Mongo connects first

    server.listen(config.port, () => {
      consoleLogger.info(
        `Server running at ${config.baseUrl}:${config.port}`
      );
    });
  } catch (error) {
    consoleLogger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

/* ================= GRACEFUL SHUTDOWN ================= */
process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));