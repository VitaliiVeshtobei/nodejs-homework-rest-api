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
    res.status(200).json({
      user: {
        token,
        user: {
          email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {}
};
const getCurrent = async (req, res, next) => {
  console.log(req.user);
};

module.exports = { signup, login, getCurrent };
