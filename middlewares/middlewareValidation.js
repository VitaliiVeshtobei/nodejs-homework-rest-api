const {
  validationSchemaContact,
  validationSchemaContactStatus,
} = require("../utils/validation/validationSchemaContacts");

const {
  validationSchemaUserSignup,
  validationSchemaUserSubscription,
  validationSchemaUserVerifyEmail,
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
  validationUserSubscription: (req, res, next) => {
    const schema = validationSchemaUserSubscription();
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
  validationUserVerifyEmail: (req, res, next) => {
    const schema = validationSchemaUserVerifyEmail();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }
    next();
  },
};
