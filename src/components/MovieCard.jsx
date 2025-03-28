function MovieCard({ movie, onClick }) {
  const { Title, Year, Poster, Director, Genre } = movie;
  return (
    <div className="movie-card" onClick={onClick}>
      <img
        src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x450"}
        alt={Title}
      />
      <div className="movie-info">
        <h3>{Title}</h3>
        <p>{Year}</p>
        <p>{Director}</p>
        <p>{Genre}</p>
      </div>
    </div>
  );
}

export default MovieCard;
