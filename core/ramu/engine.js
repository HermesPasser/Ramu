// ============ RAMU MAIN ENGINE (WITH NO LOOP) 1.7 - 2018-06-30 ============ //

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
		if (!Ramu.gameObjs[i]._start_was_called || !Ramu.gameObjs[i].canUpdate)
			continue;
		Ramu.gameObjs[i].update();	
	}
}

/// Check all collisions in the game.
Ramu.checkCollision = function(){
	for (var i = 0; i < Ramu.objsToCollide.length; i++){
		if (!Ramu.objsToCollide[i]._start_was_called)
			continue;
		Ramu.objsToCollide[i].checkCollision();
	}
}

/// Executes all draw methods of all Ramu.gameObjs in the game.
Ramu.draw = function(){
	Ramu.ctx.imageSmoothingEnabled = true; // reset the defaut value
	Ramu.ctx.clearRect(0, 0, Ramu.width, Ramu.height);
	
	for (var i = 0; i < Ramu.objsToDraw.length; i++){
		if (!Ramu.objsToDraw[i]._start_was_called)
			continue;
		
		let positionWidth = Ramu.objsToDraw[i].x + Ramu.objsToDraw[i].width;		
		let positionHeigh = Ramu.objsToDraw[i].y + Ramu.objsToDraw[i].height;
		
		let isOutOfCanvas = positionWidth >= 0 && Ramu.objsToDraw[i].x <= Ramu.width &&
							positionHeigh >= 0 && Ramu.objsToDraw[i].y <= Ramu.height // Renderiza somente o que esta no Ramu.canvas
		
		if (Ramu.objsToDraw[i].drawOutOfCanvas || isOutOfCanvas)
			Ramu.objsToDraw[i].drawInCanvas();
	}
}
