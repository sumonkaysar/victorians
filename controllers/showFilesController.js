const fs = require("fs");
const { readFiles } = require("../utils/fileReadAndDelete");

const showUploadedFiles = async (req, res) => {
    try {
        readFiles(res, req.params.name)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    showUploadedFiles,
}