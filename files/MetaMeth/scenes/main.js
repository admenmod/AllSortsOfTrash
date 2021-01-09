'use strict';
try {
scenes.main = function() {
	let gosticMove = new Gostic({pos: vec2(cvs.width, cvs.height).minus(90)});
	let gosticHead = new Gostic({pos: vec2(0, cvs.height).minus(-90, 90)});
	
	let target = new VectorNode(50, -100);
	let cameraFixScene = main.camera.buf();
	
	
	main.imageSmoothingEnabled = false;
	
	
	//	crisp-edges
	//=======init=======//
	this.init = function() {
		main.imageSmoothingEnabled = false;

		netmap.cord = true;
		
		main.camera.set(cameraFixScene);
		
		netmap.color = '#ffffff';
        netmap.lineWidth = 0.2;
        netmap.tile.set(50);
        netmap.offset.y = 0;
		
		back.ctx.clearRect(0, 0, cvs.width, cvs.height);
		back.ctx.fillStyle = '#333333';
		back.ctx.fillRect(0, 0, cvs.width, cvs.height);
	};
	
	
	//=======updata=======//
	let fixpos = main.camera.buf();
	let cameraSpeed = vec2();
	
	this.updata = function(dt) {
		let touchC = main.camera.buf().plus(touch);
		if(touch.isDblClick()) netmap.size.set(cvs.width, cvs.height);
		
		//=======prePROCES=======//
		if(!gosticMove.useF&&!gosticHead.useF) {
			///*{
			if(touch.isPress()) fixpos = main.camera.buf();
			if(touch.isDown()) main.camera = fixpos.buf().minus(touch.dx/5, touch.dy/5);
			if(touch.isMove()) cameraSpeed.set(touch.sx <= 1 ? touch.sx : 1, touch.sy <= 10 ? touch.sy : 10);
			else {
				cameraSpeed.moveTime(vec2(), 10).floor(1000);
				main.camera.minus(cameraSpeed).floor(1000);
			}; //}*/
			
			
			if(touch.isClick() && touch.y>cvs.vh*90) {
				sortInventory(pleyar.inventory, {
					table: cvs.size.div(netmap.tile)
				});
				targetGold = pleyar;
				
				Scene.set(scenes.events);
				touch.onNull();
			};
			
			if(touch.isClick()) {
			//	console.log(gosticHead.useF, gosticMove.useF);
			//	console.log('p: '+touch.isPress(), 'u: '+touch.isUp(), 'c: '+touch.isClick());
				for(let i = 0; i < arrGold.length; i++) {
					if(touchC.getDistance(arrGold[i].getPosC()) < 10) {
						target.set(arrGold[i].getPosC());
						target.color = '#ee4400';
						break;
					} else {
						target.color = '#ccff77';
						target.set(touchC);
					};
				};
			};
		};
		
		
		//=======PROCES=======//
	//	gosticMove.updata();
	//	gosticHead.updata();
		
		if(!gosticMove.useF) pleyar.moveToC(target, 1);
		
		pleyar.pos.moveAngle(gosticMove.value**4*1, gosticMove.angle);
		target.moveAngle(gosticHead.value**4*3, gosticHead.angle);
		
		for(let i = 0; i < arrGold.length; i++) {
			if(pleyar.getPosC().isSame(arrGold[i].getPosC())) {
				sortInventory(arrGold[i].inventory, {
				    table: cvs.size.div(netmap.tile)
				});
				targetGold = arrGold[i];
				
				Scene.set(scenes.events);
				pleyar.pos.moveAngle(15, random(0, 360));
				target.set(pleyar.getPosC());
				return;
			};
		};
		
		
		//=======DRAW=======//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(main);
		
		for(let i = 0; i < arrGold.length; i++) arrGold[i].draw(main);
		
		main.save();
		main.beginPath();
		main.strokeStyle = '#ee7700';
		main.setLineDash([5, 3]);
		main.moveTo(pleyar.getPosC());
		main.lineTo(target);
		main.stroke();
		
		main.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; //'#00000088';
		main.ctx.fillRect(0, cvs.vh*90, cvs.vw*100, cvs.vh*10);
		
		main.ctx.setLineDash([]);
		main.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		main.ctx.strokeRect(0, cvs.vh*90, cvs.vw*100, cvs.vh*10);
		main.restore();
		
		target.draw(main);
		pleyar.draw(main);
		
	//	gosticMove.draw(main.ctx);
	//	gosticHead.draw(main.ctx);
	}; //==============================//
	
	this.exit = function() {
		cameraFixScene.set(main.camera);
	};
};
} catch(err) {alert(err.stack);};