const { ArtistModel } = require('../models/ArtistModel')
const ArtistValidator = require('../validator/artist')
const ClientError = require('../exceptions/ClientError')

const addArtist = async (req, res) => {
  try {
    ArtistValidator.artistValidate(req.body)
    const result = await ArtistModel.postArtist(req.body)

    res.status(201).send({
      status: 'success',
      artist: { ...result }
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

const destroyArtist = async (req, res) => {
  try {
    await ArtistModel.deleteArtist(req.params.id)

    res.status(200).send({
      status: 'success',
      artist: { id: req.params.id }
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

module.exports = { addArtist, destroyArtist }
