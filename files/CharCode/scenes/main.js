'use strict';
scenes.main = function() {
	//	9470
	
	let ccc = 0;
	let map = [];
	window.uonclick = function() {
		let mapT = [
			'c0,t0,t0,t0,t0,t0,t0,t0,t0,c1',
			't1,00,00,00,00,00,00,00,00,t1',
			't1,00,00,00,00,00,00,00,00,t1',
			't1,00,00,00,w0,00,00,00,00,t1',
	//		't1,00,00,00,00,00,00,00,00,t1',
	//		't1,00,00,00,00,00,00,00,00,t1',
	//		't1,00,00,00,00,00,00,00,00,t1',
	//		't1,00,00,00,00,00,00,00,00,t1',
			't1,00,00,00,00,00,00,00,00,t1',
			'c2,t0,t0,t0,t0,t0,t0,t0,t0,c3',
		];
		
		map = mapT.map(function(v) {
			return v.split(',').map(function(v) {
				let arr = [
					String.fromCharCode(9484, 9484+4, 9484+4*2, 9484+4*3).split(''),
					String.fromCharCode(9500, 9500+8, 9500+8*2, 9500+8*3, 9500+8*4).split(''),
					String.fromCharCode(9472, 9472+2).split('')
				].flat();
				
				let cc = arr[random(0, arr.length-1)];
				if(v[0]==='w') return String.fromCharCode(9548+(+v[1]));
				else if(v[0]==='c') return String.fromCharCode(9484+4*(+v[1]));
			//	else if(v[0]==='t') return String.fromCharCode(9500+8*(+v[1]));
				else if(v[0]==='t') return String.fromCharCode(9472+2*(+v[1]));
				else return cc;
			});
		});
	//	console.log(map.map(v => v.join('')).join('\n'));
	};
//	main.camera.minus(10, 10).plus(0.5);
	
	
//	main.textAlign = 'center';
//	main.textBaseline = 'middle';
	
	uonclick();

	
	
	(function() {
		window.el = document.createElement('canvas');
		let ctx = el.getContext('2d');
		
		el.width  = (map[0].length-1)*7+10;
		el.height = (map.length-1)*12+10;
		
		map.forEach((v, y) => {
		    v.forEach((v, x) => {
		        ctx.fillText(v, x*7+5, y*12+5);
		    });
		});
	})();
	
	
	log(Error('Error').stack.split(/\n    at/g).map(v => v.trim()));
	
	
	this.init = function() {
		cvs.pixelDensity = 0.3;
	};
	
	
	//=======updata=======//
	let fixpos = main.camera.buf();
	let cameraSpeed = vec2();
	
	this.updata = function() {
		let nd = Date.now();
		let touchC = main.camera.buf().plus(touch);
		if(touch.isDblClick()) netmap.size.set(cvs.width, cvs.height);
		
		//=======prePROCES=======//
		/*{
		if(touch.isPress()) fixpos = main.camera.buf();
		if(touch.isDown()) main.camera = fixpos.buf().minus(touch.dx, touch.dy);
		if(touch.isMove()) cameraSpeed.set(touch.sx<=10?touch.sx:10, touch.sy<=10?touch.sy:10);
		else {
			cameraSpeed.moveTime(vec2(), 10).floor(1000);
			main.camera.minus(cameraSpeed).floor(1000);
		};	//}*/
		
		
		//=======PROCES=======//
		
		
		//=======DRAW=======//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		back.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(back);
		
		
		
	//	main.drawImage(db.ggg, 0, 0, 1024, 1024);
	//	main.drawImage(el, 0.5, 0.5, el.width, el.height);
		
		main.fillStyle = '#0077aa';
		map.forEach((v, y) => {v.forEach((v, x) => {
			main.fillText(v, x*7, y*12);
		});});
		
		
		
		
		let offset = cvs.size.div(2);
		main.save();
		main.beginPath();
		main.strokeStyle = '#ee4444';
		main.moveTo(offset.x, offset.y);
		main.lineTo(offset.c+vectors.a.x, offset.y+vectors.a. y);
		main.stroke();
		main.restore();
	};	//==============================//
};