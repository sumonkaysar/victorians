// routes/chatRoutes.js

const express = require('express');
const chatController = require('../controllers/socketIoController');


const router = express.Router();


const chatRoutes = (io) => {
  // Initialize the chat controller with Socket.IO instance
  chatController(io);
  return router;
};

module.exports = chatRoutes;
