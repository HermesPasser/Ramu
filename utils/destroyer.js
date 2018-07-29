class Destroyer extends GameObj{
	constructor(time, gameObj){
		super(0,0,0,0);
		if (arguments.length !== 2) throw new Error('ArgumentError: Wrong number of arguments');
		this.timeToDestroy = time;
		this.currentTime = 0;
		this.objToBeDestroyed = gameObj;
	}
	
	update(){
		this.currentTime += Ramu.time.delta;
		if(this.currentTime >= this.timeToDestroy){
			if(this.objToBeDestroyed)
				this.objToBeDestroyed.destroy();
			this.destroy();
		}
	}
}
