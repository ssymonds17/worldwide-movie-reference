import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is the 'MainView', as 'MainView' is what's
    // connected to my database via the movies endpoint of my API
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">{movie.title}</div>
    );
  }
}