// 2020.01.18-22:35
// 2020.05.04-12:00
// 2020.05.22-11:50 delete: (log function)
// 2020.05.23-02:20 add: (Vector2[Symbol.toPrimitive])
// 2020.05.25-19:40 updata: (Scene "?.")
// 2020.05.30-16:40 updata: (class EventEmiter), add: (normalize)
'use strict';
function random(a, b) {return Math.floor(Math.random()*(b-a+1)+a);};
function loopNum(a, ot, ido) {
	if(ot<=a&&a<=ido) return a;	
	return (ot>a ? loopNum(a+=(ido-ot), ot, ido) : a>ido ? loopNum(a-=(ido-ot), ot, ido) : `Error: ${a}, (ot: ${ot} i do: ${ido})`);
};


/*
class EventEmiter {
	constructor() {
		this.id = [];
		this.ev = [];
	}
	on(str, fun) {
		if(typeof str === 'string' && typeof fun === 'function') {
			this.id.push(str);
			this.ev.push(fun);
		};
	}
	remove(str) {
		this.ev.splice(this.id.indexOf(str), 1);
		this.id.splice(this.id.indexOf(str), 1);
	}
	emit(str, ...arg) {return this.ev[this.id.indexOf(str)](...arg);}
}
*/

class EventEmiter {
    constructor() {
        this.id = [];
        this.ev = [];
    }
    on(id, func) {
        if(typeof func === 'function') {
        	let l = this.id.indexOf(id);
        	if(l == -1) {
	            this.id.push(id);
    	        this.ev.push(func);
    	        return 0;
        	} else return this.ev[l].push(func)-1;
        };
    }
    remove(id, idl) {
    	let l = id?this.id.indexOf(id):null;
    	if(!id) {
    		this.id = [];
    		this.ev = [];
    	} else if(idl!==undefined&&idl!==null) {
//    	} else if(idl!==undefined&&idl!==null) {
			this.ev.splice(l, 1);
			this.id.splice(l, 1);
    	} else {
    		if(typeof +idl !== 'number') throw new Error('not define function');
    		this.ev[l].splice(idl, 1);
    	};
    }
    emit(id, ...arg) {
    	if(this.id.indexOf(id) == -1) return;
    	let l = this.id.indexOf(id);
    	for (let  i = 0; i < this.ev[l].length; i++) {
    		this.ev[l][i](...arg);
    	};
    }
}


class Child {
	constructor(p) {
		this.id = [];
		this.ch = [];
		if(p) {for(i in p) {
			this.id.push(i);
			this.ch.push(p[i]);
		}};
	}
	add(str, el) {
		if(typeof str === 'string' && el) {
				this.ch.push(el);
				this.id.push(str);
		}; return this;
	}
	del(str) {
		this.ch.splice(this.id.indexOf(str), 1);
		this.id.splice(this.id.indexOf(str), 1);
		return this;
	}
	clear() {
		this.ch = [];
		this.id = [];
		return this;
	}
	get(str) {return str?this.ch[this.id.indexOf(str)]:this.ch;}
}


class Scene {
	constructor(scn) {this.scene = new scn();}
	init() {this.scene.init?.();}
	updata() {this.scene.updata?.();}
	exit() {this.scene.exit?.();}
	
	static active_scene = {};
	static set(name) {
		Scene.active_scene.exit?.();
		name.init();
		Scene.active_scene = name;
	}
}


