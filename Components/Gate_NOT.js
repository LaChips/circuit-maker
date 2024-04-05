class GATE_NOT extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.state = 0;
        this.isOpen = true;
		this.name = "GATE_NOT";
		this.width = 62;
		this.height = 37;
		this.nameOffsetY = 20;
		this.pins_in = [
			{
				label: "A",
				value: -1,
				offsetX: -10,
				offsetY: -23,
				default: -1,
				connect: []
			},
		];
		this.pins_out = [
			{
				label: "S",
				value: -1,
				offsetX: 75,
				offsetY: -23,
				default: -1,
				connect: []
			}
		]
		this.assets = [
            "M 0 26 H 20 V 23 H 0 Z",
            "M 42 26 H 62 V 23 H 42 Z",
			"M 20 1.1452 L 37 24 L 20 48.1081 L 20 1.1452 M 22 7 L 22 42 L 34 24",
            "M 35 24.5 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0"
		]

	}

    update() {
		this.updateTick();
		if (this.pins_in[0].value === -1) {
			this.pins_out[0].value = -1;
		}
        const out = this.pins_in[0].value === 0 ? 1 : this.pins_in[0].value ===  -1 ? -1 : 0;
		if (out > 0) {
			this.state = 1;
		}
		else if (this.state == 1) {
			this.state = 0;
		}
		this.pins_out[0].value = out;
	}

	doesTransmit() {
		return true;
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

	drawComponent() {
        for (const pathAsset of this.assets) {
		    let path = new Path2D(pathAsset);
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