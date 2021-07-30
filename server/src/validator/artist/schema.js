const Joi = require('joi')

const ArtistSchema = Joi.object({
  name: Joi.string().required(),
  old: Joi.number().required(),
  type: Joi.string().required(),
  startCareer: Joi.string().required()
})

module.exports = ArtistSchema
