
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
			"GATE_XNOR": GATE_XNOR
		}
	}

	getComponent(name) {
		return this.CMap[name];
	}

	createComponent(name) {
		return new this.CMap[name](this.ctx);
	}
}