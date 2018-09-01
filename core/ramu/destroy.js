// ============ RAMU DESTROY 0.7 - 2018-8-30 ============ //

Ramu._destroyGameObj = function(){
	for (let i = Ramu.gameObjs.length - 1; i >= 0; --i){
		if (Ramu.gameObjs[i].canDestroy){
			Ramu.gameObjs.splice(i, 1);
		}		
	}	
}

Ramu._destroyDrawable = function(){
	for (let i = Ramu.objsToDraw.length - 1; i >= 0; --i){
		if (Ramu.objsToDraw[i].canDestroy){
			Ramu.objsToDraw.splice(i, 1);
		}
	}
}

Ramu._destroyCollisor = function(){
	for (let i = Ramu.objsToCollide.length - 1; i >= 0; --i){
		if (Ramu.objsToCollide[i].canDestroy){
			Ramu.objsToCollide.splice(i, 1);
		}
	}
}

Ramu.garbageCollector = function(){
	if (Ramu.callDestroy){
		Ramu.callDestroy = false;
		Ramu._destroyGameObj();
		Ramu._destroyDrawable();
		Ramu._destroyCollisor();
	}
}
