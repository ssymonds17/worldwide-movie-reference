const express = require('express'), 
    morgan = require('morgan'), 
    bodyParser = require('body-parser'),
    uuid = require('uuid'), 
    app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const db = 'mongodb://localhost/wwMovieReferenceDB';
// Allows Mongoose access to my database
mongoose.connect('mongodb://localhost/wwMovieReferenceDB', {useNewUrlParser: true});

// Utilising body-parser module
app.use(bodyParser.json());

// Morgan middleware that logs server requests
app.use(morgan('common'));

// Exposes files from public folder in static form
app.use(express.static('public'));

// (OLD) GET request to return a list of ALL movies
app.get('/movies', (req, res) => {
    res.json(Movies);
});

// (OLD) GET request to return data about a movie by title
app.get('/movies/:title', (req, res) => {
    res.json(Movies.find((movie) => {
        return movie.title === req.params.title
    }));
});

// (OLD) GET request to return data about a genre by name
app.get('/genres/:name', (req, res) => {
    res.json(Genres.find((genre) => {
        return genre.name === req.params.name
    }));
});

// (OLD) GET request to return data about a director by name
app.get('/directors/:name', (req, res) => {
    res.json(Directors.find((director) => {
        return director.name === req.params.name
    }));
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
app.post('/users', function(req, res) {
    User.findOne({ Username : req.body.Username }).then(function(user) {
        if (user) {
            return res.status(400).send(req.body.Username + "already exists");
        } else {
            Users.create({
                // Need to figure out how to do Name: { first: "", last: "" } to match database data
                Name:  req.body.Name,
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
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
app.get('/users', function(req, res) {
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
app.get('/users/:Username', function(req, res) {
    Users.findOne({ Username : req.params.Username })
    .then(function(user) {
        res.json(user)
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

// PUT request that allows users to UPDATE info by USERNAME
/* Expects a JSON in this format
{
    Username: String, (required)
    Password: String, (required)
    Email: String, (required)
    Birthday: Date
}
*/
app.put('/users/:Username', function(req, res) {
    Users.findOneAndUpdate({ Username : req.params.Username }, 
    { $set : 
     {
        Username: req.body.Username,
        Password : req.body.Password,
        Email : req.body.Email,
        Birthday : req.body.Birthday
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
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
    Users.findOneAndUpdate({ Username : req.params.Username },
        {
            $push : { FavouriteMovies : req.params.MovieID }
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
app.delete('/users/:username/favourites/:title', (req, res) => {
    let favourite = Favourites.find((favourite) => {
        return favourite.title === req.params.title
    });

    if (favourite) {
        Favourites.filter(function(obj) { 
            return obj.title !== req.params.title 
        });
        res.status(201).send(req.params.title + " has been removed.")
    }
    // res.send("Movie has been removed from favourites list.");
});

// DELETE request to remove a USER by USERNAME
app.delete('/users/:Username', function(req, res) {
    Users.findOneAndRemove({ Username : req.params.Username })
    .then(function(user) {
        if (!user) {
            res.status(400).send(req.params.Username = " was not found");
        } else {
            res.status(200).send(req.params.Username + " was deleted");
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
app.listen(8080, () => 
console.log('Your app is listening on port 8080.')
);