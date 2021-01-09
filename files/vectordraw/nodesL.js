'use strict';
class BaseGeometry extends Vector2 {
	constructor(x, y, p = {}) {
		super(x, y);
		this.type = 'BaseGeometry';
		this.typeDraw = p.type||'lineTo';
		this.arr = [new VectorNode(this.x, this.y)];
		if(p.vectors) {
			for(let i = 1; i+1<p.vectors.length; i+=2) {
				this.arr.push(new VectorNode(p.vectors[i], p.vectors[i+1]));
			};
		};
		this.ci = 0;
		switch(this.typeDraw) {
			case 'lineTo':
				this.ci=1
				break;
			case 'bezierCurveTo':
				this.ci=3
				break;
			case 'quadraticCurveTo':
				this.ci=2
				break;
		};
	}
	draw(ctx) {
	    if (!this.arr.length) return;
	    ctx.save();
	    ctx.beginPath();
	    ctx.strokeStyle = '#eeeeee';
	    ctx.moveTo(this.arr[0].x, this.arr[0].y);
	    for (let i = 1; i + this.ci - 1 < this.arr.length; i += this.ci) {
	        if (this.typeDraw == 'lineTo') ctx.lineTo(this.arr[i].x, this.arr[i].y);
	        if (this.typeDraw == 'quadraticCurveTo') ctx.quadraticCurveTo(this.arr[i].x, this.arr[i].y, this.arr[i + 1].x, this.arr[i + 1].y);
	        if (this.typeDraw == 'arc') ctx.arc(this.arr[i].x, this.arr[i].y, this.arr[i + 1].x, this.arr[i + 1].y);
	        if (this.typeDraw == 'bezierCurveTo') ctx.bezierCurveTo(this.arr[i].x, this.arr[i].y, this.arr[i + 1].x, this.arr[i + 1].y, this.arr[i + 2].x, this.arr[i + 2].y);
	    };
	    ctx.stroke();
	    ctx.restore();
	}
}





class Structure extends Vector2 {
	constructor(x, y, p = {}) {
		super(x, y);
		this.type = 'Structure';
		this.arr = [new VectorNode(this.x, this.y)];
		this.arrType = [];
	}
	add(type = 'lineTo', ...vec) {
		let c = 1;
		switch(type) {
			case 'lineTo':			c = 1; break;
			case 'bezierCurveTo':	c = 3; break;
			case 'quadraticCurveTo':c = 2; break;
		};
		if(c > vec.length) return;
		this.arrType.push(type);
		for(let i = 0; i < c; i++) this.arr.push(vec[i]);
	}
	remove(v) {
		this.arr.splice(this.arr.indexOf(v), 1);
	}
	draw(ctx) {
	    if (!this.arr.length) return;
	    ctx.save();
	    ctx.beginPath();
	    ctx.strokeStyle = '#eeeeee';
	    ctx.moveTo(this.arr[0].x, this.arr[0].y);
	    
//	    let sum = 1;
	    for(let t = 0, sum = 1; t < this.arrType.length; t++) {
	    	let c = 1;
	        switch(this.arrType[t]) {
	            case 'lineTo':          c = 1; break;
	            case 'bezierCurveTo':   c = 3; break;
	            case 'quadraticCurveTo':c = 2; break;
	        };
	        //for(let i = sum; i < c; i += c) {
	    //    if(sum % (c+1) >= c) {
			if(this.arr.length >= sum+c) {
                if(this.arrType[t] == 'lineTo') ctx.lineTo(this.arr[sum].x, this.arr[sum].y);
                else if(this.arrType[t] == 'quadraticCurveTo') ctx.quadraticCurveTo(this.arr[sum].x, this.arr[sum].y, this.arr[sum+1].x, this.arr[sum+1].y);
				else if(this.arrType[t] == 'arc') ctx.arc(this.arr[sum].x, this.arr[sum].y, this.arr[sum+1].x, this.arr[sum+1].y);
				else if(this.arrType[t] == 'bezierCurveTo') ctx.bezierCurveTo(this.arr[sum].x, this.arr[sum].y, this.arr[sum+1].x, this.arr[sum+1].y, this.arr[sum+2].x, this.arr[sum+2].y);
	        };
	        sum += c;
	    };
	
	    ctx.stroke();
	    ctx.restore();
	}
}