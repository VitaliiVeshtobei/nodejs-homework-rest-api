const express = require("express");

const router = express.Router();

const {
  validationUser,
  validationUserSubscription,
} = require("../../middlewares/middlewareValidation");
const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");

const {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/users");

router.post("/signup", validationUser, signup);
router.post("/login", validationUser, login);
router.post("/current", auth, validationUser, getCurrent);
router.get("/logout", auth, logout);
// router.patch("/:userID", validationUserSubscription, updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