class Vector2 {
	constructor(x, y) {
		this.x = +x||0;
		this.y = +y||0;
	}
	plus(x, y) {
		this.x += x.x!==undefined?x.x:x||0;
		this.y += x.y!==undefined?x.y:y!==undefined?y:x||0;
		return this;
	}
	minus(x, y) {
		this.x -= x.x!==undefined?x.x:x||0;
		this.y -= x.y!==undefined?x.y:y!==undefined?y:x||0;
		return this;
	}
	inc(x, y) {
		this.x *= x.x!==undefined?x.x:x||0;
		this.y *= x.y!==undefined?x.y:y!==undefined?y:x||0;
		return this;
	}
	div(x, y) {
		this.x /= x.x!==undefined?x.x:x||0;
		this.y /= x.y!==undefined?x.y:y!==undefined?y:x||0;
		return this;
	}
	pow(x, y) {
		this.x = Math.pow(this.x, x.x!==undefined?x.x:x||0);
		this.y = Math.pow(this.y, x.y!==undefined?x.y:y!==undefined?y:x||0);
		return this;
	}
	ost(x, y) {
	    this.x = this.x % (x.x!==undefined?x.x:x||0);
	    this.y = this.y % (x.y!==undefined?x.y:y!==undefined?y:x||0);
	    return this;
	}
	abs() {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	}
	inv() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}
	floor(i=1) {
		this.x = Math.floor(this.x*i)/i;
		this.y = Math.floor(this.y*i)/i;
		return this;
	}
	
	buf(x=0, y=0) {return new Vector2(this.x+(x.x||x), this.y+(x.y||y));}
	rotate(v) {return Math.atan2(v.y-this.y, v.x-this.x)/(Math.PI/180)}
	getDistance(v) {return Math.sqrt(Math.pow(v.x-this.x, 2)+Math.pow(v.y-this.y, 2));}
	
	set(x, y) {
		this.x = x.x!==undefined?x.x:x||0;
		this.y = x.y!==undefined?x.y:y!==undefined?y:x||0;
		return this;
	}
	move(x, y, a) { // a - angle; super
		this.x += x||0;
		this.y += y||0;
		return this;
	}
	moveAngle(mv=0, a=0) {
		a *= Math.PI/180;
		this.x += mv*Math.cos(a);
		this.y += mv*Math.sin(a);
		return this;
	}
	moveTo(v, mv=1, t=true) {
		const a = Math.atan2(v.y-this.y, v.x-this.x);
		this.x += (t?(mv*Math.cos(a)>Math.abs(v.x-this.x)?v.x-this.x: mv*Math.cos(a)): mv*Math.cos(a));
		this.y += (t?(mv*Math.sin(a)>Math.abs(v.y-this.y)?v.y-this.y: mv*Math.sin(a)): mv*Math.sin(a));
		return this;
	}
	moveTime(v, t=1) {
		this.x += (v.x-this.x)/(t!==0?t:1);
		this.y += (v.y-this.y)/(t!==0?t:1);
		return this;
	}
	isSame(v) {return this.x==v.x&&this.y==v.y;}
	
	isIntersect(b) {return this.x>b.pos.x&&this.x<b.pos.x+b.size.x&&this.y>b.pos.y&&this.y<b.pos.y+b.size.y;}
	
	set angle(a) {
		a *= Math.PI/180;
		this.x = (this.x*Math.cos(a))-(this.y*Math.sin(a));
		this.y = (this.x*Math.sin(a))+(this.y*Math.cos(a));
		return this;
	}
	get angle() {return Math.atan2(this.y, this.x);}
	get length() {return Math.sqrt(this.x*this.x+this.y*this.y);}
	
	normalize() {
		let l = Math.sqrt(this.x*this.x+this.y*this.y);
		return new Vector2(this.x/l, this.y/l);
	}
	
	toString() {return `Vector2(${this.x}, ${this.y})`;}
//	[Symbol.toPrimitive](type) {return type == 'string'?`Vector2(${this.x}, ${this.y})`:true;}
	[Symbol.toPrimitive](type) {return `Vector2(${this.x}, ${this.y})`;}
} function vec2(x, y) {return new Vector2(x, y)};

