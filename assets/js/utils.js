
function callback(message) {
	console.log("callback - " + message);
}
function warn(message) {
	console.log("error - " + message);
}

function isToday(date) {
	const today = new Date()
	return date.getDate() === today.getDate() &&
		   date.getMonth() === today.getMonth() &&
		   date.getFullYear() === today.getFullYear()
}

function closeCurrentTab(callback) {
	chrome.tabs.getCurrent(function(tab) {
		chrome.tabs.remove(tab.id, callback);
	});
}

function createNewTab(callback) {
	chrome.tabs.create(null, callback);
}
function randomLetters(length) {

	const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";

	for (let i = 0; i < length; i++ ) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return result;

}

function removeElement(element) {
	try {
		element.remove();
		return true;
	} catch (err) {
		return false;
	}
}
function removeClass(element, classname) {
	try {
		element.classList.remove(classname);
		return true;
	} catch (err) {
		return false;
	}
}
