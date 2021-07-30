const MusicSchema = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const MusicValidator = {
  musicValidate: (body) => {
    const { error } = MusicSchema.validate(body)
    if (error) throw new InvariantError(error.details[0].message)
  }
}

module.exports = MusicValidator
