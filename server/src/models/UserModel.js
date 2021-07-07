const { user } = require('../../models')
const bcrypt = require('bcrypt')
const NotFoundError = require('../exceptions/NotFoundError')
const InvariantError = require('../exceptions/InvariantError')

const UserModel = {
  postRegister: async function (data) {
    const { password } = data
    await this.checkEmail(data.email)
    const hashedPassword = await bcrypt.hash(password, 10)
    const create = await user.create({ ...data, password: hashedPassword })
    const result = await user.findOne({ where: { id: create.id } })
    if (!result) {
      throw new NotFoundError('user not found')
    }
    return ({ id: result.id, email: result.email, status: result.listAs })
  },
  checkEmail: async function (email) {
    const result = await user.findOne({
      attributes: ['id', 'email'],
      where: { email: email }
    })
    if (result) {
      throw new InvariantError('Email already exist')
    }
  },
  postLogin: async function ({ email, password }) {
    const result = await user.findOne({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { email: email }
    })
    if (!result) {
      throw new NotFoundError('email or password invalid')
    }
    const match = await bcrypt.compare(password, result.password)
    if (!match) {
      throw new NotFoundError('email or password invalid')
    }

    return ({ id: result.id, email: result.email, status: result.listAs })
  }
}

module.exports = { UserModel }
