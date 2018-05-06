class GameObj{	
	constructor(x = 0, y = 0, w = 0, h = 0){
		if (arguments.length > 4) throw new Error('ArgumentError: Wrong number of arguments');

		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.tag =  this.tag || "none";
		this.updatePriority = updateLastPriority++;
		this.canUpdate = true;
		
		GameObj.addObjt(this);
	}
	
	static addObjt(obj){
		gameObjs.push(obj);
		Ramu.callSortUpdate = true;
	}
	
	static sortPriority(){
		for (let i = 0; i < gameObjs.length; ++i){
			for (let j = i + 1; j < gameObjs.length; ++j){
				if (gameObjs[i].updatePriority > gameObjs[j].updatePriority){
					let temp 	=  gameObjs[i];
					gameObjs[i] = gameObjs[j];
					gameObjs[j] = temp;
				}
			}
		}
	}
	
	destroy(){
		if (!this._start_was_called){
			console.warn("The update was not called yet,")
			return;
		}
		
		for (let i = 0; i < gameObjs.length; i++){
			if (gameObjs[i] === this){
				gameObjs.splice(i, 1);
				break;
			}
		}
	}
	
	/// Virtual start to be inherited.
	start() { }
	
	/// Virtual update to be inherited.
	update() { }
}
