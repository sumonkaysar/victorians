const { userMessage, usersCollection } = require("../mongoDBConfig/collections");
const { createDoc, readDoc } = require("../utils/mongoQueries");
const { ObjectId } = require("mongodb");
const { uploadFile } = require("../utils/uploadFile");

const saveMessage = async (req, res) => {
  try {
    req.body = JSON.parse(req.body.messageData);
    if (req.file?.filename) {
      req.body.message.videoOrImg = uploadFile(req.file.filename);
    }
    const result = await createDoc(req, userMessage);
    res.send(result);
  } catch (err) {
    console.log(err)
  }
};

const getMessage = async (req, res) => {
  try {
    const messageUserId = req.params.id;

    // Check if the provided messageUserId is a valid ObjectId
    if (!ObjectId.isValid(messageUserId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const message = await userMessage()
      .find({
        $or: [
          { authorId: messageUserId, receiver: { $exists: true } },
          { receiver: messageUserId },
        ],
      })
      .toArray();

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Check if the authorId matches the messageUserId
    //   if (message.authorId !== messageUserId) {
    //     return res.status(403).json({ error: 'Unauthorized access' });
    //   }

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const readUnreadMessage = async (req, res) => {
  try {
    // Extract user ID from request params
    const userId = req.params.userId;
    const reqBodyData = req.body;
    // Find the user by ID
    const findUser = await usersCollection().findOne({ _id: new ObjectId(userId) });
    // Check if the user exists
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's field
    findUser.readUnreadMessage = {...reqBodyData, messageUserId: findUser?._id}; // Add the readUnread field with the specified value

    // Update the user in the database
    await usersCollection().updateOne(
      { _id: new ObjectId(userId) },
      { $set: { readUnreadMessage: findUser.readUnreadMessage} }
    );

    // Send a success response
    res.json({ message: "User field updated successfully", readUnreadMessage: findUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const sortingUserWithMessage= async(req, res)=>{
  const allUsers = await readDoc(usersCollection);
  const allMessage = await readDoc(userMessage);

  const extractedData = allMessage.map(message => ({
    receiver: message.receiver,
    authorId: message.authorId,
    timestamp: message.timestamp
  }));

// Remove 'new ObjectId'
const userIds = new Set(extractedData.flatMap(data => [data.receiver, data.authorId]));


const usersWithMatchingIds = allUsers.filter(user => userIds.has(user._id.toString()));


usersWithMatchingIds.sort((a, b) => {
  const timestampA = Math.max(
    ...extractedData
      .filter(data => data.receiver === a._id.toString() || data.authorId === a._id.toString())
      .map(data => data.timestamp)
  );
  const timestampB = Math.max(
    ...extractedData
      .filter(data => data.receiver === b._id.toString() || data.authorId === b._id.toString())
      .map(data => data.timestamp)
  );
  return timestampB - timestampA;
});

  res.send(usersWithMatchingIds)

}

const getLatestUsers = async (req, res) => {
  try {
    const users = await userMessage()
      .aggregate([
        {
          $group: {
            _id: {
              authorId: "$authorId",
            },
            timestamp: { $last: "$timestamp" },
          },
        },
        { $project: { _id: 1, authorId: 1, timestamp: 1 } },
      ])
      .toArray();
    res.send(users)
  } catch (err) {
    console.log(err)
  }
};

module.exports = {
  saveMessage,
  getMessage,
  getLatestUsers,
  readUnreadMessage,
  sortingUserWithMessage
};
