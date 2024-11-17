import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts';

const logger = pino();
const app = express();

app.use(cors());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/contacts', async (req, res) => {
  const contactsAll = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contactsAll,
  });
});

app.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    });
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message,
  });
  next();
});

const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
