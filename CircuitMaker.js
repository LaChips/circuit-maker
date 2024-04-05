class CircuitMaker {
	constructor(ctx, canvas) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.UI = new UI(this);
		this.eventsManager = new EventManager(this);
		this.board = new Board(this);
		var t = this;
		requestAnimationFrame(() => t.start());
		console.log("CircuitMaker ready")
	}

	addComponentToBoard(name) {
		console.log("adding component " + name + " to board");
		this.board.addComponentToBoard(name);
	}

	start() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.UI.draw();
		this.board.update();
		this.board.draw();
		var t = this;
		requestAnimationFrame(() => t.start());
	}
}