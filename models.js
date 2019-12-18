const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    title : { type: String, required: true},
    year: String,
    description : { type: String, required: true},
    genre : {
        name : String,
        description: String
    },
    director : {
        name :  String,
        bio : String
    },
    actors : [String],
    length: Number,
    imagePath : String,
    featured : Boolean
});

var userSchema = mongoose.Schema({
    name : String,
    username : { type: String, required: true},
    password : { type: String, required: true},
    email: { type: String, required: true},
    birthday : Date,
    favouriteMovies : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

var directorSchema = mongoose.Schema({
    name: String,
    bio: String,
    birthYear: String,
    deathYear: String
});

var genreSchema = mongoose.Schema({
    name: String,
    description: String
});


var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);
var Director = mongoose.model('Director', userSchema);
var Genre = mongoose.model('Genre', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;