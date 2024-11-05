function showSlide() {
	page = currPage();
	const container = document.getElementById("page-" + page);
	for (const app of appData) {
		if (app.id == page) {
			const count = app.images.length;
			slideIndex = (slideIndex + count) % count;
			let index = 0;
			for (const slide of container.querySelectorAll("div#slide"))
			{
				slide.style.display = index == slideIndex ? "block" : "none";
				index++;
			}
			return;
		}
	}
}

function nextSlide(forward) {
	slideIndex += forward ? 1 : -1;
	showSlide();
}
