import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, previous } = this.props;

    if (!movie) return null;

    return (

      <Card className="movieViewContainer" style={{ width: '75%' }}>
        {/* <Card.Img variant="top" src={movie.imagePath} /> */}
        <Card.Img className="movieViewImage" variant="top" src="http://via.placeholder.com/640x360" />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.year}</Card.Text>
          <Card.Text>Description: {movie.description}</Card.Text>
          <Card.Text>Run Time: {movie.length} minutes</Card.Text>
          <Card.Text>Genre: {movie.genre}</Card.Text>
          <Card.Text>Director: {movie.director}</Card.Text>
          <Button variant="outline-secondary" className="back-button" onClick={() => previous()}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}