import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import { getAllContacts, getContactById } from './services/contacts.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
// const logger = pino();
const app = express();

app.use(cors());
app.use(router); // Додаємо роутер до app як middleware

// app.use((req, res, next) => {
//   logger.info(`${req.method} ${req.url}`);
//   next();
// });

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

// app.get('/contacts', async (req, res) => {
//   const contactsAll = await getAllContacts();
//   res.status(200).json({
//     status: 200,
//     message: 'Successfully found contacts!',
//     data: contactsAll,
//   });
// });

// app.get('/contacts/:contactId', async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await getContactById(contactId);

//   if (!contact) {
//     res.status(404).json({
//       message: 'Contact not found',
//     });
//     return;
//   }

//   res.status(200).json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// });

app.use(notFoundHandler);
app.use('*', errorHandler);
app.get('/', (req, res) => {
  res.json({
    message: 'Contact Book',
  });
});

// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: 'Something went wrong!',
//     error: err.message,
//   });
//   next();
// });

const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
