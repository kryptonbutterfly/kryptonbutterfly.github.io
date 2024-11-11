const appData = [{
		name: "TinyTotp",
		id: "tinytotp",
		icon: "https://raw.githubusercontent.com/kryptonbutterfly/TinyTotp/master/src/assets/icon.svg",
		images: [
			"https://raw.githubusercontent.com/kryptonbutterfly/TinyTotp/master/md/Main.webp",
			"https://raw.githubusercontent.com/kryptonbutterfly/TinyTotp/master/md/Categories.webp", "https://raw.githubusercontent.com/kryptonbutterfly/TinyTotp/master/md/Import-Secret.webp",
			"https://raw.githubusercontent.com/kryptonbutterfly/TinyTotp/master/md/Import-Qr.webp",
			 "https://raw.githubusercontent.com/kryptonbutterfly/TinyTotp/master/md/AddSecret.webp", "https://raw.githubusercontent.com/kryptonbutterfly/TinyTotp/master/md/Edit-Totp.webp",
			 "https://raw.githubusercontent.com/kryptonbutterfly/TinyTotp/master/md/Export-Secret.png"],
		info: ["App to create 'Time based One Time Passwords'."],
		description: ["TODO add description", {type: "br"}, "This is the description.", {type: "br"}, {type: "br"}, "In multiple lines!"],
		download: [
			{name: "TinyTotp.jar", src: "https://github.com/kryptonbutterfly/TinyTotp/releases/download/v4.0.1/TinyTotp.jar"},
			{name: "TinyTotp-4.0.1.deb", src: "https://github.com/kryptonbutterfly/TinyTotp/releases/download/v4.0.1/TinyTotp-4.0.1.deb"}],
		project: "https://github.com/kryptonbutterfly/TinyTotp?tab=readme-ov-file#tinytotp"
	}, {
		name: "Localizer4J",
		id: "localizer4j",
		icon: "https://raw.githubusercontent.com/kryptonbutterfly/Localizer4J/master/src/assets/icon.svg",
		images: [],
		info: ["A Language file Editor with special sauce for java projects."],
		description: [],
		download: [
		{name: "Localizer4J.jar", src: "https://github.com/tinycodecrank/Localizer4J/releases/download/v2.4.0/Localizer4J.jar"},
		{name: "Localizer4J-2.4.0.deb", src: "https://github.com/tinycodecrank/Localizer4J/releases/download/v2.4.0/Localizer4J-2.4.0.deb"}],
		project: "https://github.com/kryptonbutterfly/Localizer4J#localizer4j-"
	}, {
		name: "CopyCat",
		id: "copycat",
		icon: "https://raw.githubusercontent.com/kryptonbutterfly/CopyCat/master/deb-content/icon.svg",
		images: [
			"https://raw.githubusercontent.com/kryptonbutterfly/CopyCat/master/md/resources/CopyCat_main.png",
			"https://raw.githubusercontent.com/kryptonbutterfly/CopyCat/master/md/resources/Import.png"],
		info: ["A Desktop QR-Code Scanner using the devices webcam."],
		description: ["An application to generate a qr code from clipboard content or scan a qr code via camera and add the content to the clipboard."],
		download: [
			{name: "CopyCat.jar", src: "https://github.com/kryptonbutterfly/CopyCat/releases/download/v1.0.0/CopyCat.jar"},
			{name: "copy-cat-1.0.0.deb", src: "https://github.com/kryptonbutterfly/CopyCat/releases/download/v1.0.0/copy-cat-1.0.0.de"}],
		project: "https://github.com/kryptonbutterfly/CopyCat?tab=readme-ov-file#copycat"
	}, {
		name: "CheckList",
		id: "checklist",
		icon: "https://raw.githubusercontent.com/tinycodecrank/CheckList/master/app/src/main/res/mipmap-xxhdpi/ic_launcher.webp",
		images: ["https://raw.githubusercontent.com/tinycodecrank/CheckList/master/md/Screenshot_CheckList.png"],
		info: ["A primitive checklist app for android."],
		description: [],
		download: [{name: "CheckList.apk", src: "https://github.com/tinycodecrank/CheckList/releases/download/v1.0.0/CheckList.apk"}],
		project: "https://github.com/kryptonbutterfly/CheckList?tab=readme-ov-file#checklist"}];

const toolData = [{
		name: "CacheBuilder",
		id: "cachebuilder",
		icon: "https://raw.githubusercontent.com/kryptonbutterfly/CacheBuilder/master/icon.svg",
		images: [],
		info: ["ByteCode manipulator used to decorate methods using ", {type:"a", href:"https://github.com/kryptonbutterfly/tinyCache", alt:"@Cache", text:"@Cache"}, " annotations."],
		description: ["It can be used as a build target in your ", {type: "a", href: "https://github.com/kryptonbutterfly/CacheBuilder?tab=readme-ov-file#install", alt: "ide", text:"ide"}, " or as a ", {type:"a", href: "https://github.com/kryptonbutterfly/CacheBuilder/releases/download/v3.0.0/cache_builder-3.0.0.jar", alt:"maven plugin", text: "maven plugin"}, " (requires version 3.0.0 or higher)."],
		download: [{name: "cache_builder maven plugin", src: "https://github.com/kryptonbutterfly/CacheBuilder/releases/download/v3.0.0/cache_builder-3.0.0.jar"}, {name: "eclipse build target setup", src: "https://github.com/kryptonbutterfly/CacheBuilder/releases/download/v3.0.0/cache_builder-3.0.0-setup.zip"}],
		project: "https://github.com/kryptonbutterfly/CacheBuilder?tab=readme-ov-file#cachebuilder-"}];

const libData = [{
		name: "generic-lexer",
		id: "genericlexer",
		images: [],
		info: ["The basics of a lexer without any token definitions."],
		description: [],
		download: [],
		project: "https://github.com/kryptonbutterfly/generic-lexer#generix-lexer-"}];

const pages = ["home"];
var slideIndex = 0;
