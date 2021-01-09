'use strict';
scenes.main = function() {
	let cameraMoveObject = new CameraMoveObject(main.camera);
	
	
	
	this.updata = function(dt) {
		let touchC = main.camera.buf(touch);
	//=======prePROCES=======//--vs--//=======EVENTS=======//
		cameraMoveObject.updata(main.camera);
	//==================================================//
	
	
	//=======PROCES=======//--vs--//=======UPDATA=======//
		// ...;
	//==================================================//
	
	
	//==========DRAW==========//--vs--//==========RENDER==========//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(main);
	};	//==============================//
};