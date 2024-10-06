const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000
const jwt = require('jsonwebtoken');
require('dotenv').config()
const auth = require('./services/auth');

const postapi = require('./api/post');


//userData
const userData = [
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "securePassword123"
    },
    {
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "password": "strongPassword456"
    },
    {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "password": "aliceSecret789"
    },
    {
        "name": "Bob Brown",
        "email": "bob.brown@example.com",
        "password": "bobPassword321"
    }, {
        "name": "Abhi Soni",
        "email": "soni5abhi23@gmail.com",
        "password": "Ab@2359078"
    }, {
        "name": "Abhi Soni",
        "email": "a@gmail.com",
        "password": "Ab@2359078"
    }

]


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




// Sample route for the homepage
app.get('/', (req, res) => {
    res.send('Welcome to my Node.js server!');
});

// Sample login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Inside /login route request", email, password);

    // Check if user exists
    const user = userData.find(user => user.email === email && user.password === password);
    console.log(user);

    if (user) {
        // Generate a JWT token if the user is found
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
        res.json({ message: 'Login successful', token });
        console.log(`User with email ${email} successfully logged in.`);
    } else {
        // If user not found, return 401 Unauthorized
        res.status(401).json({ message: 'User not found' });
        console.log('Invalid credentials');
    }

});


//signup route
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    console.log("Inside /signup route request", email, password);

    // Check if user exists
    const user = userData.find(user => user.email === email && user.password === password);
    console.log(user);

    if (user) {
        console.log("User Already Exists, please login");
        res.json({ message: 'User Already Exists, please login' });
    } else {
        userData.push({ name: "dummy Name" + userData.length , email: req.body.email, password: req.body.password });
        // Generate a JWT token if the user is found
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
        console.log("Inside signup route request", email, password);
        res.json({ message: 'User Created Signup successful', token });

    }

    res.json({ message: 'Signup successful', email });
});

// A protected route (example)
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

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
