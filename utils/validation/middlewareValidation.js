const Joi = require("joi");

module.exports = {
  postValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().integer().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(404)
        .json({ message: validationResult.error.details[0].message });
    }
    next();
  },
  putValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().integer().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(404)
        .json({ message: validationResult.error.details[0].message });
    }
    next();
  },
};
