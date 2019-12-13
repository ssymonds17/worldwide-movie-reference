const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    Title : { type: String, required: true},
    Year: String,
    Description : { type: String, required: true},
    Genre : {
        Name : String,
        Description: String
    },
    Director : {
        Name :  String,
        Bio : String
    },
    Actors : [String],
    Length: Number,
    ImagePath : String,
    Featured : Boolean
});

var userSchema = mongoose.Schema({
    name : String,
    username : { type: String, required: true},
    password : { type: String, required: true},
    email: { type: String, required: true},
    birthday : Date,
    favouriteMovies : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;