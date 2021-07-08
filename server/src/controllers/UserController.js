const ClientError = require('../exceptions/ClientError')
const TokenManager = require('../tokenize/TokenManager')
const registerValidator = require('../validator/register')
const loginValidator = require('../validator/login')
const { UserModel } = require('../models/UserModel')

const register = async (req, res) => {
  try {
    let listAs = '0'
    if (req.body.listAs) {
      listAs = '1'
    }
    const subscribe = 'false'
    registerValidator.registerValidate(req.body)
    const result = await UserModel.postRegister({ ...req.body, listAs, subscribe })
    const token = TokenManager.generateToken(result)

    res.status(201).send({
      status: 'success',
      user: {
        ...result,
        token
      }
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

const login = async (req, res) => {
  try {
    loginValidator.loginValidate(req.body)
    const result = await UserModel.postLogin(req.body)
    const token = TokenManager.generateToken(result)
    res.status(200).send({
      status: 'success',
      user: {
        ...result, token
      }
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

const userAuth = async (req, res) => {
  try {
    const { email } = req.accessToken
    const result = await UserModel.getUserByEmail(email)
    res.status(200).send({
      status: 'success',
      user: result
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

module.exports = { register, login, userAuth }
