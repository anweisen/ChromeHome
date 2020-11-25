
// Keeps track of if you are currently saving, to support the animation
let inSaving = false;

function save() {

	if (inSaving) return;
	inSaving = true;

	const name = document.getElementById("greeting-name").value;
	const githubName = document.getElementById("github-name").value;
	const token = document.getElementById("github-token").value;

	callback("saving settings");

	chrome.storage.sync.set({
		name: name,
		githubName: githubName,
		githubToken: token
	}, function() {
		callback("saved settings");
		visualFeedback(true);
		setTimeout(function() {
			visualFeedback(false);
			inSaving = false;
		}, 1300);
	});
}

function load() {

	chrome.storage.sync.get(["name", "githubName", "githubToken"], data => {
		document.getElementById("greeting-name").value = data.name || "";
		document.getElementById("github-name").value = data.githubName || "";
		document.getElementById("github-token").value = data.githubToken || "";
		callback("settings loaded");
	});

}

function visualFeedback(save) {

	const bars = document.getElementsByClassName("bar");

	if (save) {
		for (let bar of bars) {
			bar.classList.add("saving");
		}
	} else {
		for (let bar of bars) {
			bar.classList.remove("saving");
		}
	}

}


load();
for (let element of document.getElementsByClassName("form-field")) {
	element.addEventListener("keyup", event => {
		if (event.keyCode !== 13) return;
		event.preventDefault();
		save();
	});
}

