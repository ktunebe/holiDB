const router = require("express").Router();
const { User, Movie, Holiday, HolidayMovie } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op, Sequelize } = require("sequelize");

// `/login` endpoint

/* ------------------ LOG IN PAGE --------------------------------------------- */
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router