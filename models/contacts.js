const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.normalize("./models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

    const [contact] = contacts.filter((contact) => contact.id === contactId);

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index !== -1) {
      contacts.splice(index, 1);

      await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
      return true;
    }

    return false;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

    await fs.writeFile(
      contactsPath,
      JSON.stringify([...contacts, body]),
      "utf-8"
    );
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return false;
    }

    contacts[index] = { ...contacts[index], ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");

    return contacts[index];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
