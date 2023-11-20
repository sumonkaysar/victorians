const {showUploadedFiles } = require("../controllers/showFilesController")

const showFiles = require("express").Router()

showFiles.get("/:name", showUploadedFiles)

module.exports = showFiles