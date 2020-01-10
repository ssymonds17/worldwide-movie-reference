const express = require('express'), 
    morgan = require('morgan'), 
    bodyParser = require('body-parser'),
    uuid = require('uuid'), 
    app = express(),
    cors = require('cors');

const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

const db = 'mongodb://localhost/wwMovieReferenceDB';
// Allows Mongoose access to my database
// mongoose.connect('mongodb://localhost/wwMovieReferenceDB', {useNewUrlParser: true});

// Online database connection
mongoose.connect('mongodb+srv://wwmrAdmin:<admin>@initialclusters-rht6n.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

// Utilising body-parser module
app.use(bodyParser.json());

// Utilising CORS module
app.use(cors());

// Morgan middleware that logs server requests
app.use(morgan('common'));

// Exposes files from public folder in static form
app.use(express.static('public'));

// Imports my auth.js file into my project
let auth = require('./auth')(app);
// When checking logs in Heroku it says that jsonwebtoken module cannot be found
// So I believe that the variable above needs to be used here to activate it somehow
// This is the reason for the line below...
// app.use(auth()); // Work in progress

// Imports my passport.js file into my project
const passport = require('passport');
require('./passport');

// Code sets that only certain origins have access to the API
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn't
        // found on the list of allowed origins
            let message = 'CORS policy for this application doesn\'t allow access from origin ' + origin;
            return callback(new Error(message ), false);
        }
        return callback(null, true);
    }
}));

// Welcome text on page visit
app.get('/', (req, res) => {
    return res.send('WorldWide Movie Reference');
});

// GET request to return a list of ALL movies
app.get('/movies', passport.authenticate('jwt', { session : false }), function(req, res) {
    Movies.find()
    .then(function(movies) {
        res.status(201).json(movies)
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).send("Error" + err);
    });
});

// GET request to return data about a movie by title
app.get('/movies/:title', passport.authenticate('jwt', { session : false }), function(req, res) {
    Movies.findOne({ title: req.params.title })
    .then(function(movie) {
        res.json(movie)
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).send("Error" + err);
    });
});

// GET request to return data about a genre by name
app.get('/genres/:name', passport.authenticate('jwt', { session : false }), function(req, res) {
    Genres.findOne({ name : req.params.name })
    .then(function(genre) {
        res.json(genre)
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).send("Error" + err);
    });
});

// GET request to return data about a director by name
app.get('/directors/:name', passport.authenticate('jwt', { session : false }), function(req, res) {
    Directors.findOne({ name : req.params.name })
    .then(function(director) {
        res.json(director)
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

// POST request that adds a NEW USER
/* Expects a JSON in this format
{
    ID : Integer,
    Username : String,
    Password : String,
    Email : String,
    Birthday : Date,
}
*/
app.post('/users', 
    // Validation logic here for request
    // I can either use a chain of methods like .not().isEmpty()
    // Which means "opposite of isEmpty". I.e "Is not empty"
    // Or use .isLength({min:5}) which means
    // Minimum value of 5 characters are only allowed
    [check('username', 'Username is required').isLength({min: 5}),
    check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()], (req, res) => {
    
    // Check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.password);
    Users.findOne({ username : req.body.username }).then(function(user) {
        if (user) {
            return res.status(400).send(req.body.username + "already exists");
        } else {
            Users.create({
                name:  req.body.name,
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                birthday: req.body.birthday
            })
            .then(function(user) {res.status(201).json(user) })
            .catch(function(error) {
                console.error(error);
                res.status(500).send("Error: " + error);
            })
        }
    }).catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
    });
});

// GET request to return ALL USERS
app.get('/users', passport.authenticate('jwt', { session : false }), function(req, res) {
    Users.find()
    .then(function(users) {
        res.status(201).json(users)
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

// GET request to return USER BY USERNAME
app.get('/users/:username', passport.authenticate('jwt', { session : false }), function(req, res) {
    Users.findOne({ username : req.params.username })
    .then(function(user) {
        res.status(201).json(user)
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

// PUT request that allows users to UPDATE info by USERNAME
/* Expects a JSON in this format
{
    name: String,
    username: String, (required)
    password: String, (required)
    email: String, (required)
    birthday: Date
}
*/
app.put('/users/:username', passport.authenticate('jwt', { session : false }), 
    // Validation logic here for request
    // I can either use a chain of methods like .not().isEmpty()
    // Which means "opposite of isEmpty". I.e "Is not empty"
    // Or use .isLength({min:5}) which means
    // Minimum value of 5 characters are only allowed
    [check('username', 'Username is required').isLength({min: 5}),
    check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()], (req, res) => {
    
    // Check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    let hashedPassword = Users.hashPassword(req.body.password);
    Users.findOneAndUpdate({ username : req.params.username }, 
    { $set : 
     {
        name: req.body.name, 
        username: req.body.username,
        password : hashedPassword,
        email : req.body.email,
        birthday : req.body.birthday
     }},
    { new : true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
        if(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        } else {
            res.json(updatedUser)
        }
    })
});

// POST request that allows a user to add a movie to list of FAVOURITES
app.post('/users/:username/movies/:movieID', passport.authenticate('jwt', { session : false }), function(req, res) {
    Users.findOneAndUpdate({ username : req.params.username },
        {
            $push : { favouriteMovies : req.params.movieID }
        },
    { new : true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
        if (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        } else {
            res.json(updatedUser)
        }
    })
});

// DELETE request to remove a movie from a users favourite list
app.delete('/users/:username/movies/:movieID', passport.authenticate('jwt', { session : false}), function(req, res) {
    Users.findOneAndUpdate({ username : req.params.username },
        {
            $pull : { favouriteMovies : req.params.movieID }
        },
    { new : true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
        if (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        } else {
            res.json(updatedUser)
        }
    });
});

// DELETE request to remove a USER by USERNAME
app.delete('/users/:username', passport.authenticate('jwt', { session : false }), function(req, res) {
    Users.findOneAndRemove({ username : req.params.username })
    .then(function(user) {
        if (!user) {
            res.status(400).send(req.params.username = " was not found");
        } else {
            res.status(200).send(req.params.username + " was deleted");
        }
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

// Error handler function
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listening for requests
let port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
    console.log("Listening on Port 3000");
});