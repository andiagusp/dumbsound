const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./src/routes')

app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'))
app.use('/api/v1/', router)

app.listen(5000, () => console.log('server running on port 5000'))
