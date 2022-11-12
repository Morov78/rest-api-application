const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.normalize("./models/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(contactsPath, "utf-8");

  const [contact] = JSON.parse(contacts).filter(
    (contact) => contact.id === contactId
  );

  return contact;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
