const express = require('express'), 
    morgan = require('morgan');
const app = express();

// List of top movies
let topMovies = [ {
    title: 'Die Hard',
    lead: 'Bruce Willis', 
    genre: 'action'
},
{
    title: 'Toy Story',
    lead: 'Tom Hanks',
    genre: 'animation'
},
{
    title: 'The Matrix',
    lead: 'Keanu Reeves',
    genre: 'sci-fi'
},
{
    title: 'Home Alone',
    lead: 'Macaulay Culkin',
    genre: 'family'
},
{
    title: 'Happy Gilmore',
    lead: 'Adam Sandler',
    genre: 'comedy'
},
{
    title: 'The Shining',
    lead: 'Jack Nicholson',
    genre: 'horror'
},
{
    title: 'The Big Sleep',
    lead: 'Humphrey Bogart',
    genre: 'crime'
},
{
    title: 'Psycho',
    lead: 'Janet Leigh',
    genre: 'thriller'
},
{
    title: 'Lawrence of Arabia',
    lead: 'Peter O\'Toole',
    genre: 'historical'
},
{
    title: 'Apocalypse Now',
    lead: 'Martin Sheen',
    genre: 'war'
},
]

// Morgan middleware that logs server requests
app.use(morgan('common'));

// Exposes files from public folder in static form
app.use(express.static('public'));

// Error handler function
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// GET requests
app.get('/', function(req, res) {
    res.send('Welcome to my cinema club');
});

//The code below works to deliver the documentation.html
// file. However the recommended express.static('public') is not working

// app.get('/documentation', function(req,res) {
//     res.sendFile('public/documentation.html', { root: __dirname });
// });

app.get('/movies', function(req, res) {
    res.json(topMovies)
});

// Listening for requests
app.listen(8080, () => 
console.log('Your app is listening on port 8080.')
);