import { Router } from 'express';
// import { getAllContacts, getContactById } from './services/contacts.js';
import {
  getContactsByIdController,
  getContactsController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getContactsController);

router.get('/contacts/:contactId', getContactsByIdController);
export default router;
