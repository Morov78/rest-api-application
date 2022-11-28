const Joi = require("joi");

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string()
    .min(7)
    .pattern(/^[- ()0-9]+$/, "numbers, ' ', '-'"),
});

const schemaNewContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .min(7)
    .pattern(/^[- ()0-9]+$/, "numbers,' ','()-'")
    .required(),
});

const schemaId = Joi.string().min(1);

module.exports = {
  schemaNewContact,
  schemaId,
  schemaUpdateContact,
};
