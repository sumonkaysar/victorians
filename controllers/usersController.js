const { usersCollection } = require("../mongoDBConfig/collections")
const { readDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")
const { deleteFiles } = require("../utils/fileReadAndDelete")
const { ObjectId } = require('mongodb');

const getUsers = async (req, res) => {
  const users = await readDoc(usersCollection)
  res.send(users)
}

const updateUser = async (req, res) => {
  const result = await updateDoc(req, usersCollection)
  res.send(result)
}

const getUserRole = async (req, res) => {
  const user = await usersCollection().findOne({ email: req.query?.email })
  const role = user.role || "user"
  const adminType = user.adminType || ""
  res.send({ role, adminType })
}

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the provided id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await usersCollection().findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getUsers,
  updateUser,
  getUserRole,
  getOneUser
}