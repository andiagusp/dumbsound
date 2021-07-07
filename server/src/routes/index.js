const express = require('express')
const router = express.Router()

const { register, login } = require('../controllers/UserController')
const { addArtist, destroyArtist } = require('../controllers/ArtisController')
const { addTransaction, getAllTransaction } = require('../controllers/TransactionController')
const { getAllMusic, addMusic } = require('../controllers/MusicController')

const verifyToken = require('../middleware/auth')
const fileupload = require('../middleware/fileupload')

router.post('/login', login)
router.post('/register', register)

router.post('/artist', verifyToken, addArtist)
router.delete('/artist/:id', verifyToken, destroyArtist)

router.get('/transactions', verifyToken, getAllTransaction)
router.post('/transaction', verifyToken, fileupload('imageFile'), addTransaction)

router.get('/musics', getAllMusic)
router.post('/music', verifyToken, fileupload('imageFile', 'audioFile'), addMusic)

module.exports = router
