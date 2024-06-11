const router = require("express").Router();
const { UserHolidayMovie } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newUserHolidayMovie = await UserHolidayMovie.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newUserHolidayMovie);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userHolidayMovieData = await UserHolidayMovie.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userHolidayMovieData) {
      res.status(404).json({
        message: "No user-holiday-movie relation found with this id!",
      });
      return;
    }

    res.status(200).json(userHolidayMovieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
