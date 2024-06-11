const router = require('express').Router();
const { User, Movie, Holiday } = require('../models');
const withAuth = require('../utils/auth');
const { findMoviesByTitlePortion, findMovieByTitle } = require("../utils/movieDb");

/* ---------------- RENDER HOMEPAGE ------------------------------------ */
// Getting all movies right now, will change what is actually displayed
router.get('/', async (req, res) => {
  try {
    const movieData = await Movie.findAll();

    const movies = movieData.map((movie) => movie.get({ plain: true }));

    res.render('homepage', {
      movies,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ------------------ LOG IN PAGE --------------------------------------------- */
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

/* ---------------- GO TO USER DASHBOARD --------------------------------- */
// Currently getting all movies
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const movieData = await Movie.findAll();

    const movies = movieData.map((movie) => movie.get({ plain: true }));

    res.render('dashboard', {
      movies,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

/* ----- SEARCH MOVIES BY TITLE, RENDER RESULTS PAGE -------------------------- */
router.get('/movies/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const matchedTmdbMovies = await findMoviesByTitlePortion(title);
    const holiDbMovieData = await Movie.findAll();

    const matchedHoliDbMovieData = holiDbMovieData.filter((result) =>
      result.title.toLowerCase().includes(title.toLowerCase())
    )
    const matchedHoliDbMovies = matchedHoliDbMovieData.map((movie) => movie.get({ plain: true }));

    res.render('search-results', {
      matchedTmdbMovies,
      matchedHoliDbMovies,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching movies' });
  }
});

/* ---------------- ALL HOLIDAYS PAGE --------------------------------- */
// Get all holidays
router.get('/holidays', withAuth, async (req, res) => {
  try {
    const holidayData = await Holiday.findAll();

    const holidays = holidayData.map((holiday) => holiday.get({ plain: true }));

    res.render('holidays', {
      holidays,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;
