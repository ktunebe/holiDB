const router = require("express").Router();
const { Movie, Holiday, HolidayMovie } = require("../../models");
const { Op, Sequelize } = require("sequelize");

// `/` endpoint

/* ---------------- RENDER HOMEPAGE ------------------------------------ */
router.get("/", async (req, res) => {
	try {
		const today = new Date();
		const month = today.getMonth() + 1; // getMonth() is zero-based
		const day = today.getDate();

		// Month and Day are always 2 digits
		const todayWithoutYear = `${month < 10 ? "0" + month : month}-${
			day < 10 ? "0" + day : day
		}`;

		console.log(`Today's date (MM-DD): ${todayWithoutYear}`);

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
		} catch (err) {
			console.error("Error finding next holiday:", err);
		}

		// Get movies associated with upcoming holiday
		let associatedMovies = [];

		try {
			console.log(
				`\n\nNext holiday: ${JSON.stringify(nextHoliday, null, 2)}\n\n`
			);
			if (nextHoliday) {
				const holidayMovies = await HolidayMovie.findAll({
					where: {
						holiday_id: nextHoliday.id,
					},
					attributes: ["movie_id"],
				});
				const movieIds = holidayMovies.map(
					(uhm) => uhm.get({ plain: true }).movie_id
				);

				const movieData = await Movie.findAll({
					where: {
						id: {
							[Op.in]: movieIds,
						},
					},
				});

				associatedMovies = movieData.map((movie) => movie.get({ plain: true }));
			}
		} catch (err) {
			console.error("Error finding associated movies:", err);
		}

		// Render homepage, passing in the holiday, associated movies, and user data
		res.render("homepage", {
			associatedMovies,
			nextHoliday,
			logged_in: req.session.logged_in,
			session_user: req.session.user_id,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
