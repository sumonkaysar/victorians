const { uploadFile, showUploadedFiles } = require("../controllers/uploadController")
const { upload } = require("../utils/uploadFile")

const uploadRouter = require("express").Router()

uploadRouter.post("/", upload.single('avatar'), uploadFile)

uploadRouter.get("/files/:name", showUploadedFiles)

module.exports = uploadRouter