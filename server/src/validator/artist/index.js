const ArtistSchema = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const ArtistValidator = {
  artistValidate: (body) => {
    const { error } = ArtistSchema.validate(body)
    if (error) throw new InvariantError(error.details[0].message)
  }
}

module.exports = ArtistValidator
