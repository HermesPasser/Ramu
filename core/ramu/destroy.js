// ============ RAMU DESTROY 0.7 - 2018-11-13 ============ //


Ramu.garbageCollector = function(){
	function _destroyGameObj(){
		for (let i = Ramu.gameObjs.length - 1; i >= 0; --i){
			let obj = Ramu.gameObjs[i];
			if (Ramu.gameObjs[i].canDestroy){
				
				// To not call these loops when is not needed.
				if (obj instanceof Drawable)
					Ramu._destroyDrawableIsNeed = true;
				
				if (obj instanceof Collider)
					Ramu._destroyColliderIsNeed = true;
				
				Ramu.gameObjs.splice(i, 1);
			}		
		}	
	}

	function _destroyDrawable(){
		if (!Ramu._destroyDrawableIsNeed)
			return;

		for (let i = Ramu.objsToDraw.length - 1; i >= 0; --i){
			if (Ramu.objsToDraw[i].canDestroy){
				Ramu.objsToDraw.splice(i, 1);
			}
		}
	}

	function _destroyCollider(){
		if (!Ramu._destroyColliderIsNeed)
			return;

		for (let i = Ramu.objsToCollide.length - 1; i >= 0; --i){
			if (Ramu.objsToCollide[i].canDestroy){
				Ramu.objsToCollide.splice(i, 1);
			}
		}
	}
	
	Ramu._destroyDrawableIsNeed = false;
	Ramu._destroyColliderIsNeed = false;

	if (Ramu.callDestroy){
		Ramu.callDestroy = false;
		_destroyGameObj();
		_destroyDrawable();
		_destroyCollider();
	}
}
