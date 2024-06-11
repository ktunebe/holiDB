// Select all Add Movie buttons in TMBD movie list
const addMovieButtons = document.querySelectorAll('.add-movie-button')

/* ---------------------------------------------------------------------------- */
// Function to make a POST request to add a movie from TMDB list to HoliDB_db by title
const addMovieByTitle = async (movieTitle) => {
  try {
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: movieTitle }),
    });
  } catch (error) {
    console.error('Error adding movie:', error);
  }
};
/* ---------------------------------------------------------------------------- */
// Event listener to add movie, reload window with movie in new list
addMovieButtons.forEach(function (button) {
  button.addEventListener('click', async (e) => {
    const movieTitle = e.target.value;
    console.log('Adding movie: ' + movieTitle);

    await addMovieByTitle(movieTitle);
    
    location.reload()
  });
});