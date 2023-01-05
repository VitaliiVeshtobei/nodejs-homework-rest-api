const {
  validationSchemaContact,
  validationSchemaContactStatus,
} = require("../utils/validation/validationSchemaContacts");

const {
  validationSchemaUserSignup,
} = require("../utils/validation/validationSchemaUsers");

module.exports = {
  validationContact: (req, res, next) => {
    const schema = validationSchemaContact();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(404)
        .json({ message: validationResult.error.details[0].message });
    }
    next();
  },
  validationContactStatus: (req, res, next) => {
    const schema = validationSchemaContactStatus();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(404)
        .json({ message: validationResult.error.details[0].message });
    }
    next();
  },
  validationUser: (req, res, next) => {
    const schema = validationSchemaUserSignup();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(404)
        .json({ message: validationResult.error.details[0].message });
    }
    next();
  },
};
