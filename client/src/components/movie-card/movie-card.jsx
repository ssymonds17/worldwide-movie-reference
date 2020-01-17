import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is the 'MainView', as 'MainView' is what's
    // connected to my database via the movies endpoint of my API
    const { movie, onClick } = this.props;

    return (
      <Card className="movieCardContainer" style={{ minWidth: '12rem' }}>
        {/* <Card.Img variant="top" src={movie.imagePath} /> */}
        <Card.Img variant="top" src="http://via.placeholder.com/640x360" />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Button onClick={() => onClick(movie)} variant="outline-primary link">Open</Button>
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
  onClick: PropTypes.func.isRequired
};