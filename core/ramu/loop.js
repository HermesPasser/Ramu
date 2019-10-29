// ============ RAMU GAME LOOP 0.7 - 2018-8-30 ============ //

// Cannot store the length of these lists to a variable because new itens are added in meantime and then the loop can try acess a yet not defined obj.
Ramu.gameObjs	    = [];
Ramu.objsToDraw 	= [];
Ramu.objsToCollide  = [];

Ramu.updateLastPriority    = 0;
Ramu.drawLastPriority	   = 0;
Ramu.collisionLastPriority = 0;

Ramu._clearInput = function(){	
	for(const i in Ramu.pressedKeys) {
		Ramu.pressedKeys[i].released = false;
		
		if (Ramu.pressedKeys[i].pressed)
			Ramu.pressedKeys[i].repeated = true;
	}
	
	Ramu.clickedPosition = {};
}

/// Game loop of Ramu.
Ramu.loop = function(){	
	function _updateSteps(){
		// Panic | from isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
		let numUpdateSteps = 0;
		if (++numUpdateSteps >= 240) {
			Ramu.time.frameTime = 0;
			console.warn("Panic.")
			return true;
		}
		return false;
	}
	
	let now = 0;
	if (Ramu.inLoop){		
		now = Date.now();
		Ramu.time.frameTime = Ramu.time.frameTime + Math.min(1, (now - Ramu.time.last) / 1000);
	
		while(Ramu.time.frameTime > Ramu.time.delta) {
			
			Ramu.start();
			Ramu.checkCollision();	
			Ramu.update();
			Ramu.garbageCollector();
			Ramu.time.frameTime = Ramu.time.frameTime - Ramu.time.delta;
			
			if (_updateSteps()); // if it return true so is panic then stop the loop
				break;
		}
	}
	
	Ramu.draw();
	Ramu._clearInput();
	
	if (Ramu.inLoop) Ramu.time.last = now;
	window.requestAnimationFrame(Ramu.loop);
}
