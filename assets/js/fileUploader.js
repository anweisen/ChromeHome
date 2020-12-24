let proxy;
let route;
let auth;

function loadFileUploader() {
	chrome.storage.sync.get(["uploadAuth", "uploadProxy", "uploadRoute"], data => {
		auth = data.uploadAuth;
		route = data.uploadRoute;
		proxy = data.uploadProxy;
	});
}

loadFileUploader();
const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', (event) => {
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', (event) => {
	event.stopPropagation();
	event.preventDefault();
	const fileList = event.dataTransfer.files;
	if (!fileList || fileList.length === 0) return
	handleFile(fileList[0]);
});

function handleFile(file) {

	callback(`uploading file '${file.name}'`);

	const formData = new FormData();
	formData.append("file", file);

	fetch(proxy + route, {
		method: "POST",
		body: formData,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Cross-Origin-Resource-Policy": "cross-origin",
			"Content-Disposition": "attachment",
			"Authorization": `Bearer ${auth}`
		}
	})
		.catch(console.log)
	    .then(data => {
		    data.json().then(async json => {
		    	if (data.status !== 200) return console.log(json);
		    	const path = json.fileUrl;
		    	callback(`uploaded file '${json.fileName}' to ${path}`);
				await navigator.clipboard.writeText(path);
				display(path, json.fileName);
		    });
	});
}

function display(path, filename) {
	createPopup("upload-popup", [filename], [path]);
}
