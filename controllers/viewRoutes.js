const router = require("express").Router();
const { User, Movie, Holiday, HolidayMovie } = require("../models");
const withAuth = require("../utils/auth");
const {findMoviesByTitlePortion} = require("../utils/movieDb");
const { Op, Sequelize } = require("sequelize");

/* ---------------- RENDER HOMEPAGE ------------------------------------ */
// Getting all movies right now, will change what is actually displayed
router.get("/", async (req, res) => {
  try {
    const movieData = await Movie.findAll();

    const movies = movieData.map((movie) => movie.get({ plain: true }));

    // Define the current date without the year
    const today = new Date();
    const todayWithoutYear = `${today.getMonth() + 1}-${today.getDate()}`;

    // Find the next holiday ignoring the year
    let nextHoliday = null;
    try {
      nextHoliday = await Holiday.findOne({
        where: Sequelize.where(
          Sequelize.fn("to_char", Sequelize.col("date"), "MM-DD"),
          {
            [Op.gt]: todayWithoutYear,
          }
        ),
        order: [
          [Sequelize.fn("to_char", Sequelize.col("date"), "MM-DD"), "ASC"],
        ],
      });

      if (!nextHoliday) {
        // If no future holidays this year, get the first holiday of next year
        nextHoliday = await Holiday.findOne({
          order: [
            [Sequelize.fn("to_char", Sequelize.col("date"), "MM-DD"), "ASC"],
          ],
        });
      }

      if (nextHoliday) {
        nextHoliday = nextHoliday.get({ plain: true });
      }

      console.log(
        `\n\nNext holiday: ${JSON.stringify(nextHoliday, null, 2)}\n\n`
      );
    } catch (err) {
      console.error("Error finding next holiday:", err);
    }

    res.render("homepage", {
      movies,
      nextHoliday,
      logged_in: req.session.logged_in,
      session_user: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ------------------ LOG IN PAGE --------------------------------------------- */
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

/* ---------------- GO TO USER DASHBOARD --------------------------------- */
// Currently getting all movies
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const movieData = await Movie.findAll();

    const movies = movieData.map((movie) => movie.get({ plain: true }));

    res.render("dashboard", {
      movies,
      logged_in: req.session.logged_in,
      session_user: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ----- SEARCH MOVIES BY TITLE, RENDER RESULTS PAGE -------------------------- */
router.get("/movies/search/:title", async (req, res) => {
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

/* ---------------- ALL HOLIDAYS PAGE --------------------------------- */
// Get all holidays
router.get("/holidays", withAuth, async (req, res) => {
  try {
    // // Get all public holidays
    // const publicHolidayData = await Holiday.findAll({
    //   where: {
    //     public: true,
    //   },
    // });
    // // Get all of user's created holidays
    // const myHolidayData = await Holiday.findAll({
    //   where: {
    //     user_id: req.session.user_id,
    //   },
    // });

    // // Get plain data for each
    // const publicHolidays = publicHolidayData.map((holiday) =>
    //   holiday.get({ plain: true })
    // );
    // const myHolidays = myHolidayData.map((holiday) =>
    //   holiday.get({ plain: true })
    // );

    const holidayData = await Holiday.findAll()

    const holidays = holidayData.map((holiday) => holiday.get({ plain: true }))

    res.render("holidays", {
      // publicHolidays,
      // myHolidays,
      holidays,
      logged_in: req.session.logged_in,
      session_user: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* -------------- INDIVIDUAL HOLIDAY PAGE---------------------------------------------- */

router.get("/holidays/:id", withAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const holidayData = await Holiday.findByPk(id);

    const holidayMovieData = await HolidayMovie.findAll({
      where: {
        holiday_id: id,
      },
      attributes: ["movie_id"],
    });
    const movieIds = holidayMovieData.map(
      (holidayMovie) => holidayMovie.get({ plain: true }).movie_id
    );
    console.log(movieIds);

    const movieData = await Movie.findAll({
      where: {
        id: {
          [Op.in]: movieIds,
        },
      },
    });

    const movies = movieData.map((movie) => movie.get({ plain: true }));

    const holiday = holidayData.get({ plain: true });
    console.log(holiday);
    res.render("single-holiday", {
      holiday,
      movies,
      logged_in: req.session.logged_in,
      session_user: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting holiday.");
  }
});

/* -------------- INDIVIDUAL MOVIE PAGE---------------------------------------------- */

router.get("/movies/:id", withAuth, async (req, res) => {
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
    console.log(taggedHolidayIds);

    const taggedHolidayData = await Holiday.findAll({
      where: {
        id: {
          [Op.in]: taggedHolidayIds,
        },
      },
      attributes: ["name", "id"],
    });

    const allHolidays = allHolidayData.map((holiday) => holiday.get({ plain: true }))
    const taggedHolidays = taggedHolidayData.map((holiday) => holiday.get({ plain: true }));
    const movie = movieData.get({ plain: true });

    console.log(movie);
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
