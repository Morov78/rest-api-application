const express = require("express");
const router = express.Router();

const controllerContact = require("../controller/contacts");
// const controllerUser = require("../controller/users");
// const auth = require("../middlewares/auth");
// const validateUser = require("../middlewares/validateUser");

router.get("/contacts", auth, controllerContact.get);

router.get("/contacts/:id", auth, controllerContact.getById);

router.post("/contacts", auth, controllerContact.create);

router.delete("/contacts/:id", auth, controllerContact.remove);

router.put("/contacts/:id", auth, controllerContact.update);

router.patch(
  "/contacts/:id/favorite",
  auth,
  controllerContact.updateStatusContact
);

module.exports = router;
