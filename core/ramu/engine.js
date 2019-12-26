// ============ RAMU MAIN ENGINE 0.8 - 2018-12-11 ============ //

Ramu._canUpdate = function(gameobj){
	return gameobj._start_was_called && gameobj.canUpdate && !gameobj.canDestroy;
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
	function _sortUpdate(){
		if (Ramu.callSortUpdate){
			Ramu.callSortUpdate = false;
			GameObj.sortPriority();
		}
	}
	
	_sortUpdate();
	for (var i = 0; i < Ramu.gameObjs.length; ++i){
		let obj = Ramu.gameObjs[i];
		
		if (Ramu._canUpdate(obj)){
			obj.update();
		}
	}
}

/// Check all collisions in the game.
Ramu.checkCollision = function(){
	function _sortCollision(){
		if (Ramu.callSortCollision){
			Ramu.callSortCollision = false;
			Collider.sortPriority();
		}
	}
	
	_sortCollision();
	for (var i = 0; i < Ramu.objsToCollide.length; ++i){
		let obj = Ramu.objsToCollide[i];
		
		if (Ramu._canUpdate(obj)){
			obj.checkCollision();
		}
	}
}

/// Executes all draw methods of all Ramu.gameObjs in the game.
Ramu.draw = function(){
	function _sortDraw (){
		if (Ramu.callSortDraw){
			Ramu.callSortDraw = false;
			Drawable.sortPriority();
		}
	}
	
	_sortDraw();
	Ramu.ctx.imageSmoothingEnabled = true; // reset the defaut value
	Ramu.ctx.clearRect(0, 0, Ramu.width, Ramu.height);
		
	for (var i = 0; i < Ramu.objsToDraw.length; ++i){
		let obj = Ramu.objsToDraw[i];
		
		if (Ramu._canUpdate(obj)){
			if (obj.drawOutOfCanvas || Ramu.Utils.isInsideOfCanvas(obj)){
				Ramu.restoreAfter( () => { obj.drawInCanvas(); });
			}
		}
	}
}
