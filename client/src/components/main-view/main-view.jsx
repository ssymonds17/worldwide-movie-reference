import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

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

  render() {
    // If the state isn't initialised, this will throw on runtime
    // Before the data is initially loaded
    // const {} = this.props;
    const { user, movies, userInfo, genres, directors } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

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
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
            <Route path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <GenreView genre={genres.find(movie => movie.genre === match.params.name).genre} />
            }} />
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView director={directors.find(movie => movie.director === match.params.name).director} movies={movies} />
            }} />
            <Route path="/users/:username" render={() => <ProfileView user={user} userInfo={userInfo} movies={movies} />} />
            <Route path="/update/:username" render={() => <UpdateView user={user} userInfo={userInfo} />} />
          </div>
        </Container>
      </Router>
    );
  }
}