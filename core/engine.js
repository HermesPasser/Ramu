class Ramu{
	/// Prevents creating an instance of this class.
	constructor(){
		throw new Error('This is a static class');
	}
	
	/// Init the Ramu and the main loop.
	static init(width = 500, height = 500){
		if (!document.body)
			throw new Error('No body tag found.');
		
		Ramu.canvas = document.createElement("canvas");
		Ramu.canvas.width  = width
		Ramu.canvas.height = height
		Ramu.ctx = Ramu.canvas.getContext("2d");
		document.body.appendChild(Ramu.canvas);
		
		Ramu.callSortUpdate    = false;
		Ramu.callSortDraw 	   = false;
		Ramu.callSortCollision = false;
		
		Ramu.debugMode = false;
		Ramu.inLoop = true;
		
		// Deltatime is actually a timestep and frametime is originally the delta time,
		// change of terms exists for timestep be used instead of delta (frametimne)
		Ramu.time = { last: Date.now(), delta: 1/60, frameTime: 0 };
		
		Ramu.input();
		Ramu.start();
		window.requestAnimationFrame(Ramu.loop);
	}
	
	/// Start all input events listeners
	static input(){
		Ramu.pressedKeys	 = {}; // The key continues on this list until the key up.
		Ramu.lastKeysPressed = {}; // The key continues on this list until the end of frame.
		
		document.body.addEventListener("keydown", function(e){	
			Ramu.pressedKeys[e.keyCode] = e.keyCode;
			Ramu.lastKeysPressed[e.keyCode] = e.keyCode;
		}, false);
		
		document.body.addEventListener("keyup", function(e){
			delete Ramu.pressedKeys[e.keyCode];
		}, false);
		
		// Ramu.canvas.addEventListener('click',      function(e){},  false);
		// Ramu.canvas.addEventListener('mousemove'   function(e){},  false);
		// Ramu.canvas.addEventListener('touchstart', function(e){},  false);
		// Ramu.canvas.addEventListener('touchmove',  function(e){},  false);
	}

	/// Game loop of Ramu.
	static loop(){
		
		let now = 0;
		if (Ramu.inLoop){
			now = Date.now();
			Ramu.time.frameTime = Ramu.time.frameTime + Math.min(1, (now - Ramu.time.last) / 1000);
		
			while(Ramu.time.frameTime > Ramu.time.delta) {
				Ramu.start();

				if (Ramu.callSortCollision){
					Collisor.sortPriority();
					Ramu.callSortCollision = false;
				}
				
				Ramu.checkCollision();
				
				if (Ramu.callSortUpdate){
					GameObj.sortPriority();
					Ramu.callSortUpdate = false;
				}
				
				Ramu.update();
				Ramu.time.frameTime = Ramu.time.frameTime - Ramu.time.delta;
				
				// Panic | from isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
				let numUpdateSteps = 0;
				if (++numUpdateSteps >= 240) {
					Ramu.time.frameTime = 0;
					console.warn("Panic.")
					break;
				}
			}
		}
		
		if (Ramu.callSortDraw){
			Drawable.sortPriority();
			Ramu.callSortDraw = false;
		}
		
		Ramu.draw();
		Ramu.lastKeysPressed = {};
		
		if (Ramu.inLoop) Ramu.time.last = now;
		window.requestAnimationFrame(Ramu.loop);
	}
	
	/// Executes all start methods of all gameObjs in the game.
	static start(){
		for (var i = 0; i < gameObjs.length; i++){
			
			// If this was defined then start already was called, so skip it
			if (gameObjs[i]._start_was_called)
				continue;
			
			// Even if this attribute receives false, the start is not called again
			// because of this attribute is alreay defined
			gameObjs[i]._start_was_called = true;
			gameObjs[i].start();
		}
	}
	
	/// Update all gameObjs in the game.
	static update(){
		for (var i = 0; i < gameObjs.length; i++){
			if (!gameObjs[i]._start_was_called)
				continue;
			gameObjs[i].update();	
		}
	}
	
	static get width(){
		if (Ramu.canvas)
			return Ramu.canvas.width;
	}
	
	static get height(){
		if (Ramu.canvas)
			return Ramu.canvas.height;
	}
	
	/// Check all collisions in the game.
	static checkCollision(){
		for (var i = 0; i < objsToCollide.length; i++){
			if (!objsToCollide[i]._start_was_called)
				continue;
			objsToCollide[i].checkCollision();
		}
	}
	
	/// Executes all draw methods of all gameObjs in the game.
	static draw(){
		Ramu.ctx.imageSmoothingEnabled = true; // reset the defaut value
		Ramu.ctx.clearRect(0, 0, Ramu.canvas.width, Ramu.canvas.height);
		
		for (var i = 0; i < objsToDraw.length; i++){
			if (!objsToDraw[i]._start_was_called)
				continue;
			
			let positionWidth = objsToDraw[i].x + objsToDraw[i].width;		
			let positionHeigh = objsToDraw[i].y + objsToDraw[i].height;
			
			let isOutOfCanvas = positionWidth >= 0 && objsToDraw[i].x <= Ramu.canvas.width &&
								positionHeigh >= 0 && objsToDraw[i].y <= Ramu.canvas.height // Renderiza somente o que esta no Ramu.canvas
			
			if (objsToDraw[i].drawOutOfCanvas || isOutOfCanvas)
				objsToDraw[i].drawInCanvas();
		}
	}
}
