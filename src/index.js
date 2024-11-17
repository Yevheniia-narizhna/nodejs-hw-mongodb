import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';
import setupServer from './server.js';

dotenv.config();
console.log(process.env.DB_URI);

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
