import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
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

      <Card className="movie-view-container" style={{ width: '75%' }} >
        {/* <Card.Img variant="top" src={movie.imagePath} /> */}
        < Card.Img className="movie-view-image" variant="top" src="http://via.placeholder.com/640x360" />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.year}</Card.Text>
          <Card.Text>Description: {movie.description}</Card.Text>
          <Card.Text>Run Time: {movie.length} minutes</Card.Text>
          <Card.Text>Genre:
            <Link to={`/genres/${movie.genre}`}>
              <Button className="genre-link-button" variant="link">{movie.genre}</Button>
            </Link>
          </Card.Text>
          <Card.Text>Director:
            <Link to={`/directors/${movie.director}`}>
              <Button className="director-link-button" variant="link">{movie.director}</Button>
            </Link>
          </Card.Text>
          <Button onClick={(event) => this.addToFaveList(event)}>Add movie to favourites</Button>
          <Link to={`/`}>
            <Button variant="outline-secondary" className="back-button">Back</Button>
          </Link>
        </Card.Body>
      </Card >
    );
  }
}