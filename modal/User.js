const mongoose = require('mongoose');

const postSubScheme  = new mongoose.Schema({
    id : {
        type: String
    },
})

const connctionSubSchema = new mongoose.Schema({
    id : {
        type: String
    }
})
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    postArray: [postSubScheme],
    conncetionArray: [connctionSubSchema]
    
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
