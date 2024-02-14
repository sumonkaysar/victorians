const { savePackage, getAllPackages, getAPackage, deleteAPackage, updateAPackage } = require("../controllers/packagesCollection")
const { verifyAdmin } = require("../middlewares/verifyJWT")

const packagesRouter = require("express").Router()

packagesRouter.get("/", getAllPackages)

packagesRouter.post("/", savePackage)

packagesRouter.get("/:id", getAPackage)

packagesRouter.get("/:id", getAPackage)

packagesRouter.delete("/:id", verifyAdmin, deleteAPackage)

packagesRouter.patch("/:id", verifyAdmin, updateAPackage)

module.exports = packagesRouter