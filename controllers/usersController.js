const { usersCollection } = require("../mongoDBConfig/collections")
const { readDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")
const { deleteFiles } = require("../utils/fileReadAndDelete")

const getUsers = async (req, res) => {
    const users = await readDoc(usersCollection)
    res.send(users)
}

const updateUser = async (req, res) => {
    req.body = {role: "admin"}
    const result = await updateDoc(req, usersCollection)
    res.send(result)
}

const getUserRole = async (req, res) => {
    const user = await usersCollection().findOne({email: req.query?.email})
    const role = user.role || "user"
    res.send({role})
}

module.exports = {
    getUsers,
    updateUser,
    getUserRole,
}