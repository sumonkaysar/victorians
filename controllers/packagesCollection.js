const { packagesCollection } = require("../mongoDBConfig/collections")
const { createDoc, readDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")
// const { deleteFiles } = require("../utils/fileReadAndDelete")

const getAllPackages = async (req, res) => {
    const packages = await readDoc(packagesCollection)
    res.send(packages)
}

const savePackage = async (req, res) => {
    req.body.packageImg = uploadFile(req.file.filename)
    req.body.selectedProducts = JSON.parse(req.body.selectedProducts)
    const result = await createDoc(req, packagesCollection)
    res.send(result)
}

module.exports = {
    getAllPackages,
    savePackage,
}