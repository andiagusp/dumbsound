const { TransactionSchema, SearchDateTransactionSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const TransactionValidator = {
  transactionValidate: (body) => {
    const { error } = TransactionSchema.validate(body)
    if (error) throw new InvariantError(error.details[0].message)
  },
  searchValidate: (body) => {
    const { error } = SearchDateTransactionSchema.validate(body)
    if (error) throw new InvariantError(error.details[0].message)
  }
}

module.exports = TransactionValidator
