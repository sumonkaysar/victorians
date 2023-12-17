const { packagesCollection } = require("../mongoDBConfig/collections")
const { createDoc, readDoc, readOneDoc } = require("../utils/mongoQueries")
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

const getAPackage = async (req, res) => {
    if (req.params.id !== "undefined") {
        const package = await readOneDoc(req, packagesCollection)
        return res.send(package)
    }
    res.send({})
}

module.exports = {
    getAllPackages,
    savePackage,
    getAPackage,
}