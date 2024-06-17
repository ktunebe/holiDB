document.addEventListener("DOMContentLoaded", (event) => {
	const modal = document.getElementById("my_modal_1");
	const form = document.getElementById("holidayForm");

	// Check if modal and form elements exist
	if (!modal || !form) {
		return;
	}

	window.closeModal = function () {
		modal.close();
	};

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		const holidayName = document.getElementById("holidayName").value;
		const holidayDescription =
			document.getElementById("holidayDescription").value;
		const holidayDateInput = document.getElementById("holidayDate").value;
		holidayDateUTC = new Date(holidayDateInput)
		const holidayDate = holidayDateUTC.setHours(holidayDateUTC.getHours() + 6);

		// Prepare data to send
		const formData = {
			name: holidayName,
			description: holidayDescription,
			date: holidayDate,
		};

		// Send data to server using fetch
		fetch("/api/holidays", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		//  close the modal
		closeModal();

		// Reset the form
		form.reset();
	});
});

window.deleteHoliday = function (id) {
	fetch(`/api/holidays/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			// Reload the page after deletion
			window.location.reload();
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};
