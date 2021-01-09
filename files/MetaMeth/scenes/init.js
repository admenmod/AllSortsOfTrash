scenes.init = function() {
	window.targetGold = null;
	window.arrSpraits = Object.values(db);
	
	window.pleyar = new Ship({
		pos: vec2(random(100, cvs.width - 120), random(100, cvs.height - 120)),
		speed: 0.1,
		image: db.unit_icon_air
	});
	
	for(let i = 0; i < 10; i++) {
		pleyar.inventory.push(new Lote({
			size: vec2(netmap.tile.x, 0),
			image: arrSpraits[random(0, arrSpraits.length - 1)]
		}));
	};
	
	window.arrGold = [];
	for(let i = 0; i < 10; i++) {
		arrGold.push(new Gold({
			pos: vec2(random(10, cvs.width - 20), random(10, cvs.height - 20)),
			image: db.unit_icon_builder
		}));
		
		let l = random(1, 10);
		for(let j = 0; j < l; j++) {
			arrGold[i].inventory.push(new Lote({
				name: 'Gold',
				count: random(1, 3),
				
				size: vec2(netmap.tile.x, 0),
				image: db.unit_icon_builder
			}));
		};
	};
	
	
//	log(location, 2);
	
	this.init = function() {
	//	cvs.pixelDensity = 0.5;
		Scene.set(scenes.main);
	};
};