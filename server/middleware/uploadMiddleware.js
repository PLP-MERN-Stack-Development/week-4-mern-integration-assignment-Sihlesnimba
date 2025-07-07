import multer from 'multer'
import path from 'path'

// Set up storage engine
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

// File filter (accept only images)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter,
})

export default upload
