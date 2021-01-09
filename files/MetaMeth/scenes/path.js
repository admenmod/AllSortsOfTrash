'use strict';
scenes.path = function() {
/*	let aEl = document.getElementById('aV');
    let bEl = document.getElementById('bV');

    let a = 1,
        b = 1;
    aEl.oninput = function(e) {
        a = +this.value;
        console.log('a: ' + this.value);
        back.clearRect(0, 0, cvs.width, cvs.height);
        vec.set(0, 0);
    };

    bEl.oninput = function(e) {
        b = +this.value;
        console.log('b: ' + this.value);
        back.clearRect(0, 0, cvs.width, cvs.height);
        vec.set(0, 0);
    };
	//*/
	
    netmap.tile.set(10, 10);

    let pad = netmap.size.buf().minus(netmap.size.buf().ost(netmap.tile)).div(2);
    pad.plus(-100, 100);

    //	let res = (x**2 / A**2) - (y**2 / B**2);
    //	console.log(res);

    let vec = vec2(0, 0);
    window.arr = [];

    function grafikDraw(v, a, b, sc) {
        //	(v.x/a - v.y/b)**2;


        //	v.y = (v.x*(b/(a*b)) / (a/(a*b)))**2-1;

//			v.x = (b + v.y) / (a * b); //b*(v.x-a)/a; 
//			arr.push(Math.round(((v.x / a - v.y / b) ** 2) * 1000000) / 1000000);

		v.x = v.y**a;

        //window.u = (v.x*b/a/(a*b))**2-1;

        /*	(x/a - y/b)**2 == 1;
        	(x/5 - y/2)**2 == 1;
        	
        	((x*b - y*a) / (a*b))**2 == 1;
        	((x*2 - y*5) / 10)**2 == 1;
        	
        	(x*b/(a*b)-y*a/(a*b))**2 == 1;
        	(x*2/(a*b)-y*5/(a*b))**2 == 1;
        	(x*2/10-y*5/10)**2 == 1;
        	(x*0.2-y*0.5)**2 == 1;
        	
        	// 1
        		(2*x/(a*b)-5*y/(a*b))**2 == 1;
        		0.2*x - 0.5*y == 1;
        		
        //		0.2*x == 0.5*y+1;
        		0.5*y == 0.2*x-1;
        //		y = (0.2*x-1)/0.5;
        //		y = 0.2*x/0.5 - 1/0.5;
        //		y = 0.4*x - 2;
        		
        		
        	//*	y = (x*(b/(a*b)) / (a/(a*b)))-1;
        	//*	y = 0.2*x / 0.5-1;
        	
        	// 2
        		((b*x-a*y)/(a*b))**2 == 1;
        		((2*x-5*y)/10)**2 == 1;
        		
        		y = ((2*x/5-1)/(a*b))**2;
        		y = ((2*x/5-1)/10)**2;
        	//*/

        /*
        x*x*a + x*b + c
        x*x*a
        //*/

        back.beginPath();
        back.fillStyle = '#ff0000';
        back.arc(v.x * sc + pad.x, -v.y * sc + pad.y, 1, 0, Math.PI * 2);
        back.fill();
    };

    //*/
    
    /*
    let obj = {
    	hhh: {
    		'uuuu.gg': {
    			u: 7
    		}
    	}
    };
    
    let rpq = /[\w\.]+/g;
    let rq = /(?:\/)?([\.\w^/]+\/)*(?:([\.\w]+)\.([\w]+))/g;
    //let rq = /((?:\w+\/)+?)+/;
    
    let str = 'hhghg/kgi/../hh_hggoh/ifg.hc/gjhhi/uhbc.ftggg.js';
    let arrStr = str.split('/');
    console.log(rpq.exec(str));
    console.log(str.match(rpq));
    console.log(arrStr);
    
    window.pars = function(str) {
    	let arrStr = str.split('/');
    	return arrStr.reduce(function(obj, item) {
    		return obj[item];
    	}, obj);
    };
	console.log(pars());
    
    //*/
    
    
    /*
		let o = Math.PI/180;
		let flo = (n, nn=1000000000) => Math.round(n*nn)/nn;
		
		let c = 10;
		let r = c*c/2;
		let ll = Math.sqrt(c*c+c*c);
		let rr = ll/2*Math.cos(o*45)*ll;
		
		//console.log(`t: ${ll*ll*(ll/2)/3/4}`);
		
		let fh = (s, ax=0, ay=0) => s*Math.cos(ax*o)*Math.cos(ay*o);
//		console.log(ll*ll*Math.cos(o*45)/3);
		//*/


    //=======updata=======//
    let fixpos = main.camera.buf();
    let cameraSpeed = vec2();

    this.updata = function() {
        main.ctx.clearRect(0, 0, cvs.width, cvs.height);
        let touchC = main.camera.buf().plus(touch);
        if(touch.isDblClick()) netmap.size.set(cvs.width, cvs.height);

        //=======prePROCES=======//


        //=======PROCES=======//


        //=======DRAW=======//
        netmap.draw(main);
        
        
        if (vec.y == 0) {
            for (let i = 0; i < 150; i++) {
			//	grafikDraw(vec, a, b, 100);
				vec.y += 0.01;
            };
        };
	/*	main.fillStyle = '#ffffff';
		main.fillText(a, 100, 200);
		main.fillText(b, 100, 210);*/
    };
};