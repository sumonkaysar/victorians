const { savePackage, getAllPackages, getAPackage } = require("../controllers/packagesCollection")
const { upload } = require("../utils/uploadFile")

const packagesRouter = require("express").Router()

packagesRouter.get("/", getAllPackages)

packagesRouter.post("/", upload.single('packageImg'), savePackage)

packagesRouter.get("/:id", getAPackage)

module.exports = packagesRouter