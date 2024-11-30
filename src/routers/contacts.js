import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
// import { getAllContacts, getContactById } from './services/contacts.js';
import {
  getContactsByIdController,
  getContactsController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));
export default router;
