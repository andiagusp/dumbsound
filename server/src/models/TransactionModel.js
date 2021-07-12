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
        attributes: { exclude: ['updatedAt', 'createdAt', 'password'] }
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
        attributes: { exclude: ['updatedAt', 'createdAt', 'password'] }
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
  },
  updateApproved: async function ({ id, status, data }) {
    console.log(data);
    const search = await transaction.findOne({ where: { id: id }, attributes: ['id'] })
    if (!search) throw new NotFoundError('payment history not found')
    if (status === 'pending' || status === 'cancel') {
      await transaction.update({ status: 'approved' }, { where: { id: id } })
      await user.update({ subscribe: 'true' }, { where: { id: data.id } })
    }
    if (status === 'approved') {
      await transaction.update({ status: 'cancel' }, { where: { id: id } })
      await user.update({ subscribe: 'false' }, { where: { id: data.id } })
    }
    const result = await transaction.findOne({
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      where: { id: id },
      include: {
        model: user,
        as: 'user',
        attributes: { exclude: ['updatedAt', 'createdAt', 'password', 'listAs'] }
      }
    })
    return ({
      id: result.id,
      startDate: result.startDate,
      dueDate: result.dueDate,
      user: result.user,
      attache: result.attache,
      status: result.status
    })
  }
}

module.exports = TransactionModel
