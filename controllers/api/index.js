const router = require("express").Router();

const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");
const holidayMovieRoutes = require("./holidayMovieRoutes");
const holidayRoutes = require("./holidayRoutes");

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/holidays", holidayRoutes);
router.use("/create-relation", holidayMovieRoutes);

module.exports = router;
