scenes.matriks = function() {
	let vectors = {
		offset: vec2(0, 0),
		vec: vec2(1, 1),
		mat1: {
			i: vec2(1, 0),
			j: vec2(0, 1)
		},
		mat2: {
			i: vec2(1, 0),
			j: vec2(0, 1)
		}
	};
	
	let useAPI = {
		console, Math, vec2, Vector2, log,
		main,
		vec: vectors.vec,
		offset: vectors.offset,
		mat1: vectors.mat1,
		mat2: vectors.mat2,
		on: function() {}
	};
	
	
	let proxyUseAPI = new Proxy(useAPI, {
		has: () => true,
		get: (target, key) => key === Symbol.unscopables ? undefined : target[key]
	});
	
	code.value = 
`on = () => {
    mat1.i.moveTime(vec2(1, 0), 20);
    mat1.j.moveTime(vec2(0, 1), 20);
};`;
	
	
	document.getElementById('run').onclick = () => {
		setTimeout(function() {
		try {
			(function() {eval(`with(proxyUseAPI) {
				${code.value}
			};`);
			}).call(useAPI);
		} catch(err) {
			let arr = err.stack.split('\n');
			arr.shift();
			
			arr.splice(arr.length-2, 2);
			
			let arrData = arr.map(function(v) {
				return [v.match(/(\s*at\s.+?)\(/), v.match(/:(\d+):(\d+)\)?$/)];
			});
			
			let textError = err.message;
			arrData.forEach(v => textError += '\n'+v[0][1]+'(main:'+(+v[1][1])+':'+v[1][2]+')');
			console.log(textError);
			logDiv(textError);
		};
		}, 200);
	//	setTimeout(() => 
		document.getElementById('code').focus();
	//	, 2200);
	};
	
	netmap.tile.set(40);
	netmap.offset.set(cvs.size.div(2).mod(40, 40));
	
	
	//=======updata=======//
	let fixpos = main.camera.buf();
	let cameraSpeed = vec2();
	
	this.updata = function() {
		let nd = Date.now();
		let touchC = main.camera.buf(touch);
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
		netmap.lineWidth = 0.1;
		netmap.draw(main);
		
		
		let offset = cvs.size.div(2).plus(vec2(vectors.offset.x, vectors.offset.y).inc(vectors.mat2.i.x*40, vectors.mat2.j.y*40));
		netmap.offset.set(cvs.size.div(2).mod(40, 40));
		main.save();
		main.translate(offset.x, offset.y);
		main.transform(
			vectors.mat1.i.x, vectors.mat1.i.y,
			vectors.mat1.j.x, vectors.mat1.j.y,
			0, 0
		);
		main.transform(
		    vectors.mat2.i.x, vectors.mat2.i.y,
		    vectors.mat2.j.x, vectors.mat2.j.y,
		    0, 0
		);
		main.translate(-offset.x, -offset.y);
		
		netmap.lineWidth = 0.5;
		netmap.draw(main);
		
		useAPI.on();
		
		main.beginPath();
		main.strokeStyle = '#ee4444';
		main.moveTo(offset.x, offset.y);
		main.lineTo(offset.x, offset.y-40);
		main.stroke();
		
		main.beginPath();
		main.strokeStyle = '#44ff44';
		main.moveTo(offset.x, offset.y);
		main.lineTo(offset.x+40, offset.y);
		main.stroke();
		
		main.beginPath();
		main.strokeStyle = '#eeee44';
		main.moveTo(offset.x, offset.y);
		main.lineTo(offset.x+vectors.vec.x*40, offset.y-vectors.vec.y*40);
		main.stroke();
		main.restore();
		
		main.save();
		main.font = '20px Arial';
		main.textBaseline = 'top';
		main.fillStyle = '#112233';
		main.fillRect(300-8, 50-10, 60, 60);
		main.fillStyle = '#eeeeee';
		main.fillText(`[${Math.round(vectors.mat1.i.x*100)/100}  ${Math.round(vectors.mat2.j.x*100)/100}]`, 300, 50);
		main.fillText(`[${Math.round(vectors.mat1.i.y*100)/100}  ${Math.round(vectors.mat2.j.y*100)/100}]`, 300, 50+20);
		main.restore();
	};	//==============================//
};