const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000
const jwt = require('jsonwebtoken');

const auth = require('./services/auth');
const postapi = require('./api/post');
const connectDB = require('./services/db');
const userModal = require('./modal/User')

connectDB();
require('dotenv').config()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




app.get('/', (req, res) => {
    res.send('Welcome to my Node.js server!');
});

//login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Inside /login route request", email, password);

    const user = await userModal.findOne({ email, password });
    console.log(user);

    if (user) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
        res.json({ message: 'Login successful', token });
        console.log(`User with email ${email} successfully logged in.`);
    } else {

        res.status(401).json({ message: 'User not found' });
        console.log('Invalid credentials');
    }

});


//signup route
app.post('/signup' ,async (req, res) => {
    const { email, password } = req.body;
    console.log("Inside /signup route request", email, password);

    let user = (await userModal.findOne({ email , password}));
    console.log("USER :: " + user);

    if (user) {
        console.log("User Already Exists, please login");
        res.json({ message: 'User Already Exists, please login' });
    } else {
        user = new userModal({
            name: email,
            email,
            password,
            postArray: [],
            conncetionArray: []
        })

        await user.save();
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
        console.log("Inside signup route request", email, password);
        res.json({ message: 'User Created Signup successful', token });

    }

});

// A protected route
app.get('/dashboard', auth, (req, res) => {
    console.log(req.body)
    try {
        res.json({ message: 'Welcome to the dashboard!' });
        console.log(`User with email ${req.user.email} successfully accessed the dashboard.`);

    } catch (err) {
        console.log(err);
    }

});

app.use(postapi);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
