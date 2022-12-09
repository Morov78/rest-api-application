const express = require("express");
const router = express.Router();

const controller = require("../../controller/contacts");
const auth = require("../../middlewares/auth");

router.get("/", auth, controller.get);

router.get("/:id", auth, controller.getById);

router.post("/", auth, controller.create);

router.delete("/:id", auth, controller.remove);

router.put("/:id", auth, controller.update);

router.patch("/:id/favorite", auth, controller.updateStatusContact);

module.exports = router;
