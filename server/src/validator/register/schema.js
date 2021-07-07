const Joi = require('joi')

const RegisterSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
  gender: Joi.string().required(),
  phone: Joi.number().required(),
  address: Joi.string().required()
})

module.exports = { RegisterSchema }
