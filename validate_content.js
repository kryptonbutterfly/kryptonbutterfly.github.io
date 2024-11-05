function validateText(data, identifier, id) {
	assertIsArray(data, identifier, id);
	//TODO implement recursive checking of array elements!
}

function assertHasField(data, field, path) {
	console.assert(field in data, path, `lacks required field "${field}"`);
}

function assertIs(data, field, type, id) {
	console.assert(typeof data[field] == type, field, "of", id, `must be of type "${type}"`);
}

function assertIsArray(data, field, id) {
	assertHasField(data, field, id);
	console.assert(data[field].constructor == Array, field, "of", id, "must be an array!");
}

function validateDownload(data) {
	assertIsArray(data, "download", data.name);
	for (const i of data.download.keys()) {
		const e = data.download[i];
		assertFieldOfType(e, "name", "string", `${data.name}.download[${i}]`);
		assertFieldOfType(e, "src", "string", `${data.name}.download[${i}]`);
	}
}

function assertFieldOfType(data, field, type, id) {
	assertHasField(data, field, id);
	assertIs(data, field, type, id);
}

function validateAndAddPage(data) {
	assertFieldOfType(data, "name", "string", data);
	assertFieldOfType(data, "id", "string", data.name);
	if (!!data.icon)
		assertIs(data, "icon", "string", data.name);
	else console.info(data.name, "doesn't define an icon!")
	assertIsArray(data, "images", data.name);
	validateText(data, "info", data.name);
	validateText(data, "description", data.name);
	validateDownload(data);
	assertFieldOfType(data, "project", "string", data.name);
	
	console.assert(!pages.includes(data.id), "A page with name", data.id, "already exists!");
	pages.push(data.id);
}

for (const e of appData) validateAndAddPage(e);
for (const e of toolData) validateAndAddPage(e);
for (const e of libData) validateAndAddPage(e);
