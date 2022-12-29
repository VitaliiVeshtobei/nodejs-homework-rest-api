const { validationSchema } = require("../utils/validation/validationSchema");

module.exports = {
  validation: (req, res, next) => {
    const schema = validationSchema();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(404)
        .json({ message: validationResult.error.details[0].message });
    }
    next();
  },
};
