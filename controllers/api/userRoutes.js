const router = require("express").Router();
const { User } = require("../../models");

/* ------------ LOG IN  --------------------------------------------- */
router.post("/login", async (req, res) => {
	try {
    // Find user associated with entered email
		const userData = await User.findOne({ where: { email: req.body.email } });
    // No user data handler
		if (!userData) {
			res
				.status(400)
				.json({ message: "Incorrect email or password, please try again" });
			return;
		}
    // Check for correct password
		const validPassword = await userData.checkPassword(req.body.password);
    // Incorrect password handler
		if (!validPassword) {
			res
				.status(400)
				.json({ message: "Incorrect email or password, please try again" });
			return;
		}
    // Save session as logged in under entered user
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData, message: "You are now logged in!" });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

/* ------------ CREATE USER -------------------------------------- */
router.post("/", async (req, res) => {
	try {
    // Create User using entered name, email and password
		const userData = await User.create(req.body);
    // Save session as logged in once user is created
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

/* ------------ LOG OUT -------------------------------------------- */
router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
