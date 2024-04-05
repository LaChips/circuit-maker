class BATTERY extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.debug_tick_delay = 2000;
		this.name = "Battery";
		this.intensity = 1.0;
		this.width = 60;
		this.height = 90;
		this.pins_out = [
			{
				label: "-",
				value: 0,
				offsetX: 31,
				offsetY: -100,
				labelOffsetX: 0,
				labelOffsetY: -17,
				connect: []
			}
		];
		this.pins_in = [
			{
				label: "+",
				value: 0,
				offsetX: 31,
				offsetY: 15,
				labelOffsetX: 0,
				labelOffsetY: 0,
				connect: []
			}
		]
		this.assets = [
			"M 30 60 L 30 90 M 30 0 L 30 30 M 0 30 L 60 30 M 0 50 L 60 50 M 40 60 L 20 60 M 40 40 L 20 40",
		]
	}

	getLinkedBattery(pins) {
		for (const pin of pins) {
			for (const link of pin.connect || []) {
				if (!link.fromComponent) {
					continue;
				}
				if (!link.fromComponent.comp?.doesTransmit()) {
					return null;
				}
				if (link.fromComponent.comp?.id === this.id) {
					return link.fromComponent.comp;
				}
				return this.getLinkedBattery(link.fromComponent?.comp?.pins_in || []);
			}
		}
		return null;
	}

	isCircuitClosed() {
		const linkedBattery = this.getLinkedBattery(this.pins_in || []);
		return linkedBattery && linkedBattery.id === this.id;
	}


	update() {
		this.updateTick();
		const isClosed = this.isCircuitClosed();
		this.debug_log({isClosed, out: this.pins_out[0].value});
		if (isClosed)
			this.pins_out[0].value = 1;
		else {
			this.pins_out[0].value = -1;
		}
	}

	computePinPos(pin) {
		let r = this.rotation * Math.PI / 180;
		let ax = pin.offsetX - 2;
		let ay = pin.offsetY;

		let bx = this.width / 2;
		let by = -this.height / 2;

		let px = this.position.x + (bx + (ax - bx) * Math.cos(-r) + (ay - by) * Math.sin(-r));
		let py = this.position.y - (by + (ax - bx) * Math.sin(-r) + (ay - by) * Math.cos(-r));
		return {x: px, y: py};
	}

	drawPins(pins) {
		for (let i = 0; i < pins.length; i++) {
			pins[i].position = this.computePinPos(pins[i]);
			this.ctx.font = '14px monospace';
			this.ctx.textAlign = 'center';
			this.ctx.fillStyle = 'black';
			this.ctx.fillText(pins[i].label, pins[i].position.x + pins[i].labelOffsetX, pins[i].position.y - 2 - pins[i].labelOffsetY);
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(pins[i].position.x - 2, pins[i].position.y, 5, 5);
		}
	}

	drawComponent() {
		for (let line of this.assets) {
			let path = new Path2D(line);
			this.ctx.stroke(path);
		}
	}

	debug_log(data) {
		if (this.show_debug) {
			console.log(data);
		}
	}

	draw() {
		this.ctx.save();
		this.ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
		this.ctx.rotate(this.rotation * Math.PI / 180);
		this.ctx.translate(-this.width / 2, -this.height / 2)
		this.drawComponent();
		this.ctx.restore();
		this.drawPins(this.pins_in);
		this.drawPins(this.pins_out);
		this.drawName();
	}
}