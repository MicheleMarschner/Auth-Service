// Imports
const joi = require('joi');
// Validator
module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) return res.status(400).json(result.error);
      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      return next();
    };
  },
  schemas: {
    authSchema: joi.object().keys({
      name: joi.string().required(),
      lastName: joi.string().required(),
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: joi.string().required(),
    }),
    loginSchema: joi.object().keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: joi.string().required(),
    }),
  },
};
