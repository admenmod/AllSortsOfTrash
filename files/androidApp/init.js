'use strict';
let cvs = document.getElementById('canvas');
let {main, back} = cvs.canvasEmitCamera;

let touch = new TouchControl(cvs, e => e.path[0].className !== 'slot');

let db = {}; // resures: [images, audios]
let em = new EventEmiter();

let cfg = {};
let scenes = {};


cvs.loadFiles([{
//============ ARMORY ============//
	title: 'F16',	type: 'image',
	src: './img/armory/F16.png'
}, {
	title: 'F22',	type: 'image',
	src: './img/armory/F22.png'
}, {
	title: 'J20',	type: 'image',
	src: './img/armory/J20.png'
}, {
	title: 'Su27',	type: 'image',
	src: './img/armory/Su27.png'
}, {
	title: 'Eagle',	type: 'image',
	src: './img/armory/Eagle.png'
}, {
//============ SHIPZ ============//
	title: 'water_ripple_big_000',	type: 'image',
	src: './img/shipz/water_ripple_big_000.png'
}, {
	title: 'water_ripple_big_001',	type: 'image',
	src: './img/shipz/water_ripple_big_001.png'
}, {
	title: 'water_ripple_big_002',	type: 'image',
	src: './img/shipz/water_ripple_big_002.png'
}, {
	title: 'water_ripple_big_003',	type: 'image',
	src: './img/shipz/water_ripple_big_003.png'
}, {
	title: 'water_ripple_big_004',	type: 'image',
	src: './img/shipz/water_ripple_big_004.png'
}, {
	title: 'ship_big_gun',		type: 'image',
	src: './img/shipz/ship_big_gun.png' //ship_gun_dual_gray
}, {
	title: 'ship_gun_base_big',	type: 'image',
	src: './img/shipz/ship_gun_base_big.png'
}, {
	title: 'ship_large_body',	type: 'image',
	src: './img/shipz/ship_large_body.png'
}, {
//============ UNIT_ICON ============//
	title: 'unit_icon_air',	type: 'image',
	src: './img/unit_icon/unit_icon_air.png'
}/*, {
	title: 'unit_icon_builder', type: 'image',
	src: './img/unit_icon/unit_icon_builder.png'
}, {
	title: 'unit_icon_building_air_turrent', type: 'image',
	src: './img/unit_icon/unit_icon_building_air_turrent.png'
}, {
	title: 'wall_b', type: 'image',
	src: './img/unit_icon/wall_b.png'
}*/], db).then(function() {
	setTimeout(function() {
		for(let i in scenes) scenes[i] = new Scene(scenes[i]);
		Scene.set(scenes.main);
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