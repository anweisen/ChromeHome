
function callback(message) {
	console.log("callback - " + message);
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
