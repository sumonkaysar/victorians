// controllers/chatController.js
const path = require("path");
const { usersCollection } = require("../mongoDBConfig/collections");
const { ObjectId } = require("mongodb");
const { messageWritingEvent } = require("./message_controller");
const messageReciveSound = path.join(
  `${process.env.SERVER}/files/messageSound/Message_notification.mp3`
);

const messageSendSound = path.join(
  `${process.env.SERVER}/files/messageSound/message_send_sound.mp3`
);
let activeUsers = [];
const addUser = (socketId, user_id, user) => {
  const checkUser = activeUsers.some((data) => data?.user_id === user_id);

  if (user_id && user) {
    if (!checkUser) {
      activeUsers.push({ user_id, socketId, user });
    }
  }
};

const userRemove = (socketId) => {
  activeUsers = activeUsers.filter((u) => u.socketId !== socketId);
};

const findUser = (id) => {
  return activeUsers.find((u) => u?.user_id === id);
};

const chatController = (io) => {
  io.on("connection", (socket) => {
    socket.on("addUser", (user_id, user) => {
      addUser(socket.id, user_id, user);
      if (activeUsers.length > 0) {
        socket.emit("getUsers", activeUsers);
      }
    });

    socket.on("sendMessage", (messageData) => {
      const user = findUser(messageData?.receiver);
      if (user !== undefined) {
        socket.to(user.socketId).emit("getMessage", {
          ...messageData,
          messageSound: messageReciveSound,
        });
      }
    });

    socket.on("disconnect", () => {
      userRemove(socket.id);
      io.emit("getUsers", activeUsers);
    });

    socket.on("typingMessage", async (data) => {
      const message = data?.message;
      const senderId = data?.senderId;
      const user = findUser(senderId);
      const user_id = new ObjectId(user?.user?._id) ;


      if (user !== undefined) {
        
        user.typing = true;
    
        try {
          // Set typing status set true
         await usersCollection().updateOne(
              { _id: user_id },
              { $set: { typing: true } }
          );

          // Emit event user is typing
          socket.to(user.socketId).emit("typingMessageGet", { ...data, typing: true });
      
          // Wait for 5 seconds
          await new Promise(resolve => setTimeout(resolve, 5000));
      
          // Set typing status false after 30 seconds
          await usersCollection().updateOne(
              { _id: user_id },
              { $set: { typing: false } }
          );

          // Emit event to stopped typing
          socket.to(user.socketId).emit("typingMessageGet", { ...data, typing: false });
      } catch (error) {
          console.error("Error updating user typing status:", error);
      }
      }
    });
    
  });


};

module.exports = chatController;
