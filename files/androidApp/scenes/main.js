'use strict';
scenes.main = function() {
	let cameraMoveObject = new CameraMoveObject(main.camera);
	
	cvs.on('resize', function() {
		netmap.size.set(cvs.size);
	});
	
	
//	if(typeof Android !== 'undefined') log(Android.writeFile('/storage/emulated/0/EXE/gg.txt', 'hhjxjsjjdjxdj'));
	
	
	let panel = {};
	function panelDraw(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.font = '15px Arial';
		ctx.fillStyle = '#eeeeee';
		let i = 0;
		for(let id in panel) ctx.fillText(id+': '+String(Math.floor(panel[id]*(180/Math.PI))).padStart(5, ' '), 20, i++*20+20);
		ctx.restore();
	};
	
	
	
	let shipLargeBody = new ShipUnit({
		posC: vec2(200, 200),
		angle: Math.PI/3,
		offsetAngle: Math.PI/2,
		scale: vec2(1, 1).div(2),
		image: db.ship_large_body
	});
	
	let shipGunBaseBig = new ImageNode({
		posC: vec2(200, 200),
		angle: 70,
		scale: vec2(1, 1).div(2),
		image: db.ship_gun_base_big
	});
	
	let shipBigGun = new ImageNode({
		offsetAngle: Math.PI/2,
		angle: shipLargeBody.angle+180-40,
		scale: vec2(1, 1).div(2),
		image: db.ship_big_gun
	});
	
	
	let posOt = vec2(0, shipLargeBody.scale.y*shipLargeBody.size.y/8.5);
	let posL = posOt.buf();
	posL.angle += shipLargeBody.angle;
	let posN = posL.buf();
	
	shipBigGun.setPosC(shipLargeBody.getPosC().plus(posL.buf(posN)));
	
	let angle = shipBigGun.angle;
	
	
	let startDrawPath = false;
	
	
//===============updata===============//
	this.updata = function() {
		let touchC = main.camera.buf(touch);
	//=======prePROCES=======//--vs--//=======EVENTS=======//
		if(touch.isPress() && touchC.getDistance(shipLargeBody.getPosC()) < 50) {
			startDrawPath = true;
			shipLargeBody.targets = [];
		} else if(touch.isUp()) startDrawPath = false;
		
		
		if(!startDrawPath) cameraMoveObject.updata(main.camera);
		
		if(startDrawPath && touch.isMove() && shipLargeBody.targets.length < 100) {
			shipLargeBody.targets.push(touchC.buf());
		};
	//==================================================//
	
	
	//=======PROCES=======//--vs--//=======UPDATA=======//
		setTickout.updata();
		let r = 0, s = 0, sla = 0;
		if(shipLargeBody.targets.length) {
			let angleToTarget = panel.r = r = shipLargeBody.getPosC().rotate(shipLargeBody.targets[0]);
			
			
			
			sla = panel.sla = /*loopNum(*/shipLargeBody.angle/*, -Math.PI, Math.PI)*/;
			
			let s = panel.s = angleToTarget-sla; //shipLargeBody.angle;
			
			shipLargeBody.angle += (Math.sign(s)*0.02);
			shipLargeBody.vel.moveAngle(Math.max(Math.cos(s), 0)*0.02, shipLargeBody.angle);
			
			
			
			if(shipLargeBody.getPosC().getDistance(shipLargeBody.targets[0]) < 50) shipLargeBody.targets.shift();
		};
		
		
		shipLargeBody.vel.inc(0.97);
		shipLargeBody.pos.plus(shipLargeBody.vel);
		
		posL = posOt.buf();
		posL.angle += shipLargeBody.angle;
		posN.moveTime(Vector2.ZERO, 10);
		
		if(touch.isDown()) {
			shipBigGun.angle = touchC.rotate(shipBigGun.getPosC());
			angle = shipBigGun.angle-shipLargeBody.angle;
		} else shipBigGun.angle = shipLargeBody.angle+angle;
		
		if(touch.isClick()) {
			posN.moveAngle(5, shipBigGun.angle);
		//	setTickout(function() {
		//		posN.moveAngle(5, (shipBigGun.angle-90) * (Math.PI/180));
		//	}, 10);
		};
		
		
		main.camera.moveTime(shipLargeBody.getPosC().minus(cvs.size.div(2)));
		shipBigGun.setPosC(shipLargeBody.getPosC().plus(posN.buf(posL)));
		shipGunBaseBig.setPosC(shipLargeBody.getPosC().plus(posL));
	//==================================================//
	
	
	//=======DRAW=======//--vs--//=======RENDER=======//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(main);
		
		shipLargeBody.draw(main);
		shipGunBaseBig.draw(main);
		shipBigGun.draw(main);
		
		if(shipLargeBody.targets.length) {
			main.save();
			main.beginPath();
			main.strokeStyle = '#eeeeee';
		//	main.setLineDash([5, 3]);
			main.moveTo(shipLargeBody.getPosC().x, shipLargeBody.getPosC().y);
			for(let i = 0; i < shipLargeBody.targets.length; i++) {
				main.lineTo(shipLargeBody.targets[i].x, shipLargeBody.targets[i].y);
			};
			main.stroke();
			main.beginPath();
			main.fillStyle = '#ffff00';
			for(let i = 0; i < shipLargeBody.targets.length; i++) {
				main.moveTo(shipLargeBody.targets[i].x, shipLargeBody.targets[i].y);
				main.arc(shipLargeBody.targets[i].x, shipLargeBody.targets[i].y, 2, 0, Math.PI*2);
			};
			main.fill();
			main.restore();
		};
		
		
		panelDraw(main.ctx);
	};	//==============================//
};