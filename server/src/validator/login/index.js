const LoginSchema = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const LoginValidator = {
  loginValidate: (body) => {
    const { error } = LoginSchema.validate(body)
    if (error) {
      throw new InvariantError(error.details[0].message)
    }
  }
}

module.exports = LoginValidator
