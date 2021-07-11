const ClientError = require('../exceptions/ClientError')
const TransactionModel = require('../models/TransactionModel')
const TransactionValidator = require('../validator/transaction')

const addTransaction = async (req, res) => {
  try {
    const userId = req.accessToken.id
    const attache = req.files.imageFile[0].filename
    const { startDate, dueDate, status } = req.body
    const data = {
      startDate, dueDate, userId, attache, status
    }
    TransactionValidator.transactionValidate(data)
    const result = await TransactionModel.postPayment(data)
    res.status(200).send({
      status: 'success',
      data: { ...result }
    })
  } catch (error) {
    if (error instanceof ClientError) {
      console.log(error)
      const response = res.status(error.statusCode).send({
        status: 'failed',
        message: error.message
      })
      return response
    }

    const response = res.status(500).send({
      status: 'failed',
      message: error.message
    })
    console.log(error)
    return response
  }
}

const getAllTransaction = async (req, res) => {
  try {
    const result = await TransactionModel.getTransactions()
    res.status(200).send({
      status: 'success',
      data: result
    })
  } catch (error) {
    if (error instanceof ClientError) {
      console.log(error)
      const response = res.status(error.statusCode).send({
        status: 'failed',
        message: error.message
      })
      return response
    }

    const response = res.status(500).send({
      status: 'failed',
      message: error.message
    })
    console.log(error)
    return response
  }
}

const updateApproved = async (req, res) => {
  try {
    const { id } = req.params
    const { status, user } = req.body
    const result = await TransactionModel.updateApproved({ id, status, data: user })

    res.status(200).send({
      status: 'success',
      data: result
    })
  } catch (error) {
    if (error instanceof ClientError) {
      console.log(error)
      const response = res.status(error.statusCode).send({
        status: 'failed',
        message: error.message
      })
      return response
    }

    const response = res.status(500).send({
      status: 'failed',
      message: error.message
    })
    console.log(error)
    return response
  }
}

module.exports = { addTransaction, getAllTransaction, updateApproved }
