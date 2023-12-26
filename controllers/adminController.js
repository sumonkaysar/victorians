const { usersCollection } = require("../mongoDBConfig/collections")
const { updateDoc } = require("../utils/mongoQueries")

const makeAdmin = async (req, res) => {
  try {
    req.body = { role: "admin", adminId: process.env.ADMIN_ID }
    const result = await updateDoc(req, usersCollection)
    res.send(result)
  } catch (err) {
    console.log(err)
  }
}

const removeAdmin = async (req, res) => {
  try {
    req.body = { role: "user", adminId: "" }
    const result = await updateDoc(req, usersCollection)
    res.send(result)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  makeAdmin,
  removeAdmin,
}