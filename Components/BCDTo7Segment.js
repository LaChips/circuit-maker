class BCD_TO_SEVEN_SEGMENT extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.state = 0;
        this.isOpen = true;
		this.name = "BCD TO SEVEN SEGMENT";
		this.nameOffsetX = 35;
		this.nameOffsetY = 35;
		this.width = 100;
		this.height = 132;
		this.pins_in = [
			{
				label: "A",
				value: -1,
				offsetX: -10,
				offsetY: -25,
				default: -1,
				connect: []
			},
            {
				label: "B",
				value: -1,
				offsetX: -10,
				offsetY: -50,
				default: -1,
				connect: []
			},
            {
                label: 'C',
                value: -1,
                offsetX: -10,
                offsetY: -75,
                default: -1,
                connect: [],
            },
            {
				label: "D",
				value: -1,
				offsetX: -10,
				offsetY: -100,
				default: -1,
				connect: []
			},
            {
                label: "-",
				value: -1,
				offsetX: 60,
				offsetY: -150,
				default: -1,
				connect: []
            }
		];
		this.pins_out = [
            {
				label: "a",
				value: -1,
				offsetX: 135,
				offsetY: -25,
				default: -1,
				connect: []
			},
            {
				label: "b",
				value: -1,
				offsetX: 135,
				offsetY: -40,
				default: -1,
				connect: []
			},
            {
                label: 'c',
                value: -1,
                offsetX: 135,
                offsetY: -55,
                default: -1,
                connect: [],
            },
            {
				label: "d",
				value: -1,
				offsetX: 135,
				offsetY: -70,
				default: -1,
				connect: []
			},
            {
				label: "e",
				value: -1,
				offsetX: 135,
				offsetY: -85,
				default: -1,
				connect: []
			},
            {
                label: 'f',
                value: -1,
                offsetX: 135,
                offsetY: -100,
                default: -1,
                connect: [],
            },
            {
                label: 'g',
                value: -1,
                offsetX: 135,
                offsetY: -115,
                default: -1,
                connect: [],
            },
            {
                label: "+",
				value: -1,
				offsetX: 60,
				offsetY: 10,
				default: -1,
				connect: []
            }
        ]
		this.assets = [
            "M 0 25 H 20 V 28 H 0 Z",
            "M 0 50 H 20 V 53 H 0 Z",
            "M 0 75 H 20 V 78 H 0 Z",
            "M 0 100 H 20 V 103 H 0 Z",
			"M 100 25 H 120 V 28 H 100 Z",
            "M 100 40 H 120 V 43 H 100 Z",
            "M 100 55 H 120 V 58 H 100 Z",
            "M 100 70 H 120 V 73 H 100 Z",
            "M 100 85 H 120 V 88 H 100 Z",
            "M 100 100 H 120 V 103 H 100 Z",
            "M 100 115 H 120 V 118 H 100 Z",
            "M 58 0 H 61 V 15 H 58 Z",
            "M 58 135 H 61 V 145 H 58 Z",
			"M 20 15 L 100 15 V 135 L 20 135 L 20 132 L 97 132 L 97 18 L 23 18 L 23 132 L 20 132",
		]
	}

    valueMap() {
        return {
            "0000": [1, 1, 1, 1, 1, 1, 0],
            "0001": [0, 1, 1, 0, 0, 0, 0],
            "0010": [1, 1, 0, 1, 1, 0, 1],
            "0011": [1, 1, 1, 1, 0, 0, 1],
            "0100": [0, 1, 1, 0, 0, 1, 1],
            "0101": [1, 0, 1, 1, 0, 1, 1],
            "0110": [1, 0, 1, 1, 1, 1, 1],
            "0111": [1, 1, 1, 0, 0, 0, 0],
            "1000": [1, 1, 1, 1, 1, 1, 1],
            "1001": [1, 1, 1, 1, 0, 1, 1],
            // "1010": [0, 0, 0, 0, 0, 0, 0],
            // "1011": [0, 0, 0, 0, 0, 0, 0],
            // "1100": [0, 0, 0, 0, 0, 0, 0],
            // "1101": [0, 0, 0, 0, 0, 0, 0],
            // "1110": [0, 0, 0, 0, 0, 0, 0],
            // "1111": [0, 0, 0, 0, 0, 0, 0],
        }
    }

    update() {
		this.updateTick();
        const binaryInput = `${this.pins_in[0].value >= 0 ? this.pins_in[0].value > 0 ? '1' : '0' : '-1'}${this.pins_in[1].value >= 0 ? this.pins_in[1].value > 0 ? '1' : '0' : '-1'}${this.pins_in[2].value >= 0 ? this.pins_in[2].value > 0 ? '1' : '0' : '-1'}${this.pins_in[3].value >= 0 ? this.pins_in[3].value > 0 ? '1' : '0' : '-1'}`
        const map = this.valueMap();
        const res = this.valueMap()[binaryInput];
        if (!res || binaryInput.indexOf("-") !== -1) {
            for (let i = 0; i < 7; i++) {
                this.pins_out[i].value = 0;
            }
            return;
        }
        for (let i = 0; i < 7; i++) {
            this.pins_out[i].value = res[i];
        }
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