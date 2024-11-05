function currPage() { return new URLSearchParams(location.search).get('page') ?? pages[0]; }

function showPage(target) {
	slideIndex = 0;
	if (!target)
		target = currPage();
	target = "page-" + target;
	for (const p of pages) {
		const id = "page-" + p; 
		const hide = target == id ? 'block' : 'none';
		document.getElementById(id).style.display = hide;
	}
}

function switchPage(target) {
	const newUrl = location.protocol + "//" + location.host + location.pathname + "?page=" + target;
	history.pushState({path:newUrl}, '', newUrl);
	slideIndex = 0;
	showPage(target);
}
