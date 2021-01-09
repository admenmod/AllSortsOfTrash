try {
	function log(m, f) {
		if(typeof m !== 'object') return m;
		let t = '';
		for(let i in m) {
			if(!f || f.test(i)) t += i+': '+m[i]+'\n';
		};
		return t;
	};
	

fetch('http://10.180.19.218:8000/home.html', {
	method: 'GET'
}).then(function(data) {
	alert(log(data));
});







} catch(err) {alert(err.stack);};