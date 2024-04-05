class Component {
	constructor(ctx) {
		this.ctx = ctx;
		this.pins_in = [];
		this.pins_out = [];
		this.position = {x: 2000, y: 100};
		this.assets = [];
		this.links = [];
		this.rotation = 0;
		this.id = getRandomString(12);
		this.tick = 0;
		this.debug_tick_delay = 2000;
		this.show_debug = false;
		this.nameOffsetY = 0;
	}

	rotate() {
		if (this.rotation == 270)
			this.rotation = 0;
		else
			this.rotation += 90;
	}

	setPinValue(type, index, value) {
		this[type][index].value = value;
	}

	doesTransmit() {
		return true;
	}

	getPinValue(type, index) {
		return this[type][index].value;
	}

	debug_log(data) {
		if (this.show_debug) {
			console.log(data);
		}
	}

	drawName() {
		const namePosition = this.computePinPos({offsetX: this.width / 2, offsetY: -this.height - 10 - this.nameOffsetY})
		this.ctx.font = '12px monospace';
		this.ctx.textAlign = 'center';
		this.ctx.fillStyle = 'black';
		this.ctx.fillText(this.name, namePosition.x, namePosition.y);
	}
	
	updateTick() {
		this.tick++;
		if (this.tick === this.debug_tick_delay) {
			this.tick = 0;
			this.show_debug = true;
		} else {
			this.show_debug = false;
		}
	}

	onClick() {
		return;
	}
}