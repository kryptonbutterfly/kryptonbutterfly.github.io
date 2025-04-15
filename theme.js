const themes = ["light", "dark"];

const themedTags = ["code", "syn-type", "syn-var", "syn-fun", "syn-literal", "syn-ann", "syn-ann-id", "syn-comment"];

function setTheme(theme) {
	if (!themes.includes(theme))
		throw Error(`"${theme}" is not a valid theme.`);
	localStorage.setItem("theme", theme);
	showTheme();
}

function currentTheme() {return localStorage.getItem("theme") ?? themes[1];}

function showTheme() {
	const theme = currentTheme();
	for (const t of themes) {
		if (t != theme) {
			for (const tag of themedTags)
				changeElementTheme(tag, t, theme);
			const elements = document.getElementsByClassName(t);
			for (let i = elements.length - 1; i >= 0; i--)
				elements[i].classList.replace(t, theme);
		}
	}
	for (const img of document.getElementsByClassName("theme"))
		if (img.id == theme)
			img.classList.remove("invis");
		else
			img.classList.add("invis");
}

function changeElementTheme(tag, prev, next) {
	for (const e of document.querySelectorAll(tag)) {
		e.classList.remove(prev);
		e.classList.add(next);
	}
}

function switchTheme() {
	const themeIndex = (themes.indexOf(currentTheme()) + 1) % themes.length;
	setTheme(themes[themeIndex]);
}
