module.exports = {
  /* ---------------------------------------------------------------------------- */
  // Helper to omit movies that are already in one list from appearing in another
  no_dupes: function (omittedItem, movieList) {
    const movieTitles = new Set(movieList.map(movie => movie.title.toLowerCase()));
    return !movieTitles.has(omittedItem.toLowerCase());
  },
  /* ---------------------------------------------------------------------------- */
  // Format date helper
  format_date: function(date) {
    // const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDay()

    return `${month}/${day}`
  },
  /* ---------------------------------------------------------------------------- */
  // Get theme from holiday name
  get_theme: (name) => name.split(' ')[0].toLowerCase(),
  /* ---------------------------------------------------------------------------- */
  }


