'use strict';
(function() {
	let textviewEl = document.querySelector('.textview');
	let linksEl = document.querySelector('.links');
	
	let scenes = {};
	let arrloadText = [
		'start',
		'game'
	];
	
	
	function loadText(arr) {
		let prom = [];
		for(let i of arr) prom.push(fetch(location.origin+'/text/'+i+'.txt'));
		return Promise.all(prom)
			.then(data => {
				let arr = [];
				for(let i = 0; i < data.length; i++) arr.push(data[i].text());
				return Promise.all(arr);
			});
	};
	
	loadText(arrloadText)
		.then(data => {
			for(let i = 0; i < data.length; i++) {
				let txt = '';
				let obj = data[i].match(/--------\s*(.*)\s*$/);
				
				if(obj) {
					data[i] = data[i].replace(obj[0], '');
					
					let arr = obj[1];
					arr = arr.split(/\[(.+?)<(.+?)\]/g).filter(v => v);
					
					for(let i = 0; i < arr.length; i+=2) {
						txt += buttonHtml(arr[i], arr[i+1]);
					};
				};
				scenes[arrloadText[i]] = [data[i], txt];
			};
			setScene('start');
		});
	
	
	
	let buttonHtml = (text, id) => '<button class="moveMenu" data-linkmenu="'+id+'">'+text+'</button>';
	let setScene = id => Boolean([textviewEl.textContent, linksEl.innerHTML] = scenes[id]);
	
	linksEl.addEventListener('click', function(e) {
		let el = e.path.find(v => v.classList?.contains('moveMenu'));
		if(el && scenes[el.dataset.linkmenu]) setScene(el.dataset.linkmenu);
	});
})();