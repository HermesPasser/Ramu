class GameObj{	
	constructor(x = 0, y = 0, w = 0, h = 0){
		if (arguments.length > 4) throw new Error('ArgumentError: Wrong number of arguments');

		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.tag =  this.tag || "none";
		this.updatePriority = ++Ramu.updateLastPriority;
		this.canUpdate = true;
		this.canDestroy = false;
		
		GameObj.addObjt(this);
	}
	
	static addObjt(obj){
		if (!obj instanceof GameObj)
			throw new Error("'obj' is not a GameObj instance.");
		Ramu.gameObjs.push(obj);
		Ramu.callSortUpdate = true;
	}
	
	static sortPriority(){
		for (let i = 0; i < Ramu.gameObjs.length; ++i){
			for (let j = i + 1; j < Ramu.gameObjs.length; ++j){
				if (Ramu.gameObjs[i].updatePriority > Ramu.gameObjs[j].updatePriority){
					let temp =  Ramu.gameObjs[i];
					Ramu.gameObjs[i] = Ramu.gameObjs[j];
					Ramu.gameObjs[j] = temp;
				}
			}
		}
	}
	
	toRect(){
		return new Rect(this.x, this.y, this.width, this.height);
	}
	
	setActive(bool){
		if (!(typeof(bool) === 'boolean')) throw Ramu.Utils.CustomTypeError(bool, Boolean);
		this.canUpdate = bool;
	}
	
	destroy(){
		if (!this._start_was_called){	
			console.warn(`Forcing update call of ${this.toString()}.`); // "The update was not called yet,")
			this.start(); // return false;	
		}
		
		this.setActive(false);
		this.canDestroy = true;
		Ramu.callDestroy = true;
	}
	
	toString(){
		return `<${this.constructor.name}#${this.tag}>`;
	}
	
	/// Virtual start to be inherited.
	start() { }
	
	/// Virtual update to be inherited.
	update() { }
}
