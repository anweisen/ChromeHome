
function loadWinter() {

	const date = new Date();
	switch (date.getMonth()) {
		case 0:     // January
		case 1:     // February
		case 11:    // December
			createSnowFlakes();
	}

}

function createSnowFlakes() {

	const snowFlakes = 200;
	const container = document.getElementById("snow-content");
	for (let i = 0; i < snowFlakes; i++) {
		const node = document.createElement("div");
		node.classList.add("snow");
		container.append(node);
	}

}
