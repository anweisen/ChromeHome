
// Keeps track of if you are currently saving, to support the animation
let inSaving = false;

function save() {

	if (inSaving) return;
	inSaving = true;

	const name = document.getElementById("greeting-name").value;
	const githubName = document.getElementById("github-name").value;
	const token = document.getElementById("github-token").value;
	const auth = document.getElementById("upload-auth").value;
	const route = document.getElementById("upload-route").value;
	const proxy = document.getElementById("upload-proxy").value;
	const jokes = document.getElementById("jokes").textContent;

	console.log(name.length)
	if (name.length === 0) {
		callback("failed settings");
		visualFeedback(true, "failing");
		setTimeout(function() {
			visualFeedback(false, "failing");
			inSaving = false;
		}, 1750);
		return;
	}

	callback("saving settings");

	chrome.storage.sync.set({
		name: name,
		githubName: githubName,
		githubToken: token,
		uploadAuth: auth,
		uploadProxy: proxy,
		uploadRoute: route,
		jokes: jokes
	}, function() {
		callback("saved settings");
		visualFeedback(true, "saving");
		setTimeout(function() {
			visualFeedback(false, "saving");
			inSaving = false;
		}, 1750);
	});
}

function load() {

	chrome.storage.sync.get(["name", "githubName", "githubToken", "uploadAuth", "uploadProxy", "uploadRoute", "jokes"], data => {
		document.getElementById("greeting-name").value = data.name || "";
		document.getElementById("github-name").value = data.githubName || "";
		document.getElementById("github-token").value = data.githubToken || "";
		document.getElementById("upload-route").value = data.uploadRoute || "";
		document.getElementById("upload-proxy").value = data.uploadProxy || "";
		document.getElementById("upload-auth").value = data.uploadAuth || "";
		document.getElementById("jokes").textContent = data.jokes || "Disabled";
		callback("settings loaded");
	});

}
function visualFeedback(save, state) {

	const bars = document.getElementsByClassName("bar");

	if (save) {
		for (let bar of bars) {
			bar.classList.add(state);
		}
	} else {
		for (let bar of bars) {
			bar.classList.remove(state);
		}
	}

}

load();
window.addEventListener("keyup", event => {
	if (event.keyCode !== 13) return;
	event.preventDefault();
	save();
});

for (var item of document.getElementsByClassName('form-bool')) {
	if (item.textContent == "Enabled") {
		item.classList.add("triggered");
	}
	item.addEventListener("click", event => {
		if (item.textContent == "Enabled") {
			item.textContent = "Disabled";
			item.classList.remove("triggered");
		} else if (item.textContent == "Disabled"){
			item.textContent = "Enabled";
			item.classList.add("triggered");
		} else {
			item.textContent = "Disabled";
		}
		save();
	});
}
