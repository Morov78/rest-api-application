const express = require("express");
const router = express.Router();

const controller = require("../../controller/users");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");
const uploadNode = require("../../middlewares/uploadNode");
const {
  validateUser,
  ValidateSubscription,
} = require("../../middlewares/validator");

router.post("/register", validateUser, controller.registration);

router.post("/login", validateUser, controller.login);

router.post("/logout", auth, controller.logout);

router.get("/current", auth, controller.current);

router.patch(
  "/",
  auth,
  ValidateSubscription,
  controller.updateStatusSubscription
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controller.updateAvatar
);

router.patch("/avatars_no_multer", auth, uploadNode, controller.updateAvatar);

router.get("/", controller.getAllUsers);

module.exports = router;
