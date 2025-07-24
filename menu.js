const categories = document.querySelectorAll("td.category");
for (let i = 0; i < categories.length; i++) {
	const cat = categories[i];
	cat.addEventListener('click', () => category(cat.id));
	cat.addEventListener('keydown', (event) => {
		if (event.key === "Enter")
			category(cat.id);
	});
}

function category(cat) {
	const SELECTED = "selected";
	const old = document.getElementsByClassName(SELECTED);
	for (let i = 0; i < old.length; i++)
		old[i].classList.remove(SELECTED);
	const cats = document.querySelectorAll("td.category");
	for (let i = 0; i < cats.length; i++)
		if (cat == cats[i].id)
			cats[i].classList.add(SELECTED);
	const projects = document.querySelectorAll(".project");
	for (let i = 0; i < projects.length; i++) {
		projects[i].style.display = "none";
		if (projects[i].classList.contains(cat))
			projects[i].style.display = "block";
	}
}

