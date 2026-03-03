import { Sequelize } from 'sequelize';
// import config from '../../config/index.js';
import { consoleLogger } from '../config/log.config.js';
import config from '../config/index.js';

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  String(config.dbPassword),
  {
    host: config.dbHost,
    port: Number(config.dbPort),
    dialect: 'postgres',
    logging: false
  }
);

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    consoleLogger.info('Database connected successfully!');
    await sequelize.sync({ alter: true });
    consoleLogger.info('Tables created successfully!');
  } catch (error) {
    consoleLogger.error('===== DB ERROR =====', error);
    throw error;
  }
};

export {
  sequelize,
  initDatabase
};
