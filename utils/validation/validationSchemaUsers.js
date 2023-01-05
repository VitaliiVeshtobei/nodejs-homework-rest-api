const Joi = require("joi");

const validationSchemaUserSignup = () => {
  const schema = Joi.object({
    // eslint-disable-next-line prefer-regex-literals
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });
  return schema;
};

module.exports = { validationSchemaUserSignup };
