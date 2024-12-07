function buildDescription(description) {
	if (!description) return "";
	return `<p>${description}</p>`
}

function buildSlideShow(images) {
	if (!images || images.length === 0) return "";
	let slideshow = `<div id="slideshow" class="dark" style="display: block; margin: 1em 0em">
			<span class="prev" onclick="nextSlide(false)">❮</span>
			<span class="next" onclick="nextSlide(true)">❯</span>`;
	for (let i = 0; i < images.length; i++) {
		const img = images[i];
		slideshow += `
			<div id="slide" style="display: ${i == 0 ? "block" : "none"}">
				<div id="numbertext" class="dark">${i+1}/${images.length}</div>
				<img id="img" src="${img.src}" alt="${img.alt}" title="${img.title}"/>
			</div>`;
	}
	return slideshow + "\n</div>";
}

function buildDownloads(downloads) {
	if (!downloads || downloads.length === 0)	return "";
	let result = "";
	for (const dl of downloads)
		result += `\n<div style="margin: 0.3em 0em;"><a href="${dl.src}">${dl.name}<br></a></div>`
	return result;
}

function addPage(container, data) {
	const page = document.createElement("div");
	container.appendChild(page);
	page.id = `page-${data.id}`;
	page.style.display = 'none';
	let icon = "";
	if (!!data.icon)
		icon = `<img id="app-icon" src="${data.icon}" alt="${data.name}">`;
	page.innerHTML = `<table>
			<tr>
				<td>
					${icon}
				</td>
				<td>
					<h2>${data.name}<h2>
				</td>
			</tr>
		</table>
		<p id="app-info">${data.info}</p>
		${buildSlideShow(data.images)}
		${buildDescription(data.description)}
		<div style="width: 100%; position: relative; margin-top: 1em;">
			<a href="${data.repo_link}">
				<img class="dark" id="app-repo-icon" src="https://github.githubassets.com/favicons/favicon-dark.png" alt="Github - kryptonbutterfly/${data.name}" title="Github - kryptonbutterfly/${data.name}">
			</a>${buildDownloads(data.downloads)}
		</div>`;
}

function addPreview(target, data) {
	const preview = document.createElement("div");
	target.appendChild(preview);
	let icon = "";
	if (!!data.icon)
		icon = `<img id="app-icon" src="${data.icon}" alt="${data.name}" title="${data.name}"/>`;
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
			xhttp.onreadystatechange = function() {
				if (this.readyState !== XMLHttpRequest.DONE) return;
				switch (this.status) {
					case 200:
						let json = "";
						for (const s of this.responseText.split("\n"))
							json += " " + s.trimStart();
						const data = JSON.parse(json);
						addPage(page_container, data);
						pages.set(data.id, data.name);
						addPreview(div, data);
						const page = currPage();
						if (data.id == page || page == "home") {
							showTheme();
							showPage();
						}
						break;
					case 404: console.error(`${src} not found!`); break;
					default: console.info(`Unhandled response status ${this.status}`);
				}
			}
			xhttp.open("GET", src);
			xhttp.send();
		} else
			console.warn(`${div} has id="include" but misses the attribute "src"`);
	}
}

window.addEventListener("popstate", function(event) { showPage(); });

document.addEventListener("DOMContentLoaded", () => buildPages());
