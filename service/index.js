const Contact = require("./schemas/contacts");

const listContacts = async () => {
  return Contact.find();
};

const getById = async (id) => {
  return Contact.findById(id);
};

const addContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const removeContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};

const updateContact = async (id, body) => {
  return Contact.findByIdAndUpdate(id, body, {
    returnDocument: "after",
  });
};

const updateStatusContact = async (id, { favorite }) => {
  return Contact.findByIdAndUpdate(
    id,
    { favorite },
    { returnDocument: "after" }
  );
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
