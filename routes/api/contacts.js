const express = require("express");

const router = express.Router();
const { listContacts, getContactById } = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactById = await getContactById(req.params.contactId);

  if (contactById) {
    return res.status(200).json(contactById);
  }

  res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
