'use strict';
// import {EventEmiter, Vector2, vec2} from './assets/ver.js';
// import {log} from './assets/console.js';

class BaseNode extends EventEmiter {
	constructor(p = {}) {
		super();
		this.type = 'BaseNode';
		this.pos = p.pos||vec2();
		this.vel = p.vel||vec2();
		this.size = p.size||vec2();
		this.scale = p.scale||vec2(1, 1);
		this.alpha = p.alpha!==undefined?p.alpha:1;
	}
	setPos(v) {return this.pos.set(v).buf();}
	setPosC(v) {return this.pos.set(v.ot(this.size.buf().inc(this.scale).div(2))).buf();}
	getPos() {return this.pos.buf();}
	getPosC() {return this.pos.buf(this.size.buf().inc(this.scale).div(2));}
	
	move(x, y) {return this.pos.move(x, y);}
	moveAngle(mv, a) {return this.pos.moveAngle(mv, a);}
	moveTo(v, mv) {return this.pos.moveTo(v, mv);}
	moveToC(v, mv) {return this.pos.moveTo(v.ot(this.size.buf().inc(this.scale).div(2)), mv);}
	moveTime(v, t) {return this.pos.moveTime(v, t); }
	moveTimeC(v, t) {return this.pos.moveTime(v.ot(this.size.buf().inc(this.scale).div(2)), t);}
	rotate(v) {return this.pos.rotate(v);}
	getDistance(v) {return this.pos.getDistance(v);}
	
	isStaticIntersect(b) {return this.pos.x+this.size.x*this.scale>b.pos.x && b.pos.x+b.size.x*b.scale>this.pos.x && this.pos.y+this.size.y*this.scale>b.pos.y && b.pos.y+b.size.y*b.scale>this.pos.y;}
}

class ImageNode extends BaseNode {
	constructor(p = {}) {
		super(p);
		this.type = 'ImageNode';
		this.scale = p.scale||vec2(1, 1);
		this.sizePlus = p.sizePlus||vec2();
		this.image = p.image;
		this.angle = p.angle||0;
		this.offsetAngle = p.offsetAngle||0;
		this.alpha = p.alpha!==undefined?p.alpha:1;
		
		if(!p.size||p.size.isSame({x:0, y:0})) this.size = vec2(this.image.width, this.image.height);
		else {
			let w = p.size.x;
			let h = p.size.y;
			let s = this.image.width/this.image.height;
			if(!w != !h) this.size = vec2(w?w:h*s, h?h:w/s);
			else this.size = p.size;
		};
		
		if(p.posC) this.setPosC(p.posC);
	}
	
	set angle(a) {return this._angle = Math.PI/180*a;}
	get angle() {return this._angle/(Math.PI/180);}
	draw(ctx, pos = this.pos) {
		ctx.save();
	//	let pos = this.pos;//.buf().floor().plus(0.5);
		if(this._angle !== 0) ctx.setTranslate(this.offsetAngle+this._angle, this.getPosC());
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(this.image, pos.x, pos.y, this.size.x*this.scale.x+this.sizePlus.x, this.size.y*this.scale.y+this.sizePlus.y);
		
	//	ctx.strokeStyle = '#ffff00';
	//	ctx.strokeRect(this.pos.x, this.pos.y, this.size.x*this.scale.x, this.size.y*this.scale.y);
	//	ctx.strokeRect(this.pos.x-ctx.lineWidth/2, this.pos.y-ctx.lineWidth/2, this.size.x*this.scale.x+ctx.lineWidth, this.size.y*this.scale.y+ctx.lineWidth);
		ctx.restore();
	}
}


