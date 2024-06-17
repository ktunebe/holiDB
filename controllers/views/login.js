const router = require("express").Router();

// `/login` endpoint

/* ------------------ LOG IN PAGE --------------------------------------------- */
router.get("/", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/");
		return;
	}

	res.render("login");
});

module.exports = router;
