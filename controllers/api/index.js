const router = require("express").Router();
const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");
// const holidayRoutes = require("./holidayRoutes");

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
// router.use("/holidays", holidayRoutes);

module.exports = router;
