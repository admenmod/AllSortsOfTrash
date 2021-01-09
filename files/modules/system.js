'use strict';
imports.hesh = {};
imports.modules = {};

function imports(id) {
	loadScript(id);
	console.log(imports);
	if(id in imports.hesh) return imports.hesh[id];
	return imports.hesh[id] = imports.modules[id].module();
};

function exports(id, module) {
	imports.modules[id] = {module, id, src: document.currentScript.src};
};

function loadScript(src) {
	let el = document.createElement('script');
	el.src = src;
	return el;
};
