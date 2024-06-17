const router = require("express").Router();
const { HolidayMovie } = require("../../models");

/* -------- CREATE HOLIDAY-MOVIE RELATIONSHIP ------------------------- */
router.post("/", async (req, res) => {
	try {
		const newHolidayMovie = await HolidayMovie.create({
			...req.body,
		});

		res.status(200).json(newHolidayMovie);
	} catch (err) {
		res.status(400).json(err);
	}
});

/* -------- DELETE HOLIDAY-MOVIE RELATIONSHIP ------------------------- */
router.delete("/:movie_id/:holiday_id", async (req, res) => {
	try {
		const holidayMovieData = await HolidayMovie.destroy({
			where: {
				movie_id: req.params.movie_id,
				holiday_id: req.params.holiday_id,
			},
		});

		if (!holidayMovieData) {
			res.status(404).json({
				message: "No user-holiday-movie relation found with this id!",
			});
			return;
		}

		res.status(200).json(holidayMovieData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
