const express = require("express");
const router = express.Router();
const controllerContact = require("../controller");

router.get("/contacts", controllerContact.get);

router.get("/contacts/:id", controllerContact.getById);

router.post("/contacts", controllerContact.create);

router.delete("/contacts/:id", controllerContact.remove);

router.put("/contacts/:id", controllerContact.update);

router.patch("/contacts/:id/favorite", controllerContact.updateStatusContact);

module.exports = router;
