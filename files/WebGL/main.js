'use strict';
let cvs = document.getElementById('canvas');
let gl = cvs.getContext('webgl');

function initWebGL() {
	Promise.all([
		fetch('./shaders/vertex.c').then(data => data.text()),
		fetch('./shaders/fragment.c').then(data => data.text())
	]).then(data => startWebGL(data[0], data[1]));
};

function resize() {
	cvs.width = gl.canvas.clientWidth;
	cvs.height = gl.canvas.clientHeight;
	
	gl.viewport(0, 0, cvs.width, cvs.height);
};


function compileShader(shaderText, type) {
	let shader = gl.createShader(type);
	gl.shaderSource(shader, shaderText);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		logDiv(type+': \n'+gl.getShaderInfoLog(shader));
	};
	return shader;
};

function compileShaders(vertexShaderText, fragmentShaderText) {
	let vertexShader   = gl.createShader(gl.VERTEX_SHADER);
	let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);
	
	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		logDiv('VERTEX_SHADER: \n'+gl.getShaderInfoLog(vertexShader));
	};
	
	gl.compileShader(fragmentShader);
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		logDiv('FRAGMENT_SHADER: \n'+gl.getShaderInfoLog(fragmentShader));
	};
	
	return [vertexShader, fragmentShader];
};


function initProgram(shaders, p) {
	let program = gl.createProgram();
	
	for(let i = 0; i < shaders.length; i++) gl.attachShader(program, shaders[i]);
	gl.linkProgram(program);
	gl.useProgram(program);
	for(let i = 0; i < shaders.length; i++) gl.deleteShader(shaders[i]);
	
	let uniformLocations = {};
	for(let i in p) uniformLocations[i] = gl.getUniformLocation(program, i);
	
	gl.validateProgram(program);
	try {
	if(!gl.getShaderParameter(program, gl.VALIDATE_STATUS)) {
		logDiv('Error validate program: \n'+gl.getShaderInfoLog(program));
		return;
	};
	} catch(err) {};
	
	return [program, uniformLocations];
};



function startWebGL(vertexShaderText, fragmentShaderText) {
	resize();
	
	let vertexArray = [
		-1.0,  1.0,
		 1.0,  1.0,
		 1.0, -1.0,
		
		-1.0,  1.0,
		 1.0, -1.0,
		-1.0, -1.0
	];
	
	let uniforms = {
		uTime: 0,
		uResolution: [cvs.width, cvs.height]
	};
	
	let vertexShader = compileShader(vertexShaderText, gl.VERTEX_SHADER);
	let fragmentShader = compileShader(fragmentShaderText, gl.FRAGMENT_SHADER);
	let [program, uniformLocations] = initProgram([vertexShader, fragmentShader], uniforms);
	//=================================//
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
	
	let positionAttribLocation = gl.getAttribLocation(program, 'vertexPosition');
	gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(positionAttribLocation);
	
	let timestart = Date.now();
	function _updata() {
		uniforms.uTime = (Date.now() - timestart)/1000;
		
		gl.uniform1f(uniformLocations.uTime, uniforms.uTime);
		gl.uniform2fv(uniformLocations.uResolution, uniforms.uResolution);
		
		gl.drawArrays(gl.TRIANGLES, 0, 6);
		requestAnimationFrame(_updata);
	}; _updata();
};

initWebGL();


































/*

[
	{
		"dir": "/storage/emulated/0/Android/data/io.spck/files/WebGL",
		"modifiedAt": 1595795700258,
		"rootDir": "/storage/emulated/0/Android/data/io.spck/files",
		"currentFilePath": "main.js",
		"defaultLaunchFilePath": "index.html",
		"git": false,
		"sessionInfo": [
			{
				"path": "/storage/emulated/0/Android/data/io.spck/files/WebGL/index.html",
				"scrollTop": -64,
				"scrollLeft": 0,
				"selectionRanges": [
					{
						"start": {
							"row": 11,
							"column": 32
						},
						"end": {
							"row": 11,
							"column": 32
						}
					}
				],
				"timestamp": 1595795693417
			},
			{
				"path": "/storage/emulated/0/Android/data/io.spck/files/WebGL/main.js",
				"scrollTop": -64,
				"scrollLeft": 0,
				"selectionRanges": [
					{
						"start": {
							"row": 0,
							"column": 0
						},
						"end": {
							"row": 0,
							"column": 0
						}
					}],
					"timestamp": 1595795700258
			}
		],
		"recentFilePaths": [
			"main.js", "index.html"
		]
	}
]

*/