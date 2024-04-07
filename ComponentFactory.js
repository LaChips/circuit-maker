
class ComponentFactory {
	constructor(ctx) {
		this.ctx = ctx;
		this.CMap = {
			"Red LED": LED_RED,
			"Battery": BATTERY,
			"Switch": SWITCH,
			"GATE_AND": GATE_AND,
			"GATE_OR": GATE_OR,
			"GATE_NOT": GATE_NOT,
			"GATE_NAND": GATE_NAND,
			"GATE_NOR": GATE_NOR,
			"GATE_XOR": GATE_XOR,
			"GATE_XNOR": GATE_XNOR,
			"FULL_ADDER": FULL_ADDER,
			"SEVEN_SEGMENT_DISPLAY": SEVEN_SEGMENT_DISPLAY,
			"BCD_TO_SEVEN_SEGMENT": BCD_TO_SEVEN_SEGMENT
		}
	}

	getComponent(name) {
		return this.CMap[name];
	}

	createComponent(name) {
		return new this.CMap[name](this.ctx);
	}
}