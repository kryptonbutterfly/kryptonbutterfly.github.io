function buildDescription(data, src) {
	if (!!data.description) return `<p>${data.description}</p>`;
	if (!data.desc_file) return "";
	const descFile = `pages/descriptions/${src}.html`;
	const xhr = new XMLHttpRequest();
	xhr.open("GET", descFile);
	xhr.onreadystatechange = function(){
		if (this.readyState !== XMLHttpRequest.DONE) return;
		switch (this.status) {
			case 200:
				const contents = document.querySelectorAll("div#content");
				for (const div of contents) {
					const srcAttr = div.getAttribute("src");
					if (srcAttr == src) {
						div.innerHTML = this.responseText;
						break;
					}
				}
				break;
			case 404: console.warn(`${descFile} not found!`); break;
			default: console.info(`Unhandled response status ${this.status}`);
		}
	}
	xhr.send();
	return `<div id="content" src="${src}"></div>`;
}

function buildSlideShow(images) {
	if (!images || images.length === 0) return "";
	let imgHTML = "";
	for (const img of images)
		imgHTML += `<img src="${img.src}" alt="${img.alt}" title="${img.title}" loading="lazy"/>`;
	return `<slides- class="dark">${imgHTML}</slides->`;
}

function buildDownloads(downloads) {
	if (!downloads || downloads.length === 0)	return "";
	let result = "";
	for (const dl of downloads)
		result += `\n<div class="dl"><a href="${dl.src}">${dl.name}<br></a></div>`
	return result;
}

function buildRepos(repos, data) {
	let result = "";
	let first = true;
	for (const repo of repos) {
		if (first)
			first = false;
		else
			result += "</br>";
		const name = repo.name ?? "";
		const title = `Github - kryptonbutterfly/${data.name} ${name}`
		result += `
			<a id="app-repo" href="${repo.src}">
				${name}
				<img class="dark" id="app-repo-icon" src="https://github.githubassets.com/favicons/favicon-dark.png" alt="${title}" title="${title}">
			</a>`;
		}
	return result;
}

function addPage(container, data, src) {
	const page = document.createElement("div");
	page.classList.add("page-content");
	container.appendChild(page);
	page.id = `page-${data.id}`;
	page.classList.add('invis');
	let icon = "";
	if (!!data.icon)
		icon = `<img id="app-icon" src="${data.icon}" alt="${data.name}">`;
	page.innerHTML = `<table><tr>
			<td>${icon}</td>
			<td><h2>${data.name}<h2></td>
		</tr></table>
		<p id="app-info">${data.info}</p>
		${buildSlideShow(data.images)}
		${buildDescription(data, src)}
		<div class="h-sep"></div>
		<div class="repo">
			<table style="width: 100%"><tr>
				<td>${buildDownloads(data.downloads)}<td>
				<td style="text-align:right">${buildRepos(data.repo_link, data)}</td>
			<tr></table>
		</div>`;
}

function addPreview(target, data) {
	const preview = document.createElement("div");
	target.appendChild(preview);
	const icon = !!data.icon ?
		`<img id="app-icon" src="${data.icon}" alt="${data.name}" title="${data.name}"/>` :
		`<div id="app-icon"></div>`;
	preview.innerHTML = `<a id="app-page-link" title="${data.name}" href="?page=${data.id}">
		<table><tr>
			<td>${icon}</td>
			<td><h2 id="app-name">${data.name}</h2></td>
		</tr></table>
	</a>
	<p id="app-info">${data.info}</p>`;
	preview.querySelector("a#app-page-link").onclick = (e) => switchPage(e, data.id);
}

function buildPages() {
	const page_container = document.getElementById("page-container");
	const includes = document.querySelectorAll("div#include");
	for (const div of includes) {
		const src = div.getAttribute("src");
		if (!!src) {
			const xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
				if (this.readyState !== XMLHttpRequest.DONE) return;
				switch (this.status) {
					case 200:
						let json = "";
						for (const s of this.responseText.split("\n"))
							json += " " + s.trimStart();
						const data = JSON.parse(json);
						addPage(page_container, data, src);
						pages.set(data.id, data.name);
						addPreview(div, data);
						const page = currPage();
						if (data.id == page || page == "home") {
							showTheme();
							showPage();
						}
						break;
					case 404: console.error(`pages/${src}.json not found!`); break;
					default: console.info(`Unhandled response status ${this.status}`);
				}
			}
			xhttp.open("GET", `pages/${src}.json`);
			xhttp.send();
		} else
			console.warn(`${div} has id="include" but misses the attribute "src"`);
	}
}

function build() {
	buildSwitchTheme()
	for (const button of document.querySelectorAll(".switch-page-home"))
		button.onclick = (e) => switchPage(e, "home");
	buildPages();
}

window.addEventListener("popstate", function(event) { showPage(); });

document.addEventListener("DOMContentLoaded", build);
