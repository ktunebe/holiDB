const router = require("express").Router();
const { User, Movie, Holiday, HolidayMovie } = require("../../models");
const withAuth = require("../../utils/auth");
const { findMoviesByTitlePortion } = require("../../utils/movieDb");
const { Op, Sequelize } = require("sequelize");

// `/search` endoint

/* ----- SEARCH MOVIES BY TITLE, RENDER RESULTS PAGE -------------------------- */
router.get("/:title", withAuth, async (req, res) => {
  const title = req.params.title;
  try {
    const matchedTmdbMovies = await findMoviesByTitlePortion(title);
    const holiDbMovieData = await Movie.findAll();

    const matchedHoliDbMovieData = holiDbMovieData.filter((result) =>
      result.title.toLowerCase().includes(title.toLowerCase())
    );

    const matchedHoliDbMovies = matchedHoliDbMovieData.map((movie) =>
      movie.get({ plain: true })
    );

    res.render("search-results", {
      matchedTmdbMovies,
      matchedHoliDbMovies,
      logged_in: req.session.logged_in,
      session_user: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching movies" });
  }
});

module.exports = router