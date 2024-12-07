const themes = ["light", "dark"];

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
			for (const code of document.querySelectorAll("code")) {
				code.classList.remove(t);
				code.classList.add(theme);
			}
			const elements = document.getElementsByClassName(t);
			for (let i = elements.length - 1; i >= 0; i--)
				elements[i].classList.replace(t, theme);
		}
	}
	for (const img of document.getElementsByClassName("theme"))
		img.style.display = img.id == theme ? "" : "none";
}

function switchTheme() {
	const themeIndex = (themes.indexOf(currentTheme()) + 1) % themes.length;
	setTheme(themes[themeIndex]);
}
