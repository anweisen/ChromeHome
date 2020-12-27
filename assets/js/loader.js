
try {
	particlesJS.load("particles-js", "../assets/conf/particle.conf.json", function() {
		callback("particles.js config loaded");
	});
} catch (err) {
	// Check if particle.js was loaded
}

loadWinter();

function loadName() {
	chrome.storage.sync.get("name", data => {
		document.getElementById("name").innerHTML = data.name;
	});
}
loadName();

function updateGreeting() {

	const greeting = currentGreeting();
	document.getElementById("greeting").innerHTML = greeting;
	callback(`changed greeting to '${greeting}'`);



}
setInterval(updateGreeting, 60*1000);
updateGreeting();

function updateJoke() {
	request = new XMLHttpRequest()
	request.open("GET", "https://icanhazdadjoke.com")
	request.setRequestHeader("Accept", "application/json")

	request.onload = function() {
		joke = JSON.parse(request.responseText).joke;
		document.getElementById("joke").innerHTML = joke;
		callback(`changed joke to '${joke}'`);
	};

	request.send();
}

chrome.storage.sync.get("jokes", data => {
	if (data.jokes == "Enabled") {
		setInterval(updateJoke, 60*1000);
		updateJoke();
	} else {
		document.getElementById("joke-content").classList.add("hidden");
	}
});

loadWinter();

function load(id) {
	const elements = document.getElementsByClassName("loader-" + id);
	for (let element of elements) {
		element.classList.remove("loading");
	}
	//callback(`removed loader ${id}`);
}
function startLoading() {
	for (let i = 1; i <= 25; i++) {
		setTimeout(function () {
			load(i);
		}, i * 100);
	}
}
startLoading();


function format(number) {
	return number >= 10 ? "" + number : "0" + number;
}
function updateTime() {
	const date = new Date();
	document.getElementById("clock-day").innerHTML = currentDay(date);
	document.getElementById("clock-hour").innerHTML = format(date.getHours());
	document.getElementById("clock-minute").innerHTML = format(date.getMinutes());
	document.getElementById("clock-second").innerHTML = format(date.getSeconds());
	document.getElementById("clock-day-of-month").innerHTML = date.getDate() + "";
}
setInterval(updateTime, 100);
updateTime();


setInterval(refreshGit, 30*1000);
refreshGit();
