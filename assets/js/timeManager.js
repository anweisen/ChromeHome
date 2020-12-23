
function hourOfDay() {
	return new Date().getHours();
}

function currentGreeting() {
	const hour = hourOfDay();
	switch (hour) {
		default:
		case 22:
		case 23:
		case 24:
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
			return "good night";
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
			return "good morning";
		case 11:
		case 12:
		case 13:
			return "good noon";
		case 14:
		case 15:
		case 16:
		case 17:
			return "good afternoon";
		case 18:
		case 19:
		case 20:
		case 21:
			return "good evening";
	}
}

function currentDay(date) {
	switch (date.getDay()) {
		case 1:
			return "monday";
		case 2:
			return "tuesday";
		case 3:
			return "wednesday";
		case 4:
			return "thursday";
		case 5:
			return "friday";
		case 6:
			return "saturday";
		case 7:
		case 0: // sunday is 0 not 7!
			return "sunday";
	}
}
