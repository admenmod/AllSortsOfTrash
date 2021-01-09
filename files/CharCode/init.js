'use strict';
let cvs = document.getElementById('canvas');
let {main, back} = cvs.canvasEmitCamera;

let touch = new TouchControl(cvs);

/*cvs.addEventListener('dblclick', function() {
    this.webkitRequestFullScreen();
    cvs._updata();
});*/

let db = {}; // resures: [images, audios]
let em = new EventEmiter();

let cfg = {};
let scenes = {};
let sss = true;

cvs.loadFiles([{
		title: 'im', type: 'image',
		src: './img/image.jpg'
	}], db).then(function() {
	setTimeout(function() {
		for(let i in scenes) scenes[i] = new Scene(scenes[i]);
		Scene.set(scenes.matriks);
		requestAnimationFrame(_updata);
	}, 50);
});

//========== LoopGame ==========//
function _updata(dt) {
	touch.updata();
	Scene.active_scene.updata(dt);
	touch.onNull();
	if(sss) requestAnimationFrame(_updata);
};