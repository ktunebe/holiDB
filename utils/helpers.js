module.exports = {
  /* ---------------------------------------------------------------------------- */
  // Helper to omit movies that are already in HoliDB from TMDB list on search
  not_in_holiDb: function (movieTitle, holiDbMovies) {
    const holiDbTitles = new Set(holiDbMovies.map(movie => movie.title.toLowerCase()));
    return !holiDbTitles.has(movieTitle.toLowerCase());
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


