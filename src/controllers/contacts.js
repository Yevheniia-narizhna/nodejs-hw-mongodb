import { getAllContacts, getContactById } from './services/contacts.js';

export const getContactsController = async (req, res) => {
  const contactsAll = await getAllContacts;
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contactsAll,
  });
};

export const getContactsByIdController = async (req, res) => {
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
};
