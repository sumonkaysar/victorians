const { usersCollection } = require("../mongoDBConfig/collections")
const { updateDoc } = require("../utils/mongoQueries")

const makeAdmin = async (req, res) => {
  req.body = { role: "admin", adminId: process.env.ADMIN_ID }
  const result = await updateDoc(req, usersCollection)
  res.send(result)
}

const removeAdmin = async (req, res) => {
  req.body = { role: "user", adminId: "" }
  const result = await updateDoc(req, usersCollection)
  res.send(result)
}

module.exports = {
    makeAdmin,
    removeAdmin,
}