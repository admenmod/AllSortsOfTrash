




























'use strict';
//let imga = loadImage('img/ArtPack/Player_Speed.png');
//let imga = loadImage('audio/SpeedierThanPhotons.mp3');

class BaseNode {
	constructor(p) {
		this.type = 'BaseNode';
		this.pos = p.pos||vec2();
		this.size = p.size||vec2();
		this.event = new EventEmiter();
		this.scale = vec2(1, 1);
		this.alpha = p.alpha!==undefined?p.alpha:1;
	}
	setPos(v) {return this.pos.set(v).buf();}
	setPosC(v) {return this.pos.set(v.buf().minus(this.size.buf().div(2)));}
	getPos() {return this.pos.buf();}
	getPosC() {return this.pos.buf().plus(this.size.buf().div(2));}
	
	move(x, y) {return this.pos.move(x, y);}
	moveAngle(mv, a) {return this.pos.moveAngle(mv, a);}
	moveTo(v, mv) {return this.pos.moveTo(v, mv);}
	moveToC(v, mv) {return this.pos.moveTo(v.buf().minus(this.size.buf().div(2)), mv);}
	moveTime(v, t) {return this.pos.moveTime(v, t);}
	moveTimeC(v, t) {return this.pos.moveTime(v.buf().minus(this.size.buf().div(2)), t);}
	rotate(v) {return this.pos.rotate(v);}
	getDistance(v) {return this.pos.getDistance(v);}
	
	isStaticIntersect(b) {return this.pos.x+this.size.x>b.pos.x&&b.pos.x+b.size.x>this.pos.x&&this.pos.y+this.size.y>b.pos.y&&b.pos.y+b.size.y>this.pos.y;}
}

class Point {
	constructor(p) {
		this.type = 'Point';
		this.pos = p.pos||vec2();
		this.alpha = p.alpha!==undefined?p.alpha:1;
		this.colorPoint = p.colorPoint||'#ff0000';
		this.colorLine = p.colorLine||'#ffffff';
		this.lineWidth = p.lineWidth||1;
		this.lineLinght = p.lineLinght||100;
		this.lineDash = p.lineDash||[];
		this.radius = p.radius||1;
		this.o = 0;
	}
	draw(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.globalAlpha = this.alpha;
		ctx.strokeStyle = this.colorLine;
		ctx.lineWidth = this.lineWidth;
		ctx.lineDashOffset = this.o;
		ctx.setLineDash(this.lineDash);
		ctx.moveTo(this.pos.x-this.lineLinght, this.pos.y);
		ctx.lineTo(this.pos.x+this.lineLinght, this.pos.y);
		ctx.moveTo(this.pos.x, this.pos.y-this.lineLinght);
		ctx.lineTo(this.pos.x, this.pos.y+this.lineLinght);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.fillStyle = this.colorPoint;
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.restore();
	}
}

class ImageNode extends BaseNode {
	constructor(p) {
		super(p);
		this.type = 'ImageNode';
		this.image = p.image;
		this.angle = p.angle||0;
		this.alpha = p.alpha!==undefined?p.alpha:1;
		if(!p.size) this.size = vec2(this.image.width, this.image.height);
	}
	draw(ctx) {
		ctx.save();
		if(this.angle != 0) ctx.setTranslate(this.angle, this.getPosC());
		ctx.globaAlpha = this.alpha;
		ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);
		
//		ctx.strokeStyle = '#ffff00';
//		ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.restore();
	}
}

