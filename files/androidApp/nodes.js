'use strict';
class UnitAir extends ImageNode {
	constructor(p) {
		super(p);
		let posC = this.getPosC();
		this.target = new VectorNode(posC.x, posC.y);
		
		this.title = p.title||'Title';
	}
}


class ShipUnit extends ImageNode {
	constructor(p) {
		super(p);
		this.targets = [];
	}
}