import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

import { Link } from "react-router-dom";

const descriptionMaxChars = 100;

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    let movieDescription = movie.description;
    if (movieDescription.length > descriptionMaxChars) {
      movieDescription = `${movieDescription.substring(0, descriptionMaxChars)}...`;
    }

    return (
      <Card className="movie-card-container" style={{ maxWidth: '13rem', minWidth: '13rem' }}>
        <Card.Img
          className="movie-image"
          width={220}
          height={326}
          variant="top"
          src={movie.imagePath}
        />
        <Card.Body className="movie-card-body">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movieDescription}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="more-button" variant="link outline-primary">More</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired,
};

export default connect(({ movies }) => ({ movies }))(MovieCard);