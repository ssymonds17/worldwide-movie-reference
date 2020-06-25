/**
 * @requires react
 * @requires react-redux
 * @requires propTypes
 * @requires react-bootstrap/Button
 * @requires react-bootstrap/Media
 * @requires react-router-dom
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';
import './genre-view.scss';

import { Link } from 'react-router-dom';

/**
 * Genre information of movie
 * @function GenreView
 * @param {object} props - Genre information
 * @returns {GenreView}
 */

export class GenreView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { genre } = this.props;

    return (
      <div className="genre-view-container mt-5">
        <h1>{genre.name}</h1>
        <Media className="d-flex flex-column flex-md-row align-items-center mt-5">
          <Media.Body className="mb-4">
            <h5>Description</h5>
            <p>{genre.description}</p>
          </Media.Body>
        </Media>
        <div>
          <Link to={`/`}>
            <Button variant="outline-secondary" className="back-button">Back</Button>
          </Link>
        </div>
      </div>
    );
  }
}



GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(({ movies }) => ({ movies }))(GenreView);