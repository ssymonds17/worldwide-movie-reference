import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './genre-view.scss';

import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { genre } = this.props;

    return (
      <Card className="genre-info" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className="genre-name">{genre.name}</Card.Title>
          <Card.Text>Description: {genre.description}</Card.Text>
          <div>
            <Link to={`/`}>
              <Button variant="outline-secondary" className="back-button">Back</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

