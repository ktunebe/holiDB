document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById('my_modal_1');
    const form = document.getElementById('holidayForm');
  
    // Check if modal and form elements exist
    if (!modal || !form) {
      console.error('Modal or form element not found');
      return;
    }
  
    window.closeModal = function() {
      modal.close();
    };
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const holidayName = document.getElementById('holidayName').value;
      const holidayDescription = document.getElementById('holidayDescription').value;
      const holidayDate = document.getElementById('holidayDate').value;
  
      // Log form data
      console.log('Holiday Name:', holidayName);
      console.log('Holiday Date:', holidayDate)
      console.log('Holiday Description:', holidayDescription);

      // Prepare data to send
    const formData = {
        name: holidayName,
        description: holidayDescription,
        date: holidayDate
      };
  
      // Send data to server using fetch
      fetch('/api/holidays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Optionally, do something with the response data if needed
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
     
  
      //  close the modal
      closeModal();
  
      // Reset the form
      form.reset();
    });
  });

  window.deleteHoliday = function(id) {
    fetch(`/api/holidays/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Delete Success:', data);
      // Remove the holiday entry from the DOM
      const holidayElement = document.getElementById(`holiday-${id}`);
      if (holidayElement) {
        holidayElement.remove();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  
  