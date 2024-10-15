const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    sendText: {
        type: String,
        required: true
    },
    textDateTime: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chats', ChatSchema);
module.exports = Chat;