class Ship extends ImageNode {
	constructor(p) {
		super(p);
		this.type = 'Ship';
		this.HP = p.HP||100;
		this.DM = p.DM||20;
		this.mass = p.mass||0;
		this.speed = p.speed||0;
		this.bullets = [];
		
		this.cel = new Point({
			pos: p.cel||this.pos.buf(),
			colorPoint: '#ee0000',
			colorLine: '#00cc00',
			lineLinght: 10,
			radius: 2
		});
	}
	attack(img) {
		this.bullets.push(new ImageNode({
			pos: this.getPosC().minus(18/8, 18/8),
			size: vec2(18/4, 18/4),
			angle: this.angle-Math.PI/2,
			image: img
		}));
	};
	draw(ctx) {
		ctx.save();
		if(this.angle) ctx.setTranslate(this.angle, this.getPosC());
		if(this.image) ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);
		else {
			ctx.fillStyle = '#ff3333';
			ctx.font = '30px Arial';
			ctx.fillText('Error: load image ;)', this.pos);
		};
//		ctx.strokeStyle = '#ffff00';
//		ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.restore();
	}
}

class Player extends Ship {
	constructor(p) {
		super(p);
		this.type = 'Pleyar';
	}
	draw(ctx) {
		ctx.save();
		if(this.angle) ctx.setTranslate(this.angle, this.getPosC());
		if(this.image) ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);
		else {
			ctx.fillStyle = '#ff3333';
			ctx.font = '30px Arial';
			ctx.fillText('Error: load image ;)', this.pos);
		};
//		ctx.strokeStyle = '#ffff00';
//		ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.restore();
	}
}

class ImageMapNode extends BaseNode {
	constructor(p) {
		super(p);
		this.type = 'ImageMapNode';
		this.posS = p.posS||vec2();
		this.sizeS = p.sizeS||vec2();
		this.image = p.image;
		this.angle = p.angle||0;
		this.alpha = p.alpha||0;
		if(!p.size) this.size = vec2(this.image.width, this.image.height);
	}
	draw(ctx) {
		ctx.save();
		if(this.angle != 0) ctx.setTranslate(this.angle, this.getPosC());
		ctx.globaAlpha = this.alpha;
		ctx.drawImage(this.image, this.posS.x, this.posS.y, this.sizeS.x*(this.size.x/this.size.y), this.sizeS.y, this.pos.x, this.pos.y, this.size.x*(this.sizeS.x/this.sizeS.y), this.size.y);
		
//		ctx.strokeStyle = '#ffff00';
//		ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.restore();
	}
}

class Planet extends BaseNode {
	constructor(p) {
		super(p);
		this.type = 'Planet';
		this.mass = p.mass||0;
		this.colorGrad = p.colorGrad||[0, '#ffffff', 0.7, '#ffff00', 1, 'rgba(255, 0, 0, 0)'];
		this.ydroRadius = p.ydroRadius||0;
		this.radius = p.radius||0;
		this.o = 0;
		this.size = vec2(this.radius, this.radius);
	}
	draw(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.globalAlpha = this.alpha;
//		this.o+=0.001;
//		let u = (this.radius-this.ydroRadius)/2-7+this.o;
		let grd = ctx.createRadialGradient(this.pos.x, this.pos.y, this.ydroRadius, this.pos.x, this.pos.y, this.radius);
		for(let i = 0; i<this.colorGrad.length; i+=2) grd.addColorStop(this.colorGrad[i], this.colorGrad[i+1]);
		ctx.fillStyle = grd;
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.restore();
	};
}

class Button extends BaseNode {
	constructor(p) {
		super(p);
		this.type = 'Button';
		this.color = p.color||'#ffffff';
		this.back = p.back||'rgba(0,0,0,0)';
		this.borderColor = p.borderColor||'rgba(0,0,0,0)';
		this.borderWidth = p.borderWidth||1;
		this.font = p.font||'Arial';
		this.scale = p.scale||10;
		this.text = p.text||'';
		this.ed = p.ed||'px';
	}
	draw(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = this.back;
		ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.lineWidth = this.borderWidth;
		ctx.strokeStyle = this.borderColor;
		ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.fillStyle = this.color;
		ctx.font = this.scale+this.ed+' '+this.font;
		ctx.fillText(this.text, this.pos.x+this.size.x/2-ctx.measureText(this.text).width/2, this.pos.y+this.size.y/2+this.scale/3);
		ctx.restore();
	}
}