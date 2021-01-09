'use strict';
class BaseNode extends EventEmiter {
	constructor(p = {}) {
		super();
		this.type = 'BaseNode';
		this.pos = p.pos||vec2();
		this.size = p.size||vec2();
		this.scale = p.scale||1;
		this.alpha = p.alpha!==undefined?p.alpha:1;
	}
	setPos(v) {return this.pos.set(v).buf();}
	setPosC(v) {return this.pos.set(v.buf().minus(this.size.buf().inc(this.scale).div(2)));}
	getPos() {return this.pos.buf();}
	getPosC() {return this.pos.buf().plus(this.size.buf().inc(this.scale).div(2));}
	
	move(x, y) {return this.pos.move(x, y);}	moveAngle(mv, a) {return this.pos.moveAngle(mv, a);}

	moveTo(v, mv) {return this.pos.moveTo(v, mv);}
	moveToC(v, mv) {return this.pos.moveTo(v.buf().minus(this.size.buf().inc(this.scale).div(2)), mv);}
	moveTime(v, t) {return this.pos.moveTime(v, t);}
	moveTimeC(v, t) {return this.pos.moveTime(v.buf().minus(this.size.buf().inc(this.scale).div(2)), t);}
	rotate(v) {return this.pos.rotate(v);}
	getDistance(v) {return this.pos.getDistance(v);}
	
	isStaticIntersect(b) {return this.pos.x+this.size.x*this.scale>b.pos.x&&b.pos.x+b.size.x*b.scale>this.pos.x&&this.pos.y+this.size.y*this.scale>b.pos.y&&b.pos.y+b.size.y*b.scale>this.pos.y;}
}

class ImageNode extends BaseNode {
	constructor(p = {}) {
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
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.x*this.scale, this.size.y*this.scale);
		
//		ctx.strokeStyle = '#ffff00';
//		ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.restore();
	}
}



class VectorNode extends Vector2 {
	constructor(x, y, p = {}) {
		super(x, y);
		this.type = 'VectorNode';
		this.radius = p.radius||2;
		this.color = p.color||'#ccff77';
		
		this.vel = p.vel||vec2();
	}
	draw(ctx) {
		ctx.save();
		ctx.beginPath();
		if(this.angle) ctx.setTranslate(this.angle, this.getPosC());
		if(this.image) ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.x*this.scale, this.size.y*this.scale);
		else {
			ctx.fillStyle = '#ff3333';
			ctx.font = '30px Arial';
			ctx.fillText('Error: load image ;)', this.pos);
		};
//		ctx.strokeStyle = '#ffff00';
//		ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.restore();
	}
}//*/

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
		this.mass = p.mass||0;
		this.colorGrad = p.colorGrad||[0, '#ffffff', 0.7, '#ffff00', 1, 'rgba(255, 0, 0, 0)'];
		this.ydroRadius = p.ydroRadius||0;
		this.radius = p.radius||0;
		this.o = 0;
		this.size = vec2(this.radius, this.radius);
	}
	draw(ctx) {
		ctx.save();

		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.restore();
	}
}


//========== Objects ==========//
let netmap = {
    pos: vec2(),
    size: vec2(cvs.width, cvs.height),
    tile: vec2(50, 50),
    color: '#ffffff',
    lineWidth: 0.2,
    draw: function(ctx, pos = main.camera) {
        let el = vec2(-(pos.x % this.tile.x), -(pos.y % this.tile.y));
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        for (let x = -this.tile.x; x < this.size.x + this.tile.x * 2; x += this.tile.x) {
            ctx.ctx.moveTo(el.x + x, el.y - this.tile.y);
            ctx.ctx.lineTo(el.x + x, el.y + this.size.y + this.tile.y);
        };
        for (let y = -this.tile.y; y < this.size.y + this.tile.y * 2; y += this.tile.y) {
            ctx.ctx.moveTo(el.x - this.tile.x, el.y + y);
            ctx.ctx.lineTo(el.x + this.size.x + this.tile.x, el.y + y);
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
    active: false,
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



let focus = {
    targetV: [],
    arrfixposV: [],
    fixposV: function() {
        for (let i = 0; i < focus.targetV.length; i++) {
            this.arrfixposV[i] = this.targetV[i].buf();
        };
    },
    drawV: function(ctx = main) {
        if (this.targetV.length == 0) return;
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = '#00cc00';
        for (let i = 0; i < this.targetV.length; i++) {
            ctx.beginPath();
            ctx.arc(this.targetV[i].x, this.targetV[i].y, 1 + this.targetV[i].radius * 2, 0, Math.PI * 2);
            ctx.stroke();
        };
        ctx.restore();
    }
};

//==== Functions ====//