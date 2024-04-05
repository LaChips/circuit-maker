class UI {
	constructor(CM) {
		this.ctx = CM.ctx;
		this.componentPicker = new UIComponentPicker(CM);
		this.handleMouseMove(0,0);
		console.log("UI ready");
	}

	handleMouseClick(x, y) {
		this.componentPicker.handleMouseClick(x, y);
	}

	handleMouseMove(x, y) {
		this.componentPicker.handleMouseMove(x, y);
	}

	draw() {
		this.componentPicker.draw();
	}
}