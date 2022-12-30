const Joi = require("joi");

const validationSchema = () => {
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
  return schema;
};
const validationSchemaStatus = () => {
  const schema = Joi.object({
    favorite: Joi.boolean(),
  });
  return schema;
};

module.exports = { validationSchema, validationSchemaStatus };
