class SEVEN_SEGMENT_DISPLAY extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.state = 0;
        this.isOpen = true;
		this.name = "7 segments display";
		this.nameOffsetX = 35;
		this.nameOffsetY = 20;
		this.width = 100;
		this.height = 120;
		this.pins_in = [
			{
				label: "1",
				value: -1,
				offsetX: -10,
				offsetY: -10,
				default: -1,
				connect: []
			},
            {
				label: "2",
				value: -1,
				offsetX: -10,
				offsetY: -25,
				default: -1,
				connect: []
			},
            {
                label: '3',
                value: -1,
                offsetX: -10,
                offsetY: -40,
                default: -1,
                connect: [],
            },
            {
				label: "4",
				value: -1,
				offsetX: -10,
				offsetY: -55,
				default: -1,
				connect: []
			},
            {
				label: "5",
				value: -1,
				offsetX: -10,
				offsetY: -70,
				default: -1,
				connect: []
			},
            {
                label: '6',
                value: -1,
                offsetX: -10,
                offsetY: -85,
                default: -1,
                connect: [],
            },
            {
                label: '7',
                value: -1,
                offsetX: -10,
                offsetY: -100,
                default: -1,
                connect: [],
            }
		];
		this.pins_out = []
		this.assets = [
            "M 45 15 H 75 V 20 H 45 Z", // segments
            "M 75 20 H 80 V 55 H 75 Z",
            "M 75 60 H 80 V 95 H 75 Z",
            "M 45 95 H 75 V 100 H 45 Z",
            "M 40 60 H 45 V 95 H 40 Z",
            "M 40 20 H 45 V 55 H 40 Z",
            "M 45 55 H 75 V 60 H 45 Z",
			"M 0 10 H 20 V 13 H 0 Z", // shape
            "M 0 25 H 20 V 28 H 0 Z",
            "M 0 40 H 20 V 43 H 0 Z",
            "M 0 55 H 20 V 58 H 0 Z",
            "M 0 70 H 20 V 73 H 0 Z",
            "M 0 85 H 20 V 88 H 0 Z",
            "M 0 100 H 20 V 103 H 0 Z",
			"M 20 0 L 100 0 V 120 L 20 120 L 20 117 L 97 117 L 97 3 L 23 3 L 23 117 L 20 117",
		]
	}

    update() {
		this.updateTick();
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
        for (let i = 0; i < this.assets.length; i++) {
		    let path = new Path2D(this.assets[i]);
		    this.ctx.fillStyle =  i < 7 && this.pins_in[i].value === 1 ? 'red' : 'black';
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