const { savePackage, getAllPackages } = require("../controllers/packagesCollection")
const { upload } = require("../utils/uploadFile")

const packagesRouter = require("express").Router()

packagesRouter.get("/", getAllPackages)

packagesRouter.post("/", upload.single('packageImg'), savePackage)

module.exports = packagesRouter