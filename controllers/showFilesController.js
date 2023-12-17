const fs = require("fs");
const { readFiles } = require("../utils/fileReadAndDelete");

const getAudios = async (req, res) => {
    readFiles(res, req.params.name)
}

const showUploadedFiles = async (req, res) => {
    readFiles(res, req.params.name)
}

module.exports = {
    showUploadedFiles,
    getAudios,
}