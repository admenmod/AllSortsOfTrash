let {logDiv, SetlogDiv, log, createEl} = (function() {
'use strict';
let logEl = document.getElementById('console')||(function() {
	let el = document.createElement('div');
	el.id = 'console';
	document.getElementById('win').appendChild(el);
	return el;
})();
let pre = (msg, color = '#eeeeee') => '<pre class="console-msg" style="color:'+color+'">'+msg+'</pre>';
let samp = (msg, color = '#eeeeee') => '<samp style="color:'+color+'">'+msg+'</samp>';

function logDiv(m, f=!0) {
	let t = '';
	if(typeof m === 'number') t+='<samp style="color:#0077cc">'+m+'</samp>';
	else if(typeof m === 'object'||!f) {
		t += '{\n';
		for(let i in m) t += '   '+i+': '+m[i]+',\n';
		t += '}';
		
		t = t.replace(/ (true|false),/g, ' <samp style="color:#cc4400">$1</samp>:');
		t = t.replace(/(?:(\w+): )(?!#)/g, '<samp style="color:#ccaa00">$1</samp>: ');
		t = t.replace(/(\d+),/g, '<samp style="color:#0077cc">$1</samp>,');
		t = t.replace(/(null|object|function|native)/g, '<samp style="color:#cc5577">$1</samp>');
		t = t.replace(/,\n\}/g, '\n}');
//		return t.match(/outerHTML: (?:.+),/)[1];
	} else t = m;
	logEl.innerHTML += pre(t);
};

function SetlogDiv(m, f=!0) {
	let t = '';
	if(typeof m === 'number') t+='<samp style="color:#0077cc">'+m+'</samp>';
	else if(typeof m === 'object'||!f) {
		t += '{\n';
		for(let i in m) {
			if(m[i] instanceof Vector2) {
				t += '   '+i+': <samp style="color:#00cc44">Vector2(</samp>x: '+m[i].x+', y: '+m[i].y+'<samp style="color:#00cc44">)</samp>,\n';
			} else {
				t += '   '+i+': '+m[i]+',\n';
			};
		}; t += '}';
		
		t = t.replace(/ (true|false),/g, ' <samp style="color:#cc4400">$1</samp>:');
		t = t.replace(/(?:(\w+): )/g, '<samp style="color:#ccaa00">$1</samp>: ');
//		alert(t);
		t = t.replace(/ -?([\d\.]+)\b,/g, '<samp style="color:#0077ff"> $1</samp>,');
//		alert(t);
		t = t.replace(/ #([adcbef\d]{6,8})/g, '<samp style="color:#$1"> #$1</samp>');
		t = t.replace(/(null|object|function|native)/g, '<samp style="color:#cc5577">$1</samp>');
		t = t.replace(/,\n\}/g, '\n}');
//		return t.match(/outerHTML: (?:.+),/)[1];
	} else t = m;
	logEl.innerHTML = pre(t);
};

function log(msg, limit) {logEl.innerHTML += pre(createEl(msg, limit)); return msg};
function createEl(msg, limit = 1, rec = 0) {
	let text = '';
	let pad = ''; for(let i=0;i<(rec+1)*3;i++) pad+=' ';
	let pade = ''; for(let i=0;i<rec*3;i++) pade+=' ';
	
	if(msg === undefined || msg === null || isNaN(msg)&&typeof msg === 'number' || typeof msg === 'boolean') text += samp(msg, '#aa66ff');
	else if(typeof msg === 'number') text += samp(msg, '#cceecc');
	else if(typeof msg === 'string') text += samp(`"${msg}"`, '#eeee55');
	else if(typeof msg === 'function') {
		text += msg;
		let name = msg.name; // text.match(/function([\s\w^(]*)\(/)[1].trim();
		
	//	console.log(msg.name);
		text = text.replace(/(native code)/g, samp('$1', '#cc5577'));
		
		if(name) text = text.replace(/function [\w\s]+/, samp('function ', '#2288dd')+samp(name, '#eeeeaa'));
		else text = text.replace(/function\s*/, samp('function', '#2288dd'));
		
	//	text = text.replace(/\(\s*(\w+)\s*,\s*(\w+)\s*\)/, `(${samp('$1', '#aaffff')}, ${samp('$2', '#aaffff')})`);
	} else if(Array.isArray(msg)) {
		text += '('+msg.length+')[';
		for(let i in msg) text += `${createEl(msg[i], limit, rec)}, `;
		text = text.replace(/, $/, '');
		text += ']';
	} else if(typeof msg === 'object'&&rec<limit) {
		let pl = Object.getPrototypeOf(msg);
		while(pl) {
			text += pl.constructor.name+'|';
			pl = Object.getPrototypeOf(pl);
		};
		
		text = log(text.split('|').map(v => v = samp(v, '#88ee88'))).join(': ');
		text +='{\n';
		for(let i in msg) {
			text += `${pad}${samp(i, '#aaffff')}: ${/*msg[i] instanceof Vector2?String(msg[i]).replace('Vector2', samp('Vector2', '#99ee99')).replace(/(\b\d+\b)/g, samp('$1', '#aaeeaa')):*/createEl(msg[i], limit, rec+1)},\n`;
			
		};
		text += pade+'}';
		text = text.replace(/,(\s*\})/, '$1').replace(/\{\s+\}/g, '{}');
	} else if(typeof msg === 'object') {
		text += '<button class="object-open">['+samp('object ', '#cc7755')+samp(msg.constructor.name, '#88ee88')+']</button>';
	};
	return text;
};

return {logDiv, SetlogDiv, log, createEl};
})();