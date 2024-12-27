import * as fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import pino from 'pino-http';
// import { getAllContacts, getContactById } from './services/contacts.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
// import { swaggerDocs } from './middlewares/swaggerDocs.js';
import path from 'node:path';

const swaggerDoc = JSON.parse(
  fs.readFileSync(path.resolve('docs/swagger.json')),
);

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(cors());
app.use(cookieParser());
app.use(router); // Додаємо роутер до app як middleware

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
    options: {
      colorize: true,
    },
  }),
);

app.use(notFoundHandler);
app.use('*', errorHandler);
app.get('/', (req, res) => {
  res.json({
    message: 'Contact Book',
  });
});

const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
