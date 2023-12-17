const { userMessage } = require("../mongoDBConfig/collections");
const { createDoc, readDoc } = require("../utils/mongoQueries");
const { ObjectId } = require("mongodb");
const { uploadFile } = require("../utils/uploadFile");

const saveMessage = async (req, res) => {
  req.body = JSON.parse(req.body.messageData);
  if (req.file?.filename) {
    req.body.message.videoOrImg = uploadFile(req.file.filename);
  }
  const result = await createDoc(req, userMessage);
  res.send(result);
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

const getLatestUsers = async (req, res) => {
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
};

module.exports = {
  saveMessage,
  getMessage,
  getLatestUsers,
};
