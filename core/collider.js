class Collider extends Drawable{
	constructor(x, y, width, height){
		super(x, y, width, height, true);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.canCollide = true;
		this.collision = [];
		this.collisionPriority = ++Ramu.collisionLastPriority;

		Collider.addObjt(this);
	}
	
	static addObjt(colObj){
		if (!colObj instanceof Collider) 
			throw new Error("'colObj' is not a Collider instance.");
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
		for (let i = 0; i < Ramu.objsToCollide.length; ++i){
			let obj = Ramu.objsToCollide[i];
			
			if (obj === this || !obj.canCollide || !obj.canUpdate)
				continue;
			
			let rect1 = new Rect(this.x, this.y, this.width, this.height);
			let rect2 = new Rect(obj.x, obj.y, obj.width, obj.height);
			
			if (Ramu.Math.overlap(rect1, rect2)){
				obj.collision.push(this);
				this.collision.push(obj);
				this.onCollision();
			}
		}
	}
}
