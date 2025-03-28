import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import "./App.css";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&t=${searchTerm}`
      );

      const data = response.data;
      if (data.Response === "True") {
        setMovies([data]);
        setSelectedMovie(data);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {selectedMovie ? (
            <MovieDetail
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          ) : (
            <MovieList movies={movies} onMovieSelect={setSelectedMovie} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
