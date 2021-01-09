'use strict';
//========== --Ship-- ==========//
class Ship extends ImageNode {
	constructor(p) {
		super(p);
		this.vel = vec2();
		this.speed = p.speed||0.1;
		
		this.inventory = [];
	}
}

class Gold extends ImageNode {
	constructor(p) {
		super(p);
		this.inventory = [];
	}
}

class Lote extends ImageNode {
	constructor(p) {
		super(p);
		this.name = p.name||'Lote';
		this.count = p.count||1;
	}
}

//========== --fizics_tcan-- ==========//
class DinamicPoint extends VectorNode {
    constructor(x, y, p = {}) {
        super(x, y, p);
        this.type = p.type||'dinamic';
        this.targets = [];
    }
}


//========== --air_uniy-- ==========//
class UnitNode extends ImageNode {
    constructor(p = {}) {
        super(p);
        this.vel = p.vel || vec2();
        this.speed = p.speed || 0.1;

        this.HPfull = p.HPfull || 100;
        this.HP = Number(p.HP) || 100;
        this.HPcolor = p.HPcolor || '#00ff44';
        this.HPcolorRed = p.HPcolorRed || '#ff4400';
        
        this.targets = [];
    }
    draw(ctx) {
        super.draw(ctx);
        
        /*ctx.save();
        ctx.globalAlpha = this.alpha;
        
        ctx.beginPath();
	    ctx.lineWidth = 0.1;
        ctx.strokeStyle = '#44ee00';
        ctx.arc(this.getPosC(), 35, 0, Math.PI*2);
        ctx.stroke();
        */
        if(this.HP != this.HPfull) {
	        ctx.lineWidth = 1.5;
	
    	    ctx.beginPath();
        	ctx.strokeStyle = this.HPcolor;
	        ctx.moveTo(this.pos.x, this.pos.y + this.size.y + 5);
    	    ctx.lineTo(this.pos.x + this.size.x / this.HPfull * this.HP, this.pos.y + this.size.y + 5);
        	ctx.stroke();
	
	        ctx.beginPath();
    	    ctx.strokeStyle = this.HPcolorRed;
        	ctx.moveTo(this.pos.x + this.size.x / this.HPfull * this.HP, this.pos.y + this.size.y + 5);
	        ctx.lineTo(this.pos.x + this.size.x, this.pos.y + this.size.y + 5);
    	    ctx.stroke();
        };
        ctx.restore();
    }
}

let focus = {
    targetV: [],
    arrfixposV: [],
    fixposV: function() {
        for (let i = 0; i < focus.targetV.length; i++) {
            this.arrfixposV[i] = this.targetV[i].buf();
        };
    },
    drawV: function(ctx = main) {
        if(this.targetV.length == 0) return;
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = '#00cc00';
        for(let i = 0; i < this.targetV.length; i++) {
            ctx.beginPath();
            ctx.arc(this.targetV[i].x, this.targetV[i].y, 1 + this.targetV[i].radius * 2, 0, Math.PI * 2);
            ctx.stroke();
        };
        ctx.restore();
    }
};


//========== Function ==========//
function sortInventory(arr, param) {
	let p = {};
	p.size   = param.size	||vec2(cvs.width, cvs.height);
	p.table  = param.table	||vec2(6, p.size.y/6);
	p.tile   = param.tile	||vec2(p.size.x/p.table.x, p.size.y/p.table.y);
	p.offset = param.offset ||vec2(0, p.size.y%p.tile.y);
	
    for(let i = 0; i < arr.length; i++) {
        arr[i].setPosC(p.tile.buf().div(2).plus(p.offset));
        arr[i].pos.x += i%p.table.x*p.tile.x;
        arr[i].pos.y += (i-i%p.table.x)/p.table.x*p.tile.y;
    };
};