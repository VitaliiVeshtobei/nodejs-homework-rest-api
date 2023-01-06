const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({ email, password: hashPassword });
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passCompare = bcrypt.compareSync(password, user.password);

    if (!user || !passCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
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

module.exports = { signup, login, getCurrent, logout, updateSubscription };
