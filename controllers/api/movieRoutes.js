const router = require("express").Router();
const { Movie } = require("../../models");
const findMovieByTitle = require("../../utils/movieDb");

router.post("/", async (req, res) => {
  console.log(`Movie post route hit - data: ${JSON.stringify(req.body)}`);

  const { title, tmdb_id } = req.body;

  if (!title && !tmdb_id) {
    res
      .status(406)
      .json({ message: "Bad request - Movie title or TMDB ID required." });
  }

  if (!tmdb_id || tmdb_id === "") {
    const movieDataFromTitle = await findMovieByTitle(title);
    req.body.tmdb_id = JSON.parse(movieDataFromTitle).tmdb_id;
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

router.delete("/:id", async (req, res) => {
  console.log(`Movie delete route hit - movie ID: ${req.params.id}`);

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
