let logEl = document.getElementById('console');
function pre(msg, color = '#eeeeee') {
	return '<pre class="console-msg" style="color:'+color+'">'+msg+'</pre>';
};
function samp(msg, color = '#eeeeee') {
	return '<samp style="color:'+color+'">'+msg+'</samp>';
};

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
		t = t.replace(/ ([\d\.]+)\b,/g, '<samp style="color:#0077ff"> $1</samp>,');
//		alert(t);
		t = t.replace(/ #([adcbef\d]{6,8})/g, '<samp style="color:#$1"> #$1</samp>');
		t = t.replace(/(null|object|function|native)/g, '<samp style="color:#cc5577">$1</samp>');
		t = t.replace(/,\n\}/g, '\n}');
//		return t.match(/outerHTML: (?:.+),/)[1];
	} else t = m;
	logEl.innerHTML = pre(t);
};


let writeConsoleEl = document.getElementById('write-console');
writeConsoleEl.oninput = function(e) {
	try {
		if(this.value.search(';') == this.value.length-1) eval(this.value);
	} catch(err) {logDiv('<samp style="color: #ff2222;">'+err.stack+'</samp>')};
};