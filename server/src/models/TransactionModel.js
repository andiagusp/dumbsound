const { transaction, user } = require('../../models')
const NotFoundError = require('../exceptions/NotFoundError')

const TransactionModel = {
  postPayment: async function (data) {
    const create = await transaction.create(data)
    const result = await transaction.findOne({
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      where: { id: create.id },
      include: {
        model: user,
        as: 'user',
        attributes: { exclude: ['updatedAt', 'createdAt', 'password', 'listAs'] }
      }
    })
    if (!result) throw new NotFoundError('payment history not found')

    return ({
      id: result.id,
      startDate: result.startDate,
      dueDate: result.dueDate,
      user: result.user,
      attache: result.attache,
      status: result.status
    })
  },
  getTransactions: async function () {
    const results = await transaction.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      include: {
        model: user,
        as: 'user',
        attributes: { exclude: ['updatedAt', 'createdAt', 'password', 'listAs'] }
      }
    })
    const mapResult = results.map((result) => ({
      id: result.id,
      startDate: result.startDate,
      dueDate: result.dueDate,
      user: result.user,
      attache: result.attache,
      status: result.status
    }))
    return mapResult
  }
}

module.exports = TransactionModel
