const express = require('express'), 
    morgan = require('morgan'), 
    bodyParser = require('body-parser'),
    uuid = require('uuid'), 
    app = express();

// Utilising body-parser module
app.use(bodyParser.json());

// Morgan middleware that logs server requests
app.use(morgan('common'));

// Exposes files from public folder in static form
app.use(express.static('public'));

// In-memory list of movies
let Movies = [ 
{
    "title": "Die Hard",
    "length": 132,
    "year": 1988,
    "description": "An NYPD officer tries to save his wife and \
several others taken hostage by German terrorists during a \
Christmas party at the Nakatomi Plaza in Los Angeles.", 
    "genre": "Action",
    "director": "John McTiernan",
    "imageUrl": "die_hard.png"
},
{
    "title": "Home Alone",
    "length": 103,
    "year": 1990,
    "description": "An eight-year-old troublemaker must protect his \
house from a pair of burglars when he is accidentally left home \
alone by his family during Christmas vacation.", 
    "genre": "Comedy",
    "director": "Chris Columbus",
    "imageUrl": "home_alone.png"
},
{
    "title": "Apocalypse Now",
    "length": 196,
    "year": 1979,
    "description": "A U.S. Army officer serving in Vietnam is tasked \
with assassinating a renegade Special Forces Colonel who sees \
himself as a god.", 
    "genre": "War",
    "director": "Francis Ford Coppola",
    "imageUrl": "apocalypse_now.png"
},    
{
    "title": "Blade Runner",
    "length": 117,
    "year": 1982,
    "description": "A blade runner must pursue and terminate four \
replicants who stole a ship in space, and have returned to Earth \
to find their creator.", 
    "genre": "Sci-Fi",
    "director": "Ridley Scott",
    "imageUrl": "blade_runner.png"
},    
{
    "title": "The Lion King",
    "length": 88,
    "year": 1994,
    "description": "A Lion cub crown prince is tricked by a treacherous uncle \
into thinking he caused his father\'s death and flees into exile in despair, \
only to learn in adulthood his identity and his responsibilities.", 
    "genre": "Animation",
    "director": {
        1: "Roger Allers",
        2: "Rob Minkoff"
    },
    "imageUrl": "lion_king.png"
},
{
    "title": "Raiders of the Lost Ark",
    "length": 115,
    "year": 1981,
    "description": "In 1936, archaeologist and adventurer Indiana Jones is hired by \
the U.S. government to find the Ark of the Covenant before Adolf Hitler\'s Nazis \
can obtain its awesome powers.", 
    "genre": "Adventure",
    "director": "Steven Spielberg",
    "imageUrl": "raiders_lost_ark.png"
},
{
    "title": "The Big Sleep",
    "length": 114,
    "year": 1946,
    "description": "Private detective Philip Marlowe is hired by a rich family. Before the \
complex case is over, he\'s seen murder, blackmail, and what might be love.", 
    "genre": "Crime",
    "director": "Howard Hawks",
    "imageUrl": "big_sleep.png"
},
{
    "title": "Lawrence of Arabia",
    "length": 202,
    "year": 1962,
    "description": "The story of T.E. Lawrence, the English officer who successfully united and \
led the diverse, often warring, Arab tribes during World War I in order to fight the Turks.", 
    "genre": "Historical",
    "director": "David Lean",
    "imageUrl": "lawrence_arabia.png"
},
{
    "title": "The Shining",
    "length": 146,
    "year": 1980,
    "description": "A family heads to an isolated hotel for the winter where a sinister presence \
influences the father into violence, while his psychic son sees horrific forebodings from both \
past and future.", 
    "genre": "Horror",
    "director": "Stanley Kubrick",
    "imageUrl": "shining.png"
},
{
    "title": "Rear Window",
    "length": 112,
    "year": 1954,
    "description": "A wheelchair-bound photographer spies on his neighbors from his apartment window \
and becomes convinced one of them has committed murder.", 
    "genre": "Thriller",
    "director": "Alfred Hitchcock",
    "imageUrl": "rear_window.png"
},
]

// In-memory array of genres
let Genres = [
    {
      "name": "Action",
      "description": "Action film is a film genre in which the protagonist or protagonists are thrust \
into a series of events that typically include violence, extended fighting, physical feats, and frantic chases."
    }
]

let Directors = [
    {
      "name": "Alfred Hitchcock",
      "bio": "Sir Alfred Joseph Hitchcock, KBE was an English film director and producer, widely regarded as one of \
the most influential and extensively studied filmmakers in the history of cinema. His films are marked by a macabre \
sense of humour and a somewhat bleak view of the human condition.",
      "year of birth": 1899,
      "year of death": 1980    
    }
]

// In-memory array of all users
let = Users = [
    {
      "username": "harrylarry1962",
      "password": "easytoguesspassword123",
      "email": "harrylarry62@aol.com",
      "date of birth": "1962-08-08",
      "favourites": {
          "title": "Rear Window"
      } 
  }
]

// In-memory array of favourite movies
let Favourites = [
    {
        "title": "Rear Window",
        "length": 112,
        "year": 1954,
        "description": "A wheelchair-bound photographer spies on his neighbors from his apartment window \
    and becomes convinced one of them has committed murder.", 
        "genre": "Thriller",
        "director": "Alfred Hitchcock",
        "imageUrl": "rear_window.png"
    }
]

// GET request to return a list of ALL movies
app.get('/movies', (req, res) => {
    res.json(Movies);
});

// GET request to return data about a movie by title
app.get('/movies/:title', (req, res) => {
    res.json(Movies.find((movie) => {
        return movie.title === req.params.title
    }));
});

// GET request to return data about a genre by name
app.get('/genres/:name', (req, res) => {
    res.json(Genres.find((genre) => {
        return genre.name === req.params.name
    }));
});

// GET request to return data about a director by name
app.get('/directors/:name', (req, res) => {
    res.json(Directors.find((director) => {
        return director.name === req.params.name
    }));
});

// POST request to allow new users to register
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!newUser.username || !newUser.password) {
        const message = 'Username and/or password is missing';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        Users.push(newUser);
        res.status(201).send(newUser);
    }
}); 

// PUT request to allow users to update information
app.put('/users/:username', (req, res) => {
    res.status(201).send("Information has been updated.")
});

// POST request to allow users to add movies to their favourite lists
app.post('/users/:username/favourites', (req, res) => {
    let newFaveMovie = req.body;

    if (!newFaveMovie.title) {
        const message = 'Movie title is missing';
        res.status(400).send(message);
    } else {
        newFaveMovie.id = uuid.v4();
        Favourites.push(newFaveMovie);
        res.status(201).send(newFaveMovie);
    }
});

// DELETE request to remove a movie from a users favourite list
app.delete('users/:username/favourites/:title', (req, res) => {
    // let favourite = Favourites.find((favourite) => {
    //     return favourite.title === req.params.title
    // });

    // if (favourite) {
    //     Favourites.filter(function(obj) { return obj.title !== req.params.title });
    //     res.status(201).send(req.params.title + " has been removed.")
    // }
    res.send("Movie has been removed from favourites list.");
});

// DELETE request to remove a user from the application by ID
app.delete('/users/:username', (req, res) => {
    let user = Users.find((user) => {
        return user.username === req.params.username
    });

    if (user) {
        Users.filter(function(obj) { return obj.username !== req.params.username });
        res.status(201).send(req.params.username + " has been deleted.")
    }
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