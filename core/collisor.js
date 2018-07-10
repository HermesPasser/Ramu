class Collisor extends Drawable{
	constructor(x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.canCollide = true;
		this.collision = [];
		this.collisionPriority = Ramu.collisionLastPriority++;

		Collisor.addObjt(this);
	}
	
	static addObjt(colObj){
		Ramu.objsToCollide.push(colObj);
		Ramu.callSortCollision = true;
	}
	
	static sortPriority(){
		for (let i = 0; i < Ramu.objsToCollide.length; ++i){
			for (let j = i + 1; j < Ramu.objsToCollide.length; ++j){
				if (Ramu.objsToCollide[i].collisionPriority > Ramu.objsToCollide[j].collisionPriority){
					let temp =  Ramu.objsToCollide[i];
					Ramu.objsToCollide[i] = Ramu.objsToCollide[j];
					Ramu.objsToCollide[j] = temp;
				}
			}
		}
	}
	
	destroy(){
		if (!this._start_was_called){
			console.warn("The update was not called yet,")
			return;
		}
		
		for (let i = 0; i < Ramu.objsToCollide.length; i++){
			if (Ramu.objsToCollide[i] === this){
				Ramu.objsToCollide.splice(i, 1);
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
		for (let i = 0; i < Ramu.objsToCollide.length; i++){
			if (Ramu.objsToCollide[i] === this || !Ramu.objsToCollide[i].canCollide)
				continue;
			
			let rect1 = new Rect(this.x, this.y, this.width, this.height);
			let rect2 = new Rect(Ramu.objsToCollide[i].x, Ramu.objsToCollide[i].y, Ramu.objsToCollide[i].width, Ramu.objsToCollide[i].height);
			
			if (Ramu.Math.overlap(rect1, rect2)){
				Ramu.objsToCollide[i].collision.push(this);
				this.collision.push(Ramu.objsToCollide[i]);
				this.onCollision();
			}
		}
	}
}
