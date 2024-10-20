const mongoose = require('mongoose');

const commentsSubSchema = new mongoose.Schema({
    commentedBy: {
        type: String
    },
    comment: {
        type: String
    },
    commentDateTime: {
        type: String
    }
})

const postSubSchema = new mongoose.Schema({
    username: {
        type: String
    },
    title: {
        type: String
    },
    caption: {
        type: String
    },
    likesCount: {
        type: Number
    },
    commentsCount: {
        type: Number
    },
    dateOfPost: {
        type: String
    },
    image : {
        type: String
    },
    comments  : [commentsSubSchema]
    
})

const PostSchema = new mongoose.Schema({
    email: {
        type: String
    },
    postArray : [postSubSchema]
});

const Post = mongoose.model('Posts', PostSchema);
module.exports = Post;