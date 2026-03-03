import mongoose from 'mongoose';
import config from '../config/index.js';
import { consoleLogger } from '../config/log.config.js';

const initDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    consoleLogger.info('MongoDB connected successfully!');
  } catch (error) {
    consoleLogger.error('===== DB ERROR =====', error);
    process.exit(1);
  }
};

export { initDatabase };