const Joi = require("joi");

const validationSchemaUserSignup = () => {
  const schema = Joi.object({
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

const validationSchemaUserSubscription = () => {
  const schema = Joi.object({
    subscription: Joi.string(),
  });
  return schema;
};

const validationSchemaUserVerifyEmail = () => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });
  return schema;
};

module.exports = {
  validationSchemaUserSignup,
  validationSchemaUserSubscription,
  validationSchemaUserVerifyEmail,
};
