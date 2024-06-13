require('dotenv').config();

const { MovieDb } = require('moviedb-promise');
const moviedb = new MovieDb(process.env.API_KEY);

const addMovieByTitle = async (movieTitle) => {
  try {
    const res = await moviedb.searchMovie({ query: movieTitle });
    const results = res.results;
    const movie = results.find(
      (result) => result.title.toLowerCase() === movieTitle.toLowerCase()
    );

    if (movie) {
      const { id, title, overview, poster_path } = movie;
      const baseURL = 'https://image.tmdb.org/t/p/';
      const size = 'w92';
      const fullPosterURL = `${baseURL}${size}${poster_path}`;
      const movieDetails = {
        id,
        title,
        overview,
        poster_path: fullPosterURL,
      };
      const movieData = {
        ...movieDetails,
        user_id: 1,
      };

      return JSON.stringify(movieData);
    } else {
      console.log('Movie not found');
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const findMoviesByTitlePortion = async (movieTitle) => {
  try {
    const res = await moviedb.searchMovie({ query: movieTitle });
    const results = res.results;
    const matchingMovies = results
      .filter((result) =>
        result.title.toLowerCase().includes(movieTitle.toLowerCase())
      )
      .filter((result) => !result.adult);  // Exclude adult movies;

    if (matchingMovies.length > 0) {
      const baseURL = 'https://image.tmdb.org/t/p/';
      const size = 'w92';

      const movieDetailsArray = matchingMovies.map((movie) => {
        const { id, title, overview, poster_path, popularity } = movie;
        const fullPosterURL = `${baseURL}${size}${poster_path}`;
        return {
          id,
          title,
          overview,
          poster_path: fullPosterURL,
          user_id: 1,
          popularity
        };
      });

      return movieDetailsArray;
    } else {
      console.log('No movies found');
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addMovieByTitle, findMoviesByTitlePortion }