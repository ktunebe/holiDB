const router = require("express").Router();
const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");
const userHolidayMovieRoutes = require("./userHolidayMovieRoutes");
const holidayRoutes = require("./holidayRoutes");

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/holidays", holidayRoutes);
router.use("/create-relation", userHolidayMovieRoutes);

module.exports = router;
