class Collisor extends Drawable{
	constructor(x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.canCollide = true;
		this.collision = [];
		this.collisionPriority = collisionLastPriority++;

		Collisor.addObjt(this);
	}
	
	static addObjt(colObj){
		objsToCollide.push(colObj);
		Ramu.callSortCollision = true;
	}
	
	static sortPriority(){
		for (let i = 0; i < objsToCollide.length; ++i){
			for (let j = i + 1; j < objsToCollide.length; ++j){
				if (objsToCollide[i].collisionPriority > objsToCollide[j].collisionPriority){
					let temp =  objsToCollide[i];
					objsToCollide[i] = objsToCollide[j];
					objsToCollide[j] = temp;
				}
			}
		}
	}
	
	destroy(){
		if (!this._start_was_called){
			console.warn("The update was not called yet,")
			return;
		}
		
		for (let i = 0; i < objsToCollide.length; i++){
			if (objsToCollide[i] === this){
				objsToCollide.splice(i, 1);
				break;
			}
		}
		super.destroy();
	}
	
	update(){
		this.canDraw = Ramu.debugMode;
	}
	
	get isInCollision(){ 
		return this.collision.length != 0; 
	}
	
	/// Virtual onCollision to be inherited.
	onCollision(){ }

	checkCollision(){
		if(!this.canCollide) return;
		
		this.collision = [];
		for (let i = 0; i < objsToCollide.length; i++){
			if (objsToCollide[i] === this || !objsToCollide[i].canCollide)
				continue;
			
			let rect1 = new Rect(this.x, this.y, this.width, this.height);
			let rect2 = new Rect(objsToCollide[i].x, objsToCollide[i].y, objsToCollide[i].width, objsToCollide[i].height);
			
			if (RamuMath.overlap(rect1, rect2)){
				objsToCollide[i].collision.push(this);
				this.collision.push(objsToCollide[i]);
				this.onCollision();
			}
		}
	}
}
