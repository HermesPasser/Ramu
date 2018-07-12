
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
Ramu.init = function(width = 500, height = 500){
	if (!document.body)
		throw new Error('No body tag found.');
	
	// Ramu.canvas = document.createElement('canvas');
	Ramu.canvas.width  = width
	Ramu.canvas.height = height
	// Ramu.ctx = Ramu.canvas.getContext('2d');
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
