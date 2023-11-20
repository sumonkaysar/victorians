const { uploadFile, showUploadedFiles } = require("../controllers/uploadController")
const multer = require('multer')
const path = require("path");
const uploadRouter = require("express").Router()

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

uploadRouter.post("/", upload.single('avatar'), uploadFile)

uploadRouter.get("/files/:name", showUploadedFiles)

// uploadRouter.patch("/:id", updateReview)

module.exports = uploadRouter