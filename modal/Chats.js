const mongoose = require('mongoose');

const chatSubSchema = new mongoose.Schema({
    email: {
        type: String
    },
    sendText: {
        type: String
    },
    textDateTime: {
        type: String
    },
    textid: {
        type: String
    }
})

const ChatSchema = new mongoose.Schema({
    sender: {
        type: String
    },
    chatArray : [chatSubSchema]
});

const Chat = mongoose.model('Chats', ChatSchema);
module.exports = Chat;