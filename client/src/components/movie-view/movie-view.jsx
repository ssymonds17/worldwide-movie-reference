import React from 'react';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, previous } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">

        <img className="movie-poster" src={movie.imagepath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>

        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.genre}</span>
        </div>

        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.director}</span>
        </div>

        <button className="back-button" onClick={() => previous()}>Back</button>

      </div>
    );
  }
}