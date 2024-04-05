class Board {
	constructor(CM) {
		this.CM = CM;
		this.CP = new ComponentFactory(this.CM.ctx);
		this.components = [];
		this.links = [];
		this.hoveredComponent = false;
		this.mouseDown = true;
		this.selectedComponent = false;
		this.hoveredStartPin = false;
		this.hoveredEndPin = false;
		this.selectedStartPin = false;
		this.selectedEndPin = false;
		this.prevMousePos = false;
		this.helpers = {};
		this.draw();
		this.mouseDownPos = {x: 0, y: 0};
	}

	addComponentToBoard(name) {
		let cp = this.CP.createComponent(name);
		this.components.push(cp);
	}

	update() {
		for (let comp of this.components) {
			comp.update();
		}
		for (let link of this.links) {
			if (link.update) {
				link.update();
			}
		}
	}

	rotateSelectedComponent() {
		if (this.selectedComponent) {
			this.selectedComponent.rotate();
		}
	}

	createLink(from, to) {
		let link = new Link(this.CM.ctx, from, to);
		this.links.push(link);
	}

	checkHoverComponent(comp, x, y) {
		this.CM.ctx.beginPath();
	    this.CM.ctx.rect(comp.position.x, comp.position.y, comp.width, comp.height);
	    let res = false;
	    if (this.CM.ctx.isPointInPath(x, y)) {
	    	if (!this.hoveredComponent)
	    		this.hoveredComponent = comp;
	    	res = true;
	    }
	    else if (this.checkHoverComponentPins(comp, comp.pins_in, x, y, "pins_in"))
	    	res = true;
	    else if (this.checkHoverComponentPins(comp, comp.pins_out, x, y, "pins_out"))
	    	res = true;
	    return res;
	}

	checkHoverComponentPins(comp, pins, x, y, pin_type) {
		this.CM.ctx.beginPath();
		for (let i = 0; i < pins.length; i++) {

		    this.CM.ctx.rect(pins[i].position.x - 4, pins[i].position.y - 5, 13, 15);
			if (this.CM.ctx.isPointInPath(x, y)) {
		    	if (!this.hoveredStartPin)
		    		this.hoveredStartPin = {comp: comp, pin_index: i, pin_type: pin_type};
		    	else if (comp._id != this.hoveredStartPin.comp._id)
		    		this.hoveredEndPin = {comp: comp, pin_index: i, pin_type: pin_type};
		    	this.CM.ctx.closePath();
		    	return true;
		    }
		}
		this.CM.ctx.closePath();
		return false;
	}

	moveSelectedComponent(diffX, diffY) {
		if (this.selectedComponent && this.mouseDown && !this.selectedStartPin) {
		    this.selectedComponent.position = {
		    	x: this.selectedComponent.position.x + diffX,//x - this.selectedComponent.width / 2,
		    	y: this.selectedComponent.position.y + diffY//y - this.selectedComponent.height / 2
		    };
		    return true;
	    }
	    return false;
	}

	drawLinks() {
		if (this.prevMousePos && this.selectedStartPin && this.mouseDown) {
			this.startLink(this.prevMousePos.x, this.prevMousePos.y);
		}
		for (let link of this.links) {
			link.draw();
		}
	}

	startLink(x, y) {
		let p_type = this.selectedStartPin.pin_type;
		let comp = this.selectedStartPin.comp;
		let p_idx = this.selectedStartPin.pin_index;
		let pin = comp[p_type][p_idx];
		this.CM.ctx.beginPath();
		this.CM.ctx.moveTo(pin.position.x + 2, pin.position.y + 2);
		this.CM.ctx.lineTo(x, y);
		this.CM.ctx.stroke();
		this.CM.ctx.closePath();
	}

	handleMouseMove(x, y) {
		let i = 0,
			hover = false,
	      	r;
		const {x: compX, y: compY} = this.prevMousePos || {};
		const diffX = x - compX;
		const diffY = y - compY;
		this.prevMousePos = {x: x, y: y};
	    if (this.hoveredComponent && this.moveSelectedComponent(diffX, diffY))
	    	return;
	  	while(r = this.components[i]) {
		    if (this.checkHoverComponent(r, x, y))
		    	hover = true;
			i++;
	  	}
	  	if (!hover && !this.mouseDown) {
	  		this.hoveredStartPin = false;
	  		this.hoveredComponent = false;
	  		//this.selectedComponent = false;
	  		this.selectedStartPin = false;
	  		this.hoveredEndPin = false;
	  	}
	}

	handleMouseDown(x, y) {
		if (!this.hoveredComponent && !this.hoveredStartPin)
			return;
		if (this.hoveredComponent != false) {
			this.selectedComponent = this.hoveredComponent;
			this.prevMousePos = {x: x, y: y};
		}
		else if (this.hoveredStartPin != false){
			this.prevMousePos = {x: x, y: y};
			this.selectedStartPin = this.hoveredStartPin;
		}
		this.mouseDownPos = {x: x, y: y};
		this.mouseDown = true;
	}

	handleMouseUp() {
		if (this.selectedStartPin && this.hoveredEndPin && this.hoveredEndPin.comp._id != this.selectedStartPin.comp._id) {
			console.log("creating link between 2 pins :", {pin1: this.selectedStartPin, pin2: this.hoveredEndPin});
			this.createLink(this.selectedStartPin, this.hoveredEndPin);
		}
		if (!this.hoveredComponent)
			this.selectedComponent = false;
		if (this.prevMousePos.x === this.mouseDownPos.x && this.prevMousePos.y === this.mouseDownPos.y) {
			this.hoveredComponent.onClick();
		}
		this.mouseDownPos = false;
		this.mouseDown = false;
		this.prevMousePos = false;
		this.selectedStartPin = false;
		this.hoveredEndPin = false;
	}

	drawHelpers() {
		let keys = Object.keys(this.helpers);
		for (let key of keys) {
			let helper = this.helpers[key];
			this.CM.ctx.strokeStyle = "green";
			this.CM.ctx.strokeRect(helper.x, helper.y, helper.w, helper.h);
		}
	}

	draw() {
		for (let comp of this.components) {
			comp.draw();
		}
		this.drawLinks();
		this.drawHelpers();
	}
}