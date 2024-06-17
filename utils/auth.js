// Check that user is logged in, send them to login page if not
const withAuth = (req, res, next) => {
	if (!req.session.logged_in) {
		res.redirect("/login");
	} else {
		next();
	}
};

module.exports = withAuth;
