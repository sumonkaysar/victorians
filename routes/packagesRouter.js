const { savePackage } = require("../controllers/packagesCollection")
const { upload } = require("../utils/uploadFile")

const packagesRouter = require("express").Router()

packagesRouter.post("/", upload.single('packageImg'), savePackage)

module.exports = packagesRouter