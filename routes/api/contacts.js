const express = require("express");
const shortid = require("shortid");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  schemaNewContact,
  schemaId,
  schemaUpdateContact,
} = require("../../service/validate");

router.get("/", async (_, res) => {
  try {
    const result = await listContacts();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const { error } = schemaId.validate(contactId);

    if (!error) {
      const result = await getContactById(contactId);

      if (result) {
        return res.status(200).json(result);
      }
    }

    res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const { error } = schemaNewContact.validate(body);

    if (error) {
      const [{ path }] = error.details;

      return res
        .status(400)
        .json({ message: `missing required ${path} field` });
    }

    const id = shortid.generate();

    await addContact({ id, ...body });

    res.status(201).json({ id, ...body });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const { error } = schemaId.validate(contactId);

    if (!error) {
      const result = await removeContact(contactId);

      if (result) {
        return res.status(200).json({ message: "contact deleted" });
      }
    }

    res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const { error } = schemaId.validate(contactId);

    if (!error) {
      const body = req.body;

      if (Object.keys(body).length === 0) {
        return res.status(400).json({ message: "missing fields" });
      }

      const { error } = schemaUpdateContact.validate(body);

      if (error) {
        return res.status(400).json({
          message: error.message.replaceAll('"', ""),
        });
      }

      const result = await updateContact(contactId, body);

      if (result) {
        return res.status(200).json(result);
      }
    }

    res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
