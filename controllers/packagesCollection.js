const { packagesCollection } = require("../mongoDBConfig/collections")
const { createDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")
// const { deleteFiles } = require("../utils/fileReadAndDelete")

const savePackage = async (req, res) => {
    req.body.packageImg = uploadFile(req.file.filename)
    req.body.selectedProducts = JSON.parse(req.body.selectedProducts)
    const result = await createDoc(req, packagesCollection)
    res.send(result)
}

module.exports = {
    savePackage,
}