'use strict'; // 24.09.2020-16:00
class TouchControl extends Vector2 {
	constructor(el, some = function() {}) {
		super();
		this.x  = 0; this.y  = 0; // position
		this.sx = 0; this.sy = 0; // speed
		this.nx = 0; this.ny = 0; // fixNewPosition
		this.bx = 0; this.by = 0; // fixStartPosition
		
		this.fD = !1;
		this.fP = !1;
		this.fU = !1;
		this.fM = !1;
		this.fC = !1;
		this.fdbC = !1;
		this.fTD = !1;
		
		this.downTime = 40;
		this.downSet = 40;
		this.down = false;
		
		el.addEventListener('touchstart', e => {
			if(some(e)) return;
			
			this.down = true;
			
			this.fD = true;
			this.fP = true;
			
			// *нужно сделать мульти тачь
			this.bx = this.x = Math.floor(e.touches[0].clientX*100)/100;
			this.by = this.y = Math.floor(e.touches[0].clientY*100)/100;
		});
		el.addEventListener('touchend', e => {
			if(some(e)) return;
			
			this.fU = true;
			this.fD = false;
			
			this.down = false;
			this.downTime = Number(this.downSet);
		});
		el.addEventListener('touchmove', e => {
			if(some(e)) return;
			
			this.fM = true;
			this.x = Math.floor(e.touches[0].clientX*100)/100;
			this.y = Math.floor(e.touches[0].clientY*100)/100;
			
			this.sx = this.x-this.nx;
			this.sy = this.y-this.ny;
			this.nx = Number(this.x);
			this.ny = Number(this.y);
		//	this.speed = Math.sqrt(Math.pow(this.sx, 2)+Math.pow(this.sy, 2));
		
			this.down = false;
			this.downTime = Number(this.downSet);
		});
		el.addEventListener('click', e => {
			if(some(e)) return;
			this.fC = true;
		});
		el.addEventListener('dblclick', e => {
			if(some(e)) return;
			this.fdbC = true;
		});
	}
	
	get speed() {return Math.sqrt(Math.pow(this.sx, 2)+Math.pow(this.sy, 2));}
	get dx() {return this.x-this.bx;}
	get dy() {return this.y-this.by;}
	get beeline() {return Math.sqrt(Math.pow(this.dx, 2)+Math.pow(this.dy, 2));}
	
	isDown() {return this.fD;}
	isPress() {return this.fP;}
	isUp() {return this.fU;}
	isMove() {return this.fM;}
	isClick() {return this.fdbC?false:this.fC;}
	isDblClick() {return this.fdbC;}
	isTimeDown() {return this.fTD;}
	
	isTouchEventBox(p, o=this.fC) {
		return p.pos.x<=this.x&&this.x<=p.pos.x+p.size.x&&p.pos.y<=this.y&&this.y<=p.pos.y+p.size.y;
	}
	updata() {
		if(this.down&&this.fD) this.downTime--;
		if(this.down&&this.downTime==0) {
			this.fTD=true;
			this.down = false;
			this.downTime = Number(this.downSet);
		};
	}
	onNull() {
		if(this.fP) this.fP = false;
		if(this.fU) this.fU = false;
		if(this.fC) this.fC = false;
		if(this.fM) this.fM = false;
		if(this.fdbC) this.fdbC = false;
		if(this.fTD) this.fTD = false;
	}
}