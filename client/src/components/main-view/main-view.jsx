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
    // console.log(authData);
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

  //Get Genres request function add HERE

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  render() {
    // If the state isn't initialised, this will throw on runtime
    // Before the data is initially loaded
    const { userInfo } = this.props;
    const { user, movies } = this.state;

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
              return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} />
            }} />
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.director === match.params).director} />
            }} />
            <Route path="/users/:username" render={() => <ProfileView user={user} userInfo={userInfo} movies={movies} />} />
            <Route path="/update/:username" render={() => <ProfileUpdate userInfo={userInfo} user={user} token={token} updateUser={data => this.updateUser(data)} />} />
          </div>
        </Container>
      </Router>
    );
  }
}