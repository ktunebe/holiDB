const router = require("express").Router();

const homeView = require("./home");
const searchView = require("./search");
const moviesView = require("./movies");
const holidaysView = require("./holidays");
const loginView = require("./login");

router.use("/", homeView);
router.use("/search", searchView);
router.use("/movies", moviesView);
router.use("/holidays", holidaysView);
router.use("/login", loginView);

module.exports = router;
