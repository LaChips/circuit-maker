class EventManager {
	constructor(CM) {
		CM.canvas.onmousemove = function(e) {
		  	const rect = this.getBoundingClientRect(),
		      	x = e.clientX - rect.left,
		      	y = e.clientY - rect.top;
		    CM.UI.handleMouseMove(x, y);
		    CM.board.handleMouseMove(x, y);
		};
		CM.canvas.onmousedown = function(e) {
			const rect = this.getBoundingClientRect(),
		      	x = e.clientX - rect.left,
		      	y = e.clientY - rect.top;
		    CM.UI.handleMouseClick(x, y);
		    CM.board.handleMouseDown(x, y);
		}
		CM.canvas.onmouseup = function(e) {
			const rect = this.getBoundingClientRect(),
		      	x = e.clientX - rect.left,
		      	y = e.clientY - rect.top;
		    CM.board.handleMouseUp(x, y);
		}
		CM.canvas.onkeydown = function(e) {
			if (e.key == 'r')
				CM.board.rotateSelectedComponent();
		}
		console.log("EventManager ready");
	}
}