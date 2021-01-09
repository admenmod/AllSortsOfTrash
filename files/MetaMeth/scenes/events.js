scenes.events = function() {
	let u = 0, nx = 0, ny = 0;
	//	crisp-edges
	
	//=======init=======//
	this.init = function() {
		main.imageSmoothingEnabled = false;
		netmap.cord = false;
		
		back.camera = main.camera.set(0);
		back.ctx.clearRect(0, 0, cvs.width, cvs.height);
		back.ctx.fillStyle = '#112233';
		back.ctx.fillRect(0, 0, cvs.width, cvs.height);
		
		netmap.color = '#88ccff';
		netmap.lineWidth = 0.2;
		netmap.tile.set(cvs.width/6);
		netmap.offset.y = cvs.height%netmap.tile.y;
		
		sortInventory(targetGold.inventory, {
		    table: cvs.size.div(netmap.tile)
		});
		
		netmap.draw(back);
		
		
		back.save();
		back.fillStyle = '#223344';
		back.fillRect(0, 0, cvs.width, cvs.height%netmap.tile.y-1);
		
		back.fillStyle = '#77eeff';
		back.font = '12px Arial';
		back.textAlign = 'center';
		back.ctx.textBaseline = 'middle';
		back.fillText('Inventory', cvs.width/2, cvs.height%netmap.tile.y/2);
		back.restore();
	};
	
	
	//=======updata=======//
	let fixpos = main.camera.buf();
	let cameraSpeed = vec2();
	
	this.updata = function() {
		let touchC = main.camera.buf().plus(touch);
		if(touch.isDblClick()) netmap.size.set(cvs.width, cvs.height);
		
		//=======prePROCES=======//
		/*{
		if(touch.isPress()) fixpos = main.camera.buf();
		if(touch.isDown()) main.camera = fixpos.buf().minus(touch.dx, touch.dy);
		if(touch.isMove()) cameraSpeed.set(touch.sx <= 10 ? touch.sx : 10, touch.sy <= 10 ? touch.sy : 10);
		else {
			cameraSpeed.moveTime(vec2(), 10);
			main.camera.minus(cameraSpeed).floor(1000);
		}; //}*/
		
		
		
		if(touch.isUp()) {
			for(let i = 0; i < targetGold.inventory.length; i++) {
				if(touch.isStaticRectIntersect(targetGold.inventory[i])) {
				//	console.log(targetGold != pleyar, targetGold);
					if(targetGold != pleyar) pleyar.inventory.push(targetGold.inventory.splice(i, 1)[0]);
					sortInventory(targetGold.inventory, {
					    table: cvs.size.div(netmap.tile)
					});
				};
			};
			
			if(!targetGold.inventory.length||targetGold == pleyar) {
				Scene.set(scenes.main);
				touch.onNull();
			};
		};
		
		
		//=======PROCES=======//
		
		
		
		//=======DRAW=======//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		
		if(touch.isDown() && u<1) u = ~~((u+0.05)*100)/100;
		else if(u>0) u = ~~((u-0.05)*100)/100;
		
		main.save();
		main.globalAlpha = u;
		main.fillStyle = '#007799';
		touchC.minus(netmap.tile.x/2);
		let x = ~~(touchC.x/netmap.tile.x)*netmap.tile.x+netmap.offset.x;
		let y = ~~(touchC.y/netmap.tile.y)*netmap.tile.y+netmap.offset.y;
		if(x != nx || y != ny) {
		    nx = x;
		    ny = y;
		    u = 0;
		};
		main.fillRect(x, y, netmap.tile.x, netmap.tile.y);
		main.restore();
		
		for(let i = 0; i < targetGold.inventory.length; i++) targetGold.inventory[i].draw(main);
	}; //==============================//
};