
async function loadCredentials(callback) {
	chrome.storage.sync.get(["githubName", "githubToken"], function (data) {
		token = data.githubToken;
		user = data.githubName;
		callback();
	});
}

let token;
let user;

let commitsToday = 0;

async function countEvents(page) {

	const events = await fetchEvents(page);
	if (!events) return

	for (let event of events) {

		const eventDateString = event.created_at;
		const eventDate = new Date(eventDateString);

		const payload = event.payload.commits;

		if (isToday(eventDate)) {
			commitsToday += payload.length;
		} else {
			// Leaving loop, the event time line is sorted by the date
			// If a event is not from today, the events after that cannot be from today
			break;
		}
	}
}
async function fetchStats() {

	commitsToday = 0;

	let page = 1;
	while (true) {
		let before = commitsToday;
		await countEvents(page);
		if (before === commitsToday) break;
		page++;
	}

	callback(`fetched ${commitsToday} github commits (account: ${user}; ${page} page(s))`);

}

async function fetchEvents(page) {
	return get(`https://api.github.com/users/${user}/events?page=${page}`);
}
async function get(url) {
	return fetch(url, {
		method: "get",
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(data => data.json())
	  .catch(err => console.log(err));
}

async function refreshGit() {
	await loadCredentials(async () => {
		const element = document.getElementById("commit-info");
		if (user) {
			await fetchStats();
			element.innerHTML = message(commitsToday);
			element.href = `https://github.com/${user}`;
		} else {
			element.href = "#";
			element.parentElement.style.display = "none";
		}
	});
}

function message(commits) {
	if (commits <= 0) {
		return "you didn't commit today";
	} else if (commits <= 2) {
		// 1 - 2
		return `well, ${commits} ${commitWord(commits)} today`;
	} else if (commits <= 5) {
		// 2 - 5
		return `${commits} excellent ${commitWord(commits)} today`;
	} else {
		// 10 or more
		return `${commits} productive ${commitWord(commits)} today`;
	}
}
function commitWord(number) {
	return number === 1 ? "commit" : "commits";
}
