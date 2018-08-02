// ============ RAMU MAIN ENGINE (WITH NO LOOP) 1.7 - 2018-07-18 ============ //

/// Executes all start methods of all Ramu.gameObjs in the game.
Ramu.start = function(){
	for (var i = 0; i < Ramu.gameObjs.length; i++){
		
		// If this was defined then start already was called, so skip it
		if (Ramu.gameObjs[i]._start_was_called)
			continue;
		
		// Even if this attribute receives false, the start is not called again
		// because of this attribute is alreay defined
		Ramu.gameObjs[i]._start_was_called = true;
		Ramu.gameObjs[i].start();
	}
}

/// Update all Ramu.gameObjs in the game.
Ramu.update = function(){
	for (var i = 0; i < Ramu.gameObjs.length; i++){
		let obj = Ramu.gameObjs[i];
		
		if (obj._start_was_called && obj.canUpdate){	
			obj.update();
		}
	}
}

/// Check all collisions in the game.
Ramu.checkCollision = function(){
	for (var i = 0; i < Ramu.objsToCollide.length; i++){
		let obj = Ramu.objsToCollide[i];
		
		if (obj._start_was_called && obj.canUpdate){	
			obj.checkCollision();
		}
	}
}

/// Executes all draw methods of all Ramu.gameObjs in the game.
Ramu.draw = function(){
	Ramu.ctx.imageSmoothingEnabled = true; // reset the defaut value
	Ramu.ctx.clearRect(0, 0, Ramu.width, Ramu.height);
		
	for (var i = 0; i < Ramu.objsToDraw.length; i++){
		let obj = Ramu.objsToDraw[i];
		
		if (obj._start_was_called && obj.canUpdate){	
			if (obj.drawOutOfCanvas || Ramu.Utils.isInsideOfCanvas(obj)){
				obj.drawInCanvas();
			}
		}
	}
}
