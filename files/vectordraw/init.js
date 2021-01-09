'use strict';
let cvs = document.getElementById('canvas');
let {main, back} = cvs.canvasEmitCamera;
//let {vw, vh, vwh, vhw, vmax, vmin} = cvs;

let touch = new TouchControl(cvs);

cvs.addEventListener('dblclick', function() {
	this.webkitRequestFullScreen();
	cvs._updata();
});

let scenes = {};
let db = {};				// resurs
let em = new EventEmiter(); // events

let running = cvs.loadFiles([
	{title: 'unit_icon_air', src: './img/unit_icon_air.png', type: 'image'}
], db).then(function() {
	for(let i in scenes) scenes[i] = new Scene(scenes[i]);
	Scene.set(scenes.start);
	requestAnimationFrame(_updata);
});

//========== LoopGame ==========//
function _updata() {
	touch.updata();
	Scene.active_scene.updata();
	touch.onNull();
	requestAnimationFrame(_updata);
};








/*
const A = 1, B = 1;
let x = 1, y = 1;



let res = (x**2 / A**2) - (y**2 / B**2);
//console.log(res);


/*
let o = Math.PI/180;
let flo = (n, nn=1000000000) => Math.round(n*nn)/nn;

let c = 10;
let r = c*c/2;
let ll = Math.sqrt(c*c+c*c);
let rr = ll/2*Math.cos(o*45)*ll;

//console.log(`t: ${ll*ll*(ll/2)/3/4}`);
let rpq = /[\w\.]+/g;
let rq = /(?:\/)?([\.\w^/]+\/)*(?:([\.\w]+)\.([\w]+))/g;
//let rq = /((?:\w+\/)+?)+/;

let str = '///hhghg/kgihh_hggoh/ifg.hc/gjhhi/uhbc.ftggg.js';
console.log(rpq.exec(str));
console.log(str.match(rpq));


let fh = (s, ax=0, ay=0) => s*Math.cos(ax*o)*Math.cos(ay*o);
*/


//console.log(`+${r+r+r}\n*${r*r*r}`);
//console.log(Math.pow(fh(rr, 45, 45), 3));

//console.log(Math.pow(fh(r, 0, 0), 3));
//console.log(Math.pow(fh(rr, 45, 45), 3));
//console.log(Math.pow(fh(rr, 45, 45), 3));
//console.log(flo(Math.cos(o*45)*ll)+' '+c);



