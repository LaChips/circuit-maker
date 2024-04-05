class GATE_NAND extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.state = 0;
        this.isOpen = true;
		this.name = "GATE_NAND";
		this.width = 85;
		this.height = 49;
		this.pins_in = [
			{
				label: "A",
				value: -1,
				offsetX: -10,
				offsetY: -14,
				default: -1,
				connect: []
			},
            {
				label: "B",
				value: -1,
				offsetX: -10,
				offsetY: -32,
				default: -1,
				connect: []
			}
		];
		this.pins_out = [
			{
				label: "S",
				value: -1,
				offsetX: 100,
				offsetY: -22,
				default: -1,
				connect: []
			}
		]
		this.assets = [
			"M 0 15 H 20 V 18 H 0 Z",
            "M 0 32 H 20 V 35 H 0 Z",
            "M 85 23 H 60 V 26 H 85 Z",
			"M 20 5 V 45 H 40.47619c11.267908 0 20-9.000045 20-20s-8.732091-20-20-20 H 30 z m 2.857143 2.857143 H 40.47619c9.760663 0 16.666667 7.639955 16.666667 17.142857 0 9.502902-7.382195 17.142857-17.142857 17.142857H22.857143V7.857143z",
            "M 60 24.5 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0 Z"
		]

	}

    update() {
		this.updateTick();
        if (this.pins_in[0].value === -1 || this.pins_in[1].value === -1) {
            this.pins_out[0].value = -1;
            return;
        }
        const out = (this.pins_in[0].value === 0 && this.pins_in[1].value === 0) ? 1 : ((this.pins_in[0].value > 0 || this.pins_in[1].value > 0) && this.pins_in[0].value !== this.pins_in[1].value) ? 1 : 0;
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