import { Contact } from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page = 1, perPage = 10 }) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = Contact.find();

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery.skip(skip).limit(limit),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  // const contacts = await Contact.find().skip(skip).limit(limit);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contacts = await Contact.create(payload);
  return contacts;
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const updateContact = async (contactId, payload) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
