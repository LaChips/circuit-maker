class GATE_XOR extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.state = 0;
        this.isOpen = true;
		this.name = "GATE_XOR";
		this.nameOffsetY = 15;
		this.width = 75;
		this.height = 35;
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
				offsetX: 85,
				offsetY: -23,
				default: -1,
				connect: []
			}
		]
		this.assets = [
            "M 0 15 H 20 V 18 H 0 Z",
            "M 0 32 H 20 V 35 H 0 Z",
            "M 75 23 H 60 V 27 H 75 Z",
			"M 10.920163301669135 2.9549689997639845 L 13.107533847037857 5.620826851932117 C 13.107533847037857 5.620826851932117 19.29369160813288 13.276677351301002 19.29369160813288 24.828674453451207 C 19.29369160813288 36.38067155560141 13.107533847037857 44.0365220549703 13.107533847037857 44.0365220549703 L 10.920163301669135 46.70237990713842 L 14.372107881053257 46.70237990713842 L 29.68370169863431 46.70237990713842 C 32.317378955338974 46.70238100082369 38.09381224630997 46.729190507913 44.58516353895873 44.070699719741675 C 50.60126045847414 41.60684663112363 57.24293769816809 36.811641518358485 62.66777304767652 27.82412748676603 L 61.400574606480774 24.828674453451207 L 62.670221809002044 21.839833841295025 C 51.37997312210759 3.173851514442127 34.69593771691092 2.9549689997639845 29.68370169863431 2.9549689997639845 L 14.372107881053257 2.9549689997639845 L 10.920163301669135 2.9549689997639845 z M 17.345564716163864 6.236024817817071 L 29.68370169863431 6.236024817817071 C 34.80671272344003 6.236024817817071 49.683760227422326 6.093619339516655 60.27271166902504 24.828674453451207 C 55.059348022787034 34.04742964330314 48.765741589551254 38.7008800205051 43.08134628901774 41.028887555088296 C 37.21847030146431 43.42999045118611 32.31737786165371 43.4213251827706 29.68370169863431 43.421324089085346 L 17.37974238093525 43.421324089085346 C 19.42885798361339 40.021675602174 22.57474742618596 33.52418326671913 22.57474742618596 24.828674453451207 C 22.57474742618596 16.108334609752266 19.393728812654775 9.626246831363142 17.345564716163864 6.236024817817071 z M 8 3 C 20 17 19 33 8 47 L 5 47 C 16 30 16 18 5 3",
        ]

	}

    update() {
		this.updateTick();
		if (this.pins_in[0].value === -1) {
			this.pins_out[0].value = -1;
		}
        const out = (this.pins_in[0].value === 1 || this.pins_in[1].value === 1) && this.pins_in[0].value !== this.pins_in[1].value ? 1 : 0;
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