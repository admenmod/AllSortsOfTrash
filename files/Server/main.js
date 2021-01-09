'use strict';

let cvs = document.getElementById('canvas');
//let box = cvs.getBoundingClientRect();
//let s = box.width/box.height;
//cvs.width = box.width/10;
//cvs.height = box.height/10;
let main = cvs.getContext('2d');


let x = 1;
onclick = function() {
	main.fillRect(1, 1, ++x, 2);
};





/*
let cvs = document.getElementById('canvas');
let {main} = cvs.canvasEmitCamera;



let arr = [{x: 10, y: 47}, vec2(169, 150), vec2(248, 368), vec2(348, 289), vec2(264, 844)];

function df(n) {
	let r = 0;
	for(let i = 1; i < n; i++) {
		r += i*(n-i);
	}; return r;
};


let objc = 12;
let d = df(objc);
let oooo = new VectorNode(274, 285);



let a = Date.now();
// for(let i = 0; i < 4*d; i++) oooo.isIntersect(arr);
let s = Date.now();
for(let i = 0; i < objc; i++) oooo.draw(main);
let b = Date.now();

let time = b-a;
log(time+', '+(s-a)+', '+(b-s));
log('60fps: '+(1000/60));
log(1000/(1000/time)+' : fps('+(1000/time)+')');



let gg = {
	hh: 74
};

log(vec2(56, 87));
//log(location.assign('file:///sdcard/homewindow/', 'index.html'));

let v = vec2(46, 74);
arr[Symbol.unscopables].find = false;
console.log(arr.find(v => v instanceof Vector2));
console.log(arr[Symbol.unscopables]);



console.log(Object.getOwnPropertyDescriptor(vec2(), 'x'));
log(gg);
//*/





/*
let prom1 = new Promise(function(res) {
	setTimeout(() => {res(33)}, 1000)
});

let prom2 = prom1.then(function(data) {
	console.log(data);
	return new Promise(function(res) {
		setTimeout(function() {
			console.log('data: '+data);
			res('hvfub');
		}, 1000);
	});
});

let prom3 = prom2.then(function(data) {
	console.log(data);
});


console.log(Promise.resolve(4).then(d => console.log(d)).then(d => console.log(d)));
//*/



// bind all param function



/*
class PromisG extends EventEmiter {
	constructor(prom) {
		super();
		this.arrPromisG = [];
		this.arrPromisGResult = [];
		
		this.data = null;
		this.done = false;
		
		
		this.prom = prom;
		prom.call(null, this.res.bind(this));
	}
	res(data = null) {
		this.data = data;
		this.done = true;
		
		console.warn(data, this.arrPromisG.length);
		if(this.arrPromisG.length) {
			let r = this.arrPromisG.shift()(data);
			console.log(r.prom);
			r.then4?.(this.arrPromisG[0]||function(data){console.log(data);});
		};
	}
	then4(func) {
	    this.arrPromisG.push(func);
	    console.log(func.name + ', arr: ', ...this.arrPromisG.map(v => v.name));
	    if(func.n) console.error(this.arrPromisG.length, func.n);
	    return this;
	}
}


/*
(async function() {
	let d = await new PromisG(function(res) {
		setTimeout(res, 1000, 'ghxhjhc');
	});
	console.log(d);
})();
//*/


/*
let pro = new PromisG(function porm(res) {
	console.log('1this prom');
	setTimeout(() => {res('this prom')}, 1000);
	
}).then4(function prom1(data) {
	
	console.log('2this res: ', data);
	return new PromisG(res => {
		// 1
		setTimeout(() => {
			console.log('PromisG pod');
			res('this res');
		}, 2000);
	});
	
}).then4(function prom2(data) {
	
	console.log('3fin res: ', data);
	return new PromisG(res => {
		// 2
		setTimeout(() => {
			res('fin res');
		}, 2000);
	});
	
}).then4(gggg).then4(gggg);


function gggg(data) {
	
	console.log('4data: ', data);
	
	return new PromisG(res => {
		// 3
		res('ddddd');
	});
};
gggg.n = 3;

//*/






/*
function Event() {
	this._events = {};
	
	this.on = function(str, ev) {
		this._events[str] = ev;
	};
	
	this.emit = function(str, p) {
		this._events[str](p);
	};
};


let event = new Event();

(function _main_() {
	
	
	
	let gg = 5;
	
	event.on('click', function(e) {
		gg += e.x;
		console.log(e);
	});
	
})();


(function _event_() {
	
	
	
	if('?') event.emit('click', {x: 27} );
})();









/*
then4(func) {
    let r;
    if (this.done) r = func(this.d);
    else this.ev.push(func);
    return (r && r instanceof PromisG) ? r :
        new PromisG(function(res) {
            res(r);
        });
}

//*/




//	new Animation();














