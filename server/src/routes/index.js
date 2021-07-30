const express = require('express')
const router = express.Router()

const { register, login, userAuth } = require('../controllers/UserController')
const { addArtist, destroyArtist, getArtists } = require('../controllers/ArtisController')
const { addTransaction, getAllTransaction, updateApproved, searchDate, getHistoryPayment } = require('../controllers/TransactionController')
const { getAllMusic, addMusic } = require('../controllers/MusicController')

const verifyToken = require('../middleware/auth')
const fileupload = require('../middleware/fileupload')

router.post('/login', login)
router.post('/register', register)
router.get('/authorization', verifyToken, userAuth)

router.get('/artists', verifyToken, getArtists)
router.post('/artist', verifyToken, addArtist)
router.delete('/artist/:id', verifyToken, destroyArtist)

router.get('/transactions', verifyToken, getAllTransaction)
router.post('/transaction/date', verifyToken, searchDate)
router.patch('/transaction/:id', verifyToken, updateApproved)
router.post('/transaction', verifyToken, fileupload('imageFile'), addTransaction)
router.get('/transaction/user', verifyToken, getHistoryPayment)


router.get('/musics', getAllMusic)
router.post('/music', verifyToken, fileupload('imageFile', 'audioFile'), addMusic)

module.exports = router
