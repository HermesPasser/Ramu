class Destroyer extends GameObj{
	constructor(time, gameObj){
		super(-1, -1, -1, -1);
		if (arguments.length !== 2) throw new Error('ArgumentError: Wrong number of arguments');	
		this._destroyableObj = gameObj;
		this._timer = new Timer(time, () => {
			this._destroyableObj.destroy();
			this.destroy();	
		}, false);
	}
	
	start() {
		this._timer.start();
	}
	
	destroy() {
		this._destroyableObj = null;
		this._timer.destroy();
		super.destroy();
	}
}
