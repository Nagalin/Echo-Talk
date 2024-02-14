import multer ,{ StorageEngine } from 'multer'

const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public')
    },

    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
  
const upload = multer({ storage: storage })

export default upload