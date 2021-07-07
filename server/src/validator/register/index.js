const { RegisterSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')
const registerValidator = {
  registerValidate: (body) => {
    const { error } = RegisterSchema.validate(body)
    if (error) {
      throw new InvariantError(error.details[0].message)
    }
  }
}

module.exports = registerValidator
