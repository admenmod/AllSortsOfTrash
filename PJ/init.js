





























let cvs = document.getElementById('canvas');
let {main, back} = cvs.canvasEmitCamera;
let {vw, vh, vwh, vhw, vmax, vmin} = cvs;

// let touch = new TouchControl(cvs);
let touch = new TouchControl(cvs, e => e.path[0].className !== 'slot');

let listMenu = document.querySelector('.list-menu');
let buttons = document.querySelectorAll('.button');

cvs.ondblclick = function() {
	this.webkitRequestFullScreen();
	cvs._updata();
};


let g = {};					// global
let s = {};					// system

let db = {};				// resurs
let em = new EventEmiter(); // events


let running = cvs.loadFiles([
	{title: 'PlayerSpeed',	 src: 'img/ArtPack/Player_Speed.png',	type: 'image'},
	{title: 'PlayerAttack',  src: 'img/ArtPack/Player_Attack.png',	type: 'image'},
	{title: 'PlayerDefense', src: 'img/ArtPack/Player_Defense.png',	type: 'image'},
	
	{title: 'EnemyNeon1', src: 'img/ArtPack/Enemy_1_Neon.png', type: 'image'},
	{title: 'EnemyNeon2', src: 'img/ArtPack/Enemy_2_Neon.png', type: 'image'},
	{title: 'EnemyNeon3', src: 'img/ArtPack/Enemy_3_Neon.png', type: 'image'},
	
	{title: 'Button1', src: 'img/ArtPack/1.png', type: 'image'},
	{title: 'Button2', src: 'img/ArtPack/2.png', type: 'image'},
	{title: 'Button3', src: 'img/ArtPack/3.png', type: 'image'},
	
	{title: 'Point',  src: 'img/ArtPack/Point.png',  type: 'image'},
	{title: 'Meteor', src: 'img/ArtPack/Meteor.png', type: 'image'},
	{title: 'PlayerBullet', src: 'img/ArtPack/Player_Bullet.png', type: 'image'},
	
	{title: 'shipsheetparts', src: 'img/shipsheetparts.PNG', type: 'image'}
/*		{
		title:	'HumanBattlecruiser',
		src:	'img/OriginalHumanShips/HumanBattlecruiser.png',
		type:	'image'
	}*/
], db);