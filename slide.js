function showSlide(direction = 0) {
	page = currPage();
	const container = document.getElementById(`page-${page}`);
	const slides = container.querySelectorAll("div#slide");
	const count = slides.length;
	if (count > 0)
	{
		slideIndex = (slideIndex + direction + count) % count;
		for (let i = 0; i < count; i++)
			if (i == slideIndex)
				slides[i].classList.remove("invis");
			else
				slides[i].classList.add("invis");

		if (direction != 0)
			preloadNeighbor(slides, slideIndex + direction);
		else {
			preloadNeighbor(slides, slideIndex + 1)
			preloadNeighbor(slides, slideIndex - 1)
		}
	}
}

function preloadNeighbor(slides, direction) {
	setTimeout(function () {
		const index = (slideIndex + direction + slides.length) % slides.length;
		const slide = slides[index]
		const img = slide.querySelectorAll("img#img")[0];
		fetch(img.src)
	})
}

function nextSlide(forward) {
	showSlide(forward ? 1 : -1);
}