//======================================================================//
class CanvasEmitCamera {
	constructor(ctx) {
		this.camera = vec2();
		this.ctx = ctx;
	}
	get canvas() {return this.ctx.canvas;}
	set canvas(v) {return this.ctx.canvas=v;}
	get globalAlpha() {return this.ctx.globalAlpha;}
	set globalAlpha(v) {return this.ctx.globalAlpha=v;}
	get globalCompositeOperation() {return this.ctx.globalCompositeOperation;}
	set globalCompositeOperation(v) {return this.ctx.globalCompositeOperation=v;}
	get filter() {return this.ctx.filter;}
	set filter(v) {return this.ctx.filter=v;}
	get imageSmoothingEnabled() {return this.ctx.imageSmoothingEnabled;}
	set imageSmoothingEnabled(v) {return this.ctx.imageSmoothingEnabled=v;}
	get imageSmoothingQuality() {return this.ctx.imageSmoothingQuality;}
	set imageSmoothingQuality(v) {return this.ctx.imageSmoothingQuality=v;}
	get strokeStyle() {return this.ctx.strokeStyle;}
	set strokeStyle(v) {return this.ctx.strokeStyle=v;}
	get fillStyle() {return this.ctx.fillStyle;}
	set fillStyle(v) {return this.ctx.fillStyle=v;}
	get shadowOffsetX() {return this.ctx.shadowOffsetX;}
	set shadowOffsetX(v) {return this.ctx.shadowOffsetX=v;}
	get shadowOffsetY() {return this.ctx.shadowOffsetY;}
	set shadowOffsetY(v) {return this.ctx.shadowOffsetY=v;}
	get shadowBlur() {return this.ctx.shadowBlur;}
	set shadowBlur(v) {return this.ctx.shadowBlur=v;}
	get shadowColor() {return this.ctx.shadowColor;}
	set shadowColor(v) {return this.ctx.shadowColor=v;}
	get lineWidth() {return this.ctx.lineWidth;}
	set lineWidth(v) {return this.ctx.lineWidth=v;}
	get lineCap() {return this.ctx.lineCap;}
	set lineCap(v) {return this.ctx.lineCap=v;}
	get lineJoin() {return this.ctx.lineJoin;}
	set lineJoin(v) {return this.ctx.lineJoin=v;}
	get miterLimit() {return this.ctx.miterLimit;}
	set miterLimit(v) {return this.ctx.miterLimit=v;}
	get lineDashOffset() {return this.ctx.lineDashOffset;}
	set lineDashOffset(v) {return this.ctx.lineDashOffset=v;}
	get font() {return this.ctx.font;}
	set font(v) {return this.ctx.font=v;}
	get textAlign() {return this.ctx.textAlign;}
	set textAlign(v) {return this.ctx.textAlign=v;}
	get textBaseline() {return this.ctx.textBaseline;}
	set textBaseline(v) {return this.ctx.textBaseline=v;}
	get direction() {return ctx.direction;}
	set direction(v) {return ctx.direction=v;}
	save() {return this.ctx.save();}
	restore() {return this.ctx.restore();}
	scale(x, y) {return this.ctx.scale(
		x.x!==undefined?x.x:x||0,
		x.y!==undefined?x.y:y||0
	);}
	rotate(a) {return this.ctx.rotate(a);}
	translate(x, y) {return this.ctx.translate(
		(x.x!==undefined?x.x:(x||0))-this.camera.x,
		(x.y!==undefined?x.y:(y||0))-this.camera.y
	);}
	translateInv(x, y) {return this.ctx.translate(
		-((x.x!==undefined?x.x:(x||0))-this.camera.x),
		-((x.y!==undefined?x.y:(y||0))-this.camera.y)
	);}
	setTranslate(a, x, y) {
		this.ctx.translate((x.x!==undefined?x.x:x||0)-this.camera.x, (x.y!==undefined?x.y:y||0)-this.camera.y);
		this.ctx.rotate(a*(Math.PI/180));
		this.ctx.translate(-((x.x!==undefined?x.x:x||0)-this.camera.x), -((x.y!==undefined?x.y:y||0)-this.camera.y))
	}
	transform(a, b, c, d, e, f) {return this.ctx.transform(a, b, c, d, e, f);}
	setTransform(v) {return this.ctx.setTransform(v);}
	getTransform() {return this.ctx.getTransform();}
	resetTransform() {return this.ctx.resetTransform();}
	createLinearGradient(x0, y0, x1, y1) {return this.ctx.createLinearGradient(
		(x0.x!==undefined?x0.x: x0||0) - this.camera.x,
		(x0.y!==undefined?x0.y: y0||0) - this.camera.y,
		(y0.x!==undefined?y0.x: x1.x!==undefined?x1.x: x0.y===undefined?x1: y0||0) - this.camera.x,
		(y0.y!==undefined?y0.y: x1.y!==undefined?x1.y: y1||x1||0) - this.camera.y
	);}
	createRadialGradient(x0, y0, r0, x1, y1, r1) {
		if(x0.x===undefined&&x1.x===undefined) return this.ctx.createRadialGradient(x0-this.camera.x, y0-this.camera.y, r0, x1-this.camera.x, y1-this.camera.y, r1);
		if(x0.x!==undefined&&x1.x!==undefined) return this.ctx.createRadialGradient(x0.x-this.camera.x, x0.y-this.camera.y, y0, r0.x-this.camera.x, r0.y-this.camera.y, x1);
		if(x0.x!==undefined&&x1.x===undefined) return this.ctx.createRadialGradient(x0.x-this.camera.x, x0.y-this.camera.y, y0, r0-this.camera.x, x1-this.camera.y, x2);
		if(x0.x===undefined&&x1.x!==undefined) return this.ctx.createRadialGradient(x0-this.camera.x, y0-this.camera.y, r0, x1.x-this.camera.x, x1.y-this.camera.y, y1);
	}
	createPattern(img, repeat) {return this.ctx.createPattern(img, repeat);}
	clearRect(x, y, w, h) {return this.ctx.clearRect(
		(x.x!==undefined?x.x: x||0) - this.camera.x,
		(x.y!==undefined?x.y: y||0) - this.camera.y,
		(y.x!==undefined?y.x: w.x!==undefined?w.x: x.y===undefined?w: y||0),
		(y.y!==undefined?y.y: w.y!==undefined?w.y: h||w||0)
	);}
	fillRect(x, y, w, h) {return this.ctx.fillRect(
		(x.x!==undefined?x.x: x||0) - this.camera.x,
		(x.y!==undefined?x.y: y||0) - this.camera.y,
		(y.x!==undefined?y.x: w.x!==undefined?w.x: x.y===undefined?w: y||0),
		(y.y!==undefined?y.y: w.y!==undefined?w.y: h||w||0)
	);}
	strokeRect(x, y, w, h) {return this.ctx.strokeRect(
		(x.x!==undefined?x.x: x||0) - this.camera.x,
		(x.y!==undefined?x.y: y||0) - this.camera.y,
		(y.x!==undefined?y.x: w.x!==undefined?w.x: x.y===undefined?w: y||0),
		(y.y!==undefined?y.y: w.y!==undefined?w.y: h||w||0)
	);}
	beginPath() {return this.ctx.beginPath();}
	fill(path) {return path?this.ctx.fill(path):this.ctx.fill();}
	stroke(path) {return path?this.ctx.stroke(path):this.ctx.stroke();}
	drawFocusIfNeeded(path, el) {return this.ctx.drawFocusIfNeeded(path, el);}
	clip(path) {return path?this.ctx.clip(path):this.ctx.clip();}
	isPointInPath(path, x, y, rule) {return this.ctx.isPointInPath(path, x, y, rule);}
	isPointInStroke(path, x, y) {return this.ctx.isPointInStroke(path, x, y);}
	fillText(text, x, y, w) {return this.ctx.fillText(text,
		(x.x!==undefined?x.x: x||0) - this.camera.x,
		(x.y!==undefined?x.y: y||0) - this.camera.y,
		(x.x!==undefined?y:w)
	);}
	strokeText(text, x, y, w) {return this.ctx.strokeText(text,
		(x.x!==undefined?x.x: x||0) - this.camera.x,
		(x.y!==undefined?x.y: y||0) - this.camera.y,
		(x.x!==undefined?y:w)
	);}
	measureText(v) {return this.ctx.measureText(v);}
	drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) {
		if(dx!==undefined) return this.ctx.drawImage(img, sx, sy, sw, sh, dx-this.camera.x, dy-this.camera.y, dw, dh);
		else {return this.ctx.drawImage(img,
			(sx.x!==undefined?sx.x: sx||0) - this.camera.x,
			(sx.y!==undefined?sx.y: sy||0) - this.camera.y,
			(sy.x!==undefined?sy.x: sw.x!==undefined?sw.x: sx.y===undefined?sw: sy||0),
			(sy.y!==undefined?sy.y: sw.y!==undefined?sw.y: sh||sw||0)
		);};
	}
	getImageData(x, y, w, h) {return this.ctx.getImageData(
		(x.x!==undefined?x.x: x||0) - this.camera.x,
		(x.y!==undefined?x.y: y||0) - this.camera.y,
		(y.x!==undefined?y.x: w.x!==undefined?w.x: x.y===undefined?w: y||0),
		(y.y!==undefined?y.y: w.y!==undefined?w.y: h||w||0)
	);}
	putImageData(img, x, y) {return this.ctx.putImageData(img,
		(x.x!==undefined?x.x: x||0) - this.camera.x,
		(x.y!==undefined?x.y: y||0) - this.camera.y
	);}
	createImageData(img, w, h) {return this.ctx.createImageData(img, w, h);}
	getContextAttributes() {return this.ctx.getContextAttributes();}
	setLineDash(v) {return this.ctx.setLineDash(v);}
	getLineDash() {return this.ctx.getLineDash();}
	closePath() {return this.ctx.closePath();}
	moveTo(x, y) {return this.ctx.moveTo(
		(x.x!==undefined?x.x:x||0) - this.camera.x,
		(x.y!==undefined?x.y:y||0) - this.camera.y
	);}
	lineTo(x, y) {return this.ctx.lineTo(
		(x.x!==undefined?x.x:x||0) - this.camera.x,
		(x.y!==undefined?x.y:y||0) - this.camera.y
	);}
	quadraticCurveTo(x1, y1, x, y) {return this.ctx.quadraticCurveTo(x1-this.camera.x, y1-this.camera.y, x-this.camera.x, y-this.camera.y);}
	bezierCurveTo(x1, y1, x2, y2, x, y) {return this.ctx.bezierCurveTo(x1-this.camera.x, y1-this.camera.y, x2-this.camera.x, y2-this.camera.y, x-this.camera.x, y-this.camera.y);}
	arcTo(x1, y1, x2, y2, r) {return this.ctx.arcTo(
		x1-this.camera.x, y1-this.camera.y,
		x2-this.camera.x, y2-this.camera.y, r
	);}
	rect(x, y, w, h) {return this.ctx.rect(
		(x.x!==undefined?x.x: x||0) - this.camera.x,
		(x.y!==undefined?x.y: y||0) - this.camera.y,
		(y.x!==undefined?y.x: w.x!==undefined?w.x: x.y===undefined?w: y||0),
		(y.y!==undefined?y.y: w.y!==undefined?w.y: h||w||0)
	);}
	arc(x, y, r, n, m, t) {return this.ctx.arc(
		(x.x!==undefined?x.x: x||0) - this.camera.x,
		(x.y!==undefined?x.y: y||0) - this.camera.y,
		(x.x!==undefined?y:r), (x.x!==undefined?n:m),
		(x.x!==undefined?r:n), (x.x!==undefined?m:t)
	);}
	ellipse(x, y, w, h, n, m, t) {return this.ctx.ellipse(x-this.camera.x, y-this.camera.y, w, h, n, m, t);}


