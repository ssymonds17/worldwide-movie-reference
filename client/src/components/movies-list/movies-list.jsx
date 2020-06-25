/**
 * @requires react
 * @requires react-redux
 * @requires react-bootstrap/Container
 * @requires react-bootstrap/Row
 * @requires react-bootstrap/Col
 * @requires MovieCard
 * @requires VisibilityFilterInput
 */

import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
 * Allows users to filter list of movies
 * @function MoviesList
 * @param {*} props 
 */
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    <Container>
      <Row>
        {filteredMovies.map(m => (
          <Col key={m._id} xs={6} sm={6} md={4} lg={3}>
            <MovieCard key={m._id} movie={m} />
          </Col>
        ))}
      </Row>
    </Container>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);