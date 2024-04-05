var w_w = 0, w_h = 0;

window.addEventListener("DOMContentLoaded", (event) => {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	w_h = document.body.clientHeight;
	w_w = document.body.clientWidth;
	canvas.height = w_h;
	canvas.width = w_w;
    new CircuitMaker(ctx, canvas);
});