/*
	canvas = [object HTMLCanvasElement]
	globalCompositeOperation = source-over
	filter = none
	imageSmoothingEnabled = true
	imageSmoothingQuality = low
	lineCap = butt
	lineJoin = miter
	miterLimit = 10
	font = 10px sans-serif
	textAlign = start
	textBaseline = alphabetic
*/
}

class CanvasLeyar extends HTMLElement {
//	connectedCallback {
	constructor() {
		super();
		let self = this;
		let root = this.attachShadow({mode: 'open'});
		let leyars = this.getAttribute('leyar').split(/\s+/).reverse();
		let box = this.getBoundingClientRect();
		this.width = box.width||700;
		this.height = box.height||400;
		this.canvas = {};
		this.context = {};
		this.canvasEmitCamera = {};
		let el = '<div style="display: grid; align-items:center; justify-items:center;">';
		for(let i of leyars) {
			el+='<canvas style="grid-area:1/1; width:'+this.width+'px; height:'+this.height+'px;" width="'+this.width+'" height="'+this.height+'" id="'+i+'"></canvas>';
		} el+='</div>';
		root.innerHTML = el;
		for(let i of leyars) {
			this.canvas[i] = root.getElementById(i);
			this.context[i] = this.canvas[i].getContext('2d');
			this.canvasEmitCamera[i] = new CanvasEmitCamera(this.context[i]);
		};
		
		this._updata();
		onorientationchange = () => {setTimeout(() => {this._updata();}, 1000);};
//		this.addEventListener('click', function() {this._updata();});

		
		this.db = {};
		function loadImage(src, w, h) {
			return new Promise(function(res, rej) {
				let el = w&&h?(new Image(w, h)):(new Image())
				el.src = src;
				el.onload = function() {res(el);};
			});
		};
		this.onloadfiles = null;
		this.loadFiles = async function(arr, db=self.db) {
			for(let i = 0; i<arr.length; i++) {
				if(arr[i].type=='image') db[arr[i].title||arr[i].name] = await loadImage(arr[i].src||arr[i].path||arr[i].file, arr[i].w||arr[i].width, arr[i].h||arr[i].height);
			};
		};
	}	
	
