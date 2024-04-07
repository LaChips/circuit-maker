class Link {
	constructor(ctx, from, to) {
		let f, t;
		if (to.pin_type == "pins_in" && from.pin_type == "pins_out") {
			f = from;
			t = to;
		}
		else if (to.pin_type == "pins_out" && from.pin_type == "pins_in"){
			f = to;
			t = from;
		}
		else
			throw new Error("Links can only be created to identical pin's types");
		this._id = Math.random();
		this.ctx = ctx;
		this.fromComponent = f.comp;
		this.fromComponentPinIndex = f.pin_index;
		this.fromComponentPinType = f.pin_type;
		this.toComponent = t.comp;
		this.toComponentPinIndex = t.pin_index;
		this.toComponentPinType = t.pin_type;
		this.toComponent[t.pin_type][t.pin_index].connect.push({
			...this.fromComponent[f.pin_type][f.pin_index],
			fromComponent: {...f},
			_id: this._id,
		});
		this.fromComponent[f.pin_type][f.pin_index].connect.push({
			...this.toComponent[t.pin_type][t.pin_index],
			toComponent: {...t},
			_id: this._id,
		});
	}

	update() {
		this.toComponent.setPinValue(this.toComponentPinType, this.toComponentPinIndex, this.fromComponent.getPinValue(this.fromComponentPinType, this.fromComponentPinIndex));
		//this.toComponent[this.toComponentPinType][this.toComponentPinIndex].value = this.fromComponent[this.fromComponentPinType][this.fromComponentPinIndex].value;
	}

	draw() {
		if (!this.fromComponent || !this.toComponent)
			return;
		let startX = this.fromComponent[this.fromComponentPinType][this.fromComponentPinIndex].position.x;
		let startY = this.fromComponent[this.fromComponentPinType][this.fromComponentPinIndex].position.y;

		let endX = this.toComponent[this.toComponentPinType][this.toComponentPinIndex].position.x;
		let endY = this.toComponent[this.toComponentPinType][this.toComponentPinIndex].position.y;
		this.ctx.strokeStyle = "rgb(0, 0, 0)";
		this.ctx.beginPath();
		this.ctx.moveTo(startX + 2,startY + 2);
		this.ctx.lineTo(endX + 2, endY + 2);
		this.ctx.stroke();
		this.ctx.closePath();
	}
}