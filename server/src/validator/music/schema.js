const Joi = require('joi')

const MusicSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.string().required(),
  thumbnail: Joi.string().required(),
  attache: Joi.string().required(),
  artistId: Joi.number().required()
})

module.exports = MusicSchema
