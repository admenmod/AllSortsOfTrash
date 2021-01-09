'use strict';
let cvs = document.getElementById('canvas');
let {main, back1, back2} = cvs.canvasEmitCamera;
//let {vw, vh, vwh, vhw, vmax, vmin} = cvs;

let touch = new TouchControl(cvs);
/*
cvs.addEventListener('dblclick', function() {
	this.webkitRequestFullScreen();
	cvs._updata();
});
*/

let db = {};				// resurs
let em = new EventEmiter(); // events

let running = cvs.loadFiles([
	{title: 'unit_icon_air', src: './img/unit_icon_air.png', type: 'image'}
], db);

//========== LoopGame ==========//
function _updata() {
	touch.updata();
	Scene.active_scene.updata();
	touch.onNull();
	requestAnimationFrame(_updata);
};

