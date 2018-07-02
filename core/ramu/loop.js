// ============ RAMU LOOP 1.7 - 2018-06-30 ============ //

Ramu.gameObjs	    = [];
Ramu.objsToDraw 	= [];
Ramu.objsToCollide  = [];

Ramu.updateLastPriority    = 0;
Ramu.drawLastPriority	   = 0;
Ramu.collisionLastPriority = 0;

/* TODO
Ramu._sortDestroy = function(){
	if (Ramu.callDestroy){
		Ramu.destroyObjs();
		Ramu.callDestroy = false;
	}
}
*/

Ramu._sortCollision = function(){
	if (Ramu.callSortCollision){
		Collisor.sortPriority();
		Ramu.callSortCollision = false;
	}
}

Ramu._sortUpdate = function(){
	if (Ramu.callSortUpdate){
		GameObj.sortPriority();
		Ramu.callSortUpdate = false;
	}
}

Ramu._sortDraw = function(){
	if (Ramu.callSortDraw){
		Drawable.sortPriority();
		Ramu.callSortDraw = false;
	}
}

Ramu._updateSteps = function(){
	// Panic | from isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
	let numUpdateSteps = 0;
	if (++numUpdateSteps >= 240) {
		Ramu.time.frameTime = 0;
		console.warn("Panic.")
		return true;
	}
	return false;
}

Ramu._clearInput = function(){
	Ramu.lastKeysPressed = {};
	Ramu.clickedPosition = {};
}

/// Game loop of Ramu.
Ramu.loop = function(){	
	let now = 0;
	if (Ramu.inLoop){
		now = Date.now();
		Ramu.time.frameTime = Ramu.time.frameTime + Math.min(1, (now - Ramu.time.last) / 1000);
	
		while(Ramu.time.frameTime > Ramu.time.delta) {
			Ramu.start();

			// Ramu._sortDestroy();
			
			Ramu._sortCollision();	
			Ramu.checkCollision();
			
			Ramu._sortUpdate();
			Ramu.update();
			
			Ramu.time.frameTime = Ramu.time.frameTime - Ramu.time.delta;
			
			if (Ramu._updateSteps()); // if it return true so is panic then stop the loop
				break;
		}
	}
	
	Ramu._sortDraw();	
	Ramu.draw();
	Ramu._clearInput();
	
	if (Ramu.inLoop) Ramu.time.last = now;
	window.requestAnimationFrame(Ramu.loop);
}
