require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  try {
    const header = req.header('Authorization')
    if (!header) {
      return res.status(401).send({
        status: 'failed',
        message: 'unauthorized'
      })
    }
    const token = header.substring('Bearer '.length)
    const verify = jwt.verify(token, process.env.SECRET_KEY)
    req.accessToken = verify
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      status: 'failed',
      message: error.message
    })
  }
}

module.exports = verifyToken
