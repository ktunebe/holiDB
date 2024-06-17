// Update countdown timer every second until the next holiday is reached
document.addEventListener("DOMContentLoaded", () => {
	const holidayDate = new Date(document.getElementById("holidayDate").value);
	const countdownElement = document.getElementById("countdown");

	// Update the year of the holiday date to the current year if it's in the past
	const now = new Date();
	const currentYear = now.getFullYear();
	holidayDate.setFullYear(currentYear);

	// If the holiday has already passed this year, set it to the next year
	if (holidayDate < now) {
		holidayDate.setFullYear(currentYear + 1);
	}

	function updateCountdown() {
		const now = new Date();
		const timeDifference = holidayDate - now;

		if (timeDifference <= 0) {
			countdownElement.textContent = "It's here!";
			return;
		}

		// Formatting countdown timer text
		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor(
			(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
		);
		const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

		countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}

	// Setting interval to update every second
	setInterval(updateCountdown, 1000);

	// Initial call to display countdown immediately
	updateCountdown();
});
