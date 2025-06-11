const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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

    // // hash password using bcrypt
    // bcrypt.hash(password, saltRounds, function(err, hash) {
    //     if (err) throw err;
    //     password = hash;
    // });

    // const user = new User({ name, email, password });

    // // add user to mongodb database
    // user.save()
    //     .then(() => {
    //         console.log('User created successfully');
    //     })
    //     .catch(err => {
    //         console.error('Error creating user:', err);
    //     });

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
    const result = authenticateUser(email, password);
    if (result === 0) {
        res.status(200).send('Login successful');
    } else if (result === 1) {
        res.status(404).send('User not found');
    } else {
        res.status(401).send('Incorrect password');
    }
});

app.get('/auth/profile', (req, res) => {
    // get user profile by email
    const { email } = req.query;
    const User = mongoose.model('User', userSchema);
    User.findOne({ email: email }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json({ name: user.name, email: user.email });
        }
    });
});

app.get('/users', (req, res) => {
    // get all users
    const User = mongoose.model('User', userSchema);
    User.find({}, function(err, users) {
        if (err) throw err;
        res.status(200).json(users);
    });
});

// test function to create a user
// createUser("kyran", "kyran@gmail.com", "password");

// test function to authenticate a user
// authenticateUser("kyran@gmail.com", "password");