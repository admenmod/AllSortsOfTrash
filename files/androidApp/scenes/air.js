'use strict';
scenes.main = function() {
	let cameraMoveObject = new CameraMoveObject(main.camera);
	
	
	let idSelect = 0;
	let titles = ['F16', 'F22', 'J20', 'Su27', 'Eagle'];
	
	let arrUnitsAir = [];
	for(let i = 0; i < titles.length; i++) {
		arrUnitsAir.push(new UnitAir({
			title: titles[i],
			pos: vec2(random(50, cvs.width-50), random(50, cvs.height-50)),
			image: db.unit_icon_air
		}));
	};
	
	
	let l = cvs.width/arrUnitsAir.length;
	
	cvs.on('resize', function() {
		netmap.size.set(cvs.width, cvs.height);
		l = cvs.width/arrUnitsAir.length;
		for(let i = 0; i < images.length; i++) {
			let wh = images[i].image.width/images[i].image.height;
			images[i].size.set(l, l/wh);
			images[i].pos.set(l*i, cvs.height-images[i].size.y);
		};
	});
	
	
	let images = [];
	for(let i = 0; i < titles.length; i++) {
		images.push(new ImageNode({
			pos: vec2(l*i, cvs.vh*90),
			size: vec2(l, 0),
			image: db[titles[i]],
			title: titles[i]
		}));
		images[i].pos.set(l*i, cvs.height-images[i].size.y);
	};
	
	
	
	//=============== UPDATA ===============//
	this.updata = function(dt) {
		let touchC = main.camera.buf(touch).floor(1000);
	//=======prePROCES=======//--vs--//=======EVENTS=======//
		if(touch.isClick() && touch.y > cvs.height-images[0].size.y) idSelect = ~~(touch.x/l);
		else {
			cameraMoveObject.updata(main.camera);
			if(touch.isClick()) arrUnitsAir[idSelect].target.set(touchC.buf(0.5/0.1, 0.5/0.1)).floor(0.1);
		};
	//==================================================//
	
	
	//=======PROCES=======//--vs--//=======UPDATA=======//
		for(let i = 0; i < arrUnitsAir.length; i++) {
			arrUnitsAir[i].vel.inc(0.97).floor(1000);
			arrUnitsAir[i].vel.moveTo(arrUnitsAir[i].target.ot(arrUnitsAir[i].getPosC()), 0.02);
			arrUnitsAir[i].pos.plus(arrUnitsAir[i].vel);
		};
		
		
		
	//==================================================//
	
	
	//=======DRAW=======//--vs--//=======RENDER=======//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(main);
		
		
		main.save();
		main.beginPath();
		main.strokeStyle = '#ee7700';
		main.setLineDash([5, 3]);
		main.moveTo(arrUnitsAir[idSelect].getPosC());
		main.lineTo(arrUnitsAir[idSelect].target);
		main.stroke();
		main.restore();
		
		arrUnitsAir[idSelect].target.draw(main);
		for(let i = 0; i < arrUnitsAir.length; i++) {
			arrUnitsAir[i].draw(main);
			
			main.save();
			main.textAlign = 'center';
			main.fillStyle = i == idSelect?'#ffff00':'#eeeeee';
			main.fillText(arrUnitsAir[i].title, arrUnitsAir[i].pos.x+arrUnitsAir[i].size.x/2, arrUnitsAir[i].pos.y+20);
			main.restore();
		};
		
		
		main.ctx.save();
		main.ctx.beginPath();
		main.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		main.ctx.fillRect(0, cvs.height-images[0].size.y||cvs.vh*90, cvs.width, cvs.height-images[0].size.y);
		
		main.ctx.strokeStyle = 'rgb(200, 255, 200)';
		main.ctx.moveTo(0, cvs.height-images[0].size.y||cvs.vh*90);
		main.ctx.lineTo(cvs.width, cvs.height-images[0].size.y||cvs.vh*90);
		main.ctx.stroke();
		
		main.ctx.beginPath();
		for(let i = 0; i < arrUnitsAir.length; i++) {
			main.ctx.strokeStyle = 'rgb(100, 255, 100)';
			main.ctx.moveTo(l*i-0.5, cvs.height-images[0].size.y||cvs.vh*90);
			main.ctx.lineTo(l*i-0.5, cvs.height);
		};
		main.ctx.stroke();
		
		for(let i = 0; i < images.length; i++) {
			images[i].draw(main.ctx);
			
		//	main.ctx.textAlign = 'center';
			main.ctx.fillStyle = i == idSelect?'#44ee44':'#eeeeee';
			main.ctx.fillText(titles[i], images[i].pos.x+3, images[i].pos.y+12);
		};
		main.ctx.restore();
	};	//==============================//
};
