const fs = require("fs");
const { readFiles } = require("../utils/fileReadAndDelete");

const showUploadedFiles = async (req, res) => {
    readFiles(res, req.params.name)
}

module.exports = {
    showUploadedFiles,
}