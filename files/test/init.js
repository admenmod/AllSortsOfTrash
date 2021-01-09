'use strict';
let cvs = document.getElementById('canvas');
let {main, back} = cvs.canvasEmitCamera;

let touch = new TouchControl(cvs);

let db = {}; // resures: [images, audios]
let em = new EventEmiter();

let cfg = {};
let scenes = {};

cvs.loadFiles([], db).then(function() {
setTimeout(function() {
	for(let i in scenes) scenes[i] = new Scene(scenes[i]);
	Scene.set(scenes.main);
//	requestAnimationFrame(function(dt) {_updata.dt = dt;});
	requestAnimationFrame(_updata);
}, 50);
});

//========== LoopGame ==========//
function _updata(dt) {
	touch.updata();
	Scene.active_scene.updata(dt);
	touch.onNull();
	requestAnimationFrame(_updata);
};