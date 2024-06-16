const router = require("express").Router();
const { Movie, Holiday, HolidayMovie } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op, Sequelize } = require("sequelize");
const { MovieDb } = require("moviedb-promise");
const moviedb = new MovieDb(process.env.API_KEY);

// `/movies` endpoint

/* ---------------- ALL MOVIES PAGE --------------------------------- */
router.get("/", withAuth, async (req, res) => {
  try {
    const movieData = await Movie.findAll({
      include: [
        {
          model: HolidayMovie,
          include: [
            {
              model: Holiday,
            },
          ],
          order: [["association_score", "DESC"]],
        },
      ],
    });

    const movies = movieData.map((movie) => movie.get({ plain: true }));

    res.render("movies", {
      movies,
      logged_in: req.session.logged_in,
      session_user: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* -------------- INDIVIDUAL MOVIE PAGE---------------------------------------------- */

router.get("/:id", withAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const movieData = await Movie.findByPk(id);

    const allHolidayData = await Holiday.findAll();

    const taggedHolidayMovieData = await HolidayMovie.findAll({
      where: {
        movie_id: id,
      },
      attributes: ["holiday_id"],
    });
    const taggedHolidayIds = taggedHolidayMovieData.map(
      (uhm) => uhm.get({ plain: true }).holiday_id
    );

    const taggedHolidayData = await Holiday.findAll({
      where: {
        id: {
          [Op.in]: taggedHolidayIds,
        },
      },
      attributes: ["name", "id"],
    });

    const allHolidays = allHolidayData.map((holiday) =>
      holiday.get({ plain: true })
    );
    const taggedHolidays = taggedHolidayData.map((holiday) =>
      holiday.get({ plain: true })
    );
    const movie = movieData.get({ plain: true });

    // Fetch trailers for the movie using TMDB API
    const tmdbId = movie.id; // Assuming you have the TMDB ID stored in your movie model
    const trailersRes = await moviedb.movieVideos(tmdbId);
    const trailers = trailersRes.results
      .filter((video) => video.type === "Trailer" && video.site === "YouTube")
      .map((video) => `https://www.youtube.com/embed/${video.key}`);

    movie.trailers = trailers;

    res.render("single-movie", {
      movie,
      taggedHolidays,
      allHolidays,
      logged_in: req.session.logged_in,
      session_user: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting movie.");
  }
});

module.exports = router;
