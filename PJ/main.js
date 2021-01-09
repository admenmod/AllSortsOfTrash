




























'use strict';
(function() {
	//========== LoopGame ==========//
	function _updata() {
		Scene.active_scene.updata();
		touch.onNull();
		requestAnimationFrame(_updata);
	}; running.then(function() {
	//========== Functions ==========//
	function isIntersectCamera(b) {
		return 5;
	};
	
	//========== Objects ==========//
	let netmap = {
		pos: vec2(),
		size: vec2(cvs.width, cvs.height),
		tile: vec2(100, 100),
		draw: function(ctx, pos=main.camera) {
			let el = vec2(-(pos.x%this.tile.x), -(pos.y%this.tile.y));
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = '#ffffff';
			ctx.lineWidth = 0.2;
			for(let x = -this.tile.x; x<this.size.x+this.tile.x*2; x+=this.tile.x) {
				ctx.ctx.moveTo(el.x+x, el.y-this.tile.y);
				ctx.ctx.lineTo(el.x+x, el.y+this.size.y+this.tile.y);
			};
			for(let y = -this.tile.y; y<this.size.y+this.tile.y*2; y+=this.tile.y) {
				ctx.ctx.moveTo(el.x-this.tile.x, el.y+y);
				ctx.ctx.lineTo(el.x+this.size.x+this.tile.x, el.y+y);
			};
			ctx.stroke();
			/*
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#00ff00';
			ctx.strokeRect(el.x, el.y, this.size.x, this.size.y);
			ctx.closePath();
			*/
			ctx.restore();
		}
	};
	
	let focusRect = {
		pos1: vec2(),
		pos2: vec2(),
		o: 0,
		draw: function(ctx) {
			ctx.save();
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#00ff00';
			ctx.moveTo(this.pos1.x, this.pos1.y);
			ctx.lineTo(this.pos2.x, this.pos2.y);
			ctx.stroke();
			ctx.closePath();
			
			ctx.lineDashOffset = this.o;
			ctx.setLineDash([5, 2]);
			ctx.strokeStyle = '#cccccc';
			ctx.strokeRect(this.pos1.x, this.pos1.y, this.pos2.x-this.pos1.x, this.pos2.y-this.pos1.y);
			ctx.restore();
		}
	};
	
	//========== Scenes ==========//
	let scenes = {};
	//========== Scenes > Start ==========//
	scenes.menu = new Scene(function() {
		let start = new Button({
			pos: vec2(50*vw-40*vw/2, 50*vh-30/2-40),
			size: vec2(40*vw, 30),
			borderWidth: 1,
			borderColor: '#ffffff',
			text: 'START',
			scale: 20,
			color: '#00aaff',
			back:  '#444444'
		});
		let info = new Button({
			pos: vec2(50*vw-40*vw/2, 50*vh-30/2),
			size: vec2(40*vw, 30),
			borderWidth: 1,
			borderColor: '#ffffff',
			text: 'INFO',
			scale: 20,
			color: '#00aaff',
			back:  '#444444'
		});
		let exit = new Button({
			pos: vec2(50*vw-40*vw/2, 50*vh-30/2+40),
			size: vec2(40*vw, 30),
			borderWidth: 1,
			borderColor: '#ffffff',
			text: 'EXIT',
			scale: 20,
			color: '#00aaff',
			back:  '#444444'
		});
		
		
		this.updata = function() {
			//========== Proces ==========//
			if(touch.isTouchEventBox(start)) {
	//			listMenu.hidden = !1;
				Scene.set(scenes.start);
			};
			if(touch.isTouchEventBox(info)) Scene.set(scenes.info);
			if(touch.isTouchEventBox(exit)) close();
			
			if(touch.isTouchEventBox(start, touch.fP)) start.back = '#555555';
			if(touch.isTouchEventBox(info, touch.fP)) info.back = '#555555';
			if(touch.isTouchEventBox(exit, touch.fP)) exit.back = '#555555';
			if(touch.isUp()) {
				start.back = '#444444';
				info.back = '#444444';
				exit.back = '#444444';
			};
			
			//========== Render ==========//
			main.fillStyle = '#444444';
			main.fillRect(0, 0, cvs.width, cvs.height);
			start.draw(main);
			info.draw(main);
			exit.draw(main);
		};
	});

	//========== Scenes > Start ==========//
	scenes.start = new Scene(function() {
		let points = [];
		let point = new Point({
			pos: vec2(200, 200),
			lineWidth: 0.5,
			lineLinght: 1000,
			colorLine: '#00ccff',
			colorPoint: '#00ff00',
			radius: 2
		});
		
		
		//---player---//
		let pley = new Player({
			pos: vec2(50, 1025),
			cel: vec2(50, 1025),
			speed: 1,
			HP: 100,
			DM: 100,
			size: vec2(db.PlayerSpeed.width/4, db.PlayerSpeed.height/4),
			image: db.PlayerSpeed
		});
		
		
		pley.i = null;
		pley.path = {o: 0,
			color: '#00cc00',
			draw: function(cel, ctx, pos=pley.getPosC().moveAngle(pley.size.y/2+10, pley.angle-Math.PI/2)) {
				this.o+=pley.speed+0.2;
				ctx.save();
				ctx.beginPath();
				ctx.lineDashOffset = this.o;
				ctx.setLineDash([5, 2]);
				ctx.strokeStyle = this.color;
				ctx.moveTo(pley.cel.pos.x, pley.cel.pos.y);
				ctx.lineTo(pos.x, pos.y);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();
			}
		};
		
		//---pirates---//
		let pirates = [
			new Ship({
				pos: vec2(400, 400),
				size: vec2(92/4, 94/4),
				HP: 100,
				DM: 10,
				speed: 0.9,
				image: db.EnemyNeon1
			}),
			new Ship({
				pos: vec2(300, 400),
				size: vec2(114/4, 107/4),
				HP: 500,
				DM: 70,
				speed: 0.5,
				image: db.EnemyNeon2
			}),
			new Ship({
				pos: vec2(200, 400),
				size: vec2(138/4, 141/4),
				speed: 0.2,
				HP: 1000,
				DM: 50,
				image: db.EnemyNeon3
			}),
		];
		
		//---planet---//
		let satorn = new Planet({
			pos: vec2(),
			radius: 400,
			ydroRadius: 200
		});
		let luna = new Planet({
			pos: vec2(500, 700),
			radius: 200,
			ydroRadius: 100,
			colorGrad: [
				0,	'#eeeeff',
				0.7,'#aaaaff',
				1,	'rgba(100, 100, 250, 0)'
			]
		});
		let homePlanet = new Planet({
			pos: vec2(50, 1050),
			radius: 50,
			ydroRadius: 20,
			colorGrad: [
				0,  '#00ffff',
				1,	'rgba(0, 0, 0, 0)'
			]
		});
		
		
		//---homeImage---//
		let pointHome = new ImageNode({
			pos: vec2(0, 1000),
			size: vec2(100, 100),
			image: db.Point
		});
		
		//---meteors---//
		let meteors = [];
		for(let i = 0; i<10; i++) {
			let s = random(10, 100)/100;
			meteors.push(new ImageNode({
				pos: vec2(random(-100, 600), random(-100, 600)),
				size: vec2(73*s, 76*s),
				angle: random(0, 360),
				image: db.Meteor
			}));
			meteors[i].speed = random(0, 50)/100;
			meteors[i].angleS = random(0, 100)/10000;
			meteors[i].angleM = random(0, Math.PI)/1000;
		};
		
		//---buttons---//
		let buttons = [
			new ImageNode({
				pos: vec2(70*vw, vh),
				image: db.Button1
			}), new ImageNode({
				pos: vec2(80*vw, vh),
				image: db.Button2
			}), new ImageNode({
				pos: vec2(90*vw, vh),
				image: db.Button3
			})
		];
		
		//---masseng---//
		let masseng = new Button({
			pos: vec2(0, cvs.height-30),
			size: vec2(cvs.width, 30),
			text: '',
			scale: 20,
			color: '#ffffff'
		});
		
		//---let camera---//
		let fixpos = main.camera.buf(), cameraSpeed = vec2();
		main.camera.set(-200, 100);
		
		
		this.updata = function() {
			main.ctx.clearRect(0, 0, cvs.width, cvs.height);
			let touchLocal = vec2(touch.x+main.camera.x, touch.y+main.camera.y);
		
			if(touch.isPress()) fixpos = main.camera.buf();
			if(touch.isDown()) main.camera = fixpos.buf().minus(touch.dx, touch.dy);
			if(touch.isMove()) cameraSpeed.set(touch.sx<=10?touch.sx:10, touch.sy<=10?touch.sy:10);
			else {
				cameraSpeed.moveTime(vec2(), 10);
				main.camera.minus(cameraSpeed);
			};
//			main.camera.moveTime(pley.getPosC().minus(cvs.width/2, cvs.height/2), 10);
		
		
			//========== Proces ==========//
			point.pos.moveTime(touch, 20);
			
			if(!(touch.isTouchEventBox(buttons[0])||touch.isTouchEventBox(buttons[1])||touch.isTouchEventBox(buttons[2]))) {
				if(touch.isClick()) {
					for(let i = 0; i<pirates.length; i++) {
						if(touchLocal.isStaticRectIntersect(pirates[i])) {
							pley.i = i;
							break;
						} else pley.i = null;
					};
					if(pirates.length==0) pley.i = null;
					if(pley.i === null) pley.cel.pos = vec2(touchLocal.x, touchLocal.y);
					pley.angle = pley.rotate((pley.i===null||!pirates.length?pley.cel.pos:pirates[pley.i].getPosC()).minus(pley.size.buf().div(2)))+Math.PI/2;
					
					if(pley.i!==null&&pirates.length) {
						pley.attack(db.PlayerBullet);
						if(pirates[pley.i]) pley.cel.pos = pirates[pley.i].getPosC();
						pley.path.color = '#cc0000';
						pley.cel.colorLine = '#ffff00';
						pley.cel.colorPoint = '#ff0000';
					} else {
						pley.cel.pos = touchLocal;
						pley.path.color = '#00cc00';
						pley.cel.colorLine = '#00cc00';
						pley.cel.colorPoint = '#ee0000';
					};
				};
				if(touch.isDblClick()) {
					if(pley.i===null) pley.setPosC(touchLocal.buf().moveAngle(pley.size.y/2+10, pley.angle+Math.PI/2));
/*					points.push(new Point({
						pos: touchLocal,
						lineWidth: 0.5,
						lineLinght: 1000,
						lineDash: [25, 5],
						colorPoint: '#ff0000',
						colorLine: '#ffffff',
						radius: 2
					}));
					if(points.length>5) points.splice(0, 1);
					*/
				};
			};
			
			
			if(pley.i!==null&&pirates[pley.i]) pley.cel.pos = pirates[pley.i].getPosC();
			if(pley.i===null) pley.moveToC(pley.cel.pos.buf().moveAngle(pley.size.y/2+10, pley.angle+Math.PI/2), pley.speed);
			
			for(let i = 0; i<pley.bullets.length; i++) {
				pley.bullets[i].moveAngle(5, pley.bullets[i].angle);
				if(!pley.bullets[i].pos.isStaticRectIntersect({pos: vec2(main.camera.x, main.camera.y), size: vec2(cvs.width, cvs.height), scale: vec2(1, 1)})) pley.bullets.splice(i, 1);
			};
			
/*			if(touch.isPress()) focusRect.pos1.set(touch);
			if(touch.isDown()) {
				focusRect.pos2.set(touch);
				focusRect.o+=1;
			};*/
			
			if(pley.isStaticIntersect(pointHome)) {
				pointHome.size.moveTime(vec2(150, 150), 20);
				pointHome.pos.moveTime(vec2(-25, 975), 20);
				if(touch.isTouchEventBox(buttons[0])) {
					pley.image = db.PlayerSpeed;
					pley.speed = 1;
					pley.HP = 100;
					pley.DM = 10;
					pley.size = vec2(db.PlayerSpeed.width/4, db.PlayerSpeed.height/4);
				} else if(touch.isTouchEventBox(buttons[1])) {
					pley.image = db.PlayerAttack;
					pley.speed = 0.5;
					pley.HP = 500;
					pley.DM = 70;
					pley.size = vec2(db.PlayerAttack.width/4, db.PlayerAttack.height/4);
				} else if(touch.isTouchEventBox(buttons[2])) {
					pley.image = db.PlayerDefense;
					pley.speed = 0.2;
					pley.HP = 1000;
					pley.DM = 50;
					pley.size = vec2(db.PlayerDefense.width/4, db.PlayerDefense.height/4);
				};
			} else {
				pointHome.size.moveTime(vec2(100, 100), 10);
				pointHome.pos.moveTime(vec2(0, 1000), 10);
			};
			pointHome.angle += 0.01;
			
			//========== Massenges Alerts ==========//
			masseng.alpha = Math.floor(masseng.alpha*1000)/1000;
			if(pley.getDistance(satorn.pos)<satorn.radius+pley.size.y/2+10||pley.getDistance(luna.pos)<luna.radius+pley.size.y/2+10) {
				masseng.color = '#ff3333';
				masseng.alpha = 1;
				masseng.text = 'Сталкновение не избежно!';
			} else if(masseng.alpha>=0.01) masseng.alpha-=0.01;
			
/*			if(pley.getDistance(satorn.pos)<satorn.radius+pley.size.y/2||pley.getDistance(luna.pos)<luna.radius+pley.size.y/2) {
				pley.setPosC(vec2(50, 1050));
				pley.angle = 0;
				pley.cel.pos = pley.getPosC().moveAngle(pley.size.y/2+10, pley.angle-90);
			};*/
			
			//========== Render ==========//
			netmap.draw(main);
			for(let i = 0; i<points.length; i++) {
				points[i].o = --points[i].o%30;
				points[i].draw(main);
			};
			
			satorn.draw(main);
			luna.draw(main);
//			homePlanet.draw(main);
			pointHome.draw(main);
			
/*			for(let i = 0; i<meteors.length; i++) {
				meteors[i].moveAngle(meteors[i].speed, meteors[i].angleM);
				meteors[i].angle+=meteors[i].angleS;
				meteors[i].draw(main);
			};*/
			
//			ship.draw(main);
		
			for(let i = 0; i<pley.bullets.length; i++) pley.bullets[i].draw(main);
			
			pley.draw(main);
			for(let i = 0; i<pirates.length; i++) {
				for(let i2 = 0; i2<pley.bullets.length; i2++) {
					if(pirates[i].isStaticIntersect(pley.bullets[i2])) {
						pirates[i].HP-=pley.DM;
						pley.bullets.splice(i2, 1);
					};
				};
				if(pirates[i].HP>0) {
					pirates[i].angle = pirates[i].rotate(pley.getPosC().moveAngle(2, pley.angle-Math.PI/2))+Math.PI/2;
					if(pirates[i].getPosC().getDistance(pley.getPosC())>pley.size.y/2+50) pirates[i].moveToC(pley.getPosC(), pirates[i].speed);
					pirates[i].draw(main);
				} else pirates.splice(i, 1);
			};
			if(!pley.getPosC().isSame(pley.cel.pos.buf().moveAngle(pley.size.y/2+10, pley.angle+Math.PI/2))) {
				pley.path.draw(pley.cel.pos, main);
				pley.cel.draw(main);
			};
//			point.draw(main.ctx);
//			if(touch.isDown()) focusRect.draw(main.ctx);
			masseng.draw(main.ctx);
			
			for(let i = 0; i<buttons.length; i++) buttons[i].draw(main.ctx);
		};
	}); Scene.set(scenes.start);
	requestAnimationFrame(_updata);});
})();