class Gostic {
	constructor(p = {}) {
		this.pos = p.pos||vec2();
		this._angle = 0;
		this.useF = false;
		
		this.radius = p.radius||70;
		this.radiusYadro = p.radiusYadro||50;
		this.colors = p.colors||[0, '#112233', 1, '#223344'];
		
		this.yadro = {
			pos: this.pos.buf(),
			radius: 30,
			radiusYadro: 5,
			colors: p.yadroColors||[0, '#223344', 1, '#112233']
		};
	}
	get value() {return Math.round(this.pos.getDistance(this.yadro.pos)/(this.radius-this.yadro.radius)*10000)/10000;}
	get angle() {return this._angle = this.value?this.pos.rotate(this.yadro.pos):this._angle;}
	updata() {
		let l = this.pos.getDistance(touch);
		if(touch.isPress()&&l<this.radius) this.useF = true;
		if(this.useF) {
			if(l<this.radius-this.yadro.radius) this.yadro.pos.set(touch);
			else {
				this.yadro.pos.set(this.pos);
				this.yadro.pos.moveAngle(this.radius-this.yadro.radius, this.yadro.pos.rotate(touch));
			};
		};
		if(touch.isUp()) this.useF = false;
		if(!this.useF) this.yadro.pos.moveTime(this.pos, 3);
	}
	draw(ctx) {
		ctx.save();
		ctx.globalAlpha = 0.7;
		
		ctx.beginPath();
		let grd = ctx.createRadialGradient(this.pos.x, this.pos.y, this.radiusYadro, this.pos.x, this.pos.y, this.radius);
		for(let i = 0; i < this.colors.length; i += 2) grd.addColorStop(this.colors[i], this.colors[i+1]);
		ctx.fillStyle = grd;
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		
		ctx.beginPath();
		grd = ctx.createRadialGradient(this.yadro.pos.x, this.yadro.pos.y, this.yadro.radiusYadro, this.yadro.pos.x, this.yadro.pos.y, this.yadro.radius);
		for(let i = 0; i < this.yadro.colors.length; i += 2) grd.addColorStop(this.yadro.colors[i], this.yadro.colors[i+1]);
		ctx.fillStyle = grd;
		ctx.arc(this.yadro.pos.x, this.yadro.pos.y, this.yadro.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.restore();
	}
}


class VectorNode extends Vector2 {
	constructor(x, y, p = {}) {
		super(x, y);
		this.type = 'VectorNode';
		this.radius = p.radius||2;
		this.color = p.color||'#ccff77';
		this.alpha = p.alpha!==undefined?p.alpha:1;
		
		this.vel = p.vel||vec2();
	}
	draw(ctx) {
		let pos = this.buf().floor().plus(0.5);
		ctx.save();
		ctx.beginPath();
		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = this.color;
		ctx.arc(pos.x, pos.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.restore();
	}
}


class SaveParamState {
	constructor({ctx}) {
		this.state = {};
		for(let i in ctx) {
			if(typeof ctx[i]!=='function'&&i!=='canvas') {
				this.state[i] = ctx[i];
			};
		};
	}
	set(ctx) {for(let i in this.state) if(ctx[i]!=this.state[i]) ctx[i] = this.state[i];}
}


class CameraMoveObject {
	constructor(v) {
		this.fixpos = v.buf();
		this.cameraSpeed = vec2();
	}
	updata(v) {
		if(touch.isPress()) this.fixpos = v.buf();
		if(touch.isDown()) v.set(this.fixpos.ot(touch.dx, touch.dy));
		if(touch.isMove()) this.cameraSpeed.set(Math.abs(touch.sx)<=10 ? touch.sx :Math.sign(touch.sx)*10, Math.abs(touch.sy)<=10 ? touch.sy :Math.sign(touch.sy)*10);
		else {
			this.cameraSpeed.moveTime(Vector2.ZERO, 10).floor(1000);
			v.minus(this.cameraSpeed).floor(1000);
			if(this.cameraSpeed.x < 0.02 && this.cameraSpeed.x > -0.02) this.cameraSpeed.x = 0;
			if(this.cameraSpeed.y < 0.02 && this.cameraSpeed.y > -0.02) this.cameraSpeed.y = 0;
		};
	}
};


//========== Objects ==========//
let netmap = {
	pos: vec2(),
	offset: vec2(),
	size: vec2(cvs.width, cvs.height),
	tile: vec2(50, 50),
	color: '#ffffff',
	lineWidth: 0.2,
	cord: true,
	draw: function({ctx}, pos = main.camera) {
	//	pos = pos.buf().floor().plus(0.5);
		
		let el = vec2(-(pos.x%this.tile.x), -(pos.y%this.tile.y));
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.lineWidth;
		for(let x = -this.tile.x; x<this.size.x+this.tile.x*2; x += this.tile.x) {
			ctx.moveTo(this.offset.x + el.x + x, this.offset.y + el.y - this.tile.y);
			ctx.lineTo(this.offset.x + el.x + x, this.offset.y + el.y + this.size.y + this.tile.y);
		};
		for(let y = -this.tile.y; y < this.size.y + this.tile.y * 2; y += this.tile.y) {
			ctx.moveTo(this.offset.x + el.x - this.tile.x, this.offset.y + el.y + y);
			ctx.lineTo(this.offset.x + el.x + this.size.x + this.tile.x, this.offset.y + el.y + y);
		};
		ctx.stroke();
		
		
		if(this.cord) {
			ctx.fillStyle = '#ffff00';
			ctx.globalAlpha = 0.4;
		/*	for(let x = -this.tile.x; x<this.size.x+this.tile.x*2; x += this.tile.x) {
				for(let y = -this.tile.y; y<this.size.y+this.tile.y*2; y += this.tile.y) {
				//	ctx.fillText(`${~~((pos.x+x)/this.tile.x)*this.tile.x}:${~~((pos.y+y)/this.tile.y)*this.tile.y}`, this.offset.x+el.x+x, this.offset.y+el.y+y+10);
				
					ctx.fillText(~~((pos.x+x)/this.tile.x)*this.tile.x, this.offset.x+el.x+x, this.offset.y+el.y+y+10);
					ctx.fillText(~~((pos.y+y)/this.tile.y)*this.tile.y, this.offset.x+el.x+x, this.offset.y+el.y+y+20);
				};
			};
		*/
			
			
			for(let x = -this.tile.x; x<this.size.x+this.tile.x*2; x += this.tile.x) {
				ctx.fillText(~~((pos.x+x)/this.tile.x)*this.tile.x, this.offset.x+el.x+x+2, 12);
			};
			for(let y = -this.tile.y; y<this.size.y+this.tile.y*2; y += this.tile.y) {
				ctx.fillText(~~((pos.y+y)/this.tile.y)*this.tile.y, 2, this.offset.y+el.y+y-2);
			};
		};
		
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
	active: false,
	isIntersect: function(v) {
		return v.x>this.pos1.x===v.x<this.pos2.x && v.y>this.pos1.y===v.y<this.pos2.y;
	},
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
		ctx.strokeRect(this.pos1.x, this.pos1.y, this.pos2.x - this.pos1.x, this.pos2.y - this.pos1.y);
		ctx.restore();
	}
};

//========== Function ==========//
function setTickout(anim, tickout = 1, ...arg) {
	if(anim) setTickout.anims.push({tick: 0, tickout, anim, arg});
};
setTickout.anims = [];
setTickout.updata = function() {
	for(let i = 0; i < this.anims.length; i++) {
		if(this.anims[i].tick++ >= this.anims[i].tickout) {
			let a = this.anims.splice(i, 1)[0];
			a.anim(...a.arg);
		};
	};
};

// export {BaseNode, ImageNode, Gostic, VectorNode, SaveParamState, CameraMoveObject, netmap, focusRect, setTickout};
