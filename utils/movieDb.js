require("dotenv").config();

// Using TMDB's node package
const { MovieDb } = require("moviedb-promise");
const moviedb = new MovieDb(process.env.API_KEY);

/* ---------------------------------------------------------------------------- */
// Get data for new Movie object using title from TMDB search
const addMovieByTitle = async (movieTitle) => {
	try {
		const res = await moviedb.searchMovie({ query: movieTitle });
		const results = res.results;
		const movie = results.find(
			(result) => result.title.toLowerCase() === movieTitle.toLowerCase()
		);
    // Check that linked movie clicked has data
		if (movie) {
			const { id, title, overview, poster_path } = movie;
			const baseURL = "https://image.tmdb.org/t/p/";
			const size = "w92";
			const fullPosterURL = `${baseURL}${size}${poster_path}`;
			const movieDetails = {
				id,
				title,
				overview,
				poster_path: fullPosterURL,
			};
			const movieData = {
				...movieDetails,
			};

			return JSON.stringify(movieData);
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

/* ---------------------------------------------------------------------------- */
// Find a list of movies with titles that contain whatever is searched
const findMoviesByTitlePortion = async (movieTitle) => {
	try {
    // Check for any movie with title that contains the search input
		const res = await moviedb.searchMovie({ query: movieTitle });
		const results = res.results;
		const matchingMovies = results
			.filter((result) =>
				result.title.toLowerCase().includes(movieTitle.toLowerCase())
			)
			.filter((result) => !result.adult); // Exclude adult movies;

		if (matchingMovies.length > 0) {
			const baseURL = "https://image.tmdb.org/t/p/";
			const size = "w92";

      // Get needed data to render
			const movieDetailsArray = matchingMovies.map((movie) => {
				const { id, title, overview, poster_path, popularity } = movie;
				const fullPosterURL = `${baseURL}${size}${poster_path}`;
				return {
					id,
					title,
					overview,
					poster_path: fullPosterURL,
					user_id: 1,
					popularity,
				};
			});

			return movieDetailsArray;
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

module.exports = { addMovieByTitle, findMoviesByTitlePortion };
