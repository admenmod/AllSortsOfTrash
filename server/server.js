let fs = require('fs');
//let path = require('path');
let http = require('http');

let c = require('./modules/colorlog');


let ifaces = require('os').networkInterfaces();
let localhost = Object.keys(ifaces).reduce(function(host, ifname) {
	let iface = ifaces[ifname].find(iface => !('IPv4' !== iface.family || iface.internal !== false));
	return iface ? iface.address : host;
}, '127.0.0.1');



let server = http.createServer(function(req, res) {
try {
	let fileType = req.url.match(/\.(\w+)$/)[1];
	let dir = req.url.match(/(\w+)\.\w+/)[1];
	console.log(dir);
	
	if(fileType != 'ico') {
		res.writeHead(200, {'Content-Type': 'text/'+fileType.toLowerCase()});
		res.write(fs.readFileSync('./assets/'+fileType+'/'+dir+'.'+fileType, 'utf8'));
		console.log(c('load file: ', 33)+c(req.url, 34));
	};
	res.end();
} catch(err) {
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.write(fs.readFileSync('./assets/html/404.html', 'utf8'));
	res.end();
	console.log(c(err, 31));
};
});

server.listen(8000, localhost, function() {
	console.log(c('Server ', 33)+c('ranning ', 33)+c(localhost+':8000', 36)+'...');
});



/*
for(let i = 30;i<38;i++) {
	let r = '';
	for(let k = 40;k<48;k++) r+=c(i+':'+k, k, i)+'  ';
	console.log('\n'+r);
};*/