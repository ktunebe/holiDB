document.addEventListener('DOMContentLoaded', () => {
    const themeDropdown = document.getElementById('themeDropdown');
    
    if (themeDropdown) {
      themeDropdown.addEventListener('click', async (event) => {
        event.preventDefault();
        const target = event.target;
        
        if (target.tagName === 'A') {
          const holidayId = target.getAttribute('data-id');
          const movieId = target.getAttribute('data-movie-id');
  
          try {
            const response = await fetch('/api/create-relation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                movie_id: movieId,
                holiday_id: holidayId,
                association_score: 10
              })
            });
  
            if (response.ok) {
              const result = await response.json();
              window.location.reload();
              }
             else {
              alert('Failed to tag the holiday.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      });
    }

    document.querySelectorAll('.delete-tag-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
          event.preventDefault();
          const movieId = button.getAttribute('data-movie-id');
          const holidayId = button.getAttribute('data-holiday-id');
    
          try {
            const response = await fetch(`/api/create-relation/${movieId}/${holidayId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
    
            if (response.ok) {
              window.location.reload();
            } else {
              alert('Failed to delete the holiday tag.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        });
      });
    });
  
  