class SWITCH extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.state = 0;
        this.isOpen = true;
		this.name = "SWITCH";
		this.width = 65;
		this.height = 30;
		this.pins_in = [
			{
				label: "-",
				value: -1,
				offsetX: 80,
				offsetY: -15,
				default: -1,
				connect: []
			}
		];
		this.pins_out = [
			{
				label: "+",
				value: -1,
				offsetX: -10,
				offsetY: -15,
				default: -1,
				connect: []
			}
		]
		this.assets = [
			"M 0 15 H 20 V 18 H 0 Z",
			"M 25 16 m -8 0 a 1 1 0 1 0 8 0 a 1 1 0 1 0 -8 0 M 24.917 15.201 C 24.686 13.889 23.693 12.938 23.073 12.574 L 38 7 L 39.407 9.813",
			"M 25 16 m -8 0 a 1 1 0 1 0 8 0 a 1 1 0 1 0 -8 0 M 24.442 18.029 C 24.838 17.389 25.468 15.727 24.45 13.99 L 39.987 14.028 L 39.987 17.984",
			"M 25 16 m 15 0 a 1 1 0 1 0 8 0 a 1 1 0 1 0 -8 0",
			"M 45 15 H 65 V 18 H 45 Z",
			"M 35 5 L 55, 17"
		]

	}

    update() {
		this.updateTick();
		if (this.pins_in[0].value === -1) {
			this.pins_out[0].value = -1;
		}
		if (this.pins_in[0].value >= 0 && !this.isOpen) {
			this.state = 1;
			this.pins_out[0].value = this.pins_in[0].value;
		}
		else if (this.state == 1) {
			this.state = 0;
			this.pins_out[0].value = 0;
		}
	}

	doesTransmit() {
		return true//!this.isOpen;
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
			this.ctx.fillText(pins[i].label, pins[i].position.x, pins[i].position.y - 2);
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(pins[i].position.x - 2, pins[i].position.y, 5, 5);
		}
	}

	// drawName() {
	// 	const namePosition = this.computePinPos({offsetX: this.width / 2, offsetY: -this.height - 10})
	// 	this.ctx.font = '12px monospace';
	// 	this.ctx.textAlign = 'center';
	// 	this.ctx.fillStyle = 'black';
	// 	this.ctx.fillText(this.name, namePosition.x, namePosition.y);
	// }

	drawComponent() {
        for (let i = 0; i < this.assets.length; i++) {
			if ((i === 1 && !this.isOpen) || (i === 2 && this.isOpen)) {
				continue;
			}
		    let path = new Path2D(this.assets[i]);
		    this.ctx.fillStyle = 'black';
			path.strokeWidth = "2px";
		    this.ctx.fill(path);
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
    
    onClick() {
        this.isOpen = !this.isOpen;
    }
}