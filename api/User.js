const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.get("/api/search", async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter "query" is required' });
    }
    try {
        const user = await usersCollection.find({ 
            email: { $regex: query, $options: "i" }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error during search:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
