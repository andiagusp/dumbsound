require('dotenv').config()
const jwt = require('jsonwebtoken')

const TokenManager = {
  generateToken: function (data) {
    const token = jwt.sign(data, process.env.SECRET_KEY)
    return token
  }
}

module.exports = TokenManager
