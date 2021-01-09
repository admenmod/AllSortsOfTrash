'use strict';
running.then(function() {
	try {
	let scenes = {};
	//========== Scenes > Start ==========//
	scenes.start = new Scene(function() {
		let back = back1;
		let saveLeyar = back2;
		
		let isLeyar = true;
		
		netmap.tile.set(10, 10);
		
		let vec = vec2();
		let scale = 10;
		let invF = false, f = false;
		let saveList = null;
		
		//let pad = netmap.size.buf().minus(netmap.size.buf().ost(netmap.tile)).div(2);
		let pad = netmap.tile.buf().inc(20); //netmap.size.buf().minus(netmap.size.buf().ost(netmap.tile));
		
		pad.y += 200;
		function grafikDraw(v, a, b) {
			v.y = (v.x**2);
			
			back.beginPath();
			//back.fillStyle = '#ee0000';
			back.arc(v.x*scale+pad.x, -v.y*scale+pad.y, 1, 0, Math.PI*2);
			back.fill();
		};
		
//		logDiv(cvs);
		//=======updata=======//
		let fixpos = main.camera.buf();
		let cameraSpeed = vec2();
		
		this.updata = function() {
			main.ctx.clearRect(0, 0, cvs.width, cvs.height);
			let touchC = main.camera.buf().plus(touch);
			
			if(touch.isDblClick()) {
				netmap.size.set(cvs.width, cvs.height);
				back.ctx.clearRect(0, 0, cvs.width, cvs.height);
				vec.set(0, 0);
				invF = false;
			};
			
			//=======prePROCES=======//
			
			if(touch.isPress()) {
				fixpos = main.camera.buf();
				saveList = back.createPattern(saveLeyar.canvas, 'no-repeat');
				logDiv(saveList);
			};
			if(touch.isUp()) {
				[saveLeyar, back] = [back, saveLeyar];
				saveLeyar.ctx.clearRect(0, 0, cvs.width, cvs.height);
				back.fillStyle = saveList;
				back.fillRect(0, 0, cvs.width, cvs.height);
			//	back.putImageData(saveList, 0, 0);
			};
			if(touch.isDown()) main.camera = fixpos.buf().minus(touch.dx, touch.dy);
			if(touch.isMove()) cameraSpeed.set(touch.sx <= 10 ? touch.sx : 10, touch.sy <= 10 ? touch.sy : 10);
			else {
				cameraSpeed.moveTime(vec2(), 10);
				main.camera.minus(cameraSpeed);
			};//*/
			
			//=======PROCES=======//
			if(!invF&&vec.x<10) {
				back.fillStyle = '#0044ff';
				grafikDraw(vec, 5, pad);
				vec.x += 0.05;
			} else if(!invF) {
				vec.x = 0;
				invF = true;
			} else if(invF&&vec.x>-10) {
				back.fillStyle = '#ff4400';
				grafikDraw(vec, 5, pad);
				vec.x -= 0.05;
			};
			
			//=======DRAW=======//
			netmap.tile.set(1, 1).inc(scale);
			netmap.lineWidth = 0.1;
			netmap.draw(main);
			
			netmap.tile.set(1, 1).inc(scale*10);
			netmap.lineWidth = 0.2;
			netmap.draw(main);
		};
	});
	Scene.set(scenes.start);
	requestAnimationFrame(_updata);
} catch(err) {logDiv(err.stack)};
});