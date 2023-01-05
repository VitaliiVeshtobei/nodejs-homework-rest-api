const express = require("express");

const router = express.Router();

const { validationUser } = require("../../middlewares/middlewareValidation");
const { auth } = require("../../middlewares/auth");

const { signup, login, getCurrent } = require("../../controllers/users");

router.post("/signup", validationUser, signup);
router.post("/login", validationUser, login);
router.post("/current", auth, validationUser, getCurrent);

module.exports = router;
