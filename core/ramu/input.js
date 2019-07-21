// ============ RAMU INPUT 1.7 - 2018-06-30 ============ //

Ramu.clickedPosition = {};
Ramu.mousePosition   = { X: 0, Y: 0};
Ramu.controller = new KeyController();

Ramu._key = function(){
	document.body.addEventListener("keydown", function(e){	
		Ramu.controller._setDown(e.keyCode);
	}, false);
	
	document.body.addEventListener("keyup", function(e){
		Ramu.controller._setUp(e.keyCode);
	}, false);
}

Ramu._getMousePosition = function(event){
	let bound = Ramu.canvas.getBoundingClientRect();
	return {
		// previously used bound.left/bound.top but it not work well when the canvas is distorced.
		X: event.clientX - bound.x - Ramu.canvas.clientLeft,
		Y: event.clientY - bound.y - Ramu.canvas.clientTop
	}
}

Ramu._click = function(){
	Ramu.clickedPosition = {};
	Ramu.canvas.addEventListener('click', event => {
		// esse metodo não é tão bom, clicar apos deixar a aba ativa gerara isso a ser chamado varias vezes num mesmo clique
		Ramu.clickedPosition = Ramu._getMousePosition(event);
	});
}

Ramu._mouseMove = function(){
	Ramu.canvas.addEventListener('mousemove', event => {
		Ramu.mousePosition = Ramu._getMousePosition(event);
	}); 
}

Ramu._clearInput = function(){
	Ramu.clickedPosition = {};
	Ramu.controller._resetState();
}

/// Start all input events listeners
Ramu.input = function(){
	Ramu._key();
	Ramu._click();
	Ramu._mouseMove();
	
	// Ramu.canvas.addEventListener('mousemove'   function(e){},  false);
	// Ramu.canvas.addEventListener('touchstart', function(e){},  false);
	// Ramu.canvas.addEventListener('touchmove',  function(e){},  false);
}
