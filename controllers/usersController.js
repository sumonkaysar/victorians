const { usersCollection } = require("../mongoDBConfig/collections")
const { readDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")
const { deleteFiles } = require("../utils/fileReadAndDelete")

const getUsers = async (req, res) => {
    const users = await readDoc(usersCollection)
    res.send(users)
}

module.exports = {
    getUsers,
}