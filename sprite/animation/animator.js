class Animator extends GameObj{
	constructor(x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		
		this.anim = {};
		this.animDrawPriority = Ramu.drawLastPriority++;
		this.currentID = "";
	}
	
	// to replace the old one that will be depreciated
	set canDraw(bool){
		this.setCanDraw(bool);
	}

	get X(){
		return this.x;
	}

	set X(num){
		// instead i can just set the this.x and leave to set the this.anim[key].x on the setCurrentAnimation
		for (const key in this.anim)
			this.anim[key].x = num
		this.x = num;
	}
	
	get Y(){
		return this.y;
	}

	set X(num){
		// instead i can just set the this.y and leave to set the this.anim[key].y on the setCurrentAnimation
		for (const key in this.anim)
			this.anim[key].y = num
		this.y = num;
	}
	
	setCanDraw(bool){
		if (!(typeof(bool) === 'boolean')) throw Ramu.Utils.CustomTypeError(bool, Boolean);
		this.anim[this.currentID].canDraw = bool;
	}
	
	setDrawPriority(integer){
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');

		for (const key in this.anim)
			this.anim[key].drawPriority = parseInt(integer);
	}
	
	addAnimation(nameID, spritesheetAnimation){
		if (arguments.length != 2) throw new Error('ArgumentError: Wrong number of arguments');
		// if (!(nameID instanceof String)) throw Ramu.Utils.CustomTypeError(nameID, String);
		if (!(spritesheetAnimation instanceof SpriteAnimation)) throw Ramu.Utils.CustomTypeError(spritesheetAnimation, SpritesheetAnimation);

		spritesheetAnimation.x = this.x;
		spritesheetAnimation.y = this.y;
		spritesheetAnimation.canDraw = false;
		spritesheetAnimation.drawPriority = this.animDrawPriority;
		Ramu.callSortDraw = true;
		this.anim[nameID] = spritesheetAnimation;
	}
	
	setCurrentAnimation(nameID){
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');

		this.currentID = nameID;
		for (const key in this.anim)
			this.anim[key].canDraw = false;
		
		if (this.anim[nameID] != null)
			this.anim[nameID].canDraw = true;
	}
	
	getAnimation(id){
		return this.anim[id];
	}

	getCurrentAnimationID(){
		for (const key in this.anim)
			if (this.anim[key].canDraw)
				return key;
		return null;		
	}
	
	setFlipHorizontally(bool){
		if (!(typeof(bool) === 'boolean')) throw Ramu.Utils.CustomTypeError(bool, Boolean);

		for (const key in this.anim)
			this.anim[key].flipHorizontally = bool;
	}
	
	setFlipVertically(bool){
		if (!(typeof(bool) === 'boolean')) throw Ramu.Utils.CustomTypeError(bool, Boolean);

		for (const key in this.anim)
			this.anim[key].flipVertically = bool;
	}
	
	setX(x){
		this.x = x;
		for (const key in this.anim)
			this.anim[key].x = x;
	}
	
	setY(y){
		this.y = y;
		for (const key in this.anim)
			this.anim[key].y = y;
	}
	
	setActive(bool){
		super.setActive(bool);
		for(const key in this.anim)
			this.anim[key].setActive(bool);
	}
	
	addX(x){
		this.x += x;
		for (const key in this.anim)
			this.anim[key].x += x;
	}
	
	addY(y){
		this.y += y;
		for (const key in this.anim)
			this.anim[key].y += y;
	}
	
	destroy(){
		super.destroy();
		for (const key in this.anim){
			this.anim[key].destroy();
		}
	}
}
