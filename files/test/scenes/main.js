'use strict';
// touchmove вызывается в разы реже!!!
scenes.main = function() {
	back.camera = main.camera = cvs.size.div(2).invert();
	
	
	window.v = vec2(1, 0);
	window.m = vec2(1, 1);
	
	
	window.o = v => v/(Math.PI/180);
//	console.log(v.moveTo(m));
	
//	console.log(v.rotate(m))//*(Math.PI/180));
//	console.log(v.buf().inc(m).inc(Math.cos(o(m.angle-v.angle))));
	
	
	
	/*
	let a = 30*(Math.PI/180);
	
	
	let s = Date.now();
	for(let i = 0; i < 1e7; i++) {
		
	};
	let d = Date.now();
	console.log(d-s-56);
	//*/
	
	
	
	
	/*
	let vel = vec2(7, 8).minus(pos);
	
	pos = pos.buf().minus(offset).inc(vel);
	
	pos.ot(offset).inc(vel);
	
	function ot(v) {
		this.buf().minus(offset);
		return this;
	};
	//*/
	
	let target = new VectorNode();
	let obj = new VectorNode(1, 1);
	
	window.addEventListener('devicemotion', function(e) {
		obj.vel.x += e.acceleration.x;
		obj.vel.y += e.acceleration.y;
	});
	
	
	/*
	let arr = new Uint8ClampedArray([
		0b11111111,
		0b10000000,
		0b10000000,
		0b11111111
	]);
	
	
	
	let text = '';
	for(let i = 0; i < arr.length; i++) {
		for(let c = 0; c < 8; c++) {
			let n = arr[i] >> c & 0b1;
		};
		text += '\n';
	};
	
	console.log(text);
	console.log(arr);
	*/
	
	
	
	
	function mix(v, a = 0.5) {
		this.x = (1-a)*this.x+a*v.x;
		this.y = (1-a)*this.y+a*v.y;
		return this;
	};
	
	function dot(v) {
		return this.x*v.x+this.y*v.y;
	//	return vec2(this.x*v.x, this.y*v.y);
	};
	
	function cross(v) {
	//	return (this.x*v.y) - (this.y*v.x);
		return vec2(this.x*v.y, this.y*v.x);
	};
	
	function projectOnto(v) {
		//	inc+ / lengthSq+
		let coeff = (this.x*v.x + this.y*v.y) / (v.x*v.x + v.y*v.y);
		this.x = coeff*v.x;
		this.y = coeff*v.y;
		return this;
	};
	
	
	//=======updata=======//
	let fixpos = main.camera.buf(), cameraSpeed = vec2();
	this.updata = function() {
		let touchC = main.camera.buf(touch);
		
		
		//=======prePROCES=======//	//=======EVENTS=======//
		/*{
		if(touch.isPress()) fixpos = main.camera.buf();
		if(touch.isDown()) main.camera = fixpos.buf().minus(touch.dx, touch.dy);
		if(touch.isMove()) cameraSpeed.set(touch.sx<=10?touch.sx:10, touch.sy<=10?touch.sy:10);
		else {
			cameraSpeed.moveTime(vec2(), 10).floor(1000);
			main.camera.minus(cameraSpeed).floor(1000);
		};	//}*/
		
		
		//=======PROCES=======//	//=======UPDATA=======//
		//*
		if(touch.isDown()) target.set(touchC);
		obj.vel.inc(0.99).floor(10000);
		obj.vel.moveTo(target.ot(obj), 0.05);
		obj.plus(obj.vel);
		//*/
		
		
		
		
		
		
		
		if(touch.isDown()) m.set(touchC.floor(1).div(50)).normalize();
		
	//	window.vv = v.buf();
	//	vv.angle = m.angle;
		
		window.vv = vec2();
	//	vv.x = v.rotate(m)/Math.PI;
	//	vv.set(m.ot(v));
	//	window.vv = vec2().moveAngle(1, m.angle);
		window.vv = vec2().set(cross.call(v.buf(), m));
	//	window.vv = vec2().set(dot.call(v.buf(), m));
	//	window.vv = vec2().set(projectOnto.call(v.buf(), m));
	//	window.vv = v.buf().inc(m).inc(Math.cos(m.angle-v.angle));
		
		
		//=======DRAW=======//	//=======RENDER=======//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		back.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(main);

		main.save();
		main.beginPath();
		main.globalAlpha = 1;
		main.strokeStyle = '#ff0000';
		main.moveTo(0, 0);
		main.lineTo(v.x*50, v.y*50);
		main.stroke();
		
		back.beginPath();
		back.strokeStyle = '#ffff00';
		back.moveTo(0, 0);
		back.lineTo(vv.x*50, vv.y*50);
		back.stroke();
		
		main.globalAlpha = 0.5;
		main.beginPath();
		main.strokeStyle = '#00ff00';
		main.moveTo(0, 0);
		main.lineTo(m.x*50, m.y*50);
		main.stroke();
		main.restore();
		
		main.font = '15px Arial';
		main.fillStyle = '#ffffff';
		main.ctx.fillText(m.angle/Math.PI+'π', 10, 20);
		main.ctx.fillText(vv.angle/Math.PI+'π', 10, 40);
		
		main.ctx.fillText('cos: '+Math.floor(Math.cos(m.angle)*1e4)/1e4, 50, 70);
		main.ctx.fillText('sin: '+Math.floor(Math.sin(m.angle)*1e4)/1e4, 50, 90);
		
		obj.draw(main);
		target.draw(main);
	};	//==============================//
};