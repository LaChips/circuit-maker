class GATE_XNOR extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.state = 0;
        this.isOpen = true;
		this.name = "GATE_XNOR";
		this.width = 80;
		this.height = 35;
		this.nameOffsetY = 20;
		this.pins_in = [
			{
				label: "A",
				value: -1,
				offsetX: -10,
				offsetY: -15,
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
				offsetX: 90,
				offsetY: -23,
				default: -1,
				connect: []
			}
		]
		this.assets = [
			"M 0 15 H 20 V 18 H 0 Z",
            "M 0 32 H 20 V 35 H 0 Z",
            "M 80 23 H 60 V 26 H 80 Z",
			"M 10.9202 2.955 L 13.1075 5.6208 C 13.1075 5.6208 19.2937 13.2767 19.2937 24.8287 C 19.2937 36.3807 13.1075 44.0365 13.1075 44.0365 L 11 47 L 14 47 L 30 47 C 33 47 38.0938 46.7292 44.5852 44.0707 C 50.6013 41.6068 57.2429 36.8116 62.6678 27.8241 L 61.4006 24.8287 L 62.6702 21.8398 C 51.38 3.1739 34.6959 2.955 29.6837 2.955 L 14.3721 2.955 L 10.9202 2.955 z M 17.3456 6.236 L 29.6837 6.236 C 34.8067 6.236 49.6838 6.0936 60.2727 24.8287 C 55.0593 34.0474 48.7657 38.7009 43.0813 41.0289 C 37.2185 43.43 32.3174 43.4213 29.6837 43.4213 L 17.3797 43.4213 C 19.4289 40.0217 22.5747 33.5242 22.5747 24.8287 C 22.5747 16.1083 19.3937 9.6262 17.3456 6.236 z M 8 3 C 20 17 19 33 8 47 L 5 47 C 16 30 16 18 5 3",
            "M 62 24.5 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0"
        ]

	}

    update() {
		this.updateTick();
		if (this.pins_in[0].value === -1) {
			this.pins_out[0].value = -1;
            return;
		}
        const out = this.pins_in[0].value === this.pins_in[1].value ? 1 : 0;
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