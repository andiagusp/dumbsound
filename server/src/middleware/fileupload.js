const multer = require('multer')

const fileupload = (imageFile, audioFile) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      if (file.fieldname === audioFile) {
        callback(null, './public/audio')
      } else {
        if (req.path === '/music') {
          callback(null, './public/thumbnail')
        } else {
          callback(null, './public/image')
        }
      }
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + '-' + file.originalname.replace(/\s/g, '-'))
    }
  })

  const fileFilter = (req, file, callback) => {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG)$/)) {
        req.fileValidationError = {
          message: 'Only image files allowed jpg png jpeg'
        }
        return callback(new Error('Only image files are allowed jpg png jpeg'), false)
      }
    }
    if (file.fieldname === audioFile) {
      if (!file.originalname.match(/\.(mp3|flac)$/)) {
        req.fileValidationError = {
          message: 'Only image files allowed mp3 flac'
        }
        return callback(new Error('Only image files are allowed mp3 flac'), false)
      }
    }
    callback(null, true)
  }
  const size = 10
  const maxSize = size * 1024 * 1024

  const upload = multer({
    storage, fileFilter, limits: { fileSize: maxSize }
  }).fields([
    {
      name: imageFile,
      maxCount: 1
    },
    {
      name: audioFile,
      maxCount: 1
    }
  ])

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError) {
        return res.status(400).send({
          status: 'failed',
          ...req.fileValidationError
        })
      }

      if (req.path === '/music') {
        if (!req.files.imageFile && !err) {
          return res.status(400).send({
            status: 'failed',
            message: 'File image is empty'
          })
        }
        if (!req.files.audioFile && !err) {
          return res.status(400).send({
            status: 'failed',
            message: 'File audio is empty'
          })
        }
      } else {
        if (!req.files.imageFile && !err) {
          return res.status(400).send({
            status: 'failed',
            message: 'File is empty'
          })
        }
      }

      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            status: 'failed',
            message: 'oversize file upload maximum 10mb'
          })
        }
        console.log(err.message)
        return res.status(400).send({
          status: 'failed',
          message: err.message
        })
      }
      console.log('end')
      return next()
    })
  }
}

module.exports = fileupload
