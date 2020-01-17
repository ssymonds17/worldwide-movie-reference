import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import MyNavbar from "../navbar/navbar";

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialise it
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://worldwide-movie-reference.herokuapp.com/movies')
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

  //Click to go to movie view
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // Back button to return to list of movie cards
  onClose = () => {
    this.setState({
      selectedMovie: null
    });
  }

  // Signed in user state
  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }

  // Registering state
  onRegister() {
    this.setState({
      register: true,
      user: null
    });
  }

  // Existing user not yet signed in
  onYetToSignIn() {
    this.setState({
      register: false,
      user: null
    });
  }



  render() {
    // If the state isn't initialised, this will throw on runtime
    // Before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && register === false) return <LoginView onClick={() => this.onRegister()} onLoggedIn={user => this.onLoggedIn(user)} />

    if (register) return <RegistrationView onClick={() => this.onYetToSignIn()} onSignedIn={user => this.onSignedIn(user)} />

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <MyNavbar />
        <Container>
          <Row>
            {selectedMovie
              ? <MovieView movie={selectedMovie} previous={this.onClose} />
              : movies.map(movie => (
                <Col key={movie._id} xs={12} sm={6} md={4}>
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>
    );
  }
}