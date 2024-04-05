class UIButton {
	constructor(CM, ctx, x, y, w, h, options) {
		this.ctx = ctx;
		this.CM = CM;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.hasText = options.hasText;
		this.active = false;
		this.BGColor = options.backgroundColor;
		this.AltBGColor = options.backgroundColorActive;
		this.text = {
			value: options.text.value,
			offsetX: options.text.offsetX, // 25
			offsetY: options.text.offsetY, // 28
			textAlign: options.text.textAlign,
			color: options.text.color,
			font: "10px monospace",
			altColor: options.text.altColor
		}
		console.log(options.text.value + " button ready");
	}

	updateButtonText() {
		this.ctx.font = this.text.font;
		this.ctx.textAlign = this.text.textAlign;
		if (this.active)
			this.ctx.fillStyle = this.text.altColor;
		else
			this.ctx.fillStyle = this.text.color;
		this.ctx.fillText(this.text.value, this.x + this.text.offsetX, this.y + this.text.offsetY);
	}

	UIButtonActive() {
		this.ctx.fillStyle = this.AltBGColor;
		this.ctx.fillRect(this.x, this.y, this.w, this.h);
		if (this.hasText) {
			this.updateButtonText();
		}
	}

	UIButtonInactive() {
		this.ctx.fillStyle = this.BGColor;
		this.ctx.fillRect(this.x, this.y, this.w, this.h);
		if (this.hasText) {
			this.updateButtonText();
		}
	}

	draw() {
		if (this.active)
			this.UIButtonActive();
		else
			this.UIButtonInactive();
		
	}

	click() {
		console.log("CircuitMaker :", CircuitMaker);
		this.CM.addComponentToBoard(this.text.value);
	}
}