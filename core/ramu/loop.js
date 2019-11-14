// ============ RAMU GAME LOOP 0.7 - 2018-11-13 ============ //

Ramu.gameObjs	    = [];
Ramu.objsToDraw 	= [];
Ramu.objsToCollide  = [];

Ramu.updateLastPriority    = 0;
Ramu.drawLastPriority	   = 0;
Ramu.collisionLastPriority = 0;


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
