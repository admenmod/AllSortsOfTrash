		let s = 0, st = 0, r = 0;
		if(shipLargeBody.targets.length) {
			r = shipLargeBody.getPosC().rotate(shipLargeBody.targets[0]);
			
		//	shipLargeBody.angle = loopNum(shipLargeBody.angle, -Math.PI, Math.PI);
			
			
		//	s = loopNum(r-shipLargeBody.angle, -Math.PI, Math.PI);
			s = r-shipLargeBody.angle;
			
			
			
			main.save();
			main.beginPath();
			main.font = '15px Arial';
			main.ctx.fillStyle = '#eeeeee';
			main.ctx.fillText('s: '+s/(Math.PI/180), 100, 140);
			main.ctx.restore();
			
		//	shipLargeBody.angle += Math.abs(s)>0.01 ? Math.sign(s)*0.01:s;
			if(s < -0.001 && s > 0.001) 
			shipLargeBody.angle += Math.sign(s)*0.01;
			
			let speed = Math.abs(Math.cos(s))*0.02;
			shipLargeBody.vel.moveAngle(speed, shipLargeBody.angle);
			
			if(shipLargeBody.getPosC().getDistance(shipLargeBody.targets[0]) < 50) shipLargeBody.targets.shift();
		};