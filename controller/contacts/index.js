const service = require("../../service/contact");

const get = async (req, res, next) => {
  try {
    const { favorite, page, limit } = req.query;

    const userId = req.user._id;

    const result = await service.listContacts(userId, favorite, page, limit);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await service.getById(req.params.id, userId);

    if (result) {
      return res.status(200).json(result);
    }

    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const owner = req.user._id;

  try {
    const result = await service.addContact({
      name,
      email,
      phone,
      favorite,
      owner,
    });

    res.status(201).json(result);
  } catch (error) {
    const errorsKeys = Object.keys(error.errors);

    res
      .status(400)
      .json({ message: `missing required fields: ${errorsKeys.join(", ")}` });
  }
};

const remove = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const result = await service.removeContact(req.params.id, userId);

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
  const userId = req.user._id;

  try {
    const result = await service.updateContact(req.params.id, userId, {
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

  const userId = req.user._id;

  try {
    const result = await service.updateStatusContact(
      req.params.id,
      userId,
      req.body
    );

    if (result) {
      return res.status(200).json(result);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
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
