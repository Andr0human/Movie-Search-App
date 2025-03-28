import { useState, useEffect } from 'react';
import axios from 'axios';

function MovieDetail({ movie, onClose }) {
  const [details, setDetails] = useState(movie);

  const { Year, Rated, Runtime, Genre, Director, Actors, Plot, Ratings } = details;

  useEffect(() => {
    if (!movie.Director || !movie.Plot) {
      const fetchDetails = async () => {
        try {
          const response = await axios.get(
            `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${movie.imdbID}`
          );
          setDetails(response.data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };
      fetchDetails();
    }
  }, [movie]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="detail-content">
        <img 
          src={details.Poster !== 'N/A' ? details.Poster : 'https://via.placeholder.com/300x450'} 
          alt={details.Title} 
        />
        <div className="detail-info">
          <h2>{details.Title}</h2>
          <p><strong>Year:</strong> {Year}</p>
          <p><strong>Rating:</strong> {Rated}</p>
          <p><strong>Runtime:</strong> {Runtime}</p>
          <p><strong>Genre:</strong> {Genre}</p>
          <p><strong>Director:</strong> {Director}</p>
          <p><strong>Actors:</strong> {Actors}</p>
          <p><strong>Plot:</strong> {Plot}</p>
          {Ratings && (
            <div className="ratings">
              <h3>Ratings:</h3>
              {Ratings.map((rating, index) => (
                <p key={index}><strong>{rating.Source}:</strong> {rating.Value}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail; 