const { music, artist } = require('../../models')
const NotFoundError = require('../exceptions/NotFoundError')

const MusicModel = {
  getMusics: async function () {
    const results = await music.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: artist,
        as: 'artist',
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    })
    return results
  },
  postMusic: async function (data) {
    const checkArtist = await artist.findOne({ where: { id: data.artistId }, attributes: ['id', 'name'] })
    if (!checkArtist) throw new NotFoundError('artist not found')
    const result = await music.create(data)
    const musicResult = await this.getMusicByPk(result.id)
    return musicResult
  },
  getMusicByPk: async function (id) {
    const result = await music.findOne({
      where: { id: id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: artist,
        as: 'artist',
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    })
    return result
  }
}

module.exports = MusicModel
