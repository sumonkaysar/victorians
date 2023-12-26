const { packagesCollection } = require("../mongoDBConfig/collections")
const { createDoc, readDoc, readOneDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")
// const { deleteFiles } = require("../utils/fileReadAndDelete")

const getAllPackages = async (req, res) => {
    try {
        const packages = await readDoc(packagesCollection)
        res.send(packages)
    } catch (err) {
        console.log(err)
    }
}

const savePackage = async (req, res) => {
    try {
        const result = await createDoc(req, packagesCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const getAPackage = async (req, res) => {
    try {
        if (req.params.id !== "undefined") {
            const package = await readOneDoc(req, packagesCollection)
            return res.send(package)
        }
        res.send({})
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllPackages,
    savePackage,
    getAPackage,
}