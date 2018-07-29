// ============ RAMU INPUT 1.7 - 2018-06-30 ============ //

Ramu.pressedKeys	 = {};
Ramu.lastKeysPressed = {};
Ramu.clickedPosition = {};
Ramu.mousePosition   = { X: 0, Y: 0};

Ramu._key = function(){
	Ramu.pressedKeys	 = {}; // The key continues on this list until the key up.
	Ramu.lastKeysPressed = {}; // The key continues on this list until the end of frame.
	
	document.body.addEventListener("keydown", function(e){	
		Ramu.pressedKeys[e.keyCode] = e.keyCode;
		Ramu.lastKeysPressed[e.keyCode] = e.keyCode;
	}, false);
	
	document.body.addEventListener("keyup", function(e){
		delete Ramu.pressedKeys[e.keyCode];
	}, false);
}

Ramu._getMousePosition = function(event){
	let bound = Ramu.canvas.getBoundingClientRect();
	return {
		X: event.clientX - bound.left - Ramu.canvas.clientLeft,
		Y: event.clientY - bound.top - Ramu.canvas.clientTop	
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
	
/// Start all input events listeners
Ramu.input = function(){
	Ramu._key();
	Ramu._click();
	Ramu._mouseMove();
	
	// Ramu.canvas.addEventListener('mousemove'   function(e){},  false);
	// Ramu.canvas.addEventListener('touchstart', function(e){},  false);
	// Ramu.canvas.addEventListener('touchmove',  function(e){},  false);
}
