'use strict';
scenes.main = function() {
	let cameraMoveObject = new CameraMoveObject(main.camera);
	
	cvs.on('resize', function(e) {
		netmap.size.set(cvs.size);
	});
	
	
	let x = 0;
	
	
//===============updata===============//
	this.updata = function(dt) {
		let touchC = main.camera.buf(touch);
	//=======prePROCES=======//--vs--//=======EVENTS=======//
	//	cameraMoveObject.updata(main.camera);
	//==================================================//
	
	
	//=======PROCES=======//--vs--//=======UPDATA=======//
		// ...;
	//==================================================//
	
	
	//==========DRAW==========//--vs--//==========RENDER==========//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
	//	netmap.draw(main);
		
		main.save();
		main.beginPath();
		main.fillStyle = '#ff0000';
		main.fillRect(10, 10, ++x, 100);
		main.restore();
	};	//==============================//
	
//===============exit===============//
	this.exit = function() {
		// ...;
	};
};