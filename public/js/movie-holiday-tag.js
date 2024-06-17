// On page load
document.addEventListener("DOMContentLoaded", () => {
	const themeDropdown = document.getElementById("themeDropdown");
  // Check for theme dropdown menu
	if (themeDropdown) {
		themeDropdown.addEventListener("click", async (event) => {
			event.preventDefault();
			const target = event.target;
      // Get data attributes from target
			if (target.tagName === "A") {
				const holidayId = target.getAttribute("data-id");
				const movieId = target.getAttribute("data-movie-id");
        // Fetch api route to create HolidayMovie object
				try {
					const response = await fetch("/api/create-relation", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							movie_id: movieId,
							holiday_id: holidayId,
							association_score: 10,
						}),
					});

					if (response.ok) {
						const result = await response.json();
						window.location.reload();
					} else {
						alert("Failed to tag the holiday.");
					}
				} catch (error) {
					console.error("Error:", error);
				}
			}
		});
	}
  // Delete button on each tag
	document.querySelectorAll(".delete-tag-btn").forEach((button) => {
		button.addEventListener("click", async (event) => {
			event.preventDefault();
			const movieId = button.getAttribute("data-movie-id");
			const holidayId = button.getAttribute("data-holiday-id");

			// Confirm delete
			const confirmed = window.confirm(
				"Are you sure you want to delete this holiday tag?"
			);
			// If the user cancels, don't delete the tag
			if (!confirmed) {
				return;
			}
      // Fetch api route to delete HolidayMovie object
			try {
				const response = await fetch(
					`/api/create-relation/${movieId}/${holidayId}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					window.location.reload();
				} else {
					alert("Failed to delete the holiday tag.");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		});
	});
});
