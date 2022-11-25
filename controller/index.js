const service = require("../service");

const get = async (req, res, next) => {
  try {
    const result = await service.listContacts();

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await service.getById(req.params.id);

    if (result) {
      return res.status(200).json(result);
    }

    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;

  try {
    const result = await service.addContact({
      name,
      email,
      phone,
      favorite,
    });

    res.status(201).json(result);
  } catch (error) {
    const errorsKeys = Object.keys(error.errors);

    if (errorsKeys.length === 1) {
      return res
        .status(400)
        .json({ message: `missing required ${errorsKeys[0]} field` });
    }
    res
      .status(400)
      .json({ message: `missing required fields: ${errorsKeys.join(", ")}` });
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await service.removeContact(req.params.id);

    if (result) {
      return res.status(200).json({ message: "contact deleted" });
    }

    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const result = await service.updateContact(req.params.id, {
      name,
      email,
      phone,
    });

    if (result) {
      return res.status(200).json(result);
    }

    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  if (typeof req.body.favorite !== "boolean") {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const result = await service.updateStatusContact(req.params.id, req.body);

    if (result) {
      return res.status(200).json(result);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatusContact,
};
