const router = require('express').Router();
const { User, Movie } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', withAuth, (req, res) => {
  res.render('dashboard')
})

module.exports = router;
