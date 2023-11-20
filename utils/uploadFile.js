const multer = require('multer')
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploaded-files/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const filename = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + ext

        cb(null, filename)
    }
})
const upload = multer({ storage: storage })

const uploadFile = filename => {
    const fileUrl = `http://localhost:5000/files/${filename}`
    
    return fileUrl;
}

const deleteUploadedFile = filename => {
    const fileUrl = `http://localhost:5000/upload/files/${filename}`
    
    return fileUrl;
}

module.exports = {
    upload,
    uploadFile,
}