const Contact = require("./schemas/contact");

const listContacts = async (userId, favorite, page, limit) => {
  let filter = { owner: userId };

  if (favorite === "true" || favorite === "false") {
    filter = { ...filter, favorite };
  }

  let options = {};

  if (page && limit) {
    const skip = (page - 1) * limit;

    options = { ...options, limit, skip };
  }

  return Contact.find(filter, null, options);
};

const getById = async (id, userId) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const addContact = async ({ name, email, phone, favorite, owner }) => {
  return Contact.create({ name, email, phone, favorite, owner });
};

const removeContact = async (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, owner: userId });
};

const updateContact = async (id, userId, body) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, body, {
    returnDocument: "after",
  });
};

const updateStatusContact = async (id, userId, { favorite }) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner: userId },
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
