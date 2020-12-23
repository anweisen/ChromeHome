
function createPopup(name, text, url) {

	callback(`creating popup "${name}" with text=${text} url=${url}`);

	const template = document.getElementById("templates").getElementsByClassName(name)[0];
	if (!template) return warn(`no such template "${name}"`);

	const container = document.getElementById("popup-content");
	const popupExists = container.childElementCount > 0;
	removeCurrentPopup();

	const clone = container.appendChild(template.cloneNode(true));
	setAttributes(clone, text, url);

	// Fading in after 25ms / 1s
	setTimeout(() => {
		clone.classList.add("displayed");
	}, popupExists ? 1000 : 25);

	// Fading out after 7500ms
	setTimeout(() => {
		deletePopup(clone);
	}, 7500);

}

function deletePopup(popup) {

	if (!popup) return;
	callback(`deleting popup`);

	// Instant fading out
	// Removing after 2.5s
	console.log(removeClassList(popup, "displayed"));
	setTimeout(() => {
		removeElement(popup);
	}, 2500);

}

function removeCurrentPopup() {

	const container = document.getElementById("popup-content");

	const popup = container.firstChild;
	deletePopup(popup);

}

function setAttributes(element, text, url) {

	const textElements = element.getElementsByClassName("popup-text");
	const urlElements = element.getElementsByClassName("popup-url");
	for (let i = 0; i < text.length && i < textElements.length; i++) {
		textElements[i].textContent = text[i];
	}
	for (let i = 0; i < url.length && i < urlElements.length; i++) {
		urlElements[i].href = url[i];
	}

}
