class FULL_ADDER extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.state = 0;
        this.isOpen = true;
		this.name = "FULL ADDER";
		this.nameOffsetX = 35;
		this.nameOffsetY = 35;
		this.width = 100;
		this.height = 49;
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
			},
            {
                label: 'Cin',
                value: -1,
                offsetX: -10,
                offsetY: -54,
                default: -1,
                connect: [],
            }
		];
		this.pins_out = [
			{
				label: "S",
				value: -1,
				offsetX: 127,
				offsetY: -22,
				default: -1,
				connect: []
			},
			{
				label: "Cout",
				value: -1,
				offsetX: 127,
				offsetY: -54,
				default: -1,
				connect: []
			}
		]
		this.assets = [
			"M 0 15 H 20 V 18 H 0 Z",
            "M 0 32 H 20 V 35 H 0 Z",
            "M 0 54 H 20 V 57 H 0 Z",
            "M 97 23 H 117 V 26 H 97 Z",
			"M 97 54 H 117 V 57 H 97 Z",
			"M 20 0 L 100 0 V 80 L 20 80 L 20 77 L 97 77 L 97 3 L 23 3 L 23 77 L 20 77",
		]

	}

    update() {
		this.updateTick();
		if (this.pins_in[0].value === -1 || this.pins_in[1].value === -1) {
			this.pins_out[0].value = -1;
		}
		const p1 = this.pins_in[0].value > 0 ? 1 : 0;
        const p2 = this.pins_in[1].value > 0 ? 2 : 0;
		const p3 = this.pins_in[2].value > 0 ? 4 : 0;
		const sum = p1 + p2 + p3;
		this.pins_out[0].value = (sum === 1 || sum === 2 || sum === 4 || sum === 7) ? 1 : 0;
		this.pins_out[1].value = (sum === 3 || sum === 5 || sum === 6 || sum === 7) ? 1 : 0;
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