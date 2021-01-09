function CodeFunction(code, useAPI = {}) {
	let proxyUseAPI = new Proxy(useAPI, {
		has: (target, prop) => {
			return true;
		},
		get: (target, key) => key === Symbol.unscopables ? undefined : target[key]
	});
	
	console.log(code);
	console.log(code = code.toString().replace(/function.+?\{/, '').replace(/\}$/, ''));
	
	return function() {
		console.log(this);
		eval(`with(proxyUseAPI) {${code}};`);
	};
};

scenes.main = function() {
	'use strict';
	
	
	function __main__() {
		console.log(this);
	};
	
	
	let cc = CodeFunction(__main__, {
		console, Math, vec2, Vector2, EventEmiter, log,
	});
	
	console.log(cc);
	cc.call(undefined);
	
	
	
	
	//=======updata=======//
	let fixpos = main.camera.buf();
	let cameraSpeed = vec2();
	
	this.updata = function() {
		let touchC = main.camera.buf(touch);
		
		//=======prePROCES=======//
		
		
		//=======PROCES=======//
		
		
		//=======DRAW=======//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(main);
	};	//==============================//
};