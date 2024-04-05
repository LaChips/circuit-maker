class LED_RED extends Component {
	constructor(ctx) {
		super(ctx);
		this._id = Math.random();
		this.state = 0;
		this.name = "LED";
		this.color = ["rgb(130, 0, 0)", "rgb(255, 0, 0)"];
		this.intensity = 1.0;
		this.width = 30;
		this.height = 30;
		this.pins_in = [
			{
				label: "-",
				value: -1,
				offsetX: 45,
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
			"M 15 15 m -15 0 a 15 15 0 1 0 30 0 a 3 3 0 1 0 -30 0"
		]
	}

	update() {
		if (this.pins_in[0].value === -1) {
			this.pins_out[0].value = -1;
		}
		if (this.pins_in[0].value > 0) {
			this.state = 1;
		}
		else if (this.state == 1) {
			this.state = 0;
		}
		this.pins_out[0].value = this.pins_in[0].value;
	}

	onClick() {
		
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
		let path = new Path2D(this.assets[0]);
		this.ctx.fillStyle = this.color[this.state];
		this.ctx.fill(path);
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