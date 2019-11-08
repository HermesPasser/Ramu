
Ramu.callDestroy	   = false; //TODO
Ramu.callSortUpdate    = false;
Ramu.callSortDraw 	   = false;
Ramu.callSortCollision = false;

Ramu.debugMode  = false;
Ramu.inLoop 	= true;

Ramu.canvas = document.createElement('canvas');
Ramu.ctx = Ramu.canvas.getContext('2d');

Ramu.time = {last: 0, delta: 1/60, frameTime: 0};

/// Init the Ramu and the main loop.
Ramu.init = function(width = 500, height = 500, parentNode = null){
	Ramu.canvas.width  = width;
	Ramu.canvas.height = height;

	const exception = () => { throw new Error('No body tag found.'); };
	(parentNode || document.body || exception()).appendChild(Ramu.canvas);
	
	Ramu.callSortUpdate    = false;
	Ramu.callSortDraw 	   = false;
	Ramu.callSortCollision = false;
	
	Ramu.debugMode = false;
	Ramu.inLoop = true;
	
	// Deltatime is actually a timestep and frametime is originally the delta time,
	// change of terms exists for timestep be used instead of delta (frametimne)
	Ramu.time = { last: Date.now(), delta: 1/60, frameTime: 0 };
	
	Ramu.input();
	window.requestAnimationFrame(Ramu.loop);
}
