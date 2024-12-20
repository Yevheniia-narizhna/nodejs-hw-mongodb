// import { getAllContacts, getContactById } from './services/contacts.js';
import * as fs from 'node:fs/promises';
import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const userId = req.user.id;

  const contactsAll = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contactsAll,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  const contact = await getContactById(contactId, userId);
  const user = req.user;

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  if (contact.userId.toString() !== user._id.toString()) {
    throw createHttpError(403, 'Access denied to this contact');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const userId = req.user.id;

  const contactData = { ...req.body, userId };

  if (req.file) {
    const result = await uploadToCloudinary(req.file.path);

    await fs.unlink(req.file.path);
    contactData.photo = result.secure_url;
  }

  const contact = await createContact(contactData);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;

  let updateData = { ...req.body };
  if (req.file) {
    const result = await uploadToCloudinary(req.file.path);

    await fs.unlink(req.file.path);
    updateData.photo = result.secure_url;
  }

  const result = await updateContact(contactId, updateData, userId);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
