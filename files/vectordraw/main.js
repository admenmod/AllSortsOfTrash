'use strict';
//========== Scenes > Start ==========//
scenes.start = function() {
//	let v = new BaseGeometry(100, 100);
	let struct = new Structure(100, 100);
	struct.add('lineTo', new VectorNode(50, 20));
	struct.add('quadraticCurveTo',
		new VectorNode(150, 120),
		new VectorNode(200, 50)
	);
//	struct.add('lineTo', new VectorNode(300, 300));
//	console.log(struct);
//	struct.draw(back);
	
	
	let state = 0;
	let tools = 0;
	window.arr = [];
	let geomCount = 0;
	let ctx = main;
	
	
	//=======updata=======//
	let fixpos = main.camera.buf();
	let cameraSpeed = vec2();
	
	this.updata = function() {
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		let touchC = main.camera.buf().plus(touch);
		
		if(touch.isDblClick()) netmap.size.set(cvs.width, cvs.height);
		
		
		//=======prePROCES=======//
		if(touch.isClick()&&touch.y<50&&touch.x>cvs.vw*50) state = (state+1)%4;
		if(touch.isClick()&&touch.y<50&&touch.x<cvs.vw*50) {
			state = 1;
			tools = (tools+1)%5;
		};
		if(touch.isClick()&&touch.x<cvs.vw*50&&touch.y>cvs.height-50) geomCount = (geomCount+1)%(arr.length+1);
		if(touch.isClick()&&touch.y>cvs.height-50&&touch.x>cvs.vw*50) {
			for(let i = 0; i<arr.length; i++) {
				for(let k = 0; k<focus.targetV.length; k++) {
					if(arr[i].arr.indexOf(focus.targetV[k]) != -1) {
						arr[i].arr.splice(arr[i].arr.indexOf(focus.targetV[k]), 1);
						focus.targetV.splice(k, 1);
					};
				};
			};
		};
		
		
		if(touch.isTimeDown()) focusRect.active = true;
		
		
		if(touch.y>50&&touch.y<cvs.height-50) {
			if(state==1&&touch.isClick()) {
				if(geomCount==arr.length) arr.push(new Structure(touchC.x, touchC.y));
				else {
					arr[geomCount].add(
						(tools==1?'lineTo':tools==2?'quadraticCurveTo':tools==3?'bezierCurveTo':'lineTo'),
						new VectorNode(touchC.x+5, touchC.y+5),
						new VectorNode(touchC.x+10, touchC.y+10),
						new VectorNode(touchC.x+20, touchC.y+20)
					); //arr.push(new VectorNode(touchC.x, touchC.y));
				};
			};
			
			if(touch.isPress()) {
				focusRect.pos1.set(touchC);
				focusRect.pos2.set(touchC);
			};
			if(focusRect.active) {
				if(touch.isMove()) focusRect.pos2.set(touchC);
				if(touch.isUp()) {
					if(geomCount!=arr.length) {
						for(let i = 0; i < arr[geomCount].arr.length; i++) {
							if(focusRect.isIntersect(arr[geomCount].arr[i])) {
								if(focus.targetV.indexOf(arr[geomCount].arr[i]) != -1) focus.targetV.splice(focus.targetV.indexOf(arr[geomCount].arr[i]), 1);
								else focus.targetV.push(arr[geomCount].arr[i]);
							};
						};
					};
					
					focusRect.pos1 = vec2();
					focusRect.pos2 = vec2();
					focusRect.active = false;
				};
			};
			
			if(state==3) {
				if(touch.isPress()) fixpos = main.camera.buf();
				if(touch.isDown()) main.camera = fixpos.buf().minus(touch.dx, touch.dy);
				if(touch.isMove()) cameraSpeed.set(touch.sx<=10?touch.sx:10, touch.sy<=10?touch.sy:10);
				else {
					cameraSpeed.moveTime(vec2(), 10);
					main.camera.minus(cameraSpeed);
				};
			};
			
			if(state==2&&!focusRect.active) {
				if(touch.isClick()&&geomCount!=arr.length) {
					let e = false;
						for(let i = 0; i < arr[geomCount].arr.length; i++) {
							if(arr[geomCount].arr[i].getDistance(touchC) < arr[geomCount].arr[i].radius+20) e = arr[geomCount].arr[i];
						};
					
					if(e&&focus.targetV.indexOf(e) != -1) focus.targetV.splice(focus.targetV.indexOf(e), 1);
					else if(e) focus.targetV.push(e);
//					SetlogDiv(focus.targetV);
				};
				if(focus.targetV.length) {
					if(touch.isPress()) focus.fixposV();
					if(touch.isDown()) {
						for(let i = 0; i<focus.targetV.length; i++) {
							focus.targetV[i].set(focus.arrfixposV[i].buf().plus(touch.dx, touch.dy).floor(0.2));
						};
					};
				};
			};
		};
		
		
		//=======PROCES=======//
		
		
		//=======DRAW=======//
		netmap.draw(main);
	/*	for(let i = 0; i<arr.length; i++) {
			let ctx = main;
			ctx.save();
			ctx.beginPath();
			ctx.lineWidth = 0.1;
			ctx.strokeStyle = '#44ee44';
			ctx.moveTo(arr[i].x, arr[i].y);
			ctx.lineTo(arr[(i+1)%arr.length].x, arr[(i+1)%arr.length].y);
			ctx.stroke();
			ctx.restore();
			
			arr[i].draw(main);
		};
		*/
		
		
		
/*		for(let i = 0; i<arr.length; i++) {
			arr[i].draw(main);
		};*/
		
		
//		v.draw(main);
		for(let i = 0; i<arr.length; i++) {
			arr[i].draw(main);
		};
		if(geomCount!=arr.length) {
			for(let k = 0; k<arr[geomCount].arr.length; k++) {
				arr[geomCount].arr[k].draw(main);
			};
		};
		
		focus.drawV(main);
		if(focusRect.active&&touch.isDown()) focusRect.draw(main);
		
		main.ctx.save();
		main.ctx.beginPath();
		main.ctx.fillStyle = '#00000077';
		main.ctx.fillRect(0, 0, cvs.width, 50);
		main.ctx.fillRect(0, cvs.height-50, cvs.width, 50);
		main.ctx.fillStyle = '#eeeeee';
		main.ctx.font = '12px sans-serif';
		main.ctx.fillText('state: '+state, cvs.vw*70, 20);
		main.ctx.fillText('tools: '+tools, cvs.vw*20, 20);
		
		main.ctx.fillText(touch.downSet+' '+touch.downTime, 100, 100);
		
		if(geomCount==arr.length) main.ctx.fillStyle = '#44ee44';
		main.ctx.fillText('geometry: '+(geomCount+1)+'/'+arr.length, cvs.vw*20, cvs.height-30);
		main.ctx.fillStyle = '#eeeeee';
		main.ctx.fillText('Delete', cvs.vw*70, cvs.height-30);
//		main.ctx.stroke();
		main.ctx.restore();
		
		
//		struct.draw(main);
		
		
		/*
		main.save();
		main.beginPath();
//		main.transform(1, 0.5, 0.2, 1, 0.1, 0);
		main.fillStyle = pat;
//		main.moveTo(200, 200);
//		main.quadraticCurveTo(200, 250, 250, 300);
//		main.closePath();
//		main.fillRect(10, 100, 100, 150);
//		main.strokeRect(10, 100, 100, 150);
		main.fillRect(0, 0, cvs.vw*100, cvs.vh*100);
		main.strokeRect(0, 0, cvs.vw*100, cvs.vh*100);
		main.restore();
		*/
	};
};