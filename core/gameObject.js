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
			console.warn("The update was not called yet,")
			return;
		}

		//remover se não funcionar a nova técnica
		// console.log("destroy chamado para " )
		// console.log(this)
		// console.log("  " )
		
		this.setActive(false);
		
		this.canDestroy = true;
		Ramu.callDestroy = true;
		
		for (let i = 0; i < Ramu.gameObjs.length; ++i){
			if (Ramu.gameObjs[i] === this){
				Ramu.gameObjs.splice(i, 1);
				break;
			}
		}
	}
	
	/// Virtual start to be inherited.
	start() { }
	
	/// Virtual update to be inherited.
	update() { }
}
