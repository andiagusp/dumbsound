const Joi = require('joi')

const TransactionSchema = Joi.object({
  startDate: Joi.string().required(),
  dueDate: Joi.string().required(),
  userId: Joi.number().required(),
  attache: Joi.string().required(),
  status: Joi.string().required()
})

module.exports = TransactionSchema