/*
let tttt = document.getElementById('tttt');
let clll = document.getElementById('clll');



tttt.value = `let ahja = 'gncjdhg" \\\\' "kh
hfu ' cf';
var auop = "gdjdju'\\"'jjxj
dv" fgdu";
let yyy = 6747;
auop
rbfhh
ahja
ggvf
yyy
`;
clll.addEventListener('click', function() {
	let str = tttt.value;
	
//	str = str.replace(/\n/g, ' ');
	
	let r1 = /(?<v>\\*)(?<l>"|')/g;
//	console.log(r1.source);
	
	/*
	let res = false;
	for(let i = 0; i<10; i++) {
		let ni = r1.exec(str);
		if(!(ni.groups.v.length%2)) {
			res = r1.lastIndex;
			break;
		};
	};
	
	console.log(res, r1.lastIndex);
	*
	
	
function ff(str, chars = ["'", '"'], li = 0) {
	let s = 0, ns = 0;
	let end = 0;
	let char = '';
	
	for(let i = li; i < str.length; i++) {
		if(!char && chars.includes(str[i])) char = chars.find(v => str[i] === v);
		if(str[i] === char) {
			if(!s) s = i;
			else {
				let c = 0;
				end = i;
				for(let j = end; j > s; j--) {
					if(str[j] === '\\') c++;
					else break;
				};
				if(!(c%2)) break;
			};
		};
	};
	
	return {
		'-1': str.slice(0, s),
		'+1': str.slice(end),
		0: str.slice(s, end+1),
		start: s,
		char, end
	};
};
	
	
	/*
	let arrChars = ["'", '"'];
	let u = ff(str, arrChars, 0);
	console.log(u);
	let u2 = ff(str, arrChars, u.end+1);
	console.log(u2);
	let u3 = ff(str, arrChars, u2.end+1);
	console.log(u3);
	
	
//	console.log(start, end);
//	console.log(str.slice(start, end));
	*/
	
	
	
	
	
	
	
	/*
	var maxSubArray = function(nums) {
		let max = nums[0];
		for(let i = 1; i <= nums.length; i++) {
			for(let x = 1; x <= nums.length-i; x++) {
				let r = nums.slice(x, x+i).reduce((r, v) => r+v);
				if(max < r) max = r;
			};
		};
		return max;
	};
	
//	console.log(maxSubArray([-3, -4]));
	console.log(maxSubArray([-2, 1, -3, 4,-1,2, 1, -5, 4]));
	//*/
	
	
	/*
	var moveZeroes = function(nums) {
		let l = 0;
		for(let i = 0; i < nums.length; i++) {
			if(nums[i] == 0) {
				nums.splice(i, 1);
				l++;
			};
		};
		for(let i = 0; i < l; i++) nums.push(0);
	};


	let arr = [7, 4, 0, 7, 3, 0, 6, 4, 3, 0];
	moveZeroes(arr);
	console.log(arr);
	//*/
	
	
	
	
/*	
let gg ={
	fjd: 10,
	jdjd: 'djjd'
};
	
	
function* generate(g) {
	console.log('p1');
	g.fjd += yield 10000;
	console.log('p2');
//	return g.fjd;
};

let iter = generate(gg);
console.log(iter.next()); // yield: 0
console.log(iter.next(5)); // yield: 1
//console.log(gg);






async function fname(arg) {
	let a = await prom;
};

MSG(vec2());
logDiv(vec2());


//*/





	/*
//	let rr = /(?:("|')(?:\\.|[^\1])*\1)/g;
	let rr  = /('(?:\\.|[^'])*')/g;
	let rr2 = /("(?:\\.|[^"])*")/g;
	console.log(str.match(rr));
	console.log(str.split(rr));
	console.log(str.split(rr2));
	str = str.replace(rr, '[$1]');
	str = str.replace(rr2, '{$1}');
	console.log(rr);
	console.log(str);
	
	
//	let arrStr = str.split(/(\w+)/);
//	let arrTokens = arrStr.filter((v, i) => i%2==1 && v.trim());
	
//	console.log(arrStr);
//	console.log(arrTokens);
	
//	 /("(\\.|[^"\\])*")/g;
	 
//	 /"(\\.|[^"])*"/g;
	
	
});

*/



/*
clll.addEventListener('click', function() {
	let arrStr = tttt.value.split(/(?<=(?:let|var)\s+)(\b\w+)/);
	let arrTarget = arrStr.filter((v, i) => i%2==1);
	
	let sarr = arrTarget.join('|');
	
	
	console.log(arrStr);
	console.log(arrTarget);
	console.log(sarr);
	
	let str = tttt.value.replace(RegExp('((?<!(?:let|var)\\s+)(?:'+sarr+'))', 'g'), '[$1]');
	
	console.log(str);
	
	(function(window = {}) {
	//	eval(str);
	})({});
});

//*/





