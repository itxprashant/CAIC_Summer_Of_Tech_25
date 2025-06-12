const express = require('express');
const app = express();
const mongoose = require('mongoose');
// import bcrypt from "bcryptjs";
const bcrypt = require('bcryptjs');
const cors = require('cors');


const saltRounds = 10;

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());

// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // simple email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // minimum password length
    }
});

async function createUser(name, email, password) {
    const User = mongoose.model('User', userSchema);

    try {
        // Hash password using bcrypt
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // create new user instance
        const user = new User({ name, email, password: hashedPassword });

        // save user to mongodb database
        await user.save();
        console.log('User created successfully');
    } catch (err) {
        console.error('Error creating user:', err);
    }

}

async function authenticateUser(email, password) {
   // 0: success, 1: user not found, 2: password mismatch

    const User = mongoose.model('User', userSchema);

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log('No user found with that email');
            return 1;
        }

        // compare password with hashed password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            console.log('Authentication successful');
            return 0;
        } else {
            console.log('Authentication failed');
            return 2;
        }
    } catch (err) {
        console.error('Error during authentication:', err);
        throw err;
}
}

function deleteUser(email){
    const User = mongoose.model('User', userSchema);

    User.deleteOne({ email: email }, function(err) {
        if (err) throw err;
        console.log('User deleted successfully');
    });
}

function changeName(email, newName){
    // find user by email and update name
    User.findOne({ email: email }, function(err, user) {
        if (err) throw err;
        if (!user) {
            console.log('No user found with that email');
            return;
        }

        user.name = newName;

        user.save()
            .then(() => {
                console.log('User name updated successfully');
            })
            .catch(err => {
                console.error('Error updating user name:', err);
            });
    });
}

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

app.get('/', (req, res) => {
    res.send('Hello, ', req.query.name || 'World');
});

app.post('/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    createUser(name, email, password);
    res.status(201).send('User registered successfully');
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    authenticateUser(email, password)
        .then(result => {
            if (result === 0) {
                res.status(200).send('Login successful');
            } else if (result === 1) {
                res.status(404).send('User not found');
            } else if (result === 2) {
                res.status(401).send('Incorrect password');
            }
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).send('Error during login');
        });
});

app.get('/auth/profile', (req, res) => {
    // get user profile by email
    const { email } = req.query;
    const User = mongoose.model('User', userSchema);
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).json({ name: user.name, email: user.email });
        }).catch(err => {
            console.error('Error fetching user profile:', err);
            res.status(500).send('Error fetching user profile');
        })
});

app.get('/users', (req, res) => {
    // get all users
    const User = mongoose.model('User', userSchema);
    User.find({})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
        });
});

// test function to create a user
// createUser("kyran", "kyran@gmail.com", "password");

// test function to authenticate a user
// authenticateUser("kyran@gmail.com", "password");