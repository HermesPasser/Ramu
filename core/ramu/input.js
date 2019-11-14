// ============ RAMU INPUT 1.7 - 2018-10-28 ============ //

Ramu.pressedKeys	 = {};
Ramu.clickedPosition = {};
Ramu.mousePosition   = { X: 0, Y: 0};

/// Start all input events listeners
Ramu.input = function(){

	function _getMousePosition(event){
		const bound = Ramu.canvas.getBoundingClientRect();
		return {
			// previously used bound.left/bound.top but it not work well when the canvas is distorced.
			X: event.clientX - bound.x - Ramu.canvas.clientLeft,
			Y: event.clientY - bound.y - Ramu.canvas.clientTop
		}
	}
	
	function _key(){
		class KeyData{
			constructor() {
				this.pressed = false;
				this.released = false;
				this.repeated = false;
			}
		}

		Ramu.pressedKeys = {}; 

		document.body.addEventListener('keydown', e => {	
			let pressedKey = Ramu.pressedKeys[e.keyCode];
			if (pressedKey == void(0))
				pressedKey = new KeyData();
					
			pressedKey.released = false;
			pressedKey.pressed = true;
			Ramu.pressedKeys[e.keyCode] = pressedKey
		}, false);
		
		document.body.addEventListener('keyup', e => {
			let pressedKey = Ramu.pressedKeys[e.keyCode];
			if (pressedKey == void(0))
				pressedKey = new KeyData();
						
			pressedKey.repeated = false;
			pressedKey.pressed = false;
			pressedKey.released = true;
			Ramu.pressedKeys[e.keyCode] = pressedKey
		}, false);
	}
	
	function _click(){
		Ramu.clickedPosition = {};
		Ramu.canvas.addEventListener('click', event => {
			// esse metodo não é tão bom, clicar apos deixar a aba ativa gerara isso a ser chamado varias vezes num mesmo clique
			Ramu.clickedPosition = _getMousePosition(event);
		});
	}
	
	function _mouseMove(){
		Ramu.canvas.addEventListener('mousemove', event => {
			Ramu.mousePosition = _getMousePosition(event);
		}); 
	}
	
	_key();
	_click();
	_mouseMove();
}

Ramu.onKeyUp = function(key) {
	if (typeof(key) === 'string')
		key = keyCode[key.toLowerCase()];	
	
	const keyData = Ramu.pressedKeys[key];
	if (keyData)
		return keyData.released;
	
	return false;
}

Ramu.onKeyDown = function(key) {
	if (typeof(key) === 'string')
		key = keyCode[key.toLowerCase()];	
	
	const keyData = Ramu.pressedKeys[key];
	if (keyData)
		return keyData.pressed && !keyData.repeated;
	
	return false;
}

Ramu.isPressed = function(key) {
	if (typeof(key) === 'string') // if 'key' is the key name instead of key code
		key = keyCode[key.toLowerCase()];
		
	const keyData = Ramu.pressedKeys[key];
	if (keyData)
		return keyData.pressed;
	
	return false;
}

Ramu._clearInput = function(){	
	for(const i in Ramu.pressedKeys) {
		Ramu.pressedKeys[i].released = false;
		
		if (Ramu.pressedKeys[i].pressed)
			Ramu.pressedKeys[i].repeated = true;
	}
	
	Ramu.clickedPosition = {};
}
