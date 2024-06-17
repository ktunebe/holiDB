module.exports = {
	/* ---------------------------------------------------------------------------- */
	// Helper to omit movies that are already in one list from appearing in another
	no_movie_dupes: function (omittedItem, movieList) {
		const movieTitles = new Set(
			movieList.map((movie) => movie.title.toLowerCase())
		);
		return !movieTitles.has(omittedItem.toLowerCase());
	},

	no_holiday_dupes: function (omittedItem, holidayList) {
		const holidayTitles = new Set(
			holidayList.map((holiday) => holiday.name.toLowerCase())
		);
		return !holidayTitles.has(omittedItem.toLowerCase());
	},
	/* ---------------------------------------------------------------------------- */
	// Format date helper
	format_date: function (date) {
		const options = { month: "2-digit", day: "2-digit" }; // Format without the year
		const formattedDate = date.toLocaleDateString(undefined, options);
		return formattedDate;
	},
	/* ---------------------------------------------------------------------------- */
	// Get theme from holiday name
	get_theme: (name) => {
		const holidayFirstSplit = name.toLowerCase().split(" day")[0].split("'")[0];
		if (holidayFirstSplit.split(" ")[1]) {
			return holidayFirstSplit.split(" ")[1];
		} else {
			return holidayFirstSplit;
		}
	},
	/* ---------------------------------------------------------------------------- */
};
