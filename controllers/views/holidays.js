const router = require('express').Router();
const { Movie, Holiday, HolidayMovie } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op, Sequelize } = require('sequelize');

// `/holidays` endpoint

/* ---------------- ALL HOLIDAYS PAGE --------------------------------- */
// Get all holidays
router.get('/', withAuth, async (req, res) => {
	try {
		const holidayData = await Holiday.findAll({
			include: [
				{
					model: HolidayMovie,
					include: [
						{
							model: Movie,
						},
					],
					order: [['association_score', 'DESC']],
				},
			],
			order: [['date', 'ASC']],
		});

		const holidays = holidayData.map((holiday) => holiday.get({ plain: true }));

		res.render('holidays', {
			holidays,
			logged_in: req.session.logged_in,
			session_user: req.session.user_id,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

/* -------------- INDIVIDUAL HOLIDAY PAGE---------------------------------------------- */

router.get('/:id', withAuth, async (req, res) => {
	const { id } = req.params;
	try {
		const holidayData = await Holiday.findByPk(id);
		const allMovieData = await Movie.findAll();
		const holidayMovieData = await HolidayMovie.findAll({
			where: {
				holiday_id: id,
			},
			attributes: ['movie_id'],
		});
		const movieIds = holidayMovieData.map(
			(holidayMovie) => holidayMovie.get({ plain: true }).movie_id
		);
		console.log(movieIds);

		const taggedMovieData = await Movie.findAll({
			where: {
				id: {
					[Op.in]: movieIds,
				},
			},
		});

		const taggedMovies = taggedMovieData.map((movie) =>
			movie.get({ plain: true })
		);
		const allMovies = allMovieData.map((movie) => movie.get({ plain: true }));
		const holiday = holidayData.get({ plain: true });

		console.log(holiday);
		res.render('single-holiday', {
			holiday,
			taggedMovies,
			allMovies,
			logged_in: req.session.logged_in,
			session_user: req.session.user_id,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send('Error getting holiday.');
	}
});

module.exports = router;
