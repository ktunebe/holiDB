const router = require("express").Router();
const { HolidayMovie } = require("../../models");

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

router.delete("/:id", async (req, res) => {
  try {
    const holidayMovieData = await HolidayMovie.destroy({
      where: {
        id: req.params.id,
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
