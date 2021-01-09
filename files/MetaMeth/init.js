'use strict';
let cvs = document.getElementById('canvas');
let {main, back} = cvs.canvasEmitCamera;

let touch = new TouchControl(cvs);

let db = {}; // resures: [images, audios]
let em = new EventEmiter();

let cfg = {};
let scenes = {};

cvs.loadFiles([{
	title: 'unit_icon_air',	type: 'image',
	src: './img/unit_icon_air.png'
}, {
	title: 'unit_icon_builder', type: 'image',
	src: './img/unit_icon_builder.png'
}, {
	title: 'unit_icon_building_air_turrent', type: 'image',
	src: './img/unit_icon_building_air_turrent.png'
}, {
	title: 'wall_b', type: 'image',
	src: './img/wall_b.png'
}/*, {
	title: 'audio1', type: 'audio',
	src: './audio/audio1.ogg'
}, {
	title: 'audio2', type: 'audio',
	src: './audio/audio2.ogg'
}*/], db).then(function() {
	setTimeout(function() {
	for(let i in scenes) scenes[i] = new Scene(scenes[i]);
	Scene.set(scenes.init);
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