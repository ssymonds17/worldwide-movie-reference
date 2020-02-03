import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../profile-view/profile-update';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialise it
    super();

    this.state = {
      movies: [],
      user: null,
      directors: [],
      genres: []
    };
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    this.setState({
      user: null
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  getUser(token) {
    axios.get(`https://worldwide-movie-reference.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          userInfo: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMovies(token) {
    axios.get('https://worldwide-movie-reference.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Get Directors request function add HERE
  getDirectors(token) {
    axios.get('https://worldwide-movie-reference.herokuapp.com/directors', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          directors: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Get Genres request function add HERE
  getGenres(token) {
    axios.get('https://worldwide-movie-reference.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          genres: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
      this.getDirectors(accessToken);
      this.getGenres(accessToken);
    }
  }

  filteredMovie = (movies, directors, genres, id) => {
    let movie = movies.find(movie => movie._id === id);
    const director = directors.find(director => director.name === movie.director);
    const genre = genres.find(genre => genre.name === movie.genre);
    movie.genreDetails = genre;
    movie.directorDetails = director;
    return movie;
  }

  render() {
    // If the state isn't initialised, this will throw on runtime
    // Before the data is initially loaded
    // const {} = this.props;
    const { user, movies, userInfo, genres, directors } = this.state;

    let movie
    // Before the movies have been loaded
    // if (!movies) return <div className="main-view" />;
    if (movies.length > 0 && directors.length > 0 && genres.length > 0 && this.props.match) {

      movie = movies.find(movie => movie._id === match.params.movieId);
      const director = directors.find(director => director.name === movie.director);
      movie.directorDetails = director;
      const genre = genres.find(genre => genre.name === movie.genre);
      movie.genreDetails = genre;
    }

    return (
      <Router>
        <Container className="main-view">
          <div>
            <Link to={`/`}>
              <Button className="home-button">Home</Button>
            </Link>
            <Button className="logout-button" onClick={() => this.onLoggedOut()}>Log Out</Button>
            <Link to={`/users/${user}`}>
              <Button className="profile-button">Profile</Button>
            </Link>
          </div>
          <div>
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => <MovieCard key={m._id} movie={m} />)
            }
            } />
            <Route exact path="/register" render={() => <RegistrationView />} />
            <Route exact path="/movies/:movieId" render={({ match }) => {
              return <MovieView movie={this.filteredMovie(movies, directors, genres, match.params.movieId)} />
            }
            } />
            <Route path="/genres/:name" render={({ match }) => {
              if (!genres) return <div className="main-view" />;
              return <GenreView genre={genres.filter(genre => genre.name == match.params.name)} movies={movies} />
            }}
            />
            <Route path="/directors/:name" render={({ match }) => {
              if (!directors) return <div className="main-view" />;
              return <DirectorView director={directors.filter(director => director.name == match.params.name)} movies={movies} />
            }
            } />
            <Route path="/users/:username" render={() => <ProfileView user={user} userInfo={userInfo} movies={movies} />} />
            <Route path="/update/:username" render={() => <UpdateView user={user} userInfo={userInfo} />} />
          </div>
        </Container>
      </Router>
    );
  }
}