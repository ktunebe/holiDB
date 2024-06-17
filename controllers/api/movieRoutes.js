const router = require("express").Router();
const { Movie } = require("../../models");
const { addMovieByTitle } = require("../../utils/movieDb");

/* ---------------------------- ADD MOVIE BY TITLE------------------------------------------------ */
router.post("/", async (req, res) => {
	const { title, id } = req.body;

	if (!title && !id) {
		res
			.status(406)
			.json({ message: "Bad request - Movie title or TMDB ID required." });
	}

	if (!id || id === "") {
		const movieDataFromTitle = await addMovieByTitle(title);
		req.body.id = JSON.parse(movieDataFromTitle).id;
		req.body.title = JSON.parse(movieDataFromTitle).title;
		req.body.overview = JSON.parse(movieDataFromTitle).overview;
		req.body.poster_path = JSON.parse(movieDataFromTitle).poster_path;
	}

	try {
		const newMovie = await Movie.create({
			...req.body,
			user_id: req.session.user_id || 1,
		});

		res.status(200).json(newMovie);
	} catch (err) {
		res.status(400).json(err);
	}
});

/* ---------------------------- DELETE MOVIE BY ID------------------------------------------------ */
router.delete("/:id", async (req, res) => {
	try {
		const movieData = await Movie.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!movieData) {
			res.status(404).json({ message: "No movie found with this id!" });
			return;
		}

		res.status(200).json(movieData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
