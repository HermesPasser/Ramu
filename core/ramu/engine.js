// ============ RAMU MAIN ENGINE 0.7 - 2018-8-30 ============ //

Ramu._canUpdate = function(gameobj){
	return gameobj._start_was_called && gameobj.canUpdate && !gameobj.canDestroy;
}

Ramu._sortCollision = function(){
	if (Ramu.callSortCollision){
		Collisor.sortPriority();
		Ramu.callSortCollision = false;
	}
}

Ramu._sortDraw = function(){
	if (Ramu.callSortDraw){
		Drawable.sortPriority();
		Ramu.callSortDraw = false;
	}
}

Ramu._sortUpdate = function(){
	if (Ramu.callSortUpdate){
		GameObj.sortPriority();
		Ramu.callSortUpdate = false;
	}
}

/// Executes all start methods of all Ramu.gameObjs in the game.
Ramu.start = function(){
	for (var i = 0; i < Ramu.gameObjs.length; ++i){
		let obj = Ramu.gameObjs[i];
		
		if (obj._start_was_called) // If this was defined then start already was called, so skip it
			continue;
		
		obj._start_was_called = true;
		obj.start();
	}
}

/// Update all Ramu.gameObjs in the game.
Ramu.update = function(){
	Ramu._sortUpdate();
	for (var i = 0; i < Ramu.gameObjs.length; ++i){
		let obj = Ramu.gameObjs[i];
		
		if (Ramu._canUpdate(obj)){
			obj.update();
		}
	}
}

/// Check all collisions in the game.
Ramu.checkCollision = function(){
	Ramu._sortCollision();
	for (var i = 0; i < Ramu.objsToCollide.length; ++i){
		let obj = Ramu.objsToCollide[i];
		
		if (Ramu._canUpdate(obj)){
			obj.checkCollision();
		}
	}
}

/// Executes all draw methods of all Ramu.gameObjs in the game.
Ramu.draw = function(){
	Ramu._sortDraw();
	Ramu.ctx.imageSmoothingEnabled = true; // reset the defaut value
	Ramu.ctx.clearRect(0, 0, Ramu.width, Ramu.height);
		
	for (var i = 0; i < Ramu.objsToDraw.length; ++i){
		let obj = Ramu.objsToDraw[i];
		
		if (Ramu._canUpdate(obj)){
			if (obj.drawOutOfCanvas || Ramu.Utils.isInsideOfCanvas(obj)){
				obj.drawInCanvas();
			}
		}
	}
}
