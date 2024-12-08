function showSlide() {
	page = currPage();
	const container = document.getElementById(`page-${page}`);
	const slides = container.querySelectorAll("div#slide");
	const count = slides.length;
	slideIndex = (slideIndex + count) % count;
	for (let i = 0; i < count; i++)
		if (i == slideIndex)
			slides[i].classList.remove("invis");
		else
			slides[i].classList.add("invis");
}

function nextSlide(forward) {
	slideIndex += forward ? 1 : -1;
	showSlide();
}
