scenes.test = function() {
    let pad = 150;
    let a = new VectorNode(0, 0),
        b = new VectorNode(70, 40);

    let gosticMove = new Gostic({
        pos: vec2(cvs.width, cvs.height).minus(90)
    });
    let gosticHead = new Gostic({
        pos: vec2(0, cvs.height).minus(-90, 90)
    });


    let v = new VectorNode(50, -100);
    let v1 = new VectorNode(150, 100);

    let u = 0;
    main.camera.set(-150, -150);


    function isT(...[v, c, a, b]) {
        return (
            //	v.x < b.x/(b.y/v.y)
            //		v.x < b.x/b.y*v.y
            //	v.x < b.y/v.y*b.x
            //	v.x < b.x/v.y*b.y

            (
                //	Math.min(v.x, c.x) && Math.max(v.x, c.x)
                // в одну сторону
                (b.x < c.x / c.y * b.y)
            ) && (
                (v.x < b.x / b.y * v.y) ==
                (c.x < b.x / b.y * c.y)
            )
        );
    };
	
	
	this.init = function() {
		netmap.tile.set(50);
		
		back.camera = main.camera;
		for(let y = a.y-pad; y < b.y+pad; y+=2) {
		    for(let x = a.x-pad; x < b.x+pad; x+=2) {
		        let u = new VectorNode(x, y);
		        u.alpha = 0.5;
		        u.radius = 0.5;
		        u.color = '#00ff00';
		        if (isT(u, v1, a, b)) u.color = '#44ee44';
		        else u.color = '#ff4444';
		        u.draw(back);
		    };
		};
	};
	

    //=======updata=======//
    let fixpos = main.camera.buf();
    let cameraSpeed = vec2();

    this.updata = function() {
        main.ctx.clearRect(0, 0, cvs.width, cvs.height);
        back.camera.set(main.camera);
        let touchC = main.camera.buf().plus(touch);
        if (touch.isDblClick()) netmap.size.set(cvs.width, cvs.height);

        //=======prePROCES=======//
        if (!gosticMove.useF && !gosticHead.useF) {
            /*{
            if(touch.isPress()) fixpos = main.camera.buf();
            if(touch.isDown()) main.camera = fixpos.buf().minus(touch.dx, touch.dy);
            if(touch.isMove()) cameraSpeed.set(touch.sx <= 10 ? touch.sx : 10, touch.sy <= 10 ? touch.sy : 10);
            else {
            	cameraSpeed.moveTime(vec2(), 10);
            	main.camera.minus(cameraSpeed).floor(1000);
            }; //}*/
        };


        //=======PROCES=======//
        gosticMove.updata();
        gosticHead.updata();

        if(isT(v, v1, a, b)) {
            a.color = '#00ff00';
            b.color = '#00ff00';
        } else {
            a.color = '#ee3333';
            b.color = '#ee3333';
		};
		
		
		v.moveAngle(gosticMove.value**4*1, gosticMove.angle);
		v1.moveAngle(gosticHead.value**4*3, gosticHead.angle);
		
		
		//=======DRAW=======//
		netmap.draw(main);
		
		a.draw(main);
		b.draw(main);
		v1.draw(main);
		v.draw(main);

        main.save();
        main.beginPath();
        main.setLineDash([5, 3]);
        main.lineWidth = 0.7;
        main.lineDashOffset = u += 0.1;
        main.strokeStyle = '#00ffff';
        main.strokeRect(a, b.buf().minus(a));

        main.beginPath();
        main.strokeStyle = '#ffff00';
        main.moveTo(b);
        main.lineTo(v);
        main.moveTo(a);
        main.lineTo(v);
        main.stroke();

        main.beginPath();
        main.setLineDash([]);
        main.strokeStyle = a.color;
        main.moveTo(a);
        main.lineTo(b);
        main.stroke();

        main.beginPath();
        main.moveTo(v);
        main.lineTo(v1);
        main.stroke();

        main.fillStyle = '#eeeeee';
        main.fillText('x:' + ~~v.x, v.x, v.y - 20);
        main.fillText('y:' + ~~v.y, v.x, v.y - 10);
        main.restore();

        gosticMove.draw(main.ctx);
        gosticHead.draw(main.ctx);
    }; //==============================//
};


function pointIsLine(v, a, b) {
    return v.x < (a.x - b.x) / (a.y - b.y) * (a.y - v.y) + a.x;
};