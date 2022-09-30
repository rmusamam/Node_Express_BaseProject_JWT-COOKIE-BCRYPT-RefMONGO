const multer = require('multer')

const storage = multer.diskStorage({
    destination: './assests/profile',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
    
const upload = multer({ storage: storage })
    // const uploadeImage=
    console.log('this is uploadeImage:',upload)
exports.module=upload.single('file')
