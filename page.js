function currPage() { return new URLSearchParams(location.search).get('page') ?? "home"; }

function setTitle(target) {
	document.title = "Kryptonbutterfly · " + target;
}

function showPage(target) {
	slideIndex = 0;
	if (!target)
		target = currPage();
	for (const [id, name] of pages.entries()) {
		let hide = 'none';
		if (target == id) {
			hide = 'block';
			document.title = `Kryptonbutterfly · ${name}`;
		}
		document.getElementById(`page-${id}`).style.display = hide;
	}
}

function switchPage(event, target) {
	event.preventDefault();
	const newUrl = location.protocol + "//" + location.host + location.pathname + "?page=" + target;
	history.pushState({path:newUrl}, '', newUrl);
	slideIndex = 0;
	showPage(target);
}
