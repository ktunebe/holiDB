const movieSearchField = document.getElementById('movieSearchField')
const movieSearchForm = document.getElementById('movieSearchForm')

// Search for movie title from search bar
async function handleSearch(e) {
  e.preventDefault()

  const title = movieSearchField.value

  try {
      const results = await fetch(`/movies/search/${title}`);

      movieSearchField.value = '';

      window.location.href = `/movies/search/${title}`;

  } catch (error) {
    console.log('Error finding movies: ', error);
  }
}

// Event listener for movie search
movieSearchForm.addEventListener('submit', handleSearch)

