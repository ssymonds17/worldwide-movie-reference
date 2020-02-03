import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

//MoviesList not created yet
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../profile-view/profile-update';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialise it
    super();

    this.state = {
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
        this.props.setUser(response.data)
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
        this.props.setMovies(response.data);
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
    }
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Container className="main-view">
          <div>
            <Link to={`/`}>
              <Button className="home-button">Home</Button>
            </Link>
            <Button className="logout-button" onClick={() => this.onLoggedOut()}>Log Out</Button>
            <Link to={`/users/${user}`}>
              <Button className="profile-button">{user}</Button>
            </Link>
          </div>
          <div>
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <MoviesList movies={movies} />;
            }
            } />

            <Route exact path="/register" render={() => <RegistrationView />} />

            <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

            <Route path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} />
            }
            } />
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.director.name === match.params.name).director} />
            }
            } />

            <Route path="/users/:username" render={() => <ProfileView movies={movies} />} />

            <Route path="/update/:username" render={() => <UpdateView user={user} />} />
          </div>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);