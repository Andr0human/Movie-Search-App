import MovieCard from "./MovieCard";

function MovieList({ movies, onMovieSelect }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={() => onMovieSelect(movie)}
        />
      ))}
    </div>
  );
}

export default MovieList;
