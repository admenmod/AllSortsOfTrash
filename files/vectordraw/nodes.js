//========== Classez ==========//
class Structure extends Vector2 {
    constructor(x, y, p = {}) {
        super(x, y);
        this.type = 'Structure';
        this.arr = [new VectorNode(this.x, this.y)];
        this.arrType = [];
    }
    add(type = 'lineTo', ...vec) {
        let c = 1;
        switch(type) {
			case 'lineTo':			c = 1; break;
			case 'bezierCurveTo':	c = 3; break;
			case 'quadraticCurveTo':c = 2; break;
        };
        if (c > vec.length) return;
        this.arrType.push(type);
        for (let i = 0; i < c; i++) this.arr.push(vec[i]);
    }
    remove(v) {
        this.arr.splice(this.arr.indexOf(v), 1);
    }
    draw(ctx) {
        if (!this.arr.length) return;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#eeeeee';
        ctx.moveTo(this.arr[0].x, this.arr[0].y);

        //	    let sum = 1;
        for (let t = 0, sum = 1; t < this.arrType.length; t++) {
            let c = 1;
            switch (this.arrType[t]) {
                case 'lineTo': c = 1; break;
                case 'bezierCurveTo': c = 3; break;
                case 'quadraticCurveTo': c = 2; break;
            };
            //for(let i = sum; i < c; i += c) {
            //    if(sum % (c+1) >= c) {
            if (this.arr.length >= sum + c) {
                if (this.arrType[t] == 'lineTo') ctx.lineTo(this.arr[sum].x, this.arr[sum].y);
                else if (this.arrType[t] == 'quadraticCurveTo') ctx.quadraticCurveTo(this.arr[sum].x, this.arr[sum].y, this.arr[sum + 1].x, this.arr[sum + 1].y);
                else if (this.arrType[t] == 'arc') ctx.arc(this.arr[sum].x, this.arr[sum].y, this.arr[sum + 1].x, this.arr[sum + 1].y);
                else if (this.arrType[t] == 'bezierCurveTo') ctx.bezierCurveTo(this.arr[sum].x, this.arr[sum].y, this.arr[sum + 1].x, this.arr[sum + 1].y, this.arr[sum + 2].x, this.arr[sum + 2].y);
            };
            sum += c;
        };

        ctx.stroke();
        ctx.restore();
    }
}


let focus = {
    targetV: [],
    arrfixposV: [],
    fixposV: function() {
        for (let i = 0; i < focus.targetV.length; i++) {
            this.arrfixposV[i] = this.targetV[i].buf();
        };
    },
    drawV: function(ctx = main) {
        if(this.targetV.length == 0) return;
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = '#00cc00';
        for(let i = 0; i < this.targetV.length; i++) {
            ctx.beginPath();
            ctx.arc(this.targetV[i].x, this.targetV[i].y, 1 + this.targetV[i].radius * 2, 0, Math.PI * 2);
            ctx.stroke();
        };
        ctx.restore();
    }
};

//========== Functions ==========//
