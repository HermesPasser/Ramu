/// Control SpritesheetAnimations
class SpritesheetAnimator extends GameObj{
	constructor(x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		
		this.anim = {};
		this.animDrawPriority = drawLastPriority++;
		this.currentID = "";
	}
	
	setCanDraw(bool){
		if (!(typeof(bool) == 'boolean')) throw Ramu.Utils.CustomTypeError(bool, Boolean);
	
		this.anim[this.currentID].canDraw = bool;
	}
	
	setDrawPriority(integer){
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');

		for (var key in this.anim)
			this.anim[key].drawPriority = parseInt(integer);
	}
	
	addAnimation(nameID, spritesheetAnimation){
		if (arguments.length != 2) throw new Error('ArgumentError: Wrong number of arguments');
		// if (!(nameID instanceof String)) throw Ramu.Utils.CustomTypeError(nameID, String);
		if (!(spritesheetAnimation instanceof SpritesheetAnimation)) throw Ramu.Utils.CustomTypeError(spritesheetAnimation, SpritesheetAnimation);
		
		spritesheetAnimation.x = this.x;
		spritesheetAnimation.y = this.y;
		spritesheetAnimation.canDraw = false;
		spritesheetAnimation.drawPriority = this.animDrawPriority;
		Ramu.callSortDraw = true;
		this.anim[nameID] = spritesheetAnimation;
	}
	
	setCurrentAnimation(nameID){
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');
		// if (!(nameID instanceof String)) throw Ramu.Utils.CustomTypeError(nameID, String);

		this.currentID = nameID;
		for (var key in this.anim)
			this.anim[key].canDraw = false;
		
		if (this.anim[key] != null)
			this.anim[nameID].canDraw = true;
	}
	
	getCurrentAnimationID(){
		for (var key in this.anim)
			if (this.anim[key].canDraw)
				return key;
		return null;		
	}
	
	setFlipHorizontally(bool){
		if (!(typeof(bool) == "boolean")) throw Ramu.Utils.CustomTypeError(bool, Boolean);

		for (var key in this.anim)
			this.anim[key].flipHorizontally = bool;
	}
	
	setFlipVertically(bool){
		if (!(typeof(bool) == "boolean")) throw Ramu.Utils.CustomTypeError(bool, Boolean);

		for (var key in this.anim)
			this.anim[key].flipVertically = bool;
	}
	
	setX(x){
		this.x = x;
		for (var key in this.anim)
			this.anim[key].x = x;
	}
	
	setY(y){
		this.y = y;
		for (var key in this.anim)
			this.anim[key].y = y;
	}	
	
	addX(x){
		this.x += x;
		for (var key in this.anim)
			this.anim[key].x += x;
	}
	
	addY(y){
		this.y += y;
		for (var key in this.anim)
			this.anim[key].y += y;
	}
	
	destroy(){
		for (var key in this.anim){
			this.anim[key].destroy();
			delete this.anim[key]; //= null;
		}
		this.anim = {};
		super.destroy();
	}
}