	get vw() {return this.width/100;}
	get vh() {return this.height/100;}
	get vwh() {return this.width/this.height;}
	get vhw() {return this.height/this.width;}
	get vmax() {return Math.max(this.width, this.height)/100;}
	get vmin() {return Math.min(this.width, this.height)/100;}
	
	_updata() {
		let b = this.getBoundingClientRect();
		this.width = b.width;
		this.height = b.height;
		for(let i in this.canvas) {
			this.canvas[i].width = b.width;
			this.canvas[i].height = b.height;
			this.canvas[i].style.width = b.width+'px';
			this.canvas[i].style.height = b.height+'px';
		}
	}
}
customElements.define('canvas-leyar', CanvasLeyar);
//======================================================================//

class Color {
	constructor(r=0, g=0, b=0, a=0, type='rgb') {
		if(type=='rgb'&&type=='rgba') {
			this.r = Math.floor(loopNum(r, 0, 255));
			this.g = Math.floor(loopNum(g, 0, 255));
			this.b = Math.floor(loopNum(b, 0, 255));
			this.updataRgb();
		} else if(type=='hsl'&&type=='hsla') {
			this.h = Math.floor(loopNum(r, 0, 255));
			this.s = Math.floor(loopNum(g, 0, 255));
			this.l = Math.floor(loopNum(b, 0, 255));
			this.updataHsl();
		};
		this.a = a?Math.floor(loopNum(a*100, 0, 100))/100:0;
	}
	
	
	get rgba() {return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;}
	get rgb()  {return `rgb(${this.r}, ${this.g}, ${this.b})`;}
	get hsla() {return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${this.a})`;}
	get hsl()  {return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;}
	
	set rgb(o) {
		this.r = loopNum(Math.floor(o.r||0), -1, 255);
		this.g = loopNum(Math.floor(o.g||0), -1, 255);
		this.b = loopNum(Math.floor(o.b||0), -1, 255);
		this.updataRgb();
		return `rgb(${this.r}, ${this.g}, ${this.b})`;
	}
	set rgba(o) {
		this.r = loopNum(Math.floor(o.r||0), -1, 255);
		this.g = loopNum(Math.floor(o.g||0), -1, 255);
		this.b = loopNum(Math.floor(o.b||0), -1, 255);
		this.updataRgb();
		this.a = o.a?Math.floor(loopNum(o.a*100, 0, 100))/100:0;
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
	}
	set hsl(o) {
		this.h = loopNum(Math.floor(o.h||0), -1, 360);
		this.s = loopNum(Math.floor(o.s||0), -1, 100);
		this.l = loopNum(Math.floor(o.l||0), -1, 100);
		this.updataHsl();
		return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
	}
	set hsla(o) {
		this.h = loopNum(Math.floor(o.h||0), -1, 360);
		this.s = loopNum(Math.floor(o.s||0), -1, 100);
		this.l = loopNum(Math.floor(o.l||0), -1, 100);
		this.updataHsl();
		this.a = o.a?Math.floor(loopNum(o.a*100, 0, 100))/100:0;
		return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${this.a})`;
	}
	
	updataHsl() {
		let c = Color.hslToRgb(this.h, this.s, this.l);
		this.r = c.r;
		this.g = c.g;
		this.b = c.b;
	}
	updataRgb() {
		let c = Color.rgbToHsl(this.r, this.g, this.b);
		this.h = c.h;
		this.s = c.s;
		this.l = c.l;
	}
	
	random(rm, rn, gm, gn, bm, bn) {
		this.r = random(rn||0, rm>255?rm:255);
		this.g = random(gn||0, gm>255?gm:255);
		this.b = random(bn||0, bm>255?bm:255);
		this.updataRgb();
	}
	
	static parseHEX(color) {
		let u = {}, l = 0;
		if(color.indexOf('#')>-1) {
			l = color.length-1;
			u.c = color.split('').splice(1, l);
			u.r = parseInt([...c].splice(0, 2).join(''), 16);
			u.g = parseInt([...c].splice(2, 2).join(''), 16);
			u.b = parseInt([...c].splice(4, 2).join(''), 16);
			if(color.length>7) u.a = parseInt([...c].splice(6, 2).join(''), 16);
			else u.a = 255;
			u.text = function() {return 'rgba('+u.r+', '+u.g+', '+u.b+', '+u.a+')';};
		} return u;
	}
	static hslToRgb(h, s, l) {
		h/=360, s/=100, l/=100;
		let r, g, b;
		if(s == 0) r = g = b = l;
		else {
			let hue2rgb = function(p, q, t) {
				if(t < 0) t += 1;
				if(t > 1) t -= 1;
				if(t < 1/6) return p + (q - p) * 6 * t;
				if(t < 1/2) return q;
				if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}
	
			let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			let p = 2 * l - q; // q:0.75, p:0.25
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		} return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
	}
	static rgbToHsl(r, g, b) {
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min) h = s = 0;
		else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
		h = Math.round(h*60), s = Math.round(s*100), l = Math.round(l*100);
		} return {h, s, l};
	}
}
/*
for(let i = -30; i<=70; i++) {
	log(`d: ${i}, res: -30<=${loopNum(i, -30, -20)}<=-20`);
}*/