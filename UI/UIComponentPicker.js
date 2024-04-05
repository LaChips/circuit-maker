class UIComponentPicker {
	constructor(CM) {
		this.CM = CM;
		this.ctx = CM.ctx;
		this.componentButtons = [];
		this.componentButtonsFrame = {
			x: 0,
			y: 0,
			width: 170,
			height: 300,
			firstItemPos: {
				x: 0,
				y: 0
			}
		};
		this.componentButtonsFrame.x = w_w - 185;
		this.componentButtonsFrame.y = 15;
		this.componentButtonsFrame.firstItemPos.x = w_w - 180;
		this.componentButtonsFrame.firstItemPos.y = 20;
		this.addComponentInList("Red LED");
		this.addComponentInList("Battery");
		this.addComponentInList("Switch");
		this.addComponentInList("GATE_AND");
		this.addComponentInList("GATE_OR");
		this.addComponentInList("GATE_NOT");
		this.addComponentInList("GATE_NAND");
		this.addComponentInList("GATE_NOR");
		this.addComponentInList("GATE_XOR");
		this.addComponentInList("GATE_XNOR");
		console.log("UIComponentPicker ready");
	}

	addComponentInList(name) {
		let x_index = this.componentButtons.length % 3;
		let y_index = parseInt(this.componentButtons.length / 3);
		let x = this.componentButtonsFrame.firstItemPos.x + x_index * 55;
		let y = this.componentButtonsFrame.firstItemPos.y + y_index * 55;
		this.componentButtons.push(new UIButton(this.CM, this.ctx, x, y, 50, 50, {
			hasText: true,
			backgroundColor: "silver",
			backgroundColorActive: "grey",
			text: {
				value: name,
				offsetX: 25,
				offsetY: 28,
				textAlign: "center",
				color: "black",
				altColor: "white"
			}})
		);
	}

	drawComponents() {
		for (const button of this.componentButtons) {
			button.draw();
		}
	}

	drawComponentPickerFrame() {
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(w_w - 185, 15, 170, 300);
		this.drawComponents();
	}

	handleMouseClick() {
		if (!this.hoveredButton)
			return;
		this.hoveredButton.click();
	}

	handleMouseMove(x, y) {
		let i = 0,
			hover = false,
	      	r;
	  	while(r = this.componentButtons[i]) {
		    this.ctx.beginPath();
		    this.ctx.rect(r.x, r.y, r.w, r.h);
		    if (this.ctx.isPointInPath(x, y)) {
		    	//r.UIButtonActive();
		    	r.active = true;
		    	this.hoveredButton = r;
		    	hover = true;
		    }
			else if (r.active == true) {
				r.active = false;
			}
			i++;
	  	}
	  	if (!hover)
	  		this.hoveredButton = false;
	}

	draw() {
		this.drawComponentPickerFrame();
	}
}