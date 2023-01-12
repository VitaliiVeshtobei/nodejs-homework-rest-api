const express = require("express");

const router = express.Router();

const {
  validationUser,
  validationUserSubscription,
  validationUserVerifyEmail,
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
  verifyEmail,
  verify,
} = require("../../controllers/users");

router.post("/signup", validationUser, signup);
router.post("/login", validationUser, login);
router.post("/current", auth, validationUser, getCurrent);
router.get("/logout", auth, logout);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validationUserVerifyEmail, verify);
// router.patch("/:userID", validationUserSubscription, updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
