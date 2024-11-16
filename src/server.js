import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

const logger = pino();
const app = express();

app.use(cors());

const PORT = 3000;

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
