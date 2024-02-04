const { usersCollection, premiumCollection } = require("../mongoDBConfig/collections")
const { readDoc, updateDoc } = require("../utils/mongoQueries")
const jwt = require("jsonwebtoken")
// const { deleteFiles } = require("../utils/fileReadAndDelete")
const { ObjectId } = require('mongodb');

const getUsers = async (req, res) => {
  try {
    const users = await readDoc(usersCollection)
    res.send(users)
  } catch (err) {
    console.log(err)
  }
}

const updateUser = async (req, res) => {
  try {
    const result = await updateDoc(req, usersCollection)
    res.send(result)
  } catch (err) {
    console.log(err)
  }
}

const updateOwner = async (req, res) => {
  try {
    const result = await updateDoc(req, usersCollection)
    const {email} = req.body
    const token = jwt.sign({ user: { email } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
    result.token = token
    res.send(result)
  } catch (err) {
    console.log(err)
  }
}

const getUserRole = async (req, res) => {
  try {
    const user = await usersCollection().findOne({ email: req.query?.email })
    const role = user.role || "user"
    const adminType = user.adminType || ""
    res.send({ role, adminType })
  } catch (err) {
    console.log(err)
  }
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
}

const getPremiumUsers = async (req, res) => {
  try {
    const users = await premiumCollection().aggregate([
      { "$addFields": { "id": { "$toObjectId": "$userId" } } },
      {
        "$lookup": {
          "from": "users",
          "localField": "id",
          "foreignField": "_id",
          "as": "user"
        }
      },
      {
        $sort: { "products.purchasingTime": -1 }
      },
      {
        $unwind: "$user"
      }
    ]).toArray()
    res.send(users)
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  getUsers,
  updateUser,
  getUserRole,
  getOneUser,
  getPremiumUsers,
  updateOwner,
}