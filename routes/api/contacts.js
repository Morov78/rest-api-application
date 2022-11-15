const express = require("express");
const Joi = require("joi");

const shortid = require("shortid");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);

    if (contactById) {
      return res.status(200).json(contactById);
    }

    res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string()
      .min(7)
      .pattern(/^[- ()0-9]+$/, "numbers,' ','()-'")
      .required(),
  });

  try {
    let body = req.body;
    const { error } = schema.validate(body);

    if (error) {
      const [{ path }] = error.details;

      return res
        .status(400)
        .json({ message: `missing required ${path} field` });
    }

    const id = shortid.generate();

    body = { id, ...body };

    await addContact(body);

    res.status(201).json(body);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);

    if (result) {
      return res.status(200).json({ message: "contact deleted" });
    }

    res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
    }),
    phone: Joi.string()
      .min(7)
      .pattern(/^[- ()0-9]+$/, "numbers, ' ', '-'"),
  });

  try {
    const body = req.body;

    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { error } = schema.validate(body);

    if (error) {
      // const [{ message }] = error.details;

      return res.status(400).json({
        message: error.message.replaceAll('"', ""),
      });
    }

    const result = await updateContact(req.params.contactId, body);

    if (result) {
      return res.status(200).json(result);
    }

    res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
