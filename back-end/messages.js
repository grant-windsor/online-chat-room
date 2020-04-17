const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

const User = users.model;
const validUser = users.valid;


const messageSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  text: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  },
});

const Message = mongoose.model("Message", messageSchema);

//get messages
router.get('/', validUser, async (req, res) => {
  try {
    let messages = await Message.find().sort();
    return res.send({
      messages: messages
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

// send a message
router.post('/', validUser, async (req, res) => {
  const message = new Message({
    user: req.user.username,
    text: req.body.text,
  });
  try {
    await message.save();
    return res.send({ message: message });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router
}
