import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection';
import setupServer from './server';

dotenv.config();
console.log(process.env.DB_URI);

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
