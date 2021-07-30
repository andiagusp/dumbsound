const MusicModel = require('../models/MusicModel')
const MusicValidator = require('../validator/music')
const ClientError = require('../exceptions/ClientError')

const getAllMusic = async (req, res) => {
  try {
    const results = await MusicModel.getMusics()

    res.status(200).send({
      status: 'success',
      musics: results
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

const addMusic = async (req, res) => {
  try {
    const { title, year, artistId } = req.body
    const thumbnail = req.files.imageFile[0].filename
    const attache = req.files.audioFile[0].filename

    MusicValidator.musicValidate({ title, year, thumbnail, attache, artistId })
    const result = await MusicModel.postMusic({ title, year, thumbnail, attache, artistId })

    res.status(201).send({
      status: 'success',
      music: result
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

module.exports = { getAllMusic, addMusic }
