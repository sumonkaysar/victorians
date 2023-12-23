const { savePackage, getAllPackages, getAPackage } = require("../controllers/packagesCollection")

const packagesRouter = require("express").Router()

packagesRouter.get("/", getAllPackages)

packagesRouter.post("/", savePackage)

packagesRouter.get("/:id", getAPackage)

module.exports = packagesRouter