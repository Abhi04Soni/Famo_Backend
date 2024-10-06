const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


const posts = [
    {
        email: "soni5abhi23@gmail.com",
        posts: [{
            username: "John Doe",
            title: "Post 1",
            caption: "My first post",
            likesCount: 0,
            commentsCount: 0,
            coments: {},
            dateOfPost: "2020-01-01",
            place: "USA",
        },
        {
            username: "Jane Smith",
            title: "Post 2",
            caption: "My second post",
            likesCount: 0,
            commentsCount: 0,
            coments: {},
            dateOfPost: "2020-01-01",
            place: "USA",
        }, {
            username: "Alice Johnson",
            title: "Post 3",
            caption: "My third post",
            likesCount: 0,
            commentsCount: 0,
            coments: {},
            dateOfPost: "2020-01-01",
            place: "USA",
        }
        ]
    }
]

router.post("/dashboard/profile", (req, res) => {
    const { email } = req.body;
    console.log("Req rec for posts", email);

    try {
        const user = posts.find(user => user.email === email);
        if (user) {
            const userPosts = user.posts || [];
            const postCount = user.posts.length;
            if (postCount > 0) {
                res.json({ message: 'User found and post is available', postCount, userPosts });

            }
            else {
                res.json({ message: 'No posts found' });
            }

        }
        else {
            res.json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'An error occurred', error: error.message }); 

    }

})

module.exports = router;