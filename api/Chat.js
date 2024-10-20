const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
import { Chats } from '../modal/Chats.js';

router.post("/dashboard/Chats", async (req, res) => {
    const email = req.user.email;
    const textid = uuid.v4();
    const textDateTime = req.user.textDateTime;
    const sendText = req.user.sendText;

    let user = (await userModal.findOne({combinedid}));
    console.log("USER :: " + user);



    const chat = new Chats({
        combinedid: email,
        chatArray: [{
            email,
            sendText,
            textDateTime,
            textid
        }]
    });

    await user.save();



})
