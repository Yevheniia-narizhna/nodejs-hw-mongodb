import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { getAllContacts, getContactById } from './services/contacts.js';
import {
  createContactController,
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = express.Router();
const jsonParser = express.json();
router.use(authenticate);

router.get('/', checkRoles(ROLES.USER), ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkRoles(ROLES.USER),
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

router.post(
  '/',
  checkRoles(ROLES.USER),
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:contactId',
  checkRoles(ROLES.USER),
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/:contactId',
  checkRoles(ROLES.USER),
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
