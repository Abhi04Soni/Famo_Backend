require('dotenv').config()
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            console.log("Inside auth middleware");
            req.user = decoded;
            next();
        });
        console.log(token);
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }   
    
}

module.exports = auth;