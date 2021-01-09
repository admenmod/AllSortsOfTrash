'use strict';
try {

/*
	mod(...vecs) {
		let pos = Array.isArray(vecs[0]) ? vecs[0] : VectorN.parseArgs(vecs);
		for (let i = 0; i < this.size && i < pos.length; i++) this.pos[i] %= pos[i];
		return this;
	}
*/

function setPropertyNotEnumerable(o, id, value) {
	return Object.defineProperty(o, id, {
		value: value,
		writable: true,
		configurable: true
	});
};


class VectorN {
	constructor(...args) { this.pos = Array.isArray(args[0]) ? args[0] : VectorN.parseArgs(args); }
	get size() { return this.pos.length; }
	set size(v) {
		this.pos.length = v;
		for(let i = 0; i < this.size; i++) if(this.pos[i] === undefined) this.pos[i] = 0;
	}
	get x()	 { return this.pos[0]; }
	set x(v) { return this.pos[0] = v; }
	get y()  { return this.pos[1]; }
	set y(v) { return this.pos[1] = v; }
	get z()  { return this.pos[2]; }
	set z(v) { return this.pos[2] = v; }
	get w()  { return this.pos[3]; }
	set w(v) { return this.pos[3] = v; }
	plus(...vecs) { return VectorN.operation.call(this, (n, i) => this.pos[i] += n||0, vecs); }
	minus(...vecs) { return VectorN.operation.call(this, (n, i) => this.pos[i] -= n||0, vecs); }
	inc(...vecs) { return VectorN.operation.call(this, (n, i) => this.pos[i] *= n||1, vecs); }
	div(...vecs) { return VectorN.operation.call(this, (n, i) => this.pos[i] /= n||1, vecs); }
	mod(...vecs) { return VectorN.operation.call(this, (n, i) => this.pos[i] %= n, vecs); }
	set(...vecs) { return VectorN.operation.call(this, (n, i) => this.pos[i] = n, vecs); }
	abs() {
		for(let i = 0; i < this.size; i++) this.pos[i] = Math.abs(pos[i]);
		return this;
	}
	inverse(a = 1) {
		for(let i = 0; i < this.size; i++) this.pos[i] = a/this.pos[i];
		return this;
	}
	invert() {
		for(let i = 0; i < this.size; i++) this.pos[i] = -this.pos[i];
		return this;
	}
	floor(i = 1) {
		for(let i = 0; i < this.size; i++) this.pos[i] = Math.floor(pos[i]*i)/i;
		return this;
	}
	buf() { return new VectorN(...this.pos); }
	map(f) {
		for(let i = 0; i < this.size; i++) this.pos[i] = f(this.pos[i], i, this.pos) ?? this.pos[i];
		return this;
	}
	normalize(a = 1) {
		let l = this.length/a;
		for(let i = 0; i < this.size; i++) this.pos[i] /= l;
		return this;
	}
	get length() {
		let x = 0;
		for(let i = 0; i < this.size; i++) x += this.pos[i]**2;
		return x;
	}
	isSama(v) {
		if(this.size === v.size) return false;
		let t = false;
		for(let i = 0; i < this.size; i++) {
			if(this.pos[i] === v.pos[i]) t = true;
			else {
				t = false;
				continue;
			};
		};
		return t;
	}
	static parseArgs(args) {
		let arr = [];
		for(let i = 0; i < args.length; i++) {
			if(args[i] instanceof VectorN) arr = arr.concat(args[i].pos);
			else arr.push(args[i]);
		};
		return arr;
	}
	static operation(func, vecs) {
		let pos = vecs.length === 1 && !(vecs[0] instanceof VectorN) ? vecs[0] : VectorN.parseArgs(vecs);
		let ownArg = typeof pos === 'number';
		for(let i = 0; i < this.size && (ownArg || i < pos.length); i++) func(ownArg ? pos : pos[i], i);
		return this;
	}
	
	
	multMat(mat) {
		let vec = this.buf();
		let rows = math.rows();
		if(!mat instanceof MatrixN && mat.size.x !== this.size) return;
		for(let i = 0; i < mat.size.x; i++) this.plus(vec.buf().inc(mat.rows[i]));
	}
}
function vecN(...args) { return new VectorN(...args); };
setPropertyNotEnumerable(VectorN.prototype, 'add', VectorN.prototype.plus);
setPropertyNotEnumerable(VectorN.prototype, 'sub', VectorN.prototype.minus);


class MatrixN {
	constructor(...vecs) {
		if(Array.isArray(vecs[0])) {
			this.arr = [];
			this.size = new VectorN(vecs.length, vecs[0].size);
			for(let i = 0; i < vecs.length; i++) this.arr.push(...vecs[i].pos);
		};
	}
	get i() { return this.column()[0]; }
	get j() { return this.colums()[1]; }
	get k() { return this.column()[2]; }
	get w() { return this.column()[3]; }
	
	columns() {
		let arr = [];
		for(let y = 0; y < this.size.y; y++) {
			let arrV = [];
			for(let x = 0; x < this.size.x; x++) arrV.push(this.arr[x + y * this.size.x]);
			arr.push(arrV);
		};
		return arr;
	}
	rows() {
		let arr = [];
		for(let y = 0; y < this.size.y; y++) {
			let arrV = [];
			for(let x = 0; x < this.size.x; x++) arrV.push(this.arr[y + x * this.size.y]);
			arr.push(arrV);
		};
		return arr;
	}
}


let activatinFunction = x => 1/(1+Math.exp(-x));

(function() {
	let inputs = [];
	
	let outputs = [];
})();





/*
let mat = new MatrixN(
	vecN(11, 12, 13, 14),
	vecN(21, 22, 23, 24),
	vecN(31, 32, 33, 34),
	vecN(41, 42, 43, 44)
); //*/

//*
let v = vecN(4, 44);
v.size = 3;

let arrRes = [];
let arrRandomNamber = [];
for(let i = 0; i < 20; i++) arrRandomNamber.push(vecN(random(-100, 100), random(-100, 100), 564));

for(let i = 0; i < arrRandomNamber.length; i+=1) {
	let t0 = performance.now();
	let res = v.plus(arrRandomNamber[0]);
	let t1 = performance.now();
	
	arrRes.push((t1 - t0).toFixed(4));
};

log(v);
logDiv(arrRes.sort((a, b) => +a - +b));
logDiv(arrRes);
//*/
//log(Performance.toJSON());


//log(Object.getOwnPropertyDescriptor(VectorN.prototype, 'buf'));




} catch(err) {
	alert(err.stack);
};