scenes.image = function() {
	let circle = {
		pos: vec2(),
		radius: 100,
		radiusYadro: 10,
		colors: [
			0, '#ffffff',
			1, '#ffffff00'
		],
		draw(ctx) {
			ctx.beginPath();
			let grd = ctx.createRadialGradient(this.pos.x, this.pos.y, this.radiusYadro, this.pos.x, this.pos.y, this.radius);
			for(let i = 0; i < this.colors.length; i += 2) grd.addColorStop(this.colors[i], this.colors[i+1]);
			ctx.fillStyle = grd;
			ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
			ctx.fill();
		}
	};
	
	
	let tt = true;
	let size = vec2(db.im.width, db.im.height).div(6);
	
	let el = document.createElement('canvas');
	el.width  = size.x;
	el.height = size.y;
	
	let gl = el.getContext('2d');
	
	
	//=======updata=======//
	let fixpos = main.camera.buf();
	let cameraSpeed = vec2();
	
	this.updata = function() {
		let nd = Date.now();
		let touchC = main.camera.buf().plus(touch);
	//	if(touch.isDblClick()) netmap.size.set(cvs.width, cvs.height);
		
		//=======prePROCES=======//
		if(touch.isDblClick()) tt = !tt;
		
		if(!tt) {
		//*{
		if(touch.isPress()) fixpos = main.camera.buf();
		if(touch.isDown()) main.camera = fixpos.buf().minus(touch.dx, touch.dy);
		if(touch.isMove()) cameraSpeed.set(touch.sx<=10?touch.sx:10, touch.sy<=10?touch.sy:10);
		else {
			cameraSpeed.moveTime(vec2(), 10).floor(1000);
			main.camera.minus(cameraSpeed).floor(1000);
		};	//}*/
		};
		
		
		//=======PROCES=======//
		
		
		//=======DRAW=======//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		back.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(back);
		
		main.globalCompositeOperation = 'source-over';
		main.filter = 'none';
		main.save();
		main.setTranslate(180, size.x/2, size.y/2);
		main.drawImage(db.im, 0, 0, size.x, size.y);
		main.restore();
		
		main.globalCompositeOperation = 'destination-atop';
		if(tt) circle.pos.set(touchC);
		main.fillStyle = '#333333';
		main.filter = 'blur(20px)';
		main.fillRect(circle.pos.x-size.x/2, circle.pos.y-size.y/2, size.x/1.2, size.y/1.2);
	//	circle.draw(main);
	};	//==============================//
};