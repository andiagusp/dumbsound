const { artist } = require('../../models')
const NotFoundError = require('../exceptions/NotFoundError')

const ArtistModel = {
  postArtist: async function (data) {
    const create = await artist.create(data)
    return ({
      id: create.id,
      name: create.name,
      old: create.old,
      type: create.type,
      startCareer: create.startCareer
    })
  },
  deleteArtist: async function (id) {
    console.log('cek')
    const data = await artist.findOne({ where: { id } })
    console.log(data)
    if (!data) throw new NotFoundError('artist not found')
    await artist.destroy({ where: { id: id } })
  },
  getAllArtists: async function () {
    const results = await artist.findAll({ attributes: ['id', 'name']})
    return results
  }
}

module.exports = { ArtistModel }
