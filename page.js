function currPage() { return new URLSearchParams(location.search).get('page') ?? pages[0]; }

function setTitle(target) {
	document.title = "Kryptonbutterfly · " + target;
}

function showPage(target) {
	slideIndex = 0;
	if (!target)
		target = currPage();
	for (const p of pages) {
		const hide = target == p ? 'block' : 'none';
		document.getElementById("page-" + p).style.display = hide;
	}
	for (const app of appData)
		if (app.id == target)
			return setTitle(app.name);
	for (const app of toolData)
		if (app.id == target)
			return setTitle(app.name);
	for (const app of libData)
		if (app.id == target)
			return setTitle(app.name);
}

function switchPage(target) {
	const newUrl = location.protocol + "//" + location.host + location.pathname + "?page=" + target;
	history.pushState({path:newUrl}, '', newUrl);
	slideIndex = 0;
	showPage(target);
}
