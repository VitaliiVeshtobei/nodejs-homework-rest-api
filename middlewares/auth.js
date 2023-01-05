const { User } = require("../models/user");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split("");
  console.log(bearer);

  try {
    if (bearer !== "Bearer") {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
      next();
    }
  }
};

module.exports = { auth };
