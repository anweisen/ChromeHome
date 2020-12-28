
try {
	particlesJS.load("particles-js", "../assets/conf/particle.conf.json", function() {
		callback("particles.js config loaded");
	});
} catch (err) {
	// Thrown when particle.js was not loaded
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


loadWinter();   // Load winter assets like snowflakes from winter.js
loadJokes();    // Load jokes from jokes.js


function load(id) {
	const elements = document.getElementsByClassName(`loader-${id}`);
	for (let element of elements) {
		element.classList.remove("loading");
	}
	//callback(`removed loader ${id}`);
}
for (let i = 1; i <= 25; i++) {
	setTimeout(function () {
		load(i);
	}, i * 100);
}



function updateTime() {
	const date = new Date();
	document.getElementById("clock-day").innerHTML = currentDay(date);
	document.getElementById("clock-hour").innerHTML = formatNumber(date.getHours());
	document.getElementById("clock-minute").innerHTML = formatNumber(date.getMinutes());
	document.getElementById("clock-second").innerHTML = formatNumber(date.getSeconds());
	document.getElementById("clock-day-of-month").innerHTML = date.getDate() + "";
}
setInterval(updateTime, 100);
updateTime();


setInterval(refreshGit, 30*1000);
refreshGit();
