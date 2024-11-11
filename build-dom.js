function createPreview(categoryName, data) {
	const category = document.getElementById(categoryName);
	if (category.childElementCount > 0) {
		const divider = document.createElement("div");
		divider.id = "h-div";
		category.appendChild(divider);
	}
	const temp = document.getElementById("app-preview-template").content.cloneNode(true);
	const container = temp.getElementById("app-preview-container");
	const link = container.querySelector("#app-page-link");
	link.alt = link.title = data.name;
	link.href = "?page=" + data.id;
	link.onclick = (e) => switchPage(e, data.id);
	const img = link.querySelector("#app-icon");
	img.src = data.icon;
	img.alt = data.name;
	if (!data.icon)
		img.parentElement.removeChild(img);
	link.querySelector("#app-name").appendChild(document.createTextNode(data.name));
	addFormatText(container.querySelector("#app-info"), data.info);
	category.appendChild(temp);
}

function addFormatText(element, text) {
	for (const part of text) {
		if (typeof part == "string")
			element.appendChild(document.createTextNode(part));
		else if (part.type == "br")
			element.appendChild(document.createElement("br"));
		else if (part.type == "a") {
			const link = document.createElement("a");
			link.href = part.href;
			link.alt = part.alt;
			link.appendChild(document.createTextNode(part.text));
			element.appendChild(link);
		}
		else
			console.error("Unsupported type: ", part.type);
	}
}

function createAppPage(data) {
	const temp = document.getElementById("app-page-template").content.cloneNode(true);
	const container = temp.getElementById("app-page-container");
	const icon = container.querySelector("#app-icon");
	icon.src = data.icon;
	icon.alt = data.name;
	if (!data.icon)
		icon.parentElement.removeChild(icon);
	container.querySelector("#app-name").appendChild(document.createTextNode(data.name));
	addFormatText(container.querySelector("#app-info"), data.info);
	const slideshow = container.querySelector("#slideshow");
	if (!data.images || data.images.length == 0)
		slideshow.style.display = "none";
	else {
		slideshow.style.display = "block";
		let count = 1;
		for (image of data.images) {
			const slide = document.getElementById("slide-template").content.cloneNode(true);
			slide.querySelector("#img").src = image;
			slide.querySelector("#numbertext").appendChild(document.createTextNode(count + " / " + data.images.length));
			if (count == 1) {
				slide.getElementById("slide").style.display = "block";
			}
			slideshow.appendChild(slide);
			count++;
		}
	}
	addFormatText(container.querySelector("#app-description"), data.description);
	for (const dl of data.download) {
		const link = document.createElement("a");
		link.href = dl.src;
		link.appendChild(document.createTextNode(dl.name));
		link.appendChild(document.createElement("br"));
		container.querySelector("#app-downloads").appendChild(link);
	}
	const repo = container.querySelector("#app-repository");
	repo.href = data.project;
	const repoIcon = repo.querySelector("#app-repo-icon");
	repoIcon.alt += data.name;
	repoIcon.title += data.name;
	const appPage = document.createElement("div");
	appPage.id = "page-" + data.id;
	appPage.appendChild(temp);
	pageContainer = document.getElementById("page-container");
	pageContainer.appendChild(appPage);
}

window.addEventListener("popstate", function(event) { showPage(); });

function build(category, data) {
	try {
		createPreview(category, data);
		createAppPage(data);
	} catch (e) {
		console.error(e);
		console.log(category, ":", data);
	}
}
document.addEventListener("DOMContentLoaded", () => {
	for (const d of appData) build("Applications", d);
	for (const d of toolData) build("Tools", d);
	for (const d of libData) build("Libraries", d);
	showTheme();
	showPage();
});
