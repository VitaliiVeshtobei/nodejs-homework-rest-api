const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const { sendEmail } = require("../utils/sendEmail/sendEmail");

const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const path = require("path");
const fs = require("fs/promises");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const verificationToken = nanoid();

    await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });

    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
    };

    await sendEmail(mail);
  } catch (error) {
    next(error.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passCompare = bcrypt.compareSync(password, user.password);

    if (!user || !user.verify || !passCompare) {
      return res
        .status(401)
        .json({ message: "Email or password is wrong or not verify" });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      user: {
        token,
        user: {
          email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error.message);
  }
};
const getCurrent = async (req, res, next) => {
  const { email } = req.user;
  res.status(200).json({
    email,
    subscription: "starter",
  });
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: null });
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    res.status(204).json();
  } catch (error) {
    next(error.message);
  }
};

const updateSubscription = async (req, res, next) => {
  const { userID } = req.params;
  const body = req.body;

  if (!body) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const changedSubscription = await User.findByIdAndUpdate(userID, body, {
      new: true,
    });

    if (!changedSubscription) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ changedSubscription, message: "success response" });
  } catch (error) {
    next(error.message);
  }
};

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  const image = await Jimp.read(tmpUpload);
  await image.resize(250, 250);
  await image.writeAsync(tmpUpload);

  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    console.log(avatarURL);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200).json({
      avatarURL: avatarURL,
    });
  } catch (error) {
    await fs.unlink(tmpUpload);
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({ message: "Not found" });
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).json({ message: "Verification successful" });
};

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
};
