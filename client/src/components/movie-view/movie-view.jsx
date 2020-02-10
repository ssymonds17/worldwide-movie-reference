import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addToFaveList(event) {
    const { movie } = this.props;
    const token = localStorage.getItem('token');
    event.preventDefault();
    axios.post(`https://worldwide-movie-reference.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
      Username: localStorage.getItem('user')
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(token);
        alert('Movie has been added to list of favourites');
      })
      .catch(error => {
        console.log('error adding movie to list');
        alert('Something went wrong');
      });
  };

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view-container mt-5">
        <h1>{movie.title}</h1>
        <h6>{movie.year}</h6>
        <Media className="d-flex flex-column flex-md-row align-items-center">
          <Media.Body className="mb-4">

            <h5>Genre:&nbsp;
          <Link to={`/genres/${movie.genre.name}`}>{movie.genre.name}</Link>
            </h5>
            <h5>Director:&nbsp;
          <Link to={`/directors/${movie.director.name}`}>{movie.director.name}</Link>
            </h5>
            <br />
            <h5>Summary</h5>
            <p>{movie.description}</p>
            <br />
            <Button onClick={(event) => this.addToFaveList(event)}>Add movie to favourites</Button>
            <br />
          </Media.Body>
          <img
            width={220}
            height={326}
            className="ml-3"
            src={movie.imagePath}
            alt="Movie poster"
          />
        </Media>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthYear: PropTypes.string,
      deathYear: PropTypes.string
    })
  }).isRequired
};

export default connect(({ movies }) => ({ movies }))(MovieView);