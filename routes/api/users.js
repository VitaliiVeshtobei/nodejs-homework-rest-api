const express = require("express");

const router = express.Router();

const {
  validationUser,
  validationUserSubscription,
} = require("../../middlewares/middlewareValidation");
const { auth } = require("../../middlewares/auth");

const {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/users");

router.post("/signup", validationUser, signup);
router.post("/login", validationUser, login);
router.post("/current", auth, validationUser, getCurrent);
router.get("/logout", auth, logout);
router.patch("/:userID", validationUserSubscription, updateSubscription);

module.exports = router;
