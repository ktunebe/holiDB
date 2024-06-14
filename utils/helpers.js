module.exports = {
	/* ---------------------------------------------------------------------------- */
	// Helper to omit movies that are already in one list from appearing in another
	no_dupes: function (omittedItem, movieList) {
		const movieTitles = new Set(
			movieList.map((movie) => movie.title.toLowerCase())
		);
		return !movieTitles.has(omittedItem.toLowerCase());
	},
	/* ---------------------------------------------------------------------------- */
	// Format date helper
	format_date: function (date) {
		const options = { month: '2-digit', day: '2-digit' }; // Format without the year
		const formattedDate = date.toLocaleDateString(undefined, options);
		return formattedDate;
	},
	/* ---------------------------------------------------------------------------- */
	// Get theme from holiday name
	get_theme: (name) => name.split(' ')[0].toLowerCase(),
	/* ---------------------------------------------------------------------------- */
};
