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
		const page = document.getElementById(`page-${id}`);
		if (target == id) {
			page.classList.remove("invis");
			document.title = `Kryptonbutterfly · ${name}`;
		}
		else
			page.classList.add("invis");
	}
	window.scrollTo(0, 0);
	//showSlide();
}

function switchPage(event, target) {
	event.preventDefault();
	const newUrl = location.protocol + "//" + location.host + location.pathname + "?page=" + target;
	history.pushState({path:newUrl}, '', newUrl);
	slideIndex = 0;
	showPage(target);
}
