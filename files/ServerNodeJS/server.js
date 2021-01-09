'use strict';																										
let http	= require('http');
let fs		= require('fs');
let c		= require('./modules/colorLog');


let port = 3000||8000;
let ifaces = require('os').networkInterfaces();
let host = Object.keys(ifaces).reduce(function(host, ifname) {
	let iface = ifaces[ifname].find(iface => !('IPv4'!==iface.family||iface.internal!==false));
	return iface?iface.address:host;
}, '127.0.0.1'); // 192.168.43.1


let server = http.createServer(function(req, res) {
	//req прих запрос
	//res уход ответ
	console.log(req.url);
	let fileType = req.url.match(/\.(\w+)/i);
	
	let mimeTypes = {
		html: 'text/html',
		css: 'text/css',
		js: 'text/javascript',
		json: 'application/json'
	};
	
	res.setHeader("Access-Control-Allow-Origin", "*");
//	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	
	if(req.url === '/') {
		res.writeHead(200, {'Content-type': 'text/html'});
		res.write(fs.readFileSync('./public/index.html'));
	} else if(fileType[1] in mimeTypes) {
		res.writeHead(200, {'Content-type': mimeTypes[fileType[1]]});
		res.write(fs.readFileSync('./public'+req.url));
	};
	res.end();
});

server.listen(port, host, function() {
	console.log('(server)'+c(host, 33)+':'+c(port, 36));
});

