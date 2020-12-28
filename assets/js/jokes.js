
function updateJoke() {
	const request = new XMLHttpRequest()
	request.open("GET", "https://icanhazdadjoke.com")
	request.setRequestHeader("Accept", "application/json")

	request.onload = function() {
		const joke = JSON.parse(request.responseText).joke;
		document.getElementById("joke").innerHTML = joke;
		callback(`changed joke to '${joke}'`);
	};

	request.send();
}

function loadJokes() {

	chrome.storage.sync.get("jokes", data => {
		if (data.jokes) {
			setInterval(updateJoke, 60*1000);
			updateJoke();
		} else {
			document.getElementById("joke-content").style.display = "none";
		}
	});

}
