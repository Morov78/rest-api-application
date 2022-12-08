const express = require("express");
const router = express.Router();

const controllerContact = require("../controller/contacts");
const controllerUser = require("../controller/users");
const auth = require("../middlewares/auth");
const validateUser = require("../middlewares/validateUser");

router.post("/users/register", validateUser, controllerUser.registration);

router.post("/users/login", validateUser, controllerUser.login);

router.post("/users/logout", auth, controllerUser.logout);

router.get("/users/current", auth, controllerUser.current);

router.patch("/users", auth, controllerUser.updateStatusSubscription);

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

// router.get("/users", async (req, res) => {
//   const result = await User.find();

//   res.status(200).json(result);
// });

module.exports = router;
