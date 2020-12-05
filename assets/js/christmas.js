
function loadChristmas() {

	const snowFlakes = 200;
	const container = document.getElementById("snow-content");
	for (let i = 0; i < snowFlakes; i++) {
		const node = document.createElement("div");
		node.classList.add("snow");
		container.append(node);
	}